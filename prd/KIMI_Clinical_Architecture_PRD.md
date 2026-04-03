# KIMI MSK Care Coach: Clinical Architecture Product Requirements Document

**Document Version:** 1.0  
**Last Updated:** April 2026  
**Classification:** RevelAi Health Confidential - Internal Use Only  
**Intended Audience:** Engineering Team, Clinical Leadership, Product Management

---

## Executive Summary

### 1.1 Product Overview

KIMI MSK Care Coach is a clinical-grade artificial intelligence system designed to deliver evidence-based musculoskeletal pain management and rehabilitation services to Medicare beneficiaries enrolled in the Centers for Medicare & Medicaid Services (CMS) ACCESS Model Musculoskeletal (MSK) Track. The system functions as a virtual care coach, providing real-time clinical decision support, personalized care planning, automated triage, motivational interviewing, and adaptive rehabilitation guidance within the regulatory and financial constraints of the ACCESS Model framework.

The system operates within an annual payment cap of $180 per beneficiary per year (OAP - Other Appropriate Payment) for non-physician-delivered services and must maintain clinical safety equivalent to or exceeding in-office physical therapy while reducing operational costs and improving access to care for underserved Medicare populations.

### 1.2 Clinical Scope and Target Population

**Primary Target Population:**
- Medicare beneficiaries (age 65+) with acute, subacute, or chronic musculoskeletal pain conditions
- Patients with limited access to in-office physical therapy or specialist care
- Individuals with low health literacy (6th-8th grade reading level)
- Beneficiaries with multiple comorbidities or psychosocial barriers to traditional care

**Clinical Conditions Managed:**
- Mechanical low back pain (LBP)
- Cervical pain and neck dysfunction
- Knee osteoarthritis and trauma-related knee pain
- Hip pain and functional limitation
- Shoulder pain and rotator cuff-related disorders
- Elbow pain (lateral and medial epicondylitis)
- Wrist and hand pain
- Ankle and foot pain

**Excluded from Direct Care:**
- Acute fractures requiring immobilization
- Post-surgical periods (first 6 weeks post-op)
- Active malignancy with metastatic disease
- Uncontrolled acute infection
- Severe cognitive impairment (MMSE < 20)
- Acute neurological emergencies
- Conditions requiring emergency intervention

### 1.3 Regulatory and Compliance Context

The KIMI system operates within the CMS ACCESS Model MSK Track, which requires:
- Compliance with Medicare Conditions of Participation (CoPs)
- Adherence to physical therapy scope of practice boundaries
- Documentation meeting CMS audit standards
- HIPAA privacy and security requirements
- FHIR standards for interoperability
- State-by-state telehealth licensing requirements (physician oversight varies by state)

The system is designed to complement rather than replace physician care and must maintain clear escalation pathways to licensed practitioners for clinical decision-making authority.

### 1.4 Key System Objectives

1. **Clinical Efficacy:** Achieve pain reduction and functional improvement equivalent to standard physical therapy within 12-week baseline period
2. **Safety:** Identify and escalate red flag conditions with 100% sensitivity (zero false negatives) for serious underlying pathology
3. **Accessibility:** Provide 24/7/365 availability to beneficiaries regardless of geographic location or time zone
4. **Cost Efficiency:** Deliver care within $180 annual OAP budget while maintaining quality and safety standards
5. **Patient Engagement:** Achieve 70%+ adherence rates through motivational interviewing and adaptive care planning
6. **Health Literacy:** Ensure all clinical content is understandable to beneficiaries reading at 6th-8th grade level
7. **Scalability:** Support 10,000+ concurrent patients across distributed geographic regions

---

## System Architecture

### 2.1 Six-Layer Technical Architecture

The KIMI system is organized into six functional layers that separate concerns and enable independent scaling:

#### Layer 1: Patient Interface (Web and Mobile)

The patient-facing interface provides:
- Responsive web application (desktop/tablet/mobile)
- Native mobile applications (iOS and Android)
- Accessible design compliant with WCAG 2.1 AA standards
- Plain-language clinical content at 6th-8th grade reading level
- Conversational UI for patients with limited digital literacy
- Voice input capability for patients with visual impairment or manual dexterity limitations
- Session-based architecture with auto-save and offline capability

**Key Interface Components:**
- Daily check-in dashboard
- Pain tracking and body diagram
- Exercise library with video demonstrations
- Educational content browser
- Messaging hub for care coordinator communication
- Progress dashboard with personalized metrics
- Appointment scheduling and video session launcher

#### Layer 2: Conversation Engine (LLM-Powered Clinical Dialogue)

The Conversation Engine provides real-time clinical dialogue through:
- Fine-tuned large language model (LLM) specialized for MSK clinical conversations
- Context-aware dialogue management maintaining patient history, current phase, and clinical status
- Motivational interviewing framework integration
- Real-time symptom assessment and risk detection
- Patient education delivery synchronized with care plan phase
- Appointment preparation and post-visit reinforcement
- Homework assignment generation and modification based on patient feedback

**Model Configuration:**
- Temperature: 0.3 (lower variance for clinical safety)
- Token limit: 8,000 context window
- Maximum response length: 500 tokens (enforced clinical brevity)
- Safety guardrails preventing medical advice claims
- Escalation detection triggering system-level red flag processing

#### Layer 3: Clinical Decision Engine (Rule-Based + ML)

The Clinical Decision Engine combines deterministic rules with machine learning for:
- Real-time red flag identification by body region
- Pain phenotype classification (nociceptive, neuropathic, nociplastic)
- Functional capacity estimation
- Risk stratification for escalation
- Care plan recommendations
- Exercise selection and sequencing
- Treatment phase advancement determination
- Predictive analytics for adherence and outcome prediction

**Processing Pipeline:**
1. Intake data validation and standardization
2. Red flag screening by anatomical region (8-region model)
3. Pain phenotype classification using validated algorithms
4. Functional status assessment
5. Psychosocial risk screening
6. Care plan generation with phase recommendations
7. Exercise prescription and sequencing
8. Educational content mapping
9. Escalation determination

#### Layer 4: Knowledge Base (Vectorized Clinical Content)

The Knowledge Base comprises approximately 34,500 lines of clinical content distributed across 28 specialized files:
- Exercise library (60+ exercises with video metadata)
- Clinical guidelines (by body region and condition)
- Pain neuroscience education (7 CBT modules)
- Patient education (100+ topics)
- Contraindication and red flag databases
- Drug interaction and comorbidity reference
- Outcome measure scoring algorithms
- Care plan templates and phase protocols

**Knowledge Base Organization:**
- Vectorized embedding model (e.g., BERT-based) for semantic search
- Hierarchical organization by body region, condition, and phase
- Version control with audit trail
- Evidence-level tagging (RCT, observational, expert consensus)
- Citation linkage to PubMed and clinical guidelines
- Regular updating (quarterly evidence reviews)

#### Layer 5: Integration Layer (FHIR and EHR APIs)

The Integration Layer enables:
- FHIR-compliant bidirectional data exchange
- EHR system integration (Epic, Cerner, Athena, etc.)
- Pharmacy system connectivity for drug interaction checking
- Imaging and lab result integration
- Real-time eligibility verification
- Claims and billing interface
- CRM integration for care coordinator communication

**FHIR Resources Implemented:**
- Patient (demographics, insurance)
- Condition (diagnosis)
- CarePlan (KIMI-generated care plan)
- QuestionnaireResponse (PROM data)
- Observation (clinical assessments, vital signs)
- ProcedureRequest (prescribed exercises)
- DocumentReference (clinical notes, images)
- Communication (messages and alerts)

#### Layer 6: Data, Security, and Compliance Layer

The foundation layer provides:
- HIPAA-compliant data encryption (AES-256 at rest, TLS 1.3 in transit)
- Role-based access control (RBAC) with audit logging
- Automated de-identification and anonymization
- Backup and disaster recovery (RPO < 1 hour, RTO < 4 hours)
- Compliance monitoring and reporting
- Data retention and deletion workflows
- Cybersecurity monitoring and intrusion detection

---

### 2.2 Twelve Core System Components

#### Component 1: Intake Engine

**Purpose:** Initial patient onboarding, eligibility verification, and baseline data collection

**Responsibilities:**
- Verify Medicare eligibility and ACCESS Model enrollment
- Collect demographic information (age, location, language preference)
- Assess comorbidities and medication list
- Screen for absolute contraindications
- Collect consent and authorization
- Conduct initial pain history interview
- Document patient goals and expectations
- Schedule initial virtual assessment with clinical staff

**Inputs:**
- Insurance verification via CMS/payer systems
- Patient self-report (demographic, medical, pain history)
- Medicare claims history (90-day lookback)

**Outputs:**
- Patient profile record
- Eligibility determination
- Intake assessment document
- Scheduled clinical assessment

#### Component 2: Pain Phenotyper

**Purpose:** Classify pain into clinical phenotypes to guide treatment selection

**Classification System:**

**Nociceptive Pain (Mechanical):**
- Characteristics: Localized, proportional to injury, mechanical factors reproduce symptoms
- Indicators: Normal imaging, no neurological signs, mechanical movement patterns
- Treatment bias: Manual therapy, exercise progression, postural correction

**Neuropathic Pain (Nerve-Related):**
- Characteristics: Radiating pattern, burning quality, neurological signs present
- Indicators: Positive nerve tension tests, dermatomal distribution, paresthesias
- Treatment bias: Neurodynamic exercises, desensitization, neuropathic education

**Nociplastic Pain (Central Sensitization):**
- Characteristics: Disproportionate to injury, widespread distribution, sympathetic features
- Indicators: Multiple tender points, sleep disturbance, mood disorders, hyperalgesia
- Treatment bias: Pacing, graded activity, psychological approaches, pain neuroscience education

**Classification Algorithm:**
1. Collect pain history (location, quality, radiation pattern)
2. Document neurological examination findings
3. Review imaging and diagnostic testing
4. Administer validated screening tools (LANSS, DN4, S-LANSS)
5. Integrate psychosocial assessment
6. Generate primary and secondary phenotype classification
7. Assign treatment approach bias
8. Update with each clinical reassessment

