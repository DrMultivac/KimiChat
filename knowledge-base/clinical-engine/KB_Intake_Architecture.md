# KB_Intake_Architecture.md
## Master Intake Decision Tree and Flow Architecture for KIMI MSK ACCESS Track Agent

**Document Version:** 1.0
**Last Updated:** 2026-04-03
**Target Audience:** KIMI AI Agent Logic Layer, Clinical Implementation Team
**Operational Context:** CMS ACCESS Model Musculoskeletal Track, 12-Month Care Period

---

## 1. Purpose and Scope

### 1.1 Strategic Importance

The enrollment intake interaction represents the **single most critical clinical and operational touchpoint** in the entire 12-month KIMI care period. This intake encounter:

- Establishes the clinical foundation for all downstream care decisions, Phase 1 exercise prescription, and intervention prioritization
- Captures mandatory baseline data elements required for CMS ACCESS Model compliance and 60-day submission deadline
- Screens for safety-critical red flags that determine escalation pathway vs. proceed-with-program pathway
- Builds therapeutic alliance and sets expectations for patient engagement in self-directed care
- Generates de-identified learning data for continuous performance improvement of the KIMI agent

**All intake processes must be completed within a single conversational session** (target 25–35 minutes) while maintaining clinical rigor and evidence-based decision logic.

### 1.2 Six Mandatory Intake Functions

The enrollment intake **must accomplish** all of the following six functions within conversational constraints (no physical examination available):

#### 1.2.1 Anatomical Site Classification
- Map natural language pain descriptions (free-text chief complaint) into one of **8 ACCESS-tracked body regions**: lower back, neck, knee, hip, shoulder, elbow, wrist/hand, ankle/foot
- Identify primary (worst/most limiting) vs. secondary pain site(s)
- Record multi-site pain with separate pathway eligibility determination per site

#### 1.2.2 Pain Phenotype Characterization
- Classify pain into foundational phenotypes: **nociceptive, neuropathic, nociplastic** (central sensitization)
- Elicit pain descriptors (sharp, burning, throbbing, shooting, numbness, tingling, diffuse aching)
- Assess chronicity, onset pattern, functional impact trajectory
- Phenotype determines CBT/pain education emphasis and exercise prescription intensity

#### 1.2.3 Red Flag Screening
- Conduct body-region-specific red flag assessment to identify conditions requiring immediate escalation (fracture, infection, malignancy, cauda equina, unstable angina, active stroke)
- Red flag protocol defined in **KB_Intake_Condition_Protocols.md**
- Red flag positive result → escalation; proceed-with-program result → continue enrollment

#### 1.2.4 ACCESS-Mandated PROM Baseline Collection
- Administer Patient-Reported Outcome Measures according to CMS ACCESS Model regulatory requirements
- PROM mapping by body region defined in **KB_Intake_PROM_Survey_Mapping.md**
- **Critical compliance rule:** Same PROM throughout the 12-month period; baseline must be collected at enrollment to establish improvement denominator
- 60-day submission deadline to CMS (enrollment date + 60 calendar days)

#### 1.2.5 Psychosocial Risk Stratification
- Administer validated risk screening instruments (STarT Back for lower back pain; Keele STarT MSK for other regions)
- Screen for depression (PHQ-2) and anxiety (GAD-2) symptoms
- Assess psychosocial barriers to treatment engagement (fear-avoidance, catastrophizing, low self-efficacy)
- Risk stratification determines whether Phase 1 includes psychosocial-focused CBT component vs. exercise-primary pathway

#### 1.2.6 Initial Care Plan Construction
- Synthesize intake findings into patient-centered, goal-driven care plan
- Define Phase 1 exercise prescription (frequency, intensity, modality) based on pain phenotype and risk stratification
- Establish timeline for Phase 2 progression criteria and Phase 3 prevention/maintenance planning
- Generate patient-readable summary of findings, diagnosis, and next steps
- Defined in **KB_Intake_Care_Plan_Construction.md**

### 1.3 Operational Constraints

- **Conversational AI limitations:** No hands-on examination; reliance on patient self-report, standardized instruments, and decision tree logic
- **Session duration:** 25–35 minutes optimal; maximum 45 minutes (risk of patient fatigue)
- **Health literacy:** Design for 6th–8th grade reading level; use plain language, teach-back confirmation
- **FHIR compliance:** All data elements must map to standard FHIR resources for downstream EHR integration

---

## 2. Intake Decision Tree — Master Flow

### 2.1 Overview — 11-Step Enrollment Intake Protocol

This section defines the **sequential decision tree** that KIMI executes during intake. Each step includes:
- **Trigger criteria** (when the step is executed)
- **Core clinical questions** (what the agent asks the patient)
- **Data elements to capture** (structured output)
- **Validation rules** (acceptance criteria before moving to next step)
- **Branching logic** (conditional routing based on patient response)

---

### 2.2 Step 1: Welcome & Identity Verification

**Purpose:** Establish rapport, confirm Medicare eligibility, collect required demographics.

**Trigger:** Intake session initiated.

**Agent Dialogue Pattern:**
```
"Hello, and welcome to KIMI, your personal AI care coach for musculoskeletal health.
I'm here to help you manage pain and improve function over the next 12 months.
Before we get started, I'd like to confirm some information about you and make sure
you're eligible for this program. This should take just a few minutes. Is now a good time?"
```

**Core Data Collection:**
1. **Full legal name** (FHIR: Patient.name)
2. **Date of birth** (FHIR: Patient.birthDate) — confirm age ≥65 years
3. **Medicare ID / beneficiary number** (FHIR: Patient.identifier, system=CMS-MBI)
4. **Contact phone number** (FHIR: Patient.telecom, system=phone)
5. **Email address** (FHIR: Patient.telecom, system=email)
6. **Mailing address** (FHIR: Patient.address)
7. **Primary care physician name and facility** (FHIR: Practitioner, reference to PCP)
8. **Emergency contact name and phone** (FHIR: Patient.contact)
9. **Confirmation: Medicare Part B coverage active** (regulatory requirement)

**Validation Rules:**
- Age ≥65 years (Medicare eligibility requirement)
- Valid Medicare MBI or legacy HICN provided
- Contact information accessible and verified by patient confirmation
- If patient unable to provide full demographics → escalate to enrollment coordinator; pause intake

**Proceed Criteria:** All 9 data elements confirmed and validated.

**Branching Logic:**
- If patient age <65: Ineligible; offer referral to non-Medicare pathway (if available)
- If Medicare not confirmed: Contact PCP office for eligibility verification; pause intake pending confirmation
- If patient declines to proceed: Offer scheduling for later; close session

---

### 2.3 Step 2: Chief Complaint Elicitation & Anatomical Site Classification

**Purpose:** Natural language mapping from free-text pain description to 8 ACCESS body regions; identify primary site.

**Trigger:** Identity verification complete (Step 1 passed).

**Agent Dialogue Pattern:**
```
"Now, let's talk about what brought you here today. Can you describe where you're
experiencing pain or discomfort? Take your time — you can describe it in your own words,
and tell me about any areas that are bothering you."
```

**Core Data Collection:**
1. **Chief complaint (free-text narrative)** (FHIR: Condition.recordedDate, Condition.note)
2. **Primary pain site (anatomical classification)**
3. **Secondary pain sites (if present)**
4. **Onset date or relative timeline** (FHIR: Condition.onset[x])

**Anatomical Site Classification Logic:**

The agent uses **natural language understanding + lookup rules** to map patient utterance to one of 8 body regions:

| **Body Region** | **Anatomy Included** | **Example Utterances** | **Classification Code** |
|---|---|---|---|
| **Lower Back / Lumbar Spine** | Low back, lumbar region, sacroiliac joint, lumbosacral region | "My lower back hurts", "Pain in my lumbar area", "Sciatica" | MSK-SITE-001 |
| **Neck / Cervical Spine** | Neck, cervical region, shoulder-neck junction | "Stiffness in my neck", "Cervical pain", "Neck and shoulder" | MSK-SITE-002 |
| **Knee** | Knee joint, patella, patellar tendon | "My knee is sore", "Knee pain when walking", "Kneecap pain" | MSK-SITE-003 |
| **Hip** | Hip joint, groin, gluteal region, lateral hip | "Hip pain", "Groin pain", "Hip and gluteal pain", "Bursitis" | MSK-SITE-004 |
| **Shoulder** | Shoulder joint, rotator cuff, scapula region | "Shoulder pain", "Rotator cuff", "Shoulder blade pain" | MSK-SITE-005 |
| **Elbow** | Elbow joint, epicondyle, tennis elbow, golfer's elbow | "Elbow pain", "Tennis elbow", "Inner elbow pain" | MSK-SITE-006 |
| **Wrist / Hand** | Wrist joint, carpal region, fingers, hand | "Wrist pain", "Carpal tunnel", "Hand arthritis" | MSK-SITE-007 |
| **Ankle / Foot** | Ankle, foot, toes, plantar region | "Ankle pain", "Foot pain", "Heel pain", "Plantar fasciitis" | MSK-SITE-008 |

**Multi-Site Pain Handling:**
- If patient reports >1 pain site: agent asks clarifying question: *"Which of these bothers you most, or limits your activities the most?"*
- **Primary site** = worst/most functionally limiting pain location → pathway eligibility determination
- **Secondary sites** = recorded but pathway eligibility determined by primary site only
- ACCESS Model allows separate reporting and tracking by site; secondary site can be re-initiated as primary site at any future encounter

**Example Conversation:**

*Patient:* "I have lower back pain and my knee hurts when I climb stairs."

*Agent:* "Thank you for telling me that. It sounds like you have pain in two places — your lower back and your knee. If you had to choose, which one bothers you most or makes it harder to do the things you want to do?"

*Patient:* "The lower back is the worst. The knee pain started a few months ago and is secondary."

*Agent (internal logic):*
- Primary site: Lower Back (MSK-SITE-001)
- Secondary site: Knee (MSK-SITE-003)
- Pathway eligibility determined by lower back protocol
- Knee pain documented for future reference

**Data Validation:**
- Anatomical site must map to one of 8 recognized regions
- If patient describes atypical anatomy (e.g., "middle of my back but not lower"), agent clarifies: *"When you say middle back, do you mean between your shoulder blades, or lower down toward your tailbone?"*
- Onset timeline (acute vs. chronic) recorded

**Proceed Criteria:** Primary anatomical site confirmed and classified; onset date established.

**Branching Logic:**
- If pain location unclear or atypical: Re-ask with anatomical reference points (e.g., "Is it above or below your knee?")
- If patient reports >3 pain sites: Flag as **complex polyarticular presentation** → may require care coordination; continue intake but note for care plan
- If pain onset is acute (≤2 weeks) with high severity: Prepare red flag screening questions (Step 5) with heightened vigilance

---

### 2.4 Step 3: Pain Characterization — Onset, Duration, Severity, Quality, Functional Impact

