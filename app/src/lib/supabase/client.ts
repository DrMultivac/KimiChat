/**
 * Supabase Client Configuration
 *
 * Two clients:
 *   1. Browser client (uses anon key, respects RLS policies)
 *   2. Server client (uses service role key, bypasses RLS for admin operations)
 *
 * HIPAA Note: Supabase Pro plan with BAA is required for production.
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// ── Browser Client (patient-facing, respects RLS) ───────────────────────────
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Server Client (API routes, bypasses RLS for admin operations) ───────────
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ── Type Definitions ─────────────────────────────────────────────────────────

export interface Patient {
  id: string;
  auth_id: string;
  cms_patient_id: string | null;
  participant_id: string | null;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say";
  medicare_id: string | null;
  primary_body_region: string;
  secondary_body_regions: string[];
  pain_phenotype: "nociceptive" | "neuropathic" | "nociplastic" | "mixed" | "unclassified";
  current_phase: 1 | 2 | 3 | 4;
  risk_level: "low" | "medium" | "high";
  alignment_status: "pre_check" | "eligible" | "aligned" | "unaligned" | "ineligible";
  alignment_date: string | null;
  clinician_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface PROMResponse {
  id: string;
  patient_id: string;
  instrument: string;
  tier: "1_cms_mandated" | "2_clinical";
  collection_type: string;
  item_responses: Record<string, unknown>;
  raw_score: number | null;
  t_score: number | null;
  percentile: number | null;
  collected_at: string;
  submission_deadline: string | null;
  submitted_to_cms_at: string | null;
  cms_response_status: string;
}

export interface Escalation {
  id: string;
  patient_id: string;
  conversation_id: string | null;
  tier: "1_emergency" | "2_urgent" | "3_semi_urgent" | "4_monitoring";
  red_flags: string[];
  clinical_context: string;
  clinician_id: string | null;
  resolved_at: string | null;
  resolution_notes: string | null;
  created_at: string;
}