#### Component 3: Red Flag Scanner

**Purpose:** Real-time identification of serious underlying pathology requiring escalation to physician

**8-Region Red Flag Detection Model:**

**Lower Back Red Flags:**
- Age > 50 with new-onset back pain
- Fever + back pain
- History of cancer + back pain
- Immunosuppression + back pain
- Unexplained weight loss (> 10 lbs, 6 months)
- Night pain preventing sleep
- Neurological compromise (bowel/bladder dysfunction, bilateral leg symptoms, progressive weakness)
- Severe pain unresponsive to conservative care (> 6 weeks)
- Signs of infection (elevated WBC, CRP)

**Cervical Spine Red Flags:**
- Myelopathic features (hand clumsiness, gait ataxia, hyperreflexia)
- Vertigo with cervical movement
- Quadriparesis
- Drop attacks
- History of cervical trauma with imaging evidence
- Signs of vertebral artery insufficiency (diplopia, ataxia with extension)

**Knee Red Flags:**
- Acute trauma with effusion
- Signs of ligamentous instability (positive Lachman, anterior drawer)
- Mechanical locking with catching sensation
- Meniscal signs (McMurray positive, joint line tenderness)
- Fever + joint pain (septic joint)
- Inability to bear weight
- Signs of compartment syndrome (pain with passive stretch, paresthesias)

**Hip Red Flags:**
- Acute severe pain with loss of mobility
- Fever + hip pain
- History of corticosteroid use + severe pain (avascular necrosis risk)
- Inability to internally rotate hip (fetal positioning)
- Signs of labral pathology resistant to conservative care

**Shoulder Red Flags:**
- Acute traumatic dislocation or subluxation
- Severe night pain with functional loss > 4 weeks
- Signs of reflex sympathetic dystrophy (color/temperature changes, swelling)
- Nerve injury signs (axillary, suprascapular)
- History of cancer + shoulder pain

**Elbow/Wrist/Hand Red Flags:**
- Acute trauma with visible deformity
- Signs of compartment syndrome
- Complex regional pain syndrome features
- Progressive neurological deficit
- Signs of carpal tunnel syndrome or nerve compression unresponsive to conservative care

**Ankle/Foot Red Flags:**
- Inability to bear weight after trauma
- Signs of fracture or ligament rupture
- Fever + foot pain (infection, osteomyelitis)
- Diabetic patient with foot pain + foot ulceration
- Signs of deep vein thrombosis (unilateral swelling, warmth, calf tenderness)

**Scanner Processing:**
1. Continuously monitor patient inputs for red flag keywords
2. Flag clinical findings suggestive of serious pathology
3. Assess confidence level (high = immediate escalation, moderate = physician review, low = monitoring)
4. Generate escalation alert with evidence
5. Route to appropriate clinician based on urgency
6. Document red flag assessment and action taken
7. Track false positive rate for model refinement

**Clinical Response Pathways:**
- Critical (Emergency): Immediate emergency department referral with documentation
- High Priority (Same-day): Urgent physician review and contact
- Medium Priority (24-48 hours): Physician review within 1 business day
- Low Priority (Standard): Documented monitoring with follow-up assessment

#### Component 4: PROM Collector (Patient-Reported Outcome Measures)

**Purpose:** Systematically collect validated outcome measures to assess progress and guide treatment modifications

**10 Core Validated Measures:**

1. **Numeric Pain Rating Scale (NPRS)** - 0-10 current, worst, best, average pain
2. **Oswestry Disability Index (ODI)** - Condition-specific functional limitation (10 items)
3. **Neck Disability Index (NDI)** - Cervical-specific disability (10 items)
4. **Knee Outcome Survey (KOS-ADLS)** - Knee functional limitation (14 items)
5. **Lower Extremity Functional Scale (LEFS)** - Multi-region lower body function (20 items)
6. **Patient-Specific Functional Scale (PSFS)** - Individualized goals (3 patient-selected activities)
7. **PROMIS-29 Profile** - General health and QoL (29 items across 7 domains)
8. **Central Sensitization Inventory (CSI)** - Nociplastic pain screening (25 items)
9. **Pain Catastrophizing Scale (PCS)** - Psychological factor (12 items)
10. **Hospital Anxiety and Depression Scale (HADS)** - Mental health screening (14 items)

**Collection Schedule — Two-Tier Framework:**

**Tier 1: CMS-Mandated (Payment-Critical)**
Per the CMS ACCESS Model RFA and March 2026 API Technical Office Hour, these collections directly determine Outcome-Aligned Payment eligibility. Missing any Tier 1 window means forfeited payment for that beneficiary.

| Window | Timing | Required Instruments | Submission Deadline |
|---|---|---|---|
| Baseline | Within 60 days of alignment | NRS (or PROMIS NRS v1.0 Pain Intensity 1a), PROMIS PF 6b (or v2.0 CAT), PROMIS PI 6a (or v2.0 CAT), site-specific PROM | Within 15 days of collection |
| Quarterly (Q1) | ~90 days post-enrollment | NRS, PROMIS PF, PROMIS PI, site-specific PROM | Within 15 days of collection |
| Quarterly (Q2) | ~180 days post-enrollment | NRS, PROMIS PF, PROMIS PI, site-specific PROM | Within 15 days of collection |
| Quarterly (Q3) | ~270 days post-enrollment | NRS, PROMIS PF, PROMIS PI, site-specific PROM | Within 15 days of collection |
| End of Period | 365 days (or up to 180 days early) | NRS, PROMIS PF, PROMIS PI, PGIC, site-specific PROM | Within 15 days of collection |

**Tier 2: Clinical Optimization (Care Quality)**
These collections improve clinical decision-making and patient engagement but are NOT required for CMS payment. If resource constraints force a trade-off, always prioritize Tier 1 completeness.

- Daily: NPRS (0-10 pain check-in via app/SMS)
- Weekly: PROMIS PF + PI short forms, activity logs
- Biweekly: Disease-specific measures (ODI/NDI/KOS-ADLS/KOOS JR/HOOS JR/QuickDASH)
- Monthly: LEFS, PSFS, PROMIS-29, CSI (if nociplastic phenotype)
- 12-week: Full reassessment (all measures)

**Critical Compliance Rules:**
1. All CMS-mandated PROMs have a **15-day clinical validity window** — data must be submitted to CMS within 15 days of collection
2. The same instrument version must be used throughout the care period (do not switch between Short Form and CAT mid-episode)
3. PGIC is collected **only at end of period** — it measures global impression of change and has no baseline
4. End-of-period measures may be submitted up to **180 days early** when scores are favorable (early success reporting)

**PROM Data Processing:**
1. Collect responses via web or SMS interface
2. Validate data entry and completeness
3. Calculate normalized scores
4. Generate change scores and effect sizes
5. Alert on significant deterioration (> 10% decline)
6. Include in progress reporting to care team
7. Trigger care plan modifications if thresholds breached
8. Provide visual feedback to patients
9. Generate population-level analytics

#### Component 5: Care Plan Builder

**Purpose:** Generate individualized, evidence-based care plans aligned with patient goals and clinical presentation

**Care Plan Components:**

**Phase Assignment:**
- Foundation Phase (Weeks 1-4): Pain reduction, mobility restoration, symptom explanation
- Building Phase (Weeks 5-8): Progressive strengthening, functional recovery, confidence building
- Strengthening Phase (Weeks 9-16): Advanced strengthening, return to work/activity
- Maintenance Phase (Weeks 17-52): Long-term management, relapse prevention

**Plan Elements:**
- Diagnosis and clinical phenotype
- Treatment objectives aligned with patient goals
- Prescribed exercises (with frequency, duration, progression)
- Educational topics sequenced by phase
- PROM monitoring schedule
- Telehealth visit schedule and content
- Care coordinator contact frequency
- Red flag monitoring parameters
- Escalation triggers and protocols
- Expected outcomes and timeline

**Care Plan Generation Algorithm:**
1. Review intake assessment and Pain Phenotyper output
2. Identify clinical presentation category
3. Retrieve evidence-based template for condition + phenotype
4. Personalize exercises based on patient capabilities and goals
5. Sequence education by phase and learning preferences
6. Set milestone dates and outcome expectations
7. Identify escalation triggers specific to presentation
8. Generate written care plan in plain language
9. Review with patient for agreement
10. Establish baseline PROM measurements

#### Component 6: Phase Manager

**Purpose:** Manage patient progression through 4-phase rehabilitation protocol with automated advancement criteria

**Phase Transition Criteria:**

**Foundation → Building (Weeks 4-5):**
- Pain reduced by ≥ 20% (NPRS score)
- Completing ≥ 70% of prescribed exercises
- No escalating red flags
- Patient reports increased confidence
- Demonstrated proper exercise form

**Building → Strengthening (Weeks 8-9):**
- Pain reduced by ≥ 40% from baseline
- Functional measure improvements (ODI/NDI ≥ 20% improvement)
- Consistently completing exercises without pain escalation
- Demonstrating readiness for advanced challenges
- Psychological measures stable or improving

**Strengthening → Maintenance (Weeks 16-17):**
- Pain stable and ≤ 3/10 for most days
- Functional measures within normal range
- Successfully returning to desired activities
- Demonstrating independent exercise program adherence
- Psychological measures within normal range

**Advancement Process:**
1. Collect PROM data at phase endpoint
2. Assess advancement criteria against threshold
3. If criteria met: Generate new exercise progression, update education sequence, adjust visit frequency
4. If criteria not met: Intensify current phase, modify exercises, increase support frequency
5. Document advancement decision and rationale
6. Communicate changes to patient and care team
7. Update care plan in EHR

#### Component 7: Exercise Prescriber

**Purpose:** Provide personalized, progressive exercise prescription with real-time form feedback

**Exercise Library Structure:**
- 60+ exercises across 8 body regions
- Organized by functional movement pattern
- Multi-difficulty versions (beginner/intermediate/advanced)
- Video demonstrations with form coaching
- Contraindication cross-references
- Expected pain response guidance
- Progression and regression algorithms

