-- ============================================================================
-- KIMI MSK Agent — Supabase Database Schema
-- CMS ACCESS Model MSK Track
-- ============================================================================

-- Enable Row-Level Security on all tables
-- All tables use RLS to ensure patients see only their data
-- and clinicians see only their assigned patients.

-- ── Patients ─────────────────────────────────────────────────────────────────
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  cms_patient_id TEXT UNIQUE,
  participant_id TEXT UNIQUE,

  -- Demographics
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  medicare_id TEXT,

  -- Clinical
  primary_body_region TEXT NOT NULL CHECK (primary_body_region IN (
    'lower_back', 'neck', 'knee', 'hip', 'shoulder', 'elbow', 'wrist_hand', 'ankle_foot'
  )),
  secondary_body_regions TEXT[] DEFAULT '{}',
  pain_phenotype TEXT CHECK (pain_phenotype IN (
    'nociceptive', 'neuropathic', 'nociplastic', 'mixed', 'unclassified'
  )) DEFAULT 'unclassified',
  current_phase SMALLINT CHECK (current_phase BETWEEN 1 AND 4) DEFAULT 1,
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')) DEFAULT 'medium',

  -- CMS ACCESS Model
  alignment_status TEXT CHECK (alignment_status IN (
    'pre_check', 'eligible', 'aligned', 'unaligned', 'ineligible'
  )) DEFAULT 'pre_check',
  alignment_date TIMESTAMPTZ,
  unalignment_date TIMESTAMPTZ,

  -- Assigned clinician
  clinician_id UUID REFERENCES auth.users(id),

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients can read own data" ON patients
  FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "Clinicians can read assigned patients" ON patients
  FOR SELECT USING (auth.uid() = clinician_id);

-- ── PROM Responses ───────────────────────────────────────────────────────────
CREATE TABLE prom_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,

  -- Instrument
  instrument TEXT NOT NULL CHECK (instrument IN (
    'NRS', 'PROMIS_PF_6B', 'PROMIS_PF_CAT', 'PROMIS_PI_6A', 'PROMIS_PI_CAT',
    'PGIC', 'ODI', 'NDI', 'KOOS_JR', 'HOOS_JR', 'QUICK_DASH',
    'CSI', 'PCS', 'HADS', 'LEFS', 'PSFS', 'PROMIS_29'
  )),
  tier TEXT NOT NULL CHECK (tier IN ('1_cms_mandated', '2_clinical')),
  collection_type TEXT NOT NULL CHECK (collection_type IN (
    'baseline', 'quarterly_q1', 'quarterly_q2', 'quarterly_q3',
    'end_of_period', 'weekly', 'daily', 'ad_hoc'
  )),

  -- Responses and scoring
  item_responses JSONB NOT NULL DEFAULT '{}',
  raw_score DECIMAL,
  t_score DECIMAL,
  percentile DECIMAL,

  -- CMS submission tracking
  collected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submission_deadline TIMESTAMPTZ, -- 15-day window
  submitted_to_cms_at TIMESTAMPTZ,
  cms_submission_id TEXT,
  cms_response_status TEXT CHECK (cms_response_status IN (
    'not_submitted', 'pending', 'polling', 'accepted', 'rejected', 'error'
  )) DEFAULT 'not_submitted',
  cms_response_payload JSONB,

  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE prom_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients can read own PROMs" ON prom_responses
  FOR SELECT USING (patient_id IN (SELECT id FROM patients WHERE auth_id = auth.uid()));

-- Auto-set 15-day submission deadline for Tier 1 PROMs
CREATE OR REPLACE FUNCTION set_prom_deadline()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tier = '1_cms_mandated' THEN
    NEW.submission_deadline := NEW.collected_at + INTERVAL '15 days';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prom_deadline_trigger
  BEFORE INSERT ON prom_responses
  FOR EACH ROW EXECUTE FUNCTION set_prom_deadline();

-- ── Care Plans ───────────────────────────────────────────────────────────────
CREATE TABLE care_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,

  phase SMALLINT NOT NULL CHECK (phase BETWEEN 1 AND 4),
  active BOOLEAN DEFAULT true,

  exercise_prescriptions JSONB DEFAULT '[]',
  education_modules JSONB DEFAULT '[]',
  cbt_modules JSONB DEFAULT '[]',
  goals JSONB DEFAULT '[]',

  -- Phase progression criteria
  promis_pf_target DECIMAL,
  promis_pi_target DECIMAL,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deactivated_at TIMESTAMPTZ
);