**Purpose:** Gather detailed pain phenotype descriptors and timeline; assess functional impairment.

**Trigger:** Anatomical site classified (Step 2 passed).

**Agent Dialogue Pattern:**
```
"Now I'd like to understand your pain better. When did this pain start? Was it sudden
or gradual? And on a scale of 0 to 10, where 0 is no pain at all and 10 is the worst
pain you could imagine, how would you rate your pain right now?"
```

**Core Data Collection:**
1. **Onset date / timeframe** (acute <2 weeks, subacute 2–12 weeks, chronic >12 weeks) (FHIR: Condition.onsetDateTime)
2. **Onset mechanism** (sudden/traumatic vs. insidious/gradual) (FHIR: Condition.note)
3. **Current pain intensity (0–10 NRS)** (FHIR: Observation.valueQuantity, LOINC 38208-5)
4. **Pain quality descriptors** (sharp, dull, throbbing, burning, shooting, numbness, tingling, aching, stiffness)
5. **Worst pain intensity (0–10)** (typical day)
6. **Best pain intensity (0–10)** (typical day)
7. **Pain pattern** (constant vs. episodic vs. activity-triggered)
8. **Functional limitations** (walking distance, stairs, lifting, self-care, sleep)

**Pain Quality Descriptor Elicitation:**

Agent uses teach-back method with example list:
```
"I'm going to give you some words people use to describe their pain.
Tell me which ones sound like your pain: sharp, dull, burning, throbbing,
shooting, numbness, tingling, aching, stiff, or something else?"
```

Map descriptor to **pain phenotype clues** (see Step 4 below).

**Functional Impact Assessment:**

Agent asks structured questions:
- *"How far can you walk comfortably before your pain gets worse?"* (distance or time)
- *"Are stairs difficult? Can you climb them?"*
- *"Can you lift or carry things? Any weight limits?"*
- *"Is your sleep affected by pain?"*
- *"Are there activities you've stopped doing because of the pain?"*

Record as **FHIR: Condition.category** and **limitation types**.

**Data Validation:**
- NRS severity must be 0–10 numeric
- Descriptors captured verbatim + mapped to phenotype logic
- Onset must be before enrollment (no future-dated conditions)
- Functional limitations must be specific and verifiable

**Proceed Criteria:** Current NRS, onset date, pain quality, and ≥2 functional limitations documented.

**Branching Logic:**
- If pain NRS 0–2: Agent confirms patient is seeking preventive care; proceed but flag as **low-acuity** (may affect Phase 1 intensity recommendations)
- If pain NRS 8–10: Heighten red flag screening vigilance; may need to accelerate to red flag assessment
- If functional impact severe (unable to walk >5 min, unable to climb 1 flight stairs, sleep disrupted nightly): Flag as **high-impact** in care plan

---

### 2.5 Step 4: Pain Phenotype Classification — Nociceptive vs. Neuropathic vs. Nociplastic

**Purpose:** Classify pain mechanism to inform treatment prioritization and CBT/exercise emphasis.

**Trigger:** Pain characterization complete (Step 3 passed).

**Clinical Background:**
Pain phenotypes determine downstream treatment allocation:
- **Nociceptive pain** (mechanical/tissue damage): Exercise + manual therapy focus; good prognosis
- **Neuropathic pain** (nerve irritation/damage): Neurodynamics + CBT for adaptation; longer timeline
- **Nociplastic pain** (central sensitization): Graded exposure + pacing + psychoeducation; requires self-efficacy building

**Agent Screening Logic:**

Agent uses **decision rule-based classification** informed by pain quality (Step 3) and presence of neuropathic/central sensitization features:

**Nociceptive Pain Indicators:**
- Pain quality: sharp, dull, aching, mechanical descriptors
- Onset: clear traumatic event or repetitive activity
- Pattern: worse with specific movements/activities; better with rest or anti-inflammatory treatment
- Exam surrogate: patient reports swelling, visible deformity, or localized tenderness

**Neuropathic Pain Indicators (use 3-item screening):**
- Pain quality includes: burning, shooting, electric, numb, tingling, "pins and needles"
- History of nerve irritation (sciatica, radiculopathy, carpal tunnel, herpes zoster)
- Pain radiates in dermatomal/anatomical nerve distribution (not just local)

**Nociplastic Pain Indicators (central sensitization):**
- Pain quality: diffuse, burning, aching across multiple body regions
- Allodynia (pain from light touch) or hyperalgesia (exaggerated pain response)
- Associated symptoms: fatigue, sleep disruption, mood changes, concentration difficulty
- Pain disproportionate to imaging findings or clinical exam

**Agent Dialogue Pattern:**

```
"Based on what you've described, I want to understand what's driving your pain.
Some of these questions may seem similar, but they help me tailor your care plan.

Does your pain feel like it's coming from the joint or tissue (like arthritis or a strain),
or does it feel more like a nerve issue (like burning or shooting sensations)?
Or does the pain feel more widespread and hard to pinpoint?"
```

Follow up with targeted questions per phenotype suspicion.

**Phenotype Classification Algorithm:**

| **Phenotype** | **Classification Criteria** | **Decision Logic** |
|---|---|---|
| **Nociceptive (Mechanical)** | Sharp/dull/aching quality + clear movement trigger + localized tenderness surrogate | PRIMARY if: pain quality nociceptive AND pain mechanical/activity-linked AND no neuropathic descriptors |
| **Neuropathic (Nerve) Mixed** | Burning/shooting/electric quality + radiating distribution + possible nerve irritation history | PRIMARY if: ≥2 neuropathic descriptors AND dermatomal pattern; OR clear nerve entrapment history (e.g., confirmed carpal tunnel) |
| **Nociplastic (Central Sensitization)** | Diffuse/burning + widespread + allodynia/hyperalgesia + mood/sleep/fatigue co-morbidity | PRIMARY if: widespread pain + >2 body regions + cognitive/mood/sleep symptoms + pain ≫ imaging severity |
| **Mixed Phenotype** | Combination of nociceptive + neuropathic ± nociplastic features | If patient exhibits features of >1 phenotype: record PRIMARY phenotype (worst/most limiting) + secondary phenotype(s) |

**Data Capture:**
- **FHIR: Observation.code** = SNOMED code for pain phenotype (nociceptive, neuropathic, etc.)
- **FHIR: Observation.value** = phenotype classification + confidence (high/moderate/low)
- **Confidence rationale** = clinical reasoning logged for chart review

**Data Validation:**
- At least 2 supporting features for phenotype classification
- If classification uncertain: mark confidence as "moderate" and note need for clinical confirmation during Phase 1

**Proceed Criteria:** Pain phenotype classified (primary ± secondary); confidence level documented.

**Branching Logic:**
- If **neuropathic features present** → ensure Phase 1 includes neurodynamic exercises + pain neuroscience education (prioritize over other modalities)
- If **nociplastic features suspected** → Phase 1 emphasis on CBT, pacing, self-efficacy; de-emphasize aggressive exercise
- If **mixed phenotype** → Phase 1 combines nociceptive exercise + neuropathic education + graded psychosocial support

---

### 2.6 Step 5: Red Flag Screening — Body Region-Specific Safety Assessment

**Purpose:** Identify medical emergencies or serious pathology requiring immediate escalation or specialist referral.

**Trigger:** Pain phenotype classified (Step 4 passed); **or** pain acuity very high (NRS 8–10) warrants earlier red flag screening.

**Critical Clinical Rule:**
**RED FLAG POSITIVE = ESCALATION.** Patient is ineligible for KIMI 12-month program track; requires specialist evaluation before consideration of ACCESS enrollment on future date.

**Red Flag Screening Protocol:**

Red flag questions are **body-region-specific**. Full protocol defined in **KB_Intake_Condition_Protocols.md**. Agent asks screening questions based on primary anatomical site (Step 2).

**Universal (All Sites) Red Flags:**
1. **Acute trauma with neurological symptoms** (numbness, weakness, bowel/bladder changes)
2. **Progressive neurological deficit** (worsening weakness, sensory loss over days/weeks)
3. **Signs of systemic infection** (fever + localized pain + erythema + warmth)
4. **Cancer history + new focal pain** (especially if pain not explained by mechanical cause)
5. **Unexplained weight loss** (>10 lbs in 3 months) + pain
6. **Use of corticosteroids long-term** + acute pain onset (risk of pathological fracture)

**Region-Specific Red Flags (Examples):**

**Lower Back Red Flags:**
- Cauda equina syndrome (saddle anesthesia, bilateral leg pain, bowel/bladder dysfunction, bilateral neurological signs)
- Spinal fracture (age >70, corticosteroid use, trauma, severe kyphosis)
- Spinal infection (fever, IV drug use, immunosuppression, recent procedure)
- Malignancy (cancer history, unexplained weight loss, night pain, age >50)

**Neck Red Flags:**
- Myelopathy (progressive upper extremity weakness, hyperreflexia, balance loss, bladder dysfunction)
- Vertebral artery dissection (severe headache + neck pain after manipulation or trauma)
- Cervical spine fracture (trauma, age >50, corticosteroid use)
- Meningitis (fever + neck stiffness + photophobia)

**Shoulder Red Flags:**
- Rotator cuff tear with neurological symptoms
- Acromioclavicular joint dislocation with neurovascular compromise
- Brachial plexus injury

**Knee Red Flags:**
- Acute ligamentous injury with instability (ACL/PCL tear)
- Acute meniscal tear with mechanical locking
- Septic joint (fever, effusion, inability to bear weight)

**Hip Red Flags:**
- Femoral fracture (trauma, age, corticosteroid use)
- Avascular necrosis (sickle cell, HIV, steroid use history)
- Septic hip (fever, unable to bear weight, hip flexion preferred)

**Ankle/Foot Red Flags:**
- Acute fracture with neurovascular compromise
- Compartment syndrome (severe pain, pain with passive stretch, paresthesia)
- Lisfranc injury (midfoot trauma, inability to bear weight)

**Agent Dialogue Pattern:**

```
"I need to ask you a few safety questions to make sure it's appropriate to start
a program with me right now. Some of these may seem obvious, but they're important.
Have you experienced any of the following...?"
```

Agent administers region-specific screening questions (yes/no format).

**Red Flag Response Logic:**

| **Response** | **Action** |
|---|---|
| **ANY red flag = YES** | ESCALATION PROTOCOL: (1) Pause intake immediately; (2) Advise patient: "Based on what you've described, I need to have a doctor evaluate you before we can start the program"; (3) Recommend urgent PCP contact or ED evaluation (per severity); (4) Provide escalation documentation to PCP; (5) Document INELIGIBLE status in chart; (6) Offer future re-enrollment if red flag resolves after specialist evaluation |
| **ALL red flags = NO** | PROCEED → Continue to Step 6 (Psychosocial Risk Stratification) |
| **Red flag response UNCLEAR** | ASK CLARIFYING QUESTION; if still unclear → escalate (safer to over-triage than miss serious pathology) |