**Exercise Selection Algorithm:**
1. Identify primary movement deficit from functional assessment
2. Select exercises targeting deficit with appropriate difficulty
3. Cross-check contraindications against patient history
4. Consider comorbidities and functional limitations
5. Assign sets, reps, frequency, and duration
6. Establish pain monitoring parameters (acceptable pain range)
7. Schedule progression based on phase and performance

**Exercise Prescription Example - Lower Back Foundation Phase:**
- Quadruped marching (3 sets x 10 reps, 2x/week)
- Supine glute bridge (3 sets x 12 reps, 3x/week)
- Standing pelvic tilts (3 sets x 15 reps, 2x/week)
- Prone elbow plank (3 sets x 15-30 sec, 2x/week)
- Cat-camel stretching (2 sets x 10 reps, daily)
- Quadruped breathing (2 sets x 10 reps, daily)

**Exercise Progression Criteria:**
- Patient successfully completes prescribed reps with correct form
- Pain remains ≤ 4/10 during and after exercise
- No pain escalation at 24-hour follow-up
- PROM measures stable or improving
- Patient confidence increasing

#### Component 8: Education Sequencer

**Purpose:** Deliver pain neuroscience education and behavioral health content in phase-appropriate, scaffolded sequence

**7-Module CBT Framework:**

**Module 1: Pain Science Education (Weeks 1-2)**
- How pain works (nociception vs. pain)
- Nervous system sensitivity concepts
- Gate control theory explanation
- Why imaging doesn't always match symptoms

**Module 2: Threat Reduction (Weeks 2-3)**
- Identifying catastrophic thinking
- Normalizing pain experiences
- Building sense of control
- Reducing pain-related fear

**Module 3: Activity Pacing (Weeks 3-5)**
- Graded activity principles
- Energy conservation strategies
- Avoiding boom-bust cycles
- Activity baseline and targets

**Module 4: Sleep and Recovery (Weeks 4-6)**
- Sleep hygiene principles
- Pain's impact on sleep
- Sleep-activity relationships
- Relaxation techniques

**Module 5: Stress and Emotional Factors (Weeks 6-8)**
- Stress-pain relationship
- Emotional processing
- Relaxation and breathing
- Mindfulness introduction

**Module 6: Return to Activity (Weeks 9-16)**
- Graded return to work/hobbies
- Managing flare-ups
- Building confidence
- Activity modification strategies

**Module 7: Long-term Self-Management (Weeks 17-52)**
- Maintaining progress
- Early warning signs
- Relapse prevention
- Lifestyle integration

**Content Delivery Methods:**
- 3-5 minute video lessons (6th-8th grade readability)
- Interactive quizzes for comprehension
- Downloadable worksheets and resources
- Discussion prompts for care coordinator conversations
- Visual infographics and diagrams
- Voice-over narration for accessibility

#### Component 9: Session Router

**Purpose:** Manage telehealth session scheduling, content, and clinical assessment

**10 Session Types:**

1. **Initial Assessment** (Week 1, 45 min)
   - Comprehensive history and physical
   - Baseline PROM collection
   - Care plan review and agreement
   - Expectations setting

2. **Phase Kickoff** (Week 4, 9, 17, 45 min)
   - Review PROM changes
   - Introduce new exercises
   - Discuss phase progression
   - Update care plan

3. **Exercise Form Check** (Monthly, 20 min)
   - Video form assessment
   - Corrections and adjustments
   - Progression recommendations
   - Safety review

4. **Flare-Up Management** (As needed, 20 min)
   - Assess severity
   - Modify exercises temporarily
   - Coping strategies
   - Escalation if needed

5. **Progress Review** (12-week, 24-week, 52-week, 30 min)
   - Comprehensive PROM reassessment
   - Goal achievement review
   - Care plan modifications
   - Next phase planning

6. **Medication Review** (As needed, 20 min)
   - Discuss medication effectiveness
   - Document side effects
   - Suggest alternatives to prescriber
   - Flag dangerous interactions

7. **Comorbidity Management** (As needed, 30 min)
   - Address comorbid conditions impact
   - Coordinate with other providers
   - Modify MSK program if needed
   - Psychosocial support referral

8. **Motivational Interview** (Monthly, 20 min)
   - Explore ambivalence about treatment
   - Identify barriers to adherence
   - Strengthen intrinsic motivation
   - Adjust goals if needed

9. **Escalation/Discharge Planning** (As needed, 30 min)
   - Prepare for specialist referral
   - Document transition information
   - Ensure continuity of care
   - Schedule follow-up if appropriate

10. **Maintenance Check-in** (Phase 4, monthly, 20 min)
    - Monitor symptom status
    - Assess adherence to self-management
    - Adjust home program as needed
    - Reinforce education

**Session Scheduling Algorithm:**
1. Retrieve patient phase and visit schedule
2. Check for missed sessions or overdue assessments
3. Match patient availability with clinician capacity
4. Generate session type based on clinical indicators
5. Schedule session with appropriate clinician
6. Send patient reminder with telehealth link
5. Generate pre-visit materials (assessment forms, education)
8. Document session completion and clinical findings

#### Component 10: Escalation Gateway

**Purpose:** Manage 4-tier clinical escalation protocol for patient safety

**Tier 1: Conversation Engine Safety Features**
- Phrase detection algorithms identifying red flag language
- Real-time alert generation with evidence summary
- Patient-facing message not acknowledging severity (preventing unnecessary alarm)
- System escalation to Clinical Decision Engine

**Tier 2: Clinical Decision Engine Review (4-12 hours)**
- Physician or advanced practice provider review of flagged case
- Application of clinical judgment and protocol
- Decision to monitor, escalate, or resolve
- Documentation of clinical reasoning
- Contact with patient if escalation required

**Tier 3: Urgent Clinician Intervention (Same-day)**
- Direct communication with patient
- Urgent referral to specialist or emergency care
- Temporary pause of KIMI care plan
- Enhanced monitoring if continued at lower level
- Family notification if appropriate

**Tier 4: Emergency Escalation (Immediate)**
- Direct emergency department routing
- EMS notification if indicated
- Automatic outreach to emergency contact
- KIMI care plan suspension
- Post-emergency care coordination

**Escalation Tracking Dashboard:**
- Real-time view of all escalated cases
- Tier assignment and reasoning
- Clinical actions taken
- Time to resolution
- Quality metrics (specificity, sensitivity, timeliness)

#### Component 11: Conversation Engine (Clinical Dialogue)

**Purpose:** Deliver real-time, context-aware clinical dialogue through LLM technology

**Key Capabilities:**
- Pain assessment and tracking
- Exercise coaching with motivational messaging
- Education delivery and comprehension checking
- Motivational interviewing framework
- Appointment preparation
- Post-visit reinforcement
- Homework assignment and modification
- Crisis support and escalation triggering
- Psychosocial screening

**Conversation Flow Example - Exercise Session:**

Patient: "My knee is really sore today, I don't want to do my exercises."

System Response: "I hear you - knee pain can be really frustrating. Let me ask you something: On a scale of 0-10, how bad is your pain right now compared to yesterday?"

Patient: "Maybe a 5 out of 10."

System Response: "Okay, thanks for letting me know. A 5 is definitely something we can work with. Here's what we can do - we'll start with your gentler exercises that actually help settle down pain, rather than pushing through. Does that sound okay?"

Patient: "Yeah, that sounds better."

System Response: "Great. Let's start with gentle knee movements while you're lying down. This should feel comfortable - if it gets to more than a 4 out of 10 pain, let me know and we'll modify it. Ready to see the video demonstration?"

**Motivational Interviewing Integration:**
- Open-ended questions encouraging patient reflection
- Affirmations highlighting strengths and progress
- Summarization of patient concerns and commitments
- Eliciting change talk rather than arguing for compliance
- Exploring ambivalence with curiosity rather than judgment

#### Component 12: FHIR Bridge

**Purpose:** Enable standards-based data exchange with external EHR systems

**FHIR Resource Mapping:**

| KIMI Data | FHIR Resource | Key Elements |
|-----------|---------------|--------------|
| Patient demographics | Patient | name, birthDate, gender, address, telecom, identifier |
| Diagnoses | Condition | code, bodySite, severity, onsetDate, abatement |
| Care plans | CarePlan | title, description, subject, period, activity |
| PROM responses | QuestionnaireResponse | questionnaire, item[].answer, authored |
| Clinical assessments | Observation | code, value, effectiveDateTime, component |
| Exercise prescriptions | ProcedureRequest | code, subject, occurrenceTiming, instruction |
| Clinical notes | DocumentReference | type, content, created, indexed |
| Care team communication | Communication | payload, sent, recipient, status |

**Bidirectional Sync Operations:**
- Inbound: Demographics, diagnoses, medications, allergies, vital signs
- Outbound: Care plans, PROM responses, assessments, exercise compliance, clinical summaries
- Frequency: Real-time for critical data, nightly batch for routine updates

---

### 2.3 Data Flow Architecture

The KIMI system processes patient data through a standardized pipeline:

1. **Patient Input Capture** - Web/mobile interface collects patient-reported data
2. **Validation and Standardization** - Data validated against schema, normalized to standard formats
3. **Real-Time Processing** - Red flag scanner processes input immediately
4. **Clinical Decision Engine Processing** - Input fed to decision algorithms
5. **Knowledge Base Integration** - Relevant clinical content retrieved
6. **Care Plan Modification** - Algorithms may adjust treatment recommendations
7. **Conversation Engine Interaction** - LLM generates contextualized patient response
8. **Documentation** - All interactions logged for audit trail
9. **EHR Integration** - Clinical data exported to FHIR interface
10. **Analytics and Monitoring** - Population-level metrics calculated

---

## Clinical Safety & Triage Logic

### 3.1 Red Flag Identification Framework

Red flag detection is the highest-priority clinical safety function, operating continuously across all patient interactions.

**Red Flag Categories by Body Region:**