ALTER TABLE care_plans ENABLE ROW LEVEL SECURITY;

-- ── Conversations ────────────────────────────────────────────────────────────
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,

  session_type TEXT NOT NULL CHECK (session_type IN (
    'intake', 'daily_checkin', 'exercise_coaching', 'prom_collection',
    'education', 'cbt_session', 'reassessment', 'flare_management'
  )),

  messages JSONB NOT NULL DEFAULT '[]',
  summary TEXT,
  clinical_notes TEXT,

  -- Token usage tracking
  total_input_tokens INTEGER DEFAULT 0,
  total_output_tokens INTEGER DEFAULT 0,

  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- ── Escalations ──────────────────────────────────────────────────────────────
CREATE TABLE escalations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id),

  tier TEXT NOT NULL CHECK (tier IN (
    '1_emergency', '2_urgent', '3_semi_urgent', '4_monitoring'
  )),
  red_flags JSONB NOT NULL DEFAULT '[]',
  clinical_context TEXT,

  -- Resolution
  clinician_id UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,
  resolution_action TEXT,

  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE escalations ENABLE ROW LEVEL SECURITY;

-- ── CMS API Submissions ─────────────────────────────────────────────────────
CREATE TABLE cms_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,

  api_type TEXT NOT NULL CHECK (api_type IN (
    'eligibility', 'alignment', 'unalignment', 'data_reporting'
  )),

  request_payload JSONB,
  response_payload JSONB,
  fhir_bundle JSONB, -- The constructed FHIR R4 bundle

  status TEXT NOT NULL CHECK (status IN (
    'pending', 'submitted', 'polling', 'accepted', 'rejected', 'error'
  )) DEFAULT 'pending',

  poll_attempts INTEGER DEFAULT 0,
  last_poll_at TIMESTAMPTZ,

  submitted_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  error_message TEXT,

  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE cms_submissions ENABLE ROW LEVEL SECURITY;

-- ── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX idx_prom_patient_instrument ON prom_responses(patient_id, instrument);
CREATE INDEX idx_prom_tier_deadline ON prom_responses(tier, submission_deadline)
  WHERE cms_response_status != 'accepted';
CREATE INDEX idx_escalations_open ON escalations(tier, created_at)
  WHERE resolved_at IS NULL;
CREATE INDEX idx_cms_submissions_polling ON cms_submissions(status, last_poll_at)
  WHERE status IN ('submitted', 'polling');
CREATE INDEX idx_conversations_patient ON conversations(patient_id, started_at DESC);
CREATE INDEX idx_patients_clinician ON patients(clinician_id);

-- ── Views ────────────────────────────────────────────────────────────────────

-- Patients with approaching PROM deadlines (for the scheduler)
CREATE VIEW prom_deadlines_approaching AS
SELECT
  p.id AS patient_id,
  p.first_name || ' ' || p.last_name AS patient_name,
  pr.instrument,
  pr.collection_type,
  pr.collected_at,
  pr.submission_deadline,
  pr.submission_deadline - now() AS time_remaining,
  pr.cms_response_status
FROM prom_responses pr
JOIN patients p ON pr.patient_id = p.id
WHERE pr.tier = '1_cms_mandated'
  AND pr.cms_response_status NOT IN ('accepted')
  AND pr.submission_deadline > now()
ORDER BY pr.submission_deadline ASC;

-- Open escalations for clinician dashboard
CREATE VIEW open_escalations AS
SELECT
  e.*,
  p.first_name || ' ' || p.last_name AS patient_name,
  p.primary_body_region,
  p.current_phase
FROM escalations e
JOIN patients p ON e.patient_id = p.id
WHERE e.resolved_at IS NULL
ORDER BY
  CASE e.tier
    WHEN '1_emergency' THEN 1
    WHEN '2_urgent' THEN 2
    WHEN '3_semi_urgent' THEN 3
    WHEN '4_monitoring' THEN 4
  END,
  e.created_at ASC;