**Data Capture:**
- **FHIR: Observation.code** = red flag screening result (SNOMED code)
- **FHIR: Observation.value** = positive/negative per item
- **Clinical action** = escalation vs. proceed

**Data Validation:**
- All region-specific red flag items must be asked (cannot skip)
- Patient response must be explicit (yes/no)
- If patient unable to answer (cognitive impairment, language barrier) → escalation

**Proceed Criteria:** All red flag items screened; zero positive findings; proceed-with-program pathway confirmed.

**Branching Logic:**
- Red flag positive → Escalation (do not continue intake; document and close session with escalation plan)
- Red flag negative → Continue to Step 6
- If red flag clarification needed → Ask follow-up; if still concerning → escalate

---

### 2.7 Step 6: Psychosocial Risk Stratification — STarT Back, Keele STarT MSK, PHQ-2/GAD-2

**Purpose:** Screen for psychological barriers to recovery (fear-avoidance, catastrophizing, low self-efficacy, depression, anxiety) that determine Phase 1 psychosocial intervention intensity.

**Trigger:** Red flag screening complete with negative findings (Step 5 passed).

**Clinical Background:**
Psychosocial risk factors strongly predict treatment outcomes in MSK conditions, especially in older adults. KIMI Phase 1 includes optional psychosocial CBT component; risk stratification determines urgency and intensity.

**Risk Stratification Instruments:**

**Instrument Selection by Body Region:**

| **Body Region** | **Primary Instrument** | **Backup/Screening** | **Cutoff Score** |
|---|---|---|---|
| **Lower Back / Lumbar** | STarT Back Screening Tool (SBT) | PHQ-2 + GAD-2 | Low ≤3, Medium 4–8, High ≥9 |
| **Neck, Shoulder, Knee, Hip, Elbow, Wrist, Ankle** | Keele STarT MSK | PHQ-2 + GAD-2 | Low, Medium, High |

**STarT Back Screening Tool (SBT) — Lower Back Only:**

9-item questionnaire; takes ~2 minutes. Items assess:
1. Pain lasting >2 weeks
2. Radiating leg pain beyond knee
3. Comorbid conditions (other bodily pain locations)
4. Catastrophizing ("My pain will never go away")
5. Fear-avoidance ("Exercise will harm my back")
6. Anxiety/depression ("Stress affects my pain")
7. Self-efficacy ("I can control my pain")
8. Overall health ("My health is excellent")
9. Work/leisure limitations

**Scoring:** 0–9 scale
- **Low risk (0–3):** Good prognosis; exercise primary; minimal psychosocial needs
- **Medium risk (4–8):** Moderate prognosis; exercise + pain education; optional CBT offered
- **High risk (≥9):** High risk of chronicity/disability; exercise + intensive CBT + close monitoring

**Keele STarT MSK — All Other Body Regions (Neck, Shoulder, Knee, Hip, Elbow, Wrist, Ankle):**

12-item questionnaire; takes ~3 minutes. Items assess:
1. Pain extent (>1 body region)
2. Symptom severity
3. Catastrophizing
4. Fear-avoidance
5. Anxiety/depression
6. Self-efficacy
7. Sleep disturbance
8. Work limitations
9. Overall health perception

**Scoring:** Three risk categories
- **Low risk:** Good prognosis; exercise primary
- **Medium risk:** Moderate prognosis; exercise + pain education; CBT optional
- **High risk:** High risk of chronicity; intensive intervention recommended

**PHQ-2 (Depression Screening) — All Sites:**

2-item ultra-brief depression screener:
1. *"Over the last two weeks, how often have you felt down, depressed, or hopeless?"*
2. *"Over the last two weeks, how often have you felt little interest or pleasure in doing things?"*

Response options: 0 (not at all), 1 (several days), 2 (more than half days), 3 (nearly every day)

**Scoring:** 0–6 total
- **0–2:** Minimal depression risk
- **3–6:** Moderate/high depression risk; recommend mental health referral + PHQ-9 administration in PCP office

**GAD-2 (Anxiety Screening) — All Sites:**

2-item ultra-brief anxiety screener:
1. *"Over the last two weeks, how often have you felt nervous, anxious, or on edge?"*
2. *"Over the last two weeks, how often have you been unable to stop or control worrying?"*

Response options: 0, 1, 2, 3 (same as PHQ-2)

**Scoring:** 0–6 total
- **0–2:** Minimal anxiety risk
- **3–6:** Moderate/high anxiety risk; recommend mental health referral

**Agent Dialogue Pattern:**

```
"Now I'd like to ask you some questions about how your pain is affecting you mentally
and emotionally. These questions help me understand whether you might benefit from
additional support alongside the exercises and education I'll provide. Let's start..."
```

Agent administers instrument items using natural conversational language (not clinical jargon).

**Data Capture & Scoring:**
- **FHIR: Observation.code** = STarT Back or Keele STarT MSK (SNOMED/LOINC code)
- **FHIR: Observation.value** = numeric score + risk category
- **PHQ-2 result** = score + reference to depression risk
- **GAD-2 result** = score + reference to anxiety risk

**Validation Rules:**
- All items must be answered (cannot skip)
- Scores must be mathematically valid
- Risk category auto-calculated from score

**Proceed Criteria:** STarT/Keele MSK completed with score + risk category; PHQ-2 + GAD-2 completed.

**Branching Logic (Risk Stratification Results) → Phase 1 Tailoring:**

| **Risk Category** | **PHQ-2 / GAD-2** | **Phase 1 Recommendation** | **Clinical Action** |
|---|---|---|---|
| **Low Risk** | Both ≤2 (minimal depression/anxiety) | Exercise-primary pathway; standard pain education; self-directed CBT modules optional | Straightforward Phase 1 care plan; exercise focus |
| **Medium Risk** | PHQ-2 or GAD-2 3–6 (moderate symptoms) | Exercise + pain neuroscience education + guided CBT modules (2–3 sessions); psychologist referral optional | Add CBT component to Phase 1; monitor mood |
| **High Risk (STarT ≥9 or Keele High)** | PHQ-2 ≥3 AND/OR GAD-2 ≥3 | Exercise + intensive CBT (weekly sessions); urgent PCP/psychologist referral | Parallel psychologist care coordination; Phase 1 exercises supportive (not primary); close monitoring |
| **Severe Depression/Anxiety Suspected** | PHQ-2 6 AND GAD-2 6 | Pause KIMI; urgent PCP/mental health referral | Escalate to mental health evaluation; may defer KIMI enrollment pending stabilization |

**Red Flag for Severe Mental Health:**
If patient endorses items suggesting acute suicidality or severe psychiatric crisis:
- Agent offers: *"It sounds like you're going through something really difficult. I think it's important for you to talk with a mental health professional right away. Can we call your doctor or the National Suicide Prevention Lifeline (988) today?"*
- Escalate immediately; do not continue intake

---

### 2.8 Step 7: ACCESS-Mandated PROM Baseline Collection

**Purpose:** Administer baseline Patient-Reported Outcome Measures required by CMS ACCESS Model; establish improvement targets.

**Trigger:** Psychosocial risk stratification complete (Step 6 passed); red flags cleared.

**Critical Compliance Rule:**
**The SAME PROM must be administered at baseline and throughout all 12 months.** Baseline collection must occur at enrollment (within intake session). CMS requires submission within 60 days of enrollment date.

**PROM Selection by Body Region:**

Detailed PROM mapping defined in **KB_Intake_PROM_Survey_Mapping.md**. Summary below:

| **Body Region** | **Primary PROM (Baseline)** | **Scoring Range** | **CMS Required** |
|---|---|---|---|
| **Lower Back** | Oswestry Disability Index (ODI) v2.1a | 0–100 (higher = more disability) | Yes |
| **Neck** | Neck Disability Index (NDI) | 0–100 (higher = more disability) | Yes |
| **Knee** | Knee Injury and Osteoarthritis Outcome Score (KOOS-12) | 0–100 (higher = better function) | Yes |
| **Hip** | Hip Disability and Osteoarthritis Outcome Score (HOOS-12) | 0–100 (higher = better function) | Yes |
| **Shoulder** | Shoulder Pain and Disability Index (SPADI) | 0–100 (higher = more disability) | Yes |
| **Elbow** | Patient-Specific Functional Scale (PSFS) — elbow version | Variable | Yes (alternative) |
| **Wrist/Hand** | Patient-Specific Functional Scale (PSFS) — hand/wrist version | Variable | Yes (alternative) |
| **Ankle/Foot** | Lower Extremity Functional Scale (LEFS) — ankle/foot version | 0–80 (higher = better function) | Yes |

**Universal Secondary PROM (All Regions):**
- **EQ-5D-5L** (European Quality of Life-5 Dimensions) — health-related quality of life; CMS requires for all ACCESS enrollees

**Agent Administration:**

Agent administers PROM items using conversational format (not clinical questionnaire style). Example for ODI (lower back):

```
Agent: "Now I'm going to ask you about how your back pain affects your daily life.
For each activity, tell me how much difficulty you have doing it because of your back pain."

Question 1: "How much does back pain affect your ability to take care of yourself
(dressing, washing, etc.)? Would you say: no difficulty, slight difficulty,
moderate difficulty, severe difficulty, or so severe you can't do this at all?"
```

Continue through all items; agent records response per item.

**Data Capture:**
- **FHIR: Observation.code** = LOINC code for each PROM (e.g., LOINC 41809-3 for ODI)
- **FHIR: Observation.value** = numeric score per item
- **FHIR: Observation.effectiveDateTime** = enrollment date (baseline timestamp)
- **Observation.status** = "final" (baseline data locked)

**Scoring & Interpretation:**

Agent or backend system auto-scores PROM:
- Calculate total score per PROM algorithm
- Compare to population reference values (e.g., ODI scores ≥50 indicate severe disability)
- Establish baseline score as **improvement denominator** (e.g., *"Your baseline ODI is 42; our goal is to reduce this by 20–30% by month 12"*)

**Validation Rules:**
- All PROM items must be completed (cannot skip items)
- Scores must be numerically valid and within defined range
- If patient unable to complete PROM (cognitive impairment, language barrier, vision loss) → document barrier + attempt paper-based or telephone administration with family support

**Proceed Criteria:** Primary PROM (region-specific) completed and scored; EQ-5D-5L completed.

**Branching Logic:**
- If baseline score indicates severe disability (e.g., ODI >70) + high psychosocial risk → Phase 1 may need extended duration or increased frequency; note for care plan
- If baseline score indicates mild/minimal disability (e.g., ODI <20) → Phase 1 may focus on prevention/pacing rather than restoration; discuss expectations

---

### 2.9 Step 8: Treatment History & Current Management Inventory

**Purpose:** Document prior treatments, current medications, and previous pain management attempts; identify barriers and facilitators to engagement.

**Trigger:** PROM baseline collected (Step 7 passed).

**Core Data Collection:**