#### Lower Back Red Flags (Critical)

**Absolute Indicators (Immediate Escalation):**
- Spinal cord compression signs: bilateral leg symptoms, bladder/bowel dysfunction, progressive lower extremity weakness
- Cauda equina syndrome: saddle anesthesia, bilateral leg pain, bowel/bladder retention
- Signs of acute infection: fever + back pain + spinal percussion tenderness
- Pathological fracture indicators: severe pain unproportionate to trauma in elderly patient
- Major trauma with neurological compromise

**High Priority Indicators (Same-day Physician Review):**
- Age > 50 with new-onset back pain (malignancy screening)
- Cancer history + back pain (spinal metastasis risk)
- Fever + back pain
- Immunosuppression + back pain + fever
- Unexplained weight loss (> 10 lbs over 6 months) + back pain
- Night pain preventing sleep, unrelieved by positioning
- Severe pain unresponsive to conservative care > 6 weeks
- Signs of systemic illness (fatigue, malaise, elevated temperature)

**Monitoring Indicators (Track Over 24-48 hours):**
- Pain severity > 7/10 at rest
- Progressive neurological deficit
- Worsening functional decline
- Signs of mood disorder (hopelessness, suicidal ideation)

#### Cervical Spine Red Flags (Critical)

**Absolute Indicators (Immediate Escalation):**
- Myelopathic features: hand clumsiness, gait ataxia, hyperreflexia, upper motor neuron signs
- Quadriparesis or progressive weakness
- Drop attacks
- Signs of vertebral artery insufficiency: diplopia, ataxia with cervical movement, nystagmus
- Acute severe pain with complete loss of motion post-trauma

**High Priority Indicators (Same-day Review):**
- Trauma with any neurological symptoms
- Acute severe pain with arm symptoms
- Progressive headache + neck pain
- Visual changes + neck pain
- Severe headache unlike prior experiences

#### Knee Red Flags (High Priority)

**Absolute Indicators (Immediate Escalation):**
- Signs of compartment syndrome: pain out of proportion, pain with passive stretch, paresthesias
- Acute trauma with significant swelling/deformity
- Signs of septic joint: fever, severe pain, inability to move knee, swelling
- Signs of ligament rupture: inability to bear weight, significant instability

**High Priority Indicators (Same-day Review):**
- Mechanical locking with catching sensation (possible meniscal tear)
- Acute trauma with effusion
- Severe pain preventing weight-bearing
- Signs of deep vein thrombosis: unilateral calf swelling, warmth, tenderness

#### Hip Red Flags (High Priority)

**Absolute Indicators (Immediate Escalation):**
- Acute severe pain with loss of mobility post-trauma
- Signs of avascular necrosis: severe pain, loss of hip mobility in patient on corticosteroids
- Fever + hip pain

**High Priority Indicators (Same-day Review):**
- Inability to internally rotate hip (fetal position)
- Severe pain with any movement
- Progressive loss of motion over days

#### Shoulder Red Flags (High Priority)

**Absolute Indicators (Immediate Escalation):**
- Acute dislocation or subluxation
- Signs of reflex sympathetic dystrophy: color/temperature changes, swelling, progressive loss of motion
- Nerve injury signs: weakness, paresthesias in axillary/suprascapular distribution

**High Priority Indicators (Same-day Review):**
- Severe night pain with functional loss > 4 weeks
- Trauma with neurological symptoms
- Progressive shoulder-hand syndrome

#### Elbow, Wrist, Hand Red Flags (Moderate Priority)

**Absolute Indicators (Immediate Escalation):**
- Acute trauma with visible deformity
- Signs of compartment syndrome
- Progressive nerve compression with functional loss

**High Priority Indicators (Same-day Review):**
- Signs of carpal tunnel syndrome unresponsive to conservative care
- Complex regional pain syndrome features
- Progressive neurological deficit

#### Ankle/Foot Red Flags (High Priority)

**Absolute Indicators (Immediate Escalation):**
- Inability to bear weight post-trauma
- Signs of compartment syndrome
- Signs of deep vein thrombosis: unilateral swelling, calf tenderness, warmth
- Diabetic patient with foot pain + foot ulceration

**High Priority Indicators (Same-day Review):**
- Severe pain preventing weight-bearing
- Signs of fracture
- Signs of infection in diabetic patient

### 3.2 Pain Phenotyping Algorithm

The Pain Phenotyper classifies patient pain into clinical subtypes that guide treatment selection.

**Classification Inputs:**
- Pain location and distribution pattern
- Pain quality descriptors (sharp, aching, burning, throbbing)
- Temporal pattern (constant vs. intermittent, diurnal variation)
- Movement sensitivity (which movements worsen/improve)
- Neurological examination findings
- Imaging and diagnostic testing results
- Psychosocial factors (anxiety, depression, catastrophizing)
- Associated symptoms (sleep disturbance, temperature changes, swelling)

**Nociceptive Pain Phenotype**

Characteristics:
- Pain localized to area of injury
- Pain quality typically mechanical (sharp, catching, aching)
- Pain proportional to injury severity
- Pain improved with relative rest, worsening with aggravating movements
- Normal imaging findings or imaging consistent with tissue injury
- No neurological signs or symptoms
- Normal mood and anxiety screening

Clinical Presentation Examples:
- Mechanical low back pain from acute lifting injury
- Knee pain from acute meniscal tear
- Shoulder pain from rotator cuff strain

Treatment Approach Bias:
- Manual therapy (joint mobilization, soft tissue treatment)
- Progressive resistance exercise
- Postural and movement correction
- Graduated activity progression
- Pain neuroscience education focused on tissue healing

Expected Outcomes:
- Pain reduction over 2-4 weeks
- Functional improvement within 6-12 weeks
- Good response to exercise-based rehabilitation

**Neuropathic Pain Phenotype**

Characteristics:
- Pain radiating or referred in dermatomal/peripheral nerve distribution
- Pain quality often burning, electric, tingling, shooting
- Neurological examination findings (diminished sensation, nerve tension signs, weakness)
- Positive neurological provocation tests
- Associated symptoms: paresthesias, numbness, allodynia
- Imaging may show nerve compression or injury
- Sleep disturbance common

Clinical Presentation Examples:
- Radiculopathy from nerve root compression
- Peripheral neuropathy
- Post-herpes zoster pain
- Complex regional pain syndrome type 2

Treatment Approach Bias:
- Neurodynamic exercises
- Desensitization techniques
- Topical neuropathic agents
- Graded exposure to previously avoided movements
- Education about nerve sensitivity and recovery

Expected Outcomes:
- Slower progress than nociceptive pain (8-16 weeks)
- Gradual sensory recovery possible but may be incomplete
- Good response to behavioral approaches and exercise

**Nociplastic Pain Phenotype**

Characteristics:
- Widespread pain distribution
- Pain disproportionate to visible injury
- Multiple tender points on palpation
- Amplification of normal stimuli (allodynia, hyperalgesia)
- Associated symptoms: sleep disturbance, fatigue, mood changes, cognitive fog
- Elevated psychosocial risk factors (anxiety, depression, stress)
- Imaging typically normal or findings don't match pain severity
- May have history of trauma or adverse life experiences

Clinical Presentation Examples:
- Fibromyalgia-like presentations
- Central sensitization following injury
- Pain amplification with psychological stress
- Chronic widespread pain

Treatment Approach Bias:
- Pacing strategies (avoiding boom-bust cycles)
- Sleep optimization
- Psychological approaches (CBT, mindfulness)
- Graded activity based on time rather than pain tolerance
- Pain neuroscience education focused on nervous system sensitization

Expected Outcomes:
- Slower progress (12-24 weeks)
- Focus on functional improvement rather than pain resolution
- Good response to psychological and behavioral approaches
- Important to address comorbid anxiety/depression

**Classification Algorithm Implementation:**

```
1. Collect pain descriptors and history
2. Calculate nociceptive likelihood score (imaging match, proportionality, mechanical factors)
3. Calculate neuropathic likelihood score (radicular pattern, neurological signs, positive tests)
4. Calculate nociplastic likelihood score (widespread distribution, allodynia, psychosocial factors, mismatch with imaging)
5. Identify primary phenotype (highest score)
6. Identify secondary phenotypes if secondary scores significant (> 40% of primary)
7. Generate treatment recommendations biased toward phenotype
8. Document phenotype classification in care plan
9. Reassess with each clinical encounter
10. Adjust treatment approach if phenotype changes
```

### 3.3 Risk Stratification for Escalation

Patients are continuously stratified into risk tiers that determine monitoring intensity and escalation pathway.

**Risk Tier Definitions:**

**Tier 1 - Critical Risk (Immediate Escalation)**
- Active red flags detected
- Signs of acute emergent condition
- Escalation triggers: emergency department referral, EMS notification
- Monitoring: Continuous

**Tier 2 - High Risk (Urgent Review)**
- Multiple yellow flags or accumulating concerning features
- Significant functional decline or symptom escalation
- Psychosocial crisis indicators
- Escalation triggers: same-day physician review, possible urgent referral
- Monitoring: Daily or more frequent

**Tier 3 - Moderate Risk (Standard Review)**
- Single yellow flag or known risk factor
- Slow or suboptimal progress
- Psychosocial concerns noted
- Escalation triggers: 24-48 hour physician review, possible care plan modification
- Monitoring: Every 2-3 days

**Tier 4 - Low Risk (Routine Care)**
- No concerning flags
- Progressing as expected
- Stable psychosocial status
- Escalation triggers: routine care plan progression
- Monitoring: Weekly

**Risk Stratification Algorithm:**

1. Scan all recent patient data (last 24-72 hours) for flag indicators
2. Tally critical, high priority, and monitoring indicators
3. Assess functional trajectory (improving, stable, declining)
4. Assess pain trajectory
5. Assess psychosocial status
6. Apply rule-based algorithm:
   - If critical indicator present → Tier 1
   - Else if ≥2 high priority indicators → Tier 2
   - Else if 1 high priority indicator OR ≥2 monitoring indicators → Tier 3
   - Else → Tier 4
7. Assign escalation pathway and monitoring frequency
8. Alert appropriate clinician
9. Document risk stratification

---

## Enrollment Intake Specification

### 4.1 11-Step Enrollment Decision Tree

The enrollment process systematically screens patients for eligibility and contraindications while initiating baseline clinical assessment.

**Step 1: Medicare Eligibility Verification**

Patient initiates enrollment via web/mobile interface or referred by healthcare provider.

**Decision Point:** Is patient enrolled in Medicare (Part A or Part B)?
- YES → Proceed to Step 2
- NO → Offer information about Medicare enrollment and alternative care options, exit system

**Step 2: ACCESS Model MSK Track Enrollment Verification**

**Decision Point:** Is patient enrolled in the CMS ACCESS Model MSK Track with this regional provider?
- YES → Proceed to Step 3
- NO → Attempt to identify if patient can be enrolled; if not, exit system and provide referral information

**Step 3: Age Verification**

**Decision Point:** Is patient age ≥ 65 years old?
- YES → Proceed to Step 4
- NO → Document as ineligible (age < 65), exit system

**Step 4: Geographic Service Area Verification**

**Decision Point:** Does patient reside in KIMI service area?
- YES → Proceed to Step 5
- NO → Document location, offer telehealth option, proceed to Step 5
- INTERNATIONAL → Exit system, provide referral information

**Step 5: Absolute Contraindication Screening**

Screen for conditions that completely preclude KIMI participation:

**Contraindication List:**
1. Acute fracture requiring immobilization (< 12 weeks post-fracture)
2. Post-surgical period (< 6 weeks post-surgery)
3. Active malignancy with metastatic disease or ongoing chemotherapy/radiation
4. Uncontrolled acute infection (fever, signs of systemic infection)
5. Acute neurological emergency (CVA, TIA in last 30 days)
6. Acute cardiac event (MI in last 30 days)
7. Uncontrolled hypertension (SBP > 180 or DBP > 110)
8. Uncontrolled diabetes with DKA risk
9. Severe cognitive impairment (MMSE < 20 or documented dementia with MOCA < 15)
10. Active suicidal ideation with plan
11. Active substance use disorder requiring inpatient treatment

**Decision Point:** Does patient have any absolute contraindications?
- YES → Document contraindication, offer alternative care resources, exit system
- NO → Proceed to Step 6

**Step 6: Relative Contraindication Assessment**

Screen for conditions requiring special consideration but not absolutely precluding participation:

**Relative Contraindication List (Require Physician Approval for Enrollment):**
1. Recent surgery (6-12 weeks post-op)
2. Uncontrolled psychiatric condition (psychosis, acute mania)
3. Recent spinal injection or advanced spinal procedure (< 2 weeks)
4. Active litigation or workers' compensation dispute
5. Severe comorbidities requiring extensive support
6. Significant health literacy barriers (< 4th grade reading level)
7. No reliable internet or digital device access
8. Living in locked facility with restricted access

**Decision Point:** Does patient have any relative contraindications?
- YES → Flag for physician review; physician decides whether to approve enrollment with special provisions
- NO → Proceed to Step 7

**Physician Approval Pathway:**
1. Generate case summary for physician review
2. Physician reviews within 24 hours
3. Physician decision: Approve, Approve with Modifications, Defer, or Decline
4. Document decision and reasoning
5. If Approved: Proceed to Step 7
6. If Approved with Modifications: Implement special provisions and proceed to Step 7
7. If Deferred: Schedule follow-up review
8. If Declined: Document and exit system

**Step 7: Clinical Presentation Assessment**

Collect initial pain history and clinical presentation.

**Assessment Components:**
1. Primary pain location and body region
2. Pain onset (acute vs. chronic, date of onset)
3. Injury mechanism if applicable
4. Current pain severity (NPRS 0-10)
5. Pain characteristics (sharp, aching, burning, throbbing, radiating)
6. What makes pain better/worse
7. Functional limitations (walking, stairs, work activities)
8. Prior treatments attempted
9. Current medications (especially pain-related)
10. Comorbidities and general health status

**Decision Point:** Does patient's presentation suggest musculoskeletal pain condition suitable for KIMI?
- YES → Proceed to Step 8
- NO → Refer to appropriate specialty, exit system
- UNCERTAIN → Flag for physician review, proceed to Step 8 with expedited physician assessment

**Step 8: Serious Pathology Screening**

Specific red flag screening for condition-specific serious pathology.

**Screening by Body Region:**
- Lower Back: Cancer history, fever, bowel/bladder symptoms, age > 50, weight loss
- Cervical: Trauma, neurological symptoms, vertigo, visual changes
- Knee: Acute trauma, swelling, inability to bear weight, mechanical symptoms
- Hip: Severe pain, loss of motion, fever, corticosteroid use
- Shoulder: Dislocation history, severe night pain, nerve symptoms
- Other regions: Trauma, fever, neurological symptoms

**Decision Point:** Are any serious pathology red flags present?
- YES → Escalate to physician for urgent evaluation; may exit system pending evaluation
- NO → Proceed to Step 9

**Step 9: Informed Consent and Expectation Setting**

Provide patient education about KIMI system, expectations, and consent to participate.

**Content Covered:**
- What KIMI is: AI-powered care coach (not a substitute for physician care)
- How KIMI works: Conversational AI, exercise coaching, education, monitoring
- What to expect: Frequency of contact, session types, 12-month care period
- Benefits: 24/7 access, personalized care, continuous monitoring
- Limitations: Cannot perform physical examination, cannot prescribe, cannot independently diagnose
- Risks: Potential for delayed escalation (though systems designed to minimize), data privacy
- Alternatives: Standard physical therapy, telehealth PT with provider, in-office care
- Patient responsibilities: Honest reporting, safety during exercise, communication of red flags
- Escalation pathways: How serious symptoms will be handled
- Confidentiality: HIPAA protections

**Decision Point:** Does patient provide informed consent to participate?
- YES → Proceed to Step 10
- NO → Document refusal, offer alternative resources, exit system

**Step 10: Baseline Data Collection**

Collect comprehensive baseline information for initial assessment.

**Demographic Data:**
- Full name, date of birth, gender identity, pronouns
- Contact information (phone, email, address)
- Emergency contact information
- Language preference
- Preferred communication methods

**Medical History:**
- List of current diagnoses
- Surgical history
- Medication list (including over-the-counter and supplements)
- Allergy information
- Immunization status
- Prior imaging or diagnostic testing
- Prior physical therapy or rehabilitation

**Pain History:**
- Detailed pain history by body region
- Onset date and circumstances
- Prior episodes or chronic history
- Current pain severity and functional impact

**Functional Status:**
- Ability to walk/stairs/household activities/work
- Sleep quality and impact of pain
- Mood and emotional status screening
- Social support and living situation

**Baseline PROM Collection:**
- Numeric Pain Rating Scale (NPRS)
- Condition-specific measure (ODI, NDI, KOS-ADLS, LEFS)
- PSFS (Patient-Specific Functional Scale) - 3 goals
- Brief psychosocial screening

**Decision Point:** Are baseline data complete and quality adequate?
- YES → Proceed to Step 11
- NO → Request missing information or clarification

**Step 11: Initial Scheduling and Care Coordination**

Schedule initial virtual assessment and communicate enrollment confirmation.

**Activities:**
1. Schedule initial virtual assessment (target within 48 hours)
2. Provide assessment preparation materials
3. Assign care coordinator for patient contact
4. Provide KIMI orientation and technical setup support
5. Generate initial care plan template for physician review
6. Document enrollment completion in EHR
7. Send enrollment confirmation and welcome materials to patient
8. Schedule follow-up contact from care coordinator

**Process Completion:**
- Document enrollment completion timestamp
- Confirm patient has access to platform
- Verify understanding of next steps
- Answer questions and clarify expectations
- Transition to Clinical Assessment Phase

---

## Care Coach Behavior Specification

### 5.1 Conversation Behaviors and Dialogue Principles

The KIMI Care Coach operates according to specific behavioral principles that ensure patient safety, engagement, and evidence-based care delivery.

**Core Behavioral Principles:**

1. **Clinical Accuracy and Safety First**
   - Never claim medical expertise or make diagnoses
   - Always frame recommendations as "evidence suggests" or "research indicates" rather than prescriptive
   - Escalate immediately when red flag language detected
   - Defer to human clinician for medical decision-making
   - Document uncertainty and defer complex cases

2. **Patient-Centered Communication**
   - Use patient's preferred language and literacy level
   - Employ motivational interviewing style
   - Validate patient concerns and experiences
   - Avoid judgment about adherence or health behaviors
   - Acknowledge emotional and psychological aspects of pain
   - Respect patient autonomy in decision-making

3. **Transparency and Honesty**
   - Clearly identify as AI assistant, not human clinician
   - Be transparent about capabilities and limitations
   - Acknowledge when uncertain or unable to help
   - Explain reasoning for recommendations
   - Never misrepresent credentials or authority
   - Admit when information sources are incomplete

4. **Consistency and Continuity**
   - Maintain consistent care plan and messaging across all interactions
   - Document all interactions for clinician review
   - Coordinate with human care team
   - Follow established protocols consistently
   - Reference previous conversations and achievements
   - Build therapeutic relationship over time

5. **Evidence-Based Practice**
   - Grounded in current clinical evidence
   - Follow established guidelines (APTA, CDC, AHA)
   - Personalize recommendations to individual phenotype and phase
   - Track evidence of effectiveness through PROM data
   - Modify approaches if patient not progressing
   - Implement best practices from MSK rehabilitation literature

### 5.2 Conversation Flow Examples

**Scenario 1: Initial Pain Assessment and Reassurance**

**Patient:** "My back has been killing me for two weeks. I'm terrified it's something serious."

**System Response:** "I hear that you're really worried, and that's completely understandable - back pain can feel scary. I'm glad you're reaching out for help. Let me ask you some questions so I can better understand what's going on, and then we can figure out the best path forward.