1. **Prior physical therapy / rehabilitation** (dates, duration, outcome)
2. **Prior surgery** (type, date, outcome on pain)
3. **Current medications** (pain-related, including OTC analgesics, NSAIDs, opioids, muscle relaxants, topicals)
4. **Other pain management** (acupuncture, massage, injections, other specialist visits)
5. **Home exercise or self-management attempts** (what worked, what didn't)
6. **Barriers to treatment** (cost, transportation, time, pain level, lack of knowledge)
7. **Facilitators** (strong family support, prior positive PT experience, self-motivated)
8. **Current function** (work status, living situation, caregiving roles — affects exercise adherence)

**Agent Dialogue Pattern:**

```
"I'd like to learn about what you've already tried for your pain.
Have you done physical therapy before? If so, did it help?
Are you taking any pain medications right now, either prescription or over-the-counter?
And what do you think would help you stay engaged with an exercise program over the next 12 months?"
```

**Data Capture:**
- **FHIR: MedicationStatement** (current pain medications + dosage)
- **FHIR: Procedure** (prior PT, surgery with dates + outcomes)
- **FHIR: CarePlan.activity** (prior self-management attempts)
- **Observation.note** (barriers + facilitators in structured note)

**Data Validation:**
- Medication list cross-referenced (if possible) with PCP records
- Prior PT duration and frequency verified (realistic timeframe)
- Barriers must be specific ("cost" → specify: "co-pay for PT too high" or "cannot afford out-of-pocket")

**Proceed Criteria:** At least medication list and prior PT history documented; barriers identified.

**Branching Logic:**
- If patient has **prior positive PT experience** → leverage in Phase 1 (framing, adherence expectations)
- If patient has **failed PT in past** → explore reason (insufficient frequency? Wrong exercise type? Poor adherence? Low expectation of improvement?) → tailor Phase 1 accordingly
- If patient on **opioids** → note for Phase 1 (may indicate higher pain catastrophizing or pain complexity); coordinate with PCP on opioid weaning plan if appropriate
- If patient has **access barriers** (transportation, cost) → Phase 1 must include home-based exercise options + telehealth visits

---

### 2.10 Step 9: Functional Goals Elicitation — Patient-Centered SMART Goals

**Purpose:** Define patient's own functional goals for the 12-month period using SMART framework; ensures Phase 1 exercise prescription addresses what matters most to patient.

**Trigger:** Treatment history documented (Step 8 passed).

**SMART Goal Framework:**
- **Specific:** Concrete, measurable activity (not "reduce pain" but "walk 30 minutes without stopping")
- **Measurable:** Quantifiable outcome (distance, time, frequency, or functional milestone)
- **Achievable:** Realistic within 12-month timeframe and given patient's baseline
- **Relevant:** Patient-prioritized goal reflecting personal values
- **Time-bound:** Target completion date (e.g., "by month 6" or "by month 12")

**Agent Dialogue Pattern:**

```
"Now, let's talk about what you want to achieve over the next 12 months.
What activities are most important to you that you'd like to be able to do better?
Maybe it's walking, climbing stairs, hobbies, spending time with family...
Tell me what matters most, and we'll build a plan around that."
```

If patient struggles to identify goals, offer examples:
- *"Some patients want to walk a certain distance, others want to return to a hobby, others want to sleep better. What's most important for you?"*

**Goal-Setting Conversation:**

Agent captures 1–3 primary functional goals (prioritized by patient):

**Example Goals (SMART format):**
1. *"Return to gardening for 30 minutes on weekends without pain limiting my activities"* (Specific, Measurable, Timeframe: 12 months)
2. *"Walk to the grocery store (0.5 miles) and back without stopping for pain"* (Specific, Measurable, Achievable)
3. *"Resume golf 2x/month without exacerbation of back pain that lasts >2 days"* (Specific, Measurable, Relevant)

**Data Capture:**
- **FHIR: Goal.description** = patient-stated goal in narrative form
- **FHIR: Goal.target** = quantifiable measure (e.g., walk duration, activity frequency)
- **FHIR: Goal.startDate** = enrollment date
- **FHIR: Goal.dueDate** = target completion date
- **FHIR: Goal.priority** = 1 (primary), 2 (secondary), 3 (tertiary)

**Data Validation:**
- Goals must be patient-stated (not imposed by agent or clinician)
- Goals must be functionally meaningful (avoid vague goals like "feel better")
- Goals must be achievable within 12 months given baseline function
- Goals inform Phase 1 exercise selection (exercises should target goal-achieving movements)

**Proceed Criteria:** 1–3 SMART functional goals documented and prioritized.

**Branching Logic:**
- If patient goals conflict with clinical severity (e.g., goal is "return to running" but ODI 70 + high psychosocial risk) → agent validates goal importance + educates on realistic progression (*"That's a great goal. Let's build toward that step by step. First, we'll focus on walking; then jogging; then running. Does that make sense?"*)
- If patient has no clear goals → suggest 1–2 realistic goals based on functional history (*"Based on what you've told me, walking pain-free to visit your grandchildren seems important. Is that something you'd like to work toward?"*)

---

### 2.11 Step 10: Initial Care Plan Construction

**Purpose:** Synthesize all intake findings into patient-centered, goal-driven 12-month care plan; define Phase 1 exercise prescription, timelines, and expected outcomes.

**Trigger:** Functional goals documented (Step 9 passed).

**Care Plan Construction Process:**

This step is **not a standalone question** but a synthesis step where KIMI **integrates intake data** into a structured care plan. Detailed construction logic defined in **KB_Intake_Care_Plan_Construction.md**. Summary:

**Phase 1 Care Plan Elements (Weeks 1–8):**

| **Element** | **Determination Logic** | **Data Source** |
|---|---|---|
| **Exercise Prescription** | Pain phenotype (Step 4) + functional goals (Step 9) + baseline PROM disability (Step 7) + risk stratification (Step 6) | Nociceptive → strength/mobility; neuropathic → neurodynamics; nociplastic → graded exposure |
| **Frequency/Intensity** | Age (Step 1), pain severity (Step 3), functional baseline (Step 3, 7), prior PT response (Step 8) | Low-severity, high-function → 3x/week moderate intensity; high-severity, low-function → 2x/week gentle |
| **Education Components** | Pain phenotype (Step 4) + psychosocial risk (Step 6) | Neuropathic → pain neuroscience education; high psychosocial risk → CBT introduction |
| **Psychosocial Intervention** | STarT/Keele score + PHQ-2/GAD-2 (Step 6) | Low risk → self-directed modules; high risk → weekly guided CBT sessions |
| **Monitoring Frequency** | Psychosocial risk (Step 6) + pain severity (Step 3) | High risk or severe pain → weekly check-ins; moderate → bi-weekly; low → monthly |
| **Phase 1 Goals** | Patient functional goals (Step 9) translated to specific Phase 1 milestones | Goal: walk 30 min → Phase 1 milestone: walk 15 min without stopping by week 4 |

**Agent Care Plan Summary Dialogue:**

Agent generates patient-readable summary of care plan and reviews with patient:

```
"Okay, here's what I'm recommending based on everything we've discussed:

Over the next 8 weeks (Phase 1), I'll send you exercises 3 times per week.
These will focus on [specific movements/exercises matching your goals and pain type].
You'll also receive education about how your pain works, which will help you understand
what's happening and feel more in control.

We've identified that [functional goal] is important to you, so we'll work toward that.
By the end of Phase 1, I'd like you to be able to [Phase 1 milestone].

You'll check in with me weekly so we can adjust if things aren't working.
We'll measure your progress with the [PROM name] test again at 8 weeks.

Does this make sense? Do you have any questions?"
```

**Data Capture:**
- **FHIR: CarePlan** (structured care plan resource)
- **CarePlan.title** = "KIMI MSK ACCESS Track 12-Month Care Plan"
- **CarePlan.period** = enrollment date to 12-month end date
- **CarePlan.activity** = Phase 1 exercises (referenced to exercise database)
- **CarePlan.goal** = linked to patient goals (Step 9)
- **CarePlan.note** = clinical reasoning, contraindications, special considerations

**Data Validation:**
- Care plan must address ≥1 patient functional goal
- Exercises must be appropriate for pain phenotype + pain severity
- Monitoring frequency must align with risk stratification
- Care plan must be achievable within home setting (KIMI is not in-clinic)

**Proceed Criteria:** Care plan documented in FHIR format; patient education summary reviewed with patient; patient understanding confirmed via teach-back.

**Teach-Back Confirmation:**

Agent asks patient to summarize back understanding:
- *"Can you tell me, in your own words, what we're going to do in Phase 1? What are the exercises going to focus on?"*
- If patient unable to articulate plan → re-explain; revisit complexity/clarity
- If patient understanding confirmed → proceed to Step 11

---

### 2.12 Step 11: Enrollment Summary & Next Steps — Session Closure

**Purpose:** Provide final summary, confirm enrollment, explain next steps, set expectations for Phase 1 launch.

**Trigger:** Care plan validated and patient understanding confirmed (Step 10 passed).

**Enrollment Summary Document:**

Agent generates **patient-readable enrollment summary** (PDF or digital format) including:

1. **Enrollment confirmation** with date and 12-month end date
2. **Anatomical site and pain diagnosis** (in plain language)
3. **Baseline functional status** (PROM score + interpretation: "Your baseline ODI score is 42, indicating moderate limitation from your lower back pain")
4. **Functional goals** (patient-stated, SMART format)
5. **Phase 1 care plan summary** (exercises, frequency, education topics, monitoring plan)
6. **What to expect** (symptom fluctuation is normal; progressive loading over 8 weeks)
7. **Contact information** (how to reach KIMI for questions, technical support)
8. **Emergency contact guidance** (when to seek urgent care)

**Agent Dialogue Pattern for Closure:**

```
"Congratulations — you're officially enrolled in the KIMI 12-month MSK program!
Here's what happens next:

Over the next few days, you'll receive an invitation to download the KIMI app or
access the web portal. Your first set of exercises will be ready on [specific date].
Start with these exercises on [specific day] and do them [frequency].

You'll also receive a message from me once or twice per week checking in on how
you're doing. Please let me know if anything is unclear or if you have questions.

If you experience any of these warning signs [red flag symptoms], please stop the
exercises and contact your doctor right away: [list region-specific warning signs].

Do you have any final questions before we wrap up?"
```

**Next Steps Checklist:**

Agent confirms with patient:
- ☐ Patient has contact information (phone, email, app)
- ☐ Patient understands Phase 1 start date
- ☐ Patient understands exercise frequency and how to access exercises
- ☐ Patient understands warning signs for stopping exercise
- ☐ Patient has printed/digital copy of enrollment summary
- ☐ Patient confirms willingness to begin Phase 1 within next 3 days

**Data Capture:**
- **FHIR: Patient.active** = true (enrolled status)
- **FHIR: Patient.link** = link to enrollment summary document
- **FHIR: CarePlan.status** = "active"
- **Enrollment timestamp** = intake session completion date/time
- **Enrollment summary document URL** = for patient reference

**Data Validation:**
- All 11 intake steps completed and documented
- Red flags cleared (proceed-with-program pathway confirmed)
- Required data elements for CMS submission present
- Patient confirmation of understanding documented

**Session Closure:**

```
"Thank you for taking the time today to share your health information with me.
I'm excited to work with you over the next 12 months. You're taking an important
step toward managing your pain and improving your function. Let's do this together!"
```

**Post-Intake Actions (Agent Backend):**

Within 24 hours of intake completion:
1. **Generate enrollment summary PDF** and email to patient
2. **Populate FHIR Patient + Condition + Goal + CarePlan resources** in EHR
3. **Queue baseline PROM for CMS submission** (must be submitted within 60 days)
4. **Schedule Phase 1 exercise delivery** (first exercises available on [date])
5. **Schedule first weekly check-in** (patient contact within 3–7 days)
6. **Trigger phase 1 instructional content delivery** (video demonstrations, written guides)

---

## 3. Anatomical Site Classification Logic

### 3.1 Natural Language Mapping: Free-Text Pain Description → 8 ACCESS Body Regions

KIMI uses **semantic NLP + decision rules** to classify patient's natural language pain description into one of 8 regions. This section defines classification rules and common utterance patterns.

### 3.2 Classification Rules — Mapping Logic

**Rule 1: Exact Anatomical Terms**
If patient explicitly names anatomical region → direct mapping:
- *"My lower back hurts"* → Lower Back (MSK-SITE-001)
- *"Neck pain"* → Neck (MSK-SITE-002)
- *"My knee"* → Knee (MSK-SITE-003)

**Rule 2: Anatomical Proxies & Common Synonyms**
Map common patient-language proxies to official anatomy:

| **Patient Utterance** | **Inferred Anatomy** | **Mapped Region** |
|---|---|---|
| "Sciatica" | Sciatic nerve distribution (lower back/buttock/leg) | Lower Back (MSK-SITE-001) |
| "Pinched nerve in my neck" | Cervical nerve compression | Neck (MSK-SITE-002) |
| "Rotator cuff" | Shoulder complex | Shoulder (MSK-SITE-005) |
| "Golfer's elbow" | Medial epicondyle (elbow) | Elbow (MSK-SITE-006) |
| "Carpal tunnel" | Wrist (median nerve) | Wrist/Hand (MSK-SITE-007) |
| "Plantar fasciitis" | Foot/heel | Ankle/Foot (MSK-SITE-008) |
| "Hip bursitis" | Hip joint / lateral hip | Hip (MSK-SITE-004) |
| "Tennis elbow" | Lateral epicondyle (elbow) | Elbow (MSK-SITE-006) |
| "Heel pain" | Plantar heel / foot | Ankle/Foot (MSK-SITE-008) |
| "Lumbar region" | Low back / lumbosacral | Lower Back (MSK-SITE-001) |

**Rule 3: Anatomical Location Descriptors**
If patient uses spatial language → infer anatomy:

| **Descriptor** | **Anatomical Zone** | **Mapped Region** |
|---|---|---|
| "Bottom of my spine" | Lumbosacral region | Lower Back (MSK-SITE-001) |
| "Base of my skull" | Cervical/upper spine | Neck (MSK-SITE-002) |
| "Back of my thigh" | Posterior knee/hamstring region | Knee (MSK-SITE-003) [or Lower Back if referred pain pattern] |
| "Groin area" | Hip joint / medial hip | Hip (MSK-SITE-004) |
| "Under my armpit" | Shoulder/axilla | Shoulder (MSK-SITE-005) |
| "Inside of my elbow" | Medial elbow | Elbow (MSK-SITE-006) |
| "Thumb side of wrist" | Radial wrist | Wrist/Hand (MSK-SITE-007) |
| "Ball of my foot" | Metatarsal region / forefoot | Ankle/Foot (MSK-SITE-008) |

**Rule 4: Referred Pain Patterns**
If patient describes referred pain (pain in location distant from primary lesion site):

| **Referred Pain Pattern** | **Likely Primary Site** | **Mapped Region** |
|---|---|---|
| Buttock + leg pain (dermatomal distribution) | Lumbar nerve root | Lower Back (MSK-SITE-001) |
| Arm + hand numbness (following C6/C7 distribution) | Cervical nerve root | Neck (MSK-SITE-002) |
| Groin pain (from hip pathology) | Hip joint | Hip (MSK-SITE-004) |
| Shoulder pain radiating down arm | Shoulder joint / rotator cuff | Shoulder (MSK-SITE-005) |
| Posterior forearm pain (from cervical origin) | Neck | Neck (MSK-SITE-002) |

**Agent clarification if referred pain pattern suspected:**
*"When you say your [referred region] hurts, where do you think the pain is coming from? Is there also pain in your [inferred primary site]?"*

**Rule 5: Anatomical Ambiguity Resolution**
If anatomical location ambiguous → agent asks clarifying question:

| **Ambiguous Utterance** | **Clarifying Question** | **Possible Mappings** |
|---|---|---|
| "My back hurts" | "Is it your upper back, middle back, or lower back?" | Neck, Lower Back |
| "Hip pain" | "Is it pain in the hip joint (groin area) or the outer hip (side)?" | Hip (both are hip region) |
| "Leg pain" | "Is it your thigh, knee, shin, calf, ankle, or foot? And which leg?" | Multiple regions |
| "Upper arm pain" | "Is it your shoulder area or further down your arm?" | Shoulder, Elbow |
| "Hand pain" | "Is it your wrist, palm, or fingers?" | Wrist/Hand |

### 3.3 Multi-Site Pain Handling

**CMS ACCESS Model allows multi-site reporting.** If patient reports >1 pain site:

1. **Identify all reported sites** (agent creates list)
2. **Ask prioritization question:** *"Which of these bothers you most or limits your activities the most?"*
3. **Designate PRIMARY site** = worst/most functionally limiting (determines pathway eligibility)
4. **Document SECONDARY sites** = recorded for future reference; patient can re-initiate secondary as primary site in future encounters

**Example:**

Patient states: *"I have lower back pain, knee pain from arthritis, and shoulder pain from my rotator cuff."*

Agent:
- Maps to **Lower Back (primary)**, **Knee (secondary)**, **Shoulder (secondary)**
- Asks: *"If you had to rank these from worst to best, which one bothers you most?"*
- Patient: *"The lower back is the worst; the knee is second."*
- Pathway eligibility determined by **Lower Back** findings
- **Knee** pain recorded; patient informed that Knee can be addressed in Phase 2 if time permits, or re-initiated as primary site in future

### 3.4 Example Utterances & Classifications

| **Patient Utterance** | **NLP Processing** | **Mapped Region** | **Primary or Secondary** |
|---|---|---|---|
| "My lower back has been killing me for 6 months." | Direct anatomical term (lower back) | Lower Back (MSK-SITE-001) | Primary (only site) |
| "I have severe sciatica down my left leg." | Proxy term (sciatica = lumbar nerve root) | Lower Back (MSK-SITE-001) | Primary |
| "My neck is stiff and my shoulder hurts too." | Two sites mentioned: neck, shoulder; clarification needed | Neck (MSK-SITE-002) + Shoulder (MSK-SITE-005) | Clarify which is worst |
| "It's like a burning pain in my wrist and fingers." | Anatomical term (wrist + fingers) + quality (burning) | Wrist/Hand (MSK-SITE-007) | Primary |
| "I have pain everywhere — my back, knees, and hips." | Multiple sites; polyarticular pattern | Lower Back + Knee + Hip | Clarify primary; assess for nociplastic features |
| "The back of my knee is swollen and painful." | Spatial descriptor (back of knee) | Knee (MSK-SITE-003) | Primary |
| "My elbow is tennis elbow from too much typing." | Proxy term (tennis elbow) | Elbow (MSK-SITE-006) | Primary |
| "Heel pain, especially when I step out of bed." | Direct anatomical term (heel) + functional context | Ankle/Foot (MSK-SITE-008) | Primary |

---

## 4. Intake Session Design Principles

### 4.1 Health Literacy & Plain Language

**Standard:** Sixth to eighth-grade reading level; no medical jargon without explanation.

**Practical Rules:**
- Replace "nociceptive pain" with *"pain from tissue damage or strain"*
- Replace "psychosocial barriers" with *"things in your mind that make pain worse, like worry or stress"*
- Replace "prophylaxis" with *"prevention"*
- Use short sentences (max 15 words per sentence)
- Define abbreviations on first mention: *"We'll use a test called the PROM (Patient-Reported Outcome Measure) to track your progress"*

**Teach-Back Method:**
After major explanations, ask patient to summarize:
- *"Can you tell me back what you heard me say about why we're doing these exercises?"*
- If patient cannot articulate or misunderstands → re-explain with simpler language or different analogy

### 4.2 Session Pacing & Duration Management

**Target Duration:** 25–35 minutes for complete intake
**Maximum Duration:** 45 minutes (risk of patient fatigue, especially in older adults)
**Minimum Duration:** 15 minutes (insufficient time for thorough assessment)

**Pacing Strategy:**
- Use progress indicators every 2–3 steps (*"We're about halfway through"*, *"One more section after this"*)
- Allow patient brief pauses (1–2 min) for rest/reflection after complex sections
- If patient fatiguing: *"Are you doing okay to continue, or would you prefer to take a break and finish later today?"*
- Do NOT rush through red flag screening or PROM even if running long; these are non-negotiable

### 4.3 Conversational Flow — Warm, Empathetic, Not Interrogatory

**Agent Principles:**
- **Validate patient experience:** *"That sounds really frustrating"* / *"Many people feel that way"*
- **Use conversational transitions:** *"Now I'd like to understand..."* rather than jumping between topics
- **Acknowledge difficulty:** *"Some of these questions are personal, but they help me understand..."*
- **Express genuine interest:** *"Tell me more about that"* / *"That's helpful to know"*

**Avoid:**
- Rapid-fire question dumps
- Clinical interrogation tone
- Dismissive language (*"Oh, that's nothing"*)
- Making patient feel judged about pain severity or barriers

### 4.4 Quick-Reply Options at Decision Points

At branching logic points, offer 2–3 quick response options to speed decision-making:

**Example (from Step 3 — Pain Severity):**
```
Agent: "On a scale of 0 to 10, how bad is your pain right now?"
Quick options:
  • Light (0-3): Just noticeable
  • Moderate (4-6): Bothersome but manageable
  • Severe (7-10): Really limiting my activities
```

Patient can select option (faster) or provide custom number.

### 4.5 Progress Indicators & Engagement

- **After Steps 2–3:** *"We're off to a good start. Here's what we've covered so far..."*
- **After Step 6:** *"You're about 2/3 through! Just a couple more sections..."*
- **After Step 8:** *"Almost done — just two more things..."*

These cues maintain engagement and set realistic expectations.

### 4.6 Data Validation — Confirm Before Recording

**Critical Rule:** After patient responds to major question, agent confirms before moving on:

**Example:**
Patient: *"I think I started having pain about 3 months ago."*

Agent (confirming): *"So you're saying the pain began about 3 months ago — is that right? Not longer, like 6 months or a year?"*

Patient: *"Yes, about 3 months."*

Agent (records): **Onset: 3 months before enrollment (chronic presentation)**

This prevents misrecordings and builds rapport (patient feels listened to).

---

## 5. Required Data Collection — ACCESS Compliance Checklist

### 5.1 CMS ACCESS Model Data Requirements

**Every data element below MUST be collected, documented, and submitted within 60 days of enrollment date.**

#### Demographics & Identity
- ☐ Full legal name (FHIR: Patient.name.text)
- ☐ Date of birth (FHIR: Patient.birthDate)
- ☐ Medicare beneficiary identifier (MBI) or legacy HICN (FHIR: Patient.identifier[system=CMS-MBI])
- ☐ Sex (FHIR: Patient.gender)
- ☐ Race/ethnicity (FHIR: Patient.extension[race], Patient.extension[ethnicity])
- ☐ Contact phone + email (FHIR: Patient.telecom)
- ☐ Mailing address (FHIR: Patient.address)

#### Clinical Enrollment Data
- ☐ Enrollment date (FHIR: Condition.recordedDate)
- ☐ Primary anatomical site (FHIR: Condition.code, body site)
- ☐ Secondary sites (if present) (FHIR: Condition.extension[secondary-sites])
- ☐ Pain onset date (FHIR: Condition.onsetDateTime)
- ☐ Pain phenotype classification (nociceptive/neuropathic/nociplastic) (FHIR: Observation.code + value)
- ☐ Red flag screening result (positive/negative per item) (FHIR: Observation[red-flag])
- ☐ PCP name + facility (FHIR: Practitioner reference)

#### Patient-Reported Outcome Measures (PROMs) — MANDATORY
- ☐ Region-specific PROM (ODI for lower back, NDI for neck, KOOS-12 for knee, etc.) — baseline score
- ☐ EQ-5D-5L (European Quality of Life) — baseline score
- ☐ Collection date = enrollment date (FHIR: Observation.effectiveDateTime)
- ☐ PROM baseline score establishes improvement denominator for 12-month tracking

#### Psychosocial Risk Stratification
- ☐ STarT Back Screening Tool (if lower back pain) OR Keele STarT MSK (all other sites) — score + risk category
- ☐ PHQ-2 (depression screening) — score
- ☐ GAD-2 (anxiety screening) — score

#### Treatment History
- ☐ Prior physical therapy (dates, duration, outcome) (FHIR: Procedure)
- ☐ Prior surgery (type, date, outcome) (FHIR: Procedure)
- ☐ Current pain medications (FHIR: MedicationStatement)
- ☐ Other prior pain management (acupuncture, injections, etc.)

#### Functional Goals
- ☐ Patient-stated functional goal(s) in SMART format (FHIR: Goal)
- ☐ Goal priority ranking

#### Care Plan
- ☐ Phase 1 exercise prescription (exercise type, frequency, intensity)
- ☐ Phase 1 monitoring plan (frequency of check-ins, adjustment triggers)
- ☐ Estimated Phase 1 duration (typically 8 weeks)
- ☐ Expected improvement targets (e.g., "reduce ODI by 20–30%")

#### Consent & Regulatory
- ☐ Patient consent to KIMI program (documented)
- ☐ Patient consent to CMS data submission (documented)
- ☐ HIPAA authorization (documented)
- ☐ Acknowledgment of warning signs / escalation criteria (documented)

### 5.2 FHIR Resource Mapping — Intake Data Elements

| **Intake Data Element** | **FHIR Resource** | **FHIR Path** | **Clinical Use** |
|---|---|---|---|
| Patient demographics | Patient | Patient.name, Patient.birthDate, Patient.gender, Patient.address, Patient.telecom | Identification, contact |
| Medicare eligibility | Patient | Patient.identifier[system=CMS-MBI] | Regulatory compliance |
| Primary diagnosis (pain condition) | Condition | Condition.code, Condition.bodySite, Condition.onsetDateTime, Condition.recordedDate | Care plan foundation |
| Red flag screening | Observation | Observation.code (red-flag-screening), Observation.value (positive/negative) | Safety escalation trigger |
| PROM baseline (region-specific) | Observation | Observation.code (LOINC ODI, NDI, KOOS, etc.), Observation.value (numeric score), Observation.effectiveDateTime | Baseline for improvement measurement |
| Pain phenotype | Observation | Observation.code (SNOMED pain-phenotype), Observation.value (nociceptive/neuropathic/nociplastic) | Treatment algorithm selection |
| Psychosocial risk (STarT/Keele) | Observation | Observation.code (STarT-Back or Keele-STarT-MSK), Observation.value (numeric score + risk category) | Risk stratification |
| Depression screening (PHQ-2) | Observation | Observation.code (LOINC 8410-5 / PHQ-2), Observation.value (0–6 score) | Mental health referral trigger |
| Anxiety screening (GAD-2) | Observation | Observation.code (LOINC GAD-2), Observation.value (0–6 score) | Mental health referral trigger |
| Current medications | MedicationStatement | MedicationStatement.medication, MedicationStatement.dosage, MedicationStatement.status | Drug interaction check, opioid weaning planning |
| Prior procedures | Procedure | Procedure.code, Procedure.performedDateTime, Procedure.outcome | Treatment history context |
| Functional goals | Goal | Goal.description, Goal.target, Goal.priority, Goal.startDate, Goal.dueDate | Care plan relevance alignment |
| Care plan | CarePlan | CarePlan.activity, CarePlan.goal, CarePlan.period, CarePlan.status | Operational phase 1 guidance |
| PCP coordination | Practitioner + PractitionerRole | Practitioner.name, PractitionerRole.healthcareService | Care coordination |

### 5.3 60-Day CMS Submission Deadline

**Critical Compliance Requirement:**
All baseline data (demographics, diagnosis, red flag screening result, PROM baseline, psychosocial screening) **must be submitted to CMS within 60 calendar days of enrollment date**.

**Intake Coordinator Responsibility:**
- Intake completeness audit (all required fields present)
- FHIR resource validation (data structure compliance)
- CMS data submission package generation
- Submission deadline tracking (flag at day 50 if not yet submitted)

**Late Submission Risk:**
- Regulatory non-compliance; potential loss of reimbursement
- Patient disenrollment from ACCESS track
- Program audit flags

---

## 6. Intake-to-Phase-1 Handoff Protocol

### 6.1 How Intake Findings Determine Phase 1 Exercise Prescription

**Exercise Type Selection Logic:**

| **Intake Finding** | **Phase 1 Exercise Emphasis** | **Rationale** |
|---|---|---|
| **Nociceptive pain phenotype** | Strength + mobility + graduated loading | Mechanical pain responds to progressive tissue adaptation |
| **Neuropathic pain phenotype** | Neurodynamic mobility + pain neuroscience education | Nerve mobilization + education reduces fear-avoidance |
| **Nociplastic pain phenotype** | Graded exposure + pacing + low-intensity gentle movement | Central sensitization requires desensitization; aggressive loading exacerbates |
| **High pain severity (NRS ≥7)** | Start gentle/submaximal; grade up by week 3–4 | Respect acute pain; avoid sensitization |
| **Low pain severity (NRS ≤3)** | Standard intensity from week 1; emphasize progression | Good tolerance; focus on prevention/return to activity |
| **Low functional disability (PROM <30)** | Emphasize return-to-activity; sport-specific or hobby-specific exercise | Minor disability; exercise goal-driven |
| **High functional disability (PROM ≥60)** | Start with basic ADL restoration (walking, stairs, sitting); build toward higher function | Severe disability requires foundational restoration before complex movements |
| **Fear-avoidance present (STarT high)** | Education-heavy; graded exposure framework; pain neuroscience emphasis | Cognitive driver; must address belief before exercise will be effective |
| **Low fear-avoidance (STarT low)** | Exercise-primary; education supportive | Patient trusts body; exercise uptake typically higher |

### 6.2 Pain Phenotype → CBT/Pain Neuroscience Education Priority

| **Pain Phenotype** | **CBT/Education Priority** | **Content Focus** |
|---|---|---|
| **Nociceptive** | Moderate (optional component) | Movement confidence; activity pacing; sleep hygiene |
| **Neuropathic** | High (core component) | Nerve anatomy education; why pain spreads; neurodynamics rationale |
| **Nociplastic** | Critical (intensive component) | Central sensitization explanation; stress/pain connection; desensitization; self-compassion |

### 6.3 Red Flag Results → Escalation vs. Proceed

| **Red Flag Result** | **Action** | **Phase 1 Status** |
|---|---|---|
| **Any red flag POSITIVE** | Immediate escalation to PCP / ED; patient excluded from KIMI program | NO Phase 1; enrollment suspended pending specialist evaluation |
| **All red flags NEGATIVE** | Clear to proceed with enrollment | Proceed to Phase 1 as planned |

### 6.4 PROM Baseline → Improvement Targets & Phase 1 Intensity

| **Baseline PROM Score** | **Expected 12-Month Improvement Goal** | **Phase 1 Intensity Adjustment** |
|---|---|---|
| **Minimal disability (ODI 0–20)** | 5–10 point improvement OR maintain; focus on prevention | Standard intensity; progressive resistance |
| **Mild-moderate disability (ODI 21–40)** | 8–15 point improvement (20–30% reduction) | Standard intensity from week 1 |
| **Moderate-severe disability (ODI 41–60)** | 10–20 point improvement (20–30% reduction) | Gentle week 1–2; grade up by week 3 |
| **Severe disability (ODI 61–80)** | 15–25 point improvement (20–30% reduction) | Very gentle week 1–4; cautious progression |
| **Extreme disability (ODI >80)** | 20–30 point improvement (20–30% reduction) target; may need specialist co-management | Minimal intensity first 4 weeks; close monitoring; consider psychologist parallel care |

---

## 7. Re-Intake and Mid-Period Reassessment

### 7.1 When Re-Intake Is Triggered

Full re-intake (11-step protocol) is conducted in these scenarios:

1. **New primary body region** → Patient initiates care for second body region; that region becomes new primary
2. **Significant change in pain presentation** → Pain severity increases by ≥3 points on NRS; new neurological symptoms develop; functional disability worsens by ≥20 PROM points
3. **Red flag symptoms develop during Phase 1+** → Sudden neurological deficit, night pain, progressive weakness, etc.
4. **Non-response at Phase transition** → Patient does not improve ≥5% on PROM by end of Phase 1; re-intake to reassess phenotype, risk, or care plan
5. **Major life change affecting engagement** → Hospitalization, surgery, mobility aid change, caregiver loss, etc.

### 7.2 Abbreviated Intake Protocol for Known Patients

If patient re-enrolls for **same body region** (e.g., lower back flare after prior enrollment):

**Abbreviated 5-Step Protocol:**
1. **Welcome & status confirmation** (confirm identity, confirm still on Medicare)
2. **Current presentation assessment** (pain onset, severity, functional change since last encounter)
3. **Red flag re-screening** (current status)
4. **Updated PROM collection** (baseline for new episode)
5. **Updated care plan** (new Phase 1 prescription)

Skip: Steps on identity verification, anatomical site classification (already known), comprehensive psychosocial screening (use prior scores if <6 months old; re-administer if >6 months).

---

## 8. Quality Assurance — Intake Completeness Scoring

### 8.1 Intake Completeness Rubric

Each intake is scored on completeness across 11 domains. Minimum required = **90% completeness** for valid CMS submission.

| **Domain** | **Required Elements** | **Max Points** | **Scoring** |
|---|---|---|---|
| **Step 1: Identity Verification** | 9/9 required (name, DOB, Medicare ID, phone, email, address, PCP, emergency contact, Part B confirmation) | 10 | 10 = all 9 present; 8 = 8/9; 6 = 7/9; 0 = <7/9 |
| **Step 2: Site Classification** | Primary site + onset | 10 | 10 = both present; 5 = one present; 0 = neither |
| **Step 3: Pain Characterization** | NRS severity, pain quality, functional impact ≥2 | 10 | 10 = all 3; 5 = 2/3; 0 = ≤1/3 |
| **Step 4: Pain Phenotype** | Classification + confidence level | 10 | 10 = present + confidence documented; 5 = classified but confidence unclear; 0 = no classification |
| **Step 5: Red Flag Screening** | All region-specific items screened + result (positive/negative) | 10 | 10 = all screened, result clear; 5 = screened but result ambiguous; 0 = not fully screened |
| **Step 6: Psychosocial Risk** | STarT/Keele score + PHQ-2 + GAD-2 with risk categories | 10 | 10 = all three instruments with scores; 7 = two instruments; 5 = one instrument; 0 = none |
| **Step 7: PROM Baseline** | Region-specific PROM + EQ-5D-5L, both scored | 10 | 10 = both present + scored; 5 = one present; 0 = neither |
| **Step 8: Treatment History** | Medications + prior PT + prior surgery documented | 10 | 10 = all three; 7 = two; 5 = one; 0 = none |
| **Step 9: Functional Goals** | ≥1 SMART goal documented + prioritized | 10 | 10 = 1–3 goals, SMART format, prioritized; 5 = goals present but not fully SMART; 0 = no goals |
| **Step 10: Care Plan** | Phase 1 exercise prescription + frequency + monitoring plan + patient education summary | 10 | 10 = all four elements; 7 = three elements; 5 = two; 0 = <2 |
| **Step 11: Enrollment Summary** | Patient summary document + next steps + contact info + warning signs provided | 10 | 10 = all present; 5 = partial; 0 = missing |
| | | **TOTAL: 110 points** | **Pass threshold: 99 points (90%)** |

### 8.2 Minimum Required Fields for Valid CMS Enrollment

**These 12 data elements are non-negotiable; missing any one of these results in INVALID enrollment (cannot submit to CMS):**

1. Medicare beneficiary ID (MBI or HICN)
2. Date of birth + age ≥65
3. Primary anatomical site (one of 8 regions)
4. Pain onset date
5. Red flag screening result (positive/negative documented)
6. Region-specific PROM baseline score
7. EQ-5D-5L baseline score
8. Current pain severity (NRS 0–10)
9. Pain phenotype classification
10. STarT Back (lower back) OR Keele STarT MSK (other regions) — score + risk category
11. ≥1 patient functional goal
12. Phase 1 care plan documented

**Missing any of these → Enrollment INVALID; follow-up required before CMS submission.**

### 8.3 Error Handling — Incomplete Intakes

**If intake is incomplete at end of session:**

1. **Identify missing elements** (use rubric above)
2. **Classify severity:**
   - **Minor gaps** (e.g., missing secondary goal): Can be collected in first Phase 1 check-in; do NOT hold enrollment
   - **Major gaps** (e.g., missing PROM, red flag result, risk stratification): Must be completed before CMS submission; schedule callback with patient within 48 hours
   - **Critical gaps** (e.g., missing Medicare ID, red flag result): Cannot proceed; pause enrollment; contact enrollment coordinator
3. **Communication to patient:**
   - *"We almost have everything we need. I just need to follow up on [specific item]. I'll call you tomorrow to complete this quickly — should take just 5 minutes."*
4. **Follow-up documentation:** Log completion in chart; do NOT use incomplete intake data for Phase 1 care plan until ALL required fields present

---

## 9. Cross-References — Related Knowledge Base Documents

This intake architecture document directly references and depends on:

| **Referenced Document** | **Purpose** | **Usage in Intake** |
|---|---|---|
| **KB_Intake_Condition_Protocols.md** | Body-region-specific red flag screening questions, escalation criteria | Step 5 (Red Flag Screening): Agent selects region-specific protocol based on primary anatomical site; administers all region-specific red flag questions |
| **KB_Intake_PROM_Survey_Mapping.md** | PROM selection by body region, scoring algorithms, interpretation cutoffs | Step 7 (PROM Collection): Agent references mapping to select correct region-specific PROM; scoring and interpretation guidance |
| **KB_Intake_Care_Plan_Construction.md** | Phase 1 exercise prescription algorithms, intensity/frequency determination, progression logic, psychosocial intervention matching | Step 10 (Care Plan Construction): Agent uses intake findings (pain phenotype, risk stratification, functional baseline, goals) to construct Phase 1 exercise prescription and monitoring plan |
| **KB_Phase_1_Exercise_Library.md** | Detailed exercise descriptions, video links, contraindications, modifications for age/comorbidity | Step 10 + Phase 1 handoff: Care plan references specific exercises; exercise library provides delivery content |
| **KB_Pain_Neuroscience_Education_Modules.md** | Pain phenotype-specific education content (nociceptive, neuropathic, nociplastic), teach-back scripts, duration | Step 10: Care plan determines education emphasis; education module library provides specific content |
| **KB_CBT_Psychosocial_Protocol.md** | Cognitive-behavioral therapy protocols, worry/fear-avoidance exposure hierarchies, self-efficacy building | Step 6 + Step 10: Psychosocial risk result (STarT high, PHQ-2/GAD-2 elevated) triggers CBT component; protocol provides structure |
| **KB_Escalation_and_Safety_Handoff.md** | Red flag escalation procedure, PCP communication template, urgent referral pathways, follow-up documentation | Step 5: If red flag positive, agent follows escalation protocol in this document; generates escalation letter to PCP |
| **KB_Phase_1_Monitoring_and_Adjustment.md** | Weekly check-in protocols, pain response thresholds for exercise adjustment, progression criteria for Phase 2, red flag symptoms during Phase 1 | Step 10 + Phase 1 handoff: Monitoring frequency and triggers for care plan adjustments documented; Phase 1 monitoring protocol references this KB |
| **KB_FHIR_Resource_Mapping.md** | Complete FHIR resource structure for all intake data, validation rules, EHR integration | Throughout all 11 steps: Every data element collected includes FHIR resource path for EHR documentation and CMS submission |

---

## Appendix A: Intake Session Conversation Flow Example

**Below is a realistic example of an abbreviated 2-site intake (lower back primary + knee secondary), annotated with decision points and data capture.**

---

### Example Intake Conversation — Patient with LBP + Knee Pain

**STEP 1: WELCOME & IDENTITY VERIFICATION**

**Agent:** "Hello Jane! Welcome to KIMI, your personal AI care coach for musculoskeletal health. I'm here to help you manage pain and improve function over the next 12 months. Before we get started, I'd like to confirm some information about you and make sure you're eligible for this program. This should take about 30 minutes. Is now a good time?"

**Patient:** "Yes, I'm ready."

**Agent:** "Great! Let's start with your full legal name, please."

**Patient:** "Jane Marie Kowalski."

**Agent:** "Thank you, Jane. And when were you born?"

**Patient:** "December 10, 1958."

*[Agent verifies age: 2026 – 1958 = 67 years; ≥65 ✓]*

**Agent:** "Perfect, that makes you 67. Do you have your Medicare card handy? I need your Medicare ID number."

**Patient:** "Yes, it's 1EG4-TE-MK86."

*[Agent records MBI: 1EG4-TE-MK86; documents Medicare Part B active assumption; plans verification via CMS]*

**Agent:** [Continues through contact info, PCP, address, emergency contact]

---

**STEP 2: CHIEF COMPLAINT & SITE CLASSIFICATION**

**Agent:** "Now, let's talk about what brought you here today. Can you describe where you're experiencing pain or discomfort?"

**Patient:** "My lower back hurts a lot, and I've also noticed my knee has been sore when I climb stairs."

**Agent (internal logic):**
- "Lower back" → Lower Back site (MSK-SITE-001)
- "Knee" + "climb stairs" → Knee site (MSK-SITE-003)
- Two sites identified; need to prioritize

**Agent:** "Thank you for telling me that. It sounds like you have pain in two places — your lower back and your knee. If you had to choose, which one bothers you most or makes it harder to do the things you want to do?"

**Patient:** "Definitely the lower back. The knee is annoying, but the back is what keeps me from being active."

**Agent (confirms & records):**
- **Primary site:** Lower Back (MSK-SITE-001)
- **Secondary site:** Knee (MSK-SITE-003)
- **Pathway eligibility determined by:** Lower Back

---

**STEP 3: PAIN CHARACTERIZATION**

**Agent:** "When did your lower back pain start? Was it suddenly, or did it come on gradually?"

**Patient:** "It came on gradually over the past few months. I'd say maybe 4 or 5 months ago."

*[Records: Onset subacute/chronic; ~5 months duration]*

**Agent:** "And on a scale of 0 to 10, where 0 is no pain at all and 10 is the worst pain you could imagine, how would you rate your pain right now?"

**Patient:** "Right now, maybe a 5. But some days it's worse — like a 7 or 8. Other days it's better, maybe a 3."

*[Records: Current NRS = 5; worst NRS = 7–8; best NRS = 3]*

**Agent:** "I'm going to give you some words people use to describe their pain. Tell me which ones sound like your pain: Is it sharp, dull, burning, throbbing, shooting, numbness, tingling, aching, stiff, or something else?"

**Patient:** "Mostly aching. Sometimes it feels stiff, especially in the morning. And occasionally I get a sharp pain when I bend the wrong way."

*[Records: Pain quality = aching, stiff, occasional sharp; suggests nociceptive phenotype]*

**Agent:** "Thank you. How far can you walk comfortably before your pain gets worse?"

**Patient:** "Maybe 10 or 15 minutes before I feel like I need to sit down and rest."

**Agent:** "And can you climb stairs?"

**Patient:** "Yes, but slowly and carefully. I don't like going up or down."

*[Records: Walking tolerance 10–15 min; stair climbing limited]*

---

**STEP 4: PAIN PHENOTYPE CLASSIFICATION**

**Agent:** "Based on what you've told me, I want to understand what's driving your pain. Does it feel like it's coming from the joint or tissue — like arthritis or a strain — or does it feel more like a nerve issue, with burning or shooting sensations?"

**Patient:** "It's definitely more like a strain or wear-and-tear. The sharp pain is the worst, but mostly it's just an achy, sore feeling."

**Agent (internal logic):**
- Pain quality: aching, stiff, occasional sharp → Nociceptive descriptors
- Mechanical onset: gradual, no trauma history
- No neuropathic descriptors (burning, numbness, tingling in distribution)
- Pattern: activity-triggered, relieved by rest

**Agent (classifies):**
**Phenotype = NOCICEPTIVE (mechanical); Confidence = HIGH**

*[Records: FHIR Observation.code = nociceptive pain; confidence = high; rationale logged]*

---

**STEP 5: RED FLAG SCREENING — LOWER BACK SPECIFIC**

**Agent:** "I need to ask you a few safety questions to make sure it's appropriate to start a program with me right now. Some of these may seem obvious, but they're important."

**Agent:** [Administers lower back red flag protocol per KB_Intake_Condition_Protocols.md]

1. *"Have you experienced any saddle numbness (numbness in the buttocks, genitals, or inner thighs)?"* → Patient: No
2. *"Have you had any loss of bowel or bladder control, or difficulty urinating?"* → Patient: No
3. *"Have you experienced severe, progressive weakness in your legs or feet?"* → Patient: No
4. *"Do you have a history of cancer, and has this pain started recently?"* → Patient: No cancer history
5. *"Are you taking long-term corticosteroids?"* → Patient: No
6. *"Have you had fever along with this back pain?"* → Patient: No

**Agent (result):**
**All red flags = NEGATIVE → PROCEED with enrollment**

---

**STEP 6: PSYCHOSOCIAL RISK STRATIFICATION**

**Agent:** "Now I'd like to ask you some questions about how your pain is affecting you mentally and emotionally. These help me understand whether you might benefit from additional support."

**[Administers STarT Back Screening Tool — 9 items; example items:]**

*"Do you feel that your pain is likely to become chronic?"* → Patient: "Yes, I'm worried about that."

*"Are you afraid that exercise might harm your back?"* → Patient: "A little worried, but not too much."

*"Does your pain ever feel unbearable?"* → Patient: "Some days, yes."

[Continues through 9 items]

**STarT Back Score = 6 → MEDIUM RISK**

**[Administers PHQ-2:]**

*"Over the past two weeks, have you felt down, depressed, or hopeless?"* → Patient: "Not really."

*"Over the past two weeks, have you felt little interest or pleasure in doing things?"* → Patient: "Some days."

**PHQ-2 Score = 1 → MINIMAL DEPRESSION RISK**

**[Administers GAD-2:]**

*"Over the past two weeks, have you felt nervous or anxious?"* → Patient: "Yes, especially when my pain flares."

*"Have you been unable to stop or control worrying?"* → Patient: "Sometimes."

**GAD-2 Score = 2 → MINIMAL ANXIETY RISK**

**Agent (psychosocial summary):**
**Risk Category = MEDIUM; Recommendation = Exercise + pain education + optional CBT modules**

---

**STEP 7: PROM BASELINE COLLECTION**

**Agent:** "Now I'm going to ask you about how your back pain affects your daily life. For each activity, tell me how much difficulty you have doing it because of your back pain."

**[Administers Oswestry Disability Index (ODI) — 10 items; example items:]**

*"How much does back pain affect your ability to take care of yourself (dressing, washing)?"* → Patient: "Slight difficulty; I can do it but slowly."

*"How much does back pain affect your ability to walk?"* → Patient: "Moderate difficulty; I can walk but need frequent breaks."

*"How much does back pain affect your ability to sit?"* → Patient: "Slight difficulty; can sit for short periods."

[Continues through 10 items]

**ODI Baseline Score = 28/100 → MILD-MODERATE DISABILITY**

**[Administers EQ-5D-5L:]**

*"Today, would you say your health is excellent, very good, good, fair, or poor?"* → Patient: "Fair."

[Continues through 5 dimensions: mobility, self-care, usual activities, pain/discomfort, anxiety/depression]

**EQ-5D-5L score = calculated**

**Agent (interpretation):** "Your baseline score tells us you have mild-to-moderate limitation from your lower back pain, but you still have quite a bit of function to work with. That's actually a good starting point for the program."

---

**STEP 8: TREATMENT HISTORY & CURRENT MANAGEMENT**

**Agent:** "Have you done physical therapy before?"

**Patient:** "Yes, about 2 years ago, for 6 weeks. It helped a bit, but then the pain came back."

**Agent:** "Are you taking any pain medications right now?"

**Patient:** "Just ibuprofen when the pain is bad — maybe 2 or 3 times a week. I try not to take it too often."

*[Records: Prior PT (positive initial response, but recurrence); current NSAID use PRN]*

**Agent:** "Have you ever had surgery on your back?"

**Patient:** "No, never."

---

**STEP 9: FUNCTIONAL GOALS**

**Agent:** "Let's talk about what you want to achieve over the next 12 months. What activities are most important to you that you'd like to be able to do better?"

**Patient:** "I want to be able to go for walks with my husband without worrying about pain flaring up. And I'd love to be able to garden without my back getting stiff afterward."

**Agent:** "Those are great goals. Let me make sure I understand them clearly. You want to walk comfortably for a longer distance, and you want to garden without pain limiting you afterward. Is that right?"

**Patient:** "Exactly."

**Agent (constructs SMART goals):**

**Goal 1 (Primary):** *"Walk with husband for 45 minutes on level ground without pain flare-up limiting next-day activities, by month 6."*

**Goal 2 (Secondary):** *"Garden for 1 hour (light-to-moderate activity) without back stiffness preventing daily activities the next day, by month 9."*

*[Records: Goal 1 and Goal 2 with priority ranking; both patient-stated and outcome-focused]*

---

**STEP 10: INITIAL CARE PLAN CONSTRUCTION**

**Agent (synthesizes findings):**
- Anatomical site: Lower Back
- Pain phenotype: Nociceptive (mechanical)
- Pain severity: Moderate (NRS 5; range 3–8)
- Functional disability: Mild-moderate (ODI 28)
- Psychosocial risk: Medium (STarT 6; minimal depression/anxiety)
- Prior PT: Positive initial response; recurrence suggests need for maintenance
- Functional goals: Longer walking distance + return to gardening

**Agent Care Plan Summary:**

```
"Here's what I'm recommending for the next 8 weeks (Phase 1):

You'll receive exercises 3 times per week, focused on strengthening your lower back
and improving flexibility. These are designed for your situation — mechanical back pain
that responds well to movement and strengthening.

You'll also learn about how your back works and why certain movements help. This usually
makes people feel more confident with exercise.

Since your walking is limited to 10–15 minutes, we'll work on extending that. By the end
of Phase 1 (week 8), I'd like you to be able to walk for 25–30 minutes comfortably. That's
a realistic first step toward your goal of walking with your husband.

You'll check in with me every week, and we'll adjust the exercises if needed. We'll test
your function again at week 8 to measure progress.

Does this plan make sense? Any questions?"
```

**Patient:** "That sounds good. I'm willing to try this."

**Agent (confirms understanding via teach-back):**

"Can you tell me, in your own words, what we're going to do in Phase 1? What are the exercises going to focus on?"

**Patient:** "You'll send me exercises 3 times a week, and I'll work on strengthening my back. We're aiming for me to walk longer without pain, and hopefully I'll get back to gardening."

**Agent:** "Perfect! You've got it."

---

**STEP 11: ENROLLMENT SUMMARY & NEXT STEPS**

**Agent:** "Congratulations, Jane — you're officially enrolled in the KIMI 12-month MSK program! Here's what happens next:

Over the next few days, you'll receive an invitation to download the KIMI app. Your first set of exercises will be ready on [specific date]. Start with these on [specific day] and do them [frequency].

I'll send you a message once a week to check in. Please let me know how you're doing and if anything is unclear.

If you experience any of these warning signs, please stop exercises and call your doctor right away: sudden worsening of pain, numbness in your buttocks or groin, loss of bowel/bladder control, or severe weakness in your legs.

I've also sent you a summary document with all the details we discussed today. Keep that handy for reference.

Do you have any final questions?"

**Patient:** "No, I think I'm ready!"

---

**[Post-Intake Actions — Agent Backend]**

- Generate patient enrollment summary PDF
- Populate FHIR Patient, Condition, CarePlan, Goal, Observation resources
- Queue baseline PROM (ODI + EQ-5D-5L) for CMS submission (deadline: day 60)
- Schedule Phase 1 exercise delivery start date
- Schedule first weekly check-in (day 5–7 post-enrollment)

---

## Appendix B: Intake Architecture Glossary

**ACCESS Model:** CMS Beneficiary Incentive Programs and Accountable Care Organizations (ACOs) Supporting Episodes of Care (ACCESS) Track for Musculoskeletal Conditions; 12-month care episode with shared savings model.

**FHIR:** Fast Healthcare Interoperability Resources; standard data format for health information exchange.

**Nociplastic pain:** Pain arising from altered nociception in the absence of ongoing tissue injury or nerve injury; associated with central sensitization (e.g., fibromyalgia, chronic widespread pain).

**Neuropathic pain:** Pain arising from injury or disease of the somatosensory nervous system (peripheral or central); characterized by burning, electric, radiating quality.

**Nociceptive pain:** Pain arising from noxious stimulus to intact nervous system (mechanical tissue damage, inflammation); typically sharp, aching, localized quality.

**PROM:** Patient-Reported Outcome Measure; standardized questionnaire assessing patient's perception of health status, function, or symptoms.

**Red flag:** Clinical finding or symptom suggesting serious underlying pathology (fracture, infection, malignancy, neurological emergency) requiring urgent specialist evaluation; presence of red flag = exclusion from KIMI program.

**STarT Back:** Stratified Treatment Tool (STarT Back Screening Tool); 9-item questionnaire for risk stratification in lower back pain; stratifies to low/medium/high risk.

**Keele STarT MSK:** Stratified Treatment Tool for MSK; generalized version of STarT Back for non-lower-back regions; risk stratification across multiple MSK sites.

**SMART goal:** Specific, Measurable, Achievable, Relevant, Time-bound; goal-setting framework for patient-centered functional outcomes.

**Teach-back:** Educational technique wherein patient summarizes information back to clinician to confirm understanding; identifies gaps in comprehension.

---

**End of KB_Intake_Architecture.md**

**Document Version:** 1.0
**Last Updated:** 2026-04-03
**Next Review:** 2026-06-01