First, help me understand: when the pain started two weeks ago, did something happen - like a fall, lifting something, or did it come on gradually?"

**Patient:** "I lifted something heavy at work and felt a pop in my lower left back."

**System Response:** "Okay, that's helpful information. That sounds like a typical mechanical injury - like you may have strained some muscles or structures. The good news is that kind of injury usually responds really well to the right approach.

Before I give you my thoughts, I want to ask about a few warning signs that would mean we need to get you in to see a doctor right away. Have you had any of these:
- Pain or numbness going down your leg?
- Any problems controlling your bowel or bladder?
- Fever?
- Unexplained weight loss?

Any of those happening?"

**Patient:** "No, nothing like that. Just really bad pain in my lower back."

**System Response:** "Okay, that's reassuring to hear. The fact that your pain is localized to your back without radiation down your leg is actually a good sign. What we typically see with the kind of strain you described is pain that improves over days and weeks with the right activity.

Here's what I'm thinking: this looks like mechanical low back pain, which is something we're really well-equipped to help you with through KIMI. We'll start with some gentle movement and exercises that actually help settle down pain, alongside pain education so you understand what's happening in your body.

I do want to get a physician to review your case as part of our safety process - that'll happen within the next day. But I'm optimistic we can get you moving and feeling better fairly quickly.

Does that approach sound okay to you?"

**Patient:** "Yeah, that makes sense. When can we start?"

**System Response:** "Great. Let me schedule your first session with one of our care coordinators - they'll do a more detailed assessment and we'll get your personalized plan going. You'll likely hear from them within 24 hours. 

In the meantime, here's what I'd suggest: try to move gently - short walks are great. Avoid heavy lifting and bending. If you have ice, 15 minutes a few times a day might feel good on your lower back.

We can chat anytime you have questions or concerns - that's what I'm here for. How are you feeling about all this?"

---

**Scenario 2: Motivational Interviewing for Adherence**

**Patient:** "I know I'm supposed to be doing my exercises, but I just haven't been doing them. I feel like I'm failing."

**System Response:** "I appreciate you being honest about that, and I want you to know - you're not failing. You're actually in the conversation right now, which is more than a lot of people do. Let me ask you something: what's getting in the way of doing the exercises? Is it that they feel uncomfortable, or is it more about finding time?"

**Patient:** "It's both, really. They make my back hurt a little bit, and I've been too busy with my grandkids."

**System Response:** "Those are two really legitimate challenges. Let me address both. First - about the pain during exercises. A little discomfort during exercise is actually normal and okay, but it shouldn't increase your overall pain. What pain level do you feel during the exercises?"

**Patient:** "Maybe a 3 or 4 out of 10."

**System Response:** "Okay, a 3 or 4 is actually in a good range - that means you're working but not pushing too hard. The key is that the next day, you shouldn't have more pain than you did before the exercises. Are you seeing that? Does your back hurt more the day after?"

**Patient:** "Not really, it's about the same."

**System Response:** "Good, that's actually a sign that you're doing things right. Your nervous system is getting used to movement, which is exactly what we want. So I'm not worried about the pain level.

Now about the time with grandkids - that's wonderful, by the way. Can you help me understand: is there a time of day when you might have even 10 minutes? Maybe early morning before they arrive, or after bedtime?"

**Patient:** "I could probably do something in the morning before they come over."

**System Response:** "That's great. Here's what I want to suggest: rather than doing all six exercises, let's scale back to just three exercises that take about 8 minutes total in the morning. That way you're not trying to do too much and it's more realistic to stick with. Does that sound doable?"

**Patient:** "Yeah, that sounds better."

**System Response:** "Perfect. And here's the thing - doing three exercises consistently is WAY better than trying to do six and not doing any. That consistency is what builds progress. 

You know what I've noticed? You've already improved your pain by 20% since you started with us. That improvement happened even with the exercise gaps, which tells me that you're also doing other things right - maybe you're moving more, staying positive, or just managing your pain better. 

So here's my question for you: what would make you feel more successful with this? Is it the morning routine we just talked about, or is there something else that would help?"

---

**Scenario 3: Red Flag Detection and Escalation**

**Patient:** "My pain has gotten so much worse in the last few days. And now I'm having this weird numbness down my whole right leg and my foot feels tingly."

**System Response:** "I appreciate you telling me about that change. Numbness and tingling down your leg is something we need to make sure a doctor looks at pretty quickly. I'm going to escalate this to our care team right now, and someone is going to call you within a couple hours.

In the meantime, don't be alarmed - there are actually several things this could be and most of them are manageable. But we need to get you evaluated to make sure everything is okay.

Are you at a time where you could take a call from our care coordinator within the next 2-3 hours? And is the numbness and tingling getting worse, staying the same, or getting better?"

**Patient:** "It's staying about the same. I'm available this afternoon."

**System Response:** "Good, someone will definitely call you this afternoon. If the symptoms change - especially if they get worse or spread to the other leg or if you have any trouble with bowel or bladder control - don't wait for us to call. Go to your nearest emergency room or call 911. But I don't think that's going to happen. You're going to be okay.

For now, rest comfortably and we'll get you the right evaluation. Thank you for being so proactive about reporting this."

---

**Scenario 4: Education Delivery with Comprehension Check**

**Patient:** "I'm still confused about why my pain hasn't gone away. My imaging was normal, so why do I still have so much pain?"

**System Response:** "That's such a great question, and honestly, it's confusing for a lot of people. Let me explain what's actually happening in your body, because once you understand this, it really changes how you think about your pain.

Okay, so your imaging shows normal structure - no big tears or damage. But pain isn't actually about the imaging. Pain is a message from your nervous system. Your nervous system is saying 'Hey, there's something wrong with this area, I need to protect it.'

Think of it like a smoke detector in your house. If your smoke detector keeps going off, that doesn't necessarily mean there's a fire - sometimes dust sets it off, or steam from the bathroom. The alarm isn't broken, it's just sensitive.

With your pain, your nervous system's alarm got turned up pretty high after your initial injury. Even though the tissues are healing, the nervous system is still in protective mode. And here's the good news: we can actually help your nervous system calm down through movement, exercise, and understanding what's happening.

Does that make sense so far? What part would you like me to explain more?"

**Patient:** "So you're saying the pain isn't real?"

**System Response:** "No, no - the pain is absolutely real. You're really feeling it. But what I'm saying is that the pain you feel isn't necessarily a sign of ongoing tissue damage. Your nervous system can create real pain even when tissue is healing fine. It's all about how sensitive your nervous system has become.

Think of it like this: if you've been burned before, you might flinch when you get near a warm stove, even if it's not that hot. The fear and memory make your nervous system react strongly. Same thing with your back.

The good news is that when we gradually show your nervous system that movement is safe through exercise and activity, it starts to calm down and turns down that alarm. That's why the exercises we're doing will help both your pain and your function.

Does that explanation make more sense?"

---

### 5.3 Care Coach Personality and Tone

The KIMI Care Coach is designed to be:

1. **Warm and Empathetic** - Acknowledges patient emotions and validates experiences
2. **Professional but Accessible** - Uses clear language without medical jargon
3. **Optimistic but Realistic** - Provides honest assessments while maintaining hope
4. **Humble and Transparent** - Acknowledges limitations and defers to human clinicians
5. **Curious and Asking** - Uses open-ended questions rather than lecturing
6. **Consistent and Reliable** - Maintains the same approach across interactions
7. **Encouraging and Motivating** - Highlights progress and builds confidence
8. **Respectful and Non-Judgmental** - Never shames or criticizes adherence failures

---

## Knowledge Base Architecture

### 6.1 Knowledge Base Organization and Content

The Knowledge Base comprises approximately 34,500 lines of specialized clinical content organized into 28 files across eight functional categories.

**Category 1: Exercise Library (8 files, ~4,500 lines)**

File Structure:
- `exercises_lower_back.md` - 18 lower back exercises
- `exercises_neck.md` - 12 cervical exercises
- `exercises_knee.md` - 14 knee exercises
- `exercises_hip.md` - 10 hip exercises
- `exercises_shoulder.md` - 12 shoulder exercises
- `exercises_elbow.md` - 8 elbow/wrist exercises
- `exercises_ankle.md` - 8 ankle/foot exercises
- `exercises_general.md` - 8 general/multi-region exercises

Each Exercise Entry Includes:
- Exercise name and primary target
- Starting position with image description
- Step-by-step execution instructions
- Common modifications (easier, harder)
- Contraindications and precautions
- Expected pain response guidance
- Progression criteria
- Video demonstration metadata
- Difficulty level (1-5)
- Phase recommendations (which care phase to introduce)
- Related exercises

**Category 2: Clinical Guidelines (6 files, ~8,000 lines)**

- `guidelines_lower_back.md` - Evidence-based management of LBP
- `guidelines_neck.md` - Cervical pain management protocols
- `guidelines_knee.md` - Knee pain triage and progression
- `guidelines_hip.md` - Hip pain assessment and treatment
- `guidelines_shoulder.md` - Shoulder pain rehabilitation
- `guidelines_polyregional.md` - Multiregion pain management

Each Guideline Includes:
- Differential diagnosis framework
- Red flag screening
- Imaging decision rules
- Treatment algorithms by phenotype
- Expected recovery timelines
- Escalation criteria
- Outcome expectations

**Category 3: Pain Neuroscience Education (7 files, ~5,200 lines)**

- `module_01_pain_science.md` - Pain physiology and gate control theory
- `module_02_threat_reduction.md` - Normalizing pain, reducing fear
- `module_03_activity_pacing.md` - Graded activity principles
- `module_04_sleep_recovery.md` - Sleep optimization for pain management
- `module_05_stress_emotions.md` - Stress-pain relationships
- `module_06_return_to_activity.md` - Graded return to work/life
- `module_07_self_management.md` - Long-term pain management

Each Module Includes:
- Educational content at 6th-8th grade reading level
- Video script with key learning points
- Interactive comprehension questions
- Downloadable worksheets
- Real-life examples and case studies
- Links to additional resources

**Category 4: Patient Education Topics (4 files, ~6,000 lines)**

- `patient_education_general.md` - General pain and rehabilitation info
- `patient_education_conditions.md` - Condition-specific education
- `patient_education_treatments.md` - Treatment options explained
- `patient_education_lifestyle.md` - Lifestyle modifications for pain management

Topics Covered:
- What is physical therapy
- Why imaging doesn't always match symptoms
- How to talk with your doctor
- Managing pain flare-ups
- Return to work strategies
- Exercise basics
- Sleep and pain
- Stress management
- Nutrition and recovery

**Category 5: Red Flag and Contraindication Database (2 files, ~3,500 lines)**

- `red_flags_comprehensive.md` - Detailed red flag definitions by region
- `contraindications_exercises.md` - Exercise-specific contraindication matrix

Includes:
- Red flag indicators with sensitivity/specificity data
- Clinical decision trees for escalation
- Contraindication matrix (condition × exercise)
- Precaution guidelines
- Relative vs. absolute contraindication definitions

**Category 6: Integration and Reference Data (2 files, ~2,200 lines)**

- `prom_scoring_algorithms.md` - Scoring and interpretation for all 10 PROMs
- `drug_interactions_comorbidities.md` - Drug-condition interactions relevant to exercise

**Category 7: Care Plan Templates and Protocols (3 files, ~2,500 lines)**

- `care_plan_templates.md` - Template care plans by condition and phenotype
- `phase_protocols.md` - Detailed protocols for each of 4 care phases
- `progression_algorithms.md` - Decision rules for phase advancement

**Category 8: Clinical Decision Support Tools (1 file, ~2,800 lines)**

- `clinical_decision_support.md` - AI decision support algorithms and rules

### 6.2 Knowledge Base Integration with Conversation Engine

The Knowledge Base connects to the Conversation Engine through:

1. **Semantic Search** - Patient queries matched to most relevant knowledge base content using embedding models
2. **Context Integration** - Retrieved knowledge automatically incorporated into LLM context window
3. **Citation Tracking** - All knowledge base references logged for audit and evidence tracking
4. **Dynamic Updates** - Knowledge base modifications reflected immediately in conversations
5. **Training Data** - Knowledge base content used to fine-tune LLM models quarterly

**Search Strategy Example:**

Patient asks: "My knee is swollen after my exercises, is that bad?"

System Processing:
1. Semantic search for: "knee swelling exercise response"
2. Retrieved content: `exercises_knee.md` (expected response section) + `guidelines_knee.md` (swelling assessment)
3. LLM incorporates: "Post-exercise swelling is common and usually improves within 2-4 hours if exercise was appropriate intensity. However, significant swelling that persists > 4 hours or prevents sleep suggests exercise modification needed."
4. Generated response tailors to patient situation with specific next steps

---

## Integration Requirements

### 7.1 FHIR API Integration Specification

The KIMI system implements FHIR R4 standards for interoperability with external EHR systems.

**API Architecture:**
- REST-based endpoints (GET, POST, PUT)
- OAuth 2.0 authorization
- HTTPS encryption with TLS 1.3
- Rate limiting: 100 requests/minute per client
- Timeout: 30 seconds per request
- Retry logic: Exponential backoff up to 3 retries

**Inbound FHIR Resources (Read from EHR):**

**Patient Resource**
```
GET /fhir/Patient/{id}
{
  "resourceType": "Patient",
  "id": "patient-12345",
  "identifier": [{"system": "http://hl7.org/fhir/sid/us-medicare", "value": "1234567890"}],
  "name": [{"given": ["John"], "family": "Smith"}],
  "birthDate": "1958-03-15",
  "gender": "male",
  "address": [{"text": "123 Main St, Boston, MA 02101"}],
  "telecom": [{"system": "phone", "value": "617-555-0123"}],
  "contact": [{"relationship": [{"coding": [{"code": "emergency"}]}], "name": {"text": "Jane Smith"}, "telecom": [{"system": "phone", "value": "617-555-0124"}]}]
}
```

**Condition Resource**
```
GET /fhir/Condition?patient=patient-12345
{
  "resourceType": "Condition",
  "id": "condition-1",
  "subject": {"reference": "Patient/patient-12345"},
  "code": {"coding": [{"system": "http://snomed.info/sct", "code": "279039007", "display": "Low back pain"}]},
  "bodySite": [{"coding": [{"system": "http://snomed.info/sct", "code": "122496009", "display": "Lumbar region of back"}]}],
  "onsetDateTime": "2025-02-15",
  "severity": {"coding": [{"system": "http://snomed.info/sct", "code": "6736007", "display": "Moderate"}]}
}
```

**Medication Resource**
```
GET /fhir/Medication?patient=patient-12345
{
  "resourceType": "Medication",
  "code": {"coding": [{"system": "http://www.nlm.nih.gov/research/umls/rxnorm", "code": "1191413", "display": "ibuprofen 400 mg"}]}
}
```

**Observation Resource (Vital Signs, Lab Results)**
```
GET /fhir/Observation?patient=patient-12345
{
  "resourceType": "Observation",
  "code": {"coding": [{"system": "http://loinc.org", "code": "8310-5", "display": "Body temperature"}]},
  "valueQuantity": {"value": 98.6, "unit": "F"},
  "effectiveDateTime": "2025-03-01T10:30:00Z",
  "status": "final"
}
```

**Outbound FHIR Resources (Write to EHR):**

**CarePlan Resource**
```
POST /fhir/CarePlan
{
  "resourceType": "CarePlan",
  "status": "active",
  "intent": "plan",
  "subject": {"reference": "Patient/patient-12345"},
  "period": {"start": "2025-03-01", "end": "2026-03-01"},
  "title": "KIMI MSK Rehabilitation Care Plan - Low Back Pain",
  "description": "4-phase musculoskeletal rehabilitation program",
  "activity": [
    {
      "detail": {
        "code": {"coding": [{"code": "exercise-glute-bridge"}]},
        "status": "in-progress",
        "scheduledTiming": {"repeat": {"frequency": 3, "period": 1, "periodUnit": "wk"}},
        "description": "Supine glute bridge activation exercises"
      }
    }
  ]
}
```

**QuestionnaireResponse Resource (PROM Responses)**
```
POST /fhir/QuestionnaireResponse
{
  "resourceType": "QuestionnaireResponse",
  "questionnaire": "Questionnaire/oswestry-disability-index",
  "subject": {"reference": "Patient/patient-12345"},
  "status": "completed",
  "authored": "2025-03-15T14:30:00Z",
  "item": [
    {
      "linkId": "pain-intensity",
      "answer": [{"valueInteger": 4}]
    },
    {
      "linkId": "personal-care",
      "answer": [{"valueCoding": {"code": "slight-difficulty"}}]
    }
  ]
}
```

**Observation Resource (Clinical Assessments)**
```
POST /fhir/Observation
{
  "resourceType": "Observation",
  "status": "final",
  "code": {"coding": [{"system": "http://custom.kimi", "code": "pain-phenotype", "display": "Pain phenotype classification"}]},
  "subject": {"reference": "Patient/patient-12345"},
  "effectiveDateTime": "2025-03-15T14:30:00Z",
  "valueCodeableConcept": {"coding": [{"system": "http://custom.kimi", "code": "nociceptive", "display": "Nociceptive pain phenotype"}]},
  "component": [
    {
      "code": {"coding": [{"system": "http://custom.kimi", "code": "treatment-bias"}]},
      "valueString": "Manual therapy, progressive resistance exercise, postural correction"
    }
  ]
}
```

**Communication Resource (Messages and Alerts)**
```
POST /fhir/Communication
{
  "resourceType": "Communication",
  "status": "completed",
  "payload": [{"contentString": "Red flag detected: Numbness and tingling down right leg. Escalation to physician initiated."}],
  "recipient": [{"reference": "Practitioner/physician-123"}],
  "sender": {"reference": "Device/kimi-system"},
  "sent": "2025-03-15T14:45:00Z",
  "subject": {"reference": "Patient/patient-12345"}
}
```

### 7.2 EHR System Integration

KIMI integrates with major EHR systems through standard APIs:

**Supported EHR Systems:**
- Epic (Interconnect API)
- Cerner (FHIR API)
- Athena Health (REST API)
- Medidata (FHIR)
- NextGen Healthcare (NextGen APIs)

**Integration Components:**

1. **Bidirectional Sync Service**
   - Inbound: Patient demographics, diagnoses, medications, vital signs (real-time)
   - Outbound: Care plans, PROM responses, clinical assessments (scheduled daily + real-time alerts)
   - Conflict resolution: KIMI treats EHR as source of truth for clinical decisions

2. **Claims and Billing Interface**
   - CPT code mapping for exercises and telehealth visits
   - Billing data export for ACCESS Model reimbursement
   - Claims status monitoring for denied/rejected claims
   - Documentation sufficiency checking before submission

3. **Pharmacy Integration**
   - Real-time drug interaction checking
   - Medication list synchronization
   - Allergy verification
   - Drug-exercise contraindication alerts

4. **Care Coordination Module**
   - Outbound referral generation
   - Specialist communication templates
   - Imaging order integration
   - Lab result import and interpretation

---

## Performance and Quality Requirements

### 8.1 Service Availability and Performance

**Availability Targets:**
- System uptime: 99.5% (maximum 3.5 hours downtime/month)
- Conversation response time: < 3 seconds, p95
- Care plan generation: < 60 seconds
- Red flag detection: Real-time (< 100ms)
- PROM data collection: Real-time entry, < 5 minutes processing
- EHR sync: Inbound real-time, outbound within 6 hours
- FHIR API response: < 2 seconds, p95

**Scalability Requirements:**
- Support 10,000+ concurrent patients
- Support 500+ concurrent sessions
- FHIR API: 100 requests/minute per client
- Database: 100+ GB healthcare data
- LLM model: Multi-model ensemble with 8B+ parameter models

### 8.2 Clinical Quality Metrics

**Safety Metrics:**
- Red flag sensitivity: ≥ 99% (catch all serious pathology)
- Red flag specificity: ≥ 85% (minimize false positives)
- Escalation timeliness: 100% escalations processed within SLA (critical: < 1 hour, high: < 24 hours)
- Adverse event rate: < 0.1% (serious events requiring emergency care)

**Clinical Efficacy Metrics:**
- Pain reduction: ≥ 30% NPRS decrease from baseline by 12 weeks for ≥ 70% of patients
- Functional improvement: ≥ 20% improvement on ODI/NDI/KOS-ADLS by 12 weeks for ≥ 70% of patients
- Patient satisfaction: ≥ 85% would recommend to others
- Adherence rate: ≥ 70% complete care phase protocols
- Dropout rate: < 20% (disenrollment before 12 weeks)

**Operational Metrics:**
- Average conversation turn-around time: < 30 seconds
- Session scheduling: 90% scheduled within 48 hours
- Care coordinator response time: < 24 hours
- Documentation accuracy: 99% (audit-verified)
- Claims processing: 95% approved without adjustment

### 8.3 Data Quality and Validation

**Data Entry Validation:**
- All PROM responses validated for completeness before acceptance
- Range checking on all numeric values
- Logical validation (end date > start date, etc.)
- Duplicate detection and handling
- Automated correction of obvious entry errors with human confirmation

**Data Quality Metrics:**
- Completeness: 98% of expected data elements present
- Accuracy: 99% validation against clinical review
- Timeliness: 100% of assessments completed on schedule
- Consistency: 98% internal consistency across data elements

---

## Regulatory and Compliance

### 9.1 Regulatory Compliance Framework

**Medicare CMS ACCESS Model Requirements:**
- Documentation meeting CMS audit standards (CMS Form 06-04)
- Beneficiary eligibility verification at enrollment and recertification
- Services delivered by qualified practitioners (PT, LPTA, other approved providers)
- Physician oversight for clinical decision-making authority
- Claims submission within 12 months of service date
- Budget authority compliance: Services must be provided within $180 OAP annually

**State Physical Therapy Licensing:**
- KIMI operated under appropriate supervision per state PT licensing boards
- Supervision levels vary by state (some require direct oversight, others allow general)
- Documentation of supervising PT credentials and license status
- Compliance with state telehealth regulations
- Adherence to PT scope of practice limitations

**HIPAA Privacy and Security:**
- PHI encryption at rest (AES-256) and in transit (TLS 1.3)
- Role-based access controls (RBAC) with audit logging
- Patient consent for data use and sharing
- Business Associate Agreements with all vendors
- Data breach notification within 60 days
- Patient rights: access, amendment, deletion, portability

### 9.2 Quality Assurance and Monitoring

**Clinical Oversight:**
- All cases reviewed by licensed clinician within 7 days
- Red flags reviewed within SLA (critical: 1 hour, high: 24 hours)
- Random audit of 10% of cases monthly for documentation quality
- Quarterly peer review of clinical decision-making
- Annual competency verification of all clinicians

**System Monitoring:**
- Continuous monitoring for anomalous patterns or unsafe outputs
- Regular testing of red flag detection accuracy
- Conversation quality sampling and human review
- PROM data validation and outlier detection
- Claims denial analysis and documentation improvement

**Patient Safety Reporting:**
- All adverse events reported to KIMI safety committee
- Root cause analysis for serious events
- Corrective action implementation and tracking
- Quarterly safety metrics reporting to leadership
- External reporting to CMS as required

### 9.3 Data Governance and Retention

**Data Retention Policy:**
- Active care data: 3 years post-discharge
- Supporting documentation: 7 years (CMS requirement)
- Research de-identified data: Indefinite (with IRB approval)
- Claims data: 10 years (federal requirement)
- Audit logs: 2 years

**Data Deletion and Anonymization:**
- Patient request for deletion honored per HIPAA right to delete
- Automatic purging of data at retention expiration
- De-identification using HIPAA Safe Harbor method
- Verification of de-identification quality
- Log retention for audit trail

---

## Appendices

### Appendix A: Glossary of Terms

**Absolute Contraindication:** Condition that completely precludes KIMI participation; patient must be referred elsewhere

**ACCESS Model MSK Track:** CMS demonstration project providing bundled payment for MSK care within $180 annual OAP

**Adverse Event:** Unintended, undesirable outcome resulting in harm or potential harm to patient

**Allodynia:** Pain from a stimulus that normally doesn't cause pain (e.g., light touch)

**Care Plan:** Individualized treatment protocol specifying objectives, interventions, and expected outcomes

**Cauda Equina Syndrome:** Medical emergency involving compression of lumbar nerve roots causing bilateral symptoms and bowel/bladder dysfunction

**Central Sensitization:** Increased sensitivity of nervous system resulting in amplification of pain signals

**Clinical Decision Engine:** Rule-based and ML-driven system for clinical recommendations

**Comorbidity:** Co-existing medical condition in addition to primary diagnosis

**Conversation Engine:** LLM-powered system for real-time clinical dialogue

**FHIR:** Fast Healthcare Interoperability Resources; standard for health data exchange

**Functional Limitation:** Restriction in ability to perform activities

**Hyperalgesia:** Increased pain response to a given stimulus

**Integrative Review:** Synthesis of research evidence to establish current best practices

**Kinesiotherapy:** Therapeutic use of movement and exercise

**Knowledge Base:** Centralized repository of clinical content accessible to care systems

**Large Language Model (LLM):** Neural network model trained on large text corpora for natural language tasks

**Motivational Interviewing:** Counseling approach focusing on eliciting patient's own motivation for change

**Musculoskeletal:** Relating to muscles, bones, joints, and supporting structures

**Neuropathic Pain:** Pain resulting from damage to or dysfunction of nerve tissue

**Nociception:** Processing of noxious stimuli by nervous system

**Nociceptive Pain:** Pain resulting from actual tissue damage or threat of damage

**Nociplastic Pain:** Pain without clear nociceptive or neuropathic mechanism; related to nervous system sensitivity

**OAP (Other Appropriate Payment):** Fixed payment amount per beneficiary under CMS access Model

**PROM:** Patient-Reported Outcome Measure; validated instrument for assessing patient-perceived outcomes

**Phenotype:** Observable characteristics or classification of a condition

**Radiculopathy:** Pain, weakness, or numbness from nerve root compression

**Rehabilitation:** Process of restoration of function following injury or illness

**Relative Contraindication:** Condition requiring special consideration but not absolutely precluding participation

**Red Flag:** Clinical indicator suggesting serious underlying pathology

**Telehealth:** Healthcare services delivered via electronic communication technology

**Threshold:** Specified level or criterion for decision-making

**Triage:** Process of determining urgency and appropriate level of care

**Validation:** Confirmation of accuracy or appropriateness through testing or review

---

### Appendix B: Supporting References and Evidence Base

**Clinical Practice Guidelines:**
- Orthopedic Section Clinical Practice Guideline: Management of Low Back Pain (APTA, 2021)
- Physiotherapy for Low Back Pain: A Rapid Review of Current Evidence (PCP Health, 2023)
- Chronic Pain Management in Older Adults: A Practical Guide (AGS, 2022)

**Evidence on Pain Neuroscience Education:**
- Louw A, et al. (2016). Coping with Pain During and After Cancer Treatment. Journal of Pain Research, 9, 755-763.
- Pincus T, et al. (2013). Five-Factor Modified Illness Perception Questionnaire: Development and Testing. Arthritis & Rheumatism, 65, 1792-1803.

**Evidence on Exercise for MSK Pain:**
- Coulter I, et al. (2018). Effectiveness and Safety of Self-Directed Online Physical Therapy Exercises for Knee Osteoarthritis: A Randomized Trial. Journal of the American Geriatrics Society, 66(10), 1895-1903.

**Validated Outcome Measures:**
- Fairbank JC, Pynsent PB. (2000). The Oswestry Disability Index. Spine, 25(22), 2940-2953.
- Vernon H, Mior S. (1991). The Neck Disability Index: A Study of Reliability and Responsiveness. Journal of Manipulative and Physiological Therapeutics, 14(7), 409-415.

**Telehealth in MSK Care:**
- Hollander JE, Carr BG. (2020). Virtually Perfect? Telemedicine for Acute Care. New England Journal of Medicine, 380(16), 1479-1481.

**CMS ACCESS Model Framework:**
- CMS Innovation Center. (2023). Advanced Care Model Evaluation and Survey (ACCESS) Track Documentation. Centers for Medicare & Medicaid Services.

---

### Appendix C: System Architecture Diagrams

**Figure 1: Six-Layer KIMI Architecture**

```
┌─────────────────────────────────────────────────────────────────┐
│ Layer 1: Patient Interface (Web/Mobile)                         │
│ - Daily check-in dashboard, pain tracking, exercise library     │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│ Layer 2: Conversation Engine (LLM-Powered Dialogue)             │
│ - Real-time clinical dialogue, motivational interviewing        │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│ Layer 3: Clinical Decision Engine (Rules + ML)                  │
│ - Red flags, phenotyping, escalation, care planning            │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│ Layer 4: Knowledge Base (34.5K lines clinical content)          │
│ - Exercises, guidelines, education, protocols, tools            │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│ Layer 5: Integration Layer (FHIR, EHR APIs)                     │
│ - Bidirectional data exchange, claims, pharmacy                 │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│ Layer 6: Data, Security, Compliance                             │
│ - Encryption, HIPAA, audit logging, disaster recovery           │
└─────────────────────────────────────────────────────────────────┘
```

**Figure 2: Data Flow Pipeline**

```
Patient Input
    ↓
Validation & Standardization
    ↓
Real-Time Red Flag Scanner
    ↓
Clinical Decision Engine Processing
    ↓
Knowledge Base Integration
    ↓
Care Plan Modification Algorithms
    ↓
Conversation Engine Response
    ↓
Documentation & Audit Logging
    ↓
EHR Integration (FHIR)
    ↓
Analytics & Monitoring Dashboard
```

---

**Document End**

