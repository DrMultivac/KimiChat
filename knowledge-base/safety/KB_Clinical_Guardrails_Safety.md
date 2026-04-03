# KIMI MSK Care Coach: Clinical Guardrails and Safety Reference

**Document Title:** Clinical Guardrails and Safety Protocols for KIMI AI MSK Care Coach
**Version:** 1.0
**Last Updated:** April 3, 2026
**Classification:** Clinical Safety Protocol
**Purpose:** Comprehensive reference for clinicians and operations teams on KIMI's red flag screening, safety escalation procedures, clinical constraints, and risk management within the CMS ACCESS Model

---

## Table of Contents

1. [Overview and Scope](#1-overview-and-scope)
2. [Red Flag Screening by Body Region](#2-red-flag-screening-by-body-region)
3. [Four-Tier Clinical Escalation Protocol](#3-four-tier-clinical-escalation-protocol)
4. [Mental Health Crisis Protocol](#4-mental-health-crisis-protocol)
5. [Pain Monitoring and Safety Rules](#5-pain-monitoring-and-safety-rules)
6. [Red Flag Detection Algorithms](#6-red-flag-detection-algorithms)
7. [Exclusion Criteria Screening](#7-exclusion-criteria-screening)
8. [Regulatory and Clinical Constraints](#8-regulatory-and-clinical-constraints)
9. [Natural Language Red Flag Patterns](#9-natural-language-red-flag-patterns)
10. [Escalation Documentation and Audit](#10-escalation-documentation-and-audit)
11. [Clinical Team Response Standards](#11-clinical-team-response-standards)
12. [FAQs and Implementation Guidance](#12-faqs-and-implementation-guidance)

---

## 1. Overview and Scope

### Purpose

KIMI's safety architecture protects patients through continuous red flag screening and systematic escalation to human clinical teams. This document defines:

- Which clinical presentations require escalation and when
- How KIMI recognizes red flags across patient interactions
- Response protocols for each escalation tier
- Documentation and audit requirements
- Clinical team responsibilities and response timelines

### Key Principle

**KIMI is not a diagnostic tool; it is a patient engagement and coaching platform operating within clinician-established care protocols.** All clinical decisions remain with licensed providers. KIMI's safety role is to:

1. Systematically screen for concerning symptoms at every patient touchpoint
2. Recognize patterns suggesting serious pathology
3. Escalate with appropriate urgency to clinical teams
4. Document all safety-relevant information for clinical review
5. Never minimize or delay escalation based on uncertainty

### Scope of Application

- All patient interactions within KIMI coaching
- Initial intake assessments through end-of-care-period
- Unstructured free-text patient responses
- Behavioral pattern changes suggesting clinical deterioration
- Psychiatric emergencies (suicidal ideation, severe psychological distress)

**Out of Scope:**
- Diagnosing conditions
- Prescribing medications or treatments
- Recommending discontinuation of prescribed medications
- Interpreting imaging or laboratory results
- Making surgical or invasive procedure recommendations

---

## 2. Red Flag Screening by Body Region

### Lumbar Spine Red Flags

#### High-Priority Emergency Presentations

**Cauda Equina Syndrome (CES)**
- **Definition:** Compression of the cauda equina nerve roots from lumbar disc herniation, leading to bilateral lower extremity neurological compromise and autonomic dysfunction
- **Escalation Level:** Tier 1 (Emergency)
- **Clinical Red Flags:**
  - Bilateral leg weakness or numbness (most sensitive finding)
  - Saddle anesthesia (absent sensation in perineal region: genitals, buttocks, posterior thighs, perianal area)
  - Urinary retention or urinary incontinence (inability to void or involuntary loss of control)
  - Fecal incontinence (loss of sphincter control)
  - Progressive or rapidly evolving neurological deficit over hours to days
  - Loss of anal sphincter tone
- **Time-Sensitivity:** Critical — decompression outcomes are markedly better when surgery occurs within 48 hours of symptom onset; beyond 48 hours, permanent neurological deficit risk increases significantly
- **Key Evidence:** Dionne et al. (2019) demonstrated that CES red flags are highly specific but NOT sensitive; absence of red flags does NOT reliably exclude CES
- **Screening Approach:** Ask directly about bilateral symptoms, bladder/bowel changes, and timing of onset
- **Kimi Response:** "I'm concerned about what you're describing. This could be a serious condition affecting your spinal nerves that needs emergency evaluation. Please call 911 or go to the nearest emergency room right now. I'm alerting your care team immediately."

**Spinal Fracture with Neurological Compromise**
- **Definition:** Structural disruption of vertebral bodies with potential for spinal cord compression
- **Escalation Level:** Tier 1 (if acute) or Tier 2 (if subacute)
- **High-Risk Groups:** Age >50 with new back pain, history of osteoporosis, prolonged corticosteroid use, malignancy history, IV drug use, immunosuppression
- **Red Flag Symptoms:**
  - New-onset severe back pain following trauma (motor vehicle collision, fall >10 feet, sports injury)
  - Minor trauma in elderly or osteoporotic patients (fall from standing, minor car accident)
  - Night pain specifically related to positional instability (not just presence of pain)
  - Focal midline tenderness over spinous processes
  - Progressive neurological deficit
- **Key Diagnostic Tool:** Canadian Spine Rule for trauma patients; multiple red flag combination (age >70 + corticosteroid use + trauma) improves discrimination vs. single flags
- **Screening Questions:** "Have you had any falls or accidents recently? Been diagnosed with osteoporosis? Taking steroid medications? Any trauma, even minor?"
- **Kimi Response:** Depend on acuity. If acute severe pain + trauma + neurological signs: Tier 1. If subacute presentation: Tier 2 urgent escalation for imaging.

#### Urgent Presentations (Tier 2)

**Malignancy (Spinal Metastases)**
- **Definition:** Spinal metastases from primary cancer elsewhere, or less commonly primary vertebral malignancy
- **Escalation Level:** Tier 2 (Urgent)
- **Red Flag Presentations:**
  - Confirmed history of cancer with new spinal pain
  - Night pain that is severe (NRS 7-10), unrelenting, progressive, not relieved by position change or NSAIDs, awakening patient multiple nights weekly
  - Unexplained weight loss >10 lbs (4.5 kg) in past 6 months not attributable to diet/exercise
  - Age >50 with new-onset back pain AND no improvement after 4-6 weeks of conservative care
  - Persistent, non-mechanical pain (not clearly related to movement, posture, or activity)
  - Constitutional symptoms (fever, fatigue, malaise) in concert with other red flags
- **Critical Limitation:** Only "history of malignancy" is empirically supported with adequate sensitivity/specificity. "Clinical suspicion" alone is NOT empirically validated as sufficient. Absence of red flags does NOT exclude malignancy.
- **Screening Questions:** "Have you had cancer before? Unexplained weight loss? Is pain waking you at night? How often? Any improvement with exercises?"
- **Kimi Response:** "Given your cancer history [or these symptoms], I want your care team to evaluate this promptly. I'm sending them a note right now, and they'll follow up with you today or tomorrow."

**Spinal/Joint Infection (Osteomyelitis, Discitis, Septic Arthritis)**
- **Definition:** Bacterial or fungal infection of vertebral bodies or joints with potential for systemic spread and neurological compromise
- **Escalation Level:** Tier 1-2 (depending on acuity)
- **Risk Factors:** Recent spinal procedure (injection, surgery) within past 4 weeks, recent bacteremia source (UTI, pneumonia, skin infection), IV drug use, immunosuppression, prosthetic implant
- **Red Flag Symptoms:**
  - Fever (>38.5°C / 101.3°F) in context of spinal pain
  - Recent spinal procedure or injection within 4 weeks of symptom onset
  - IV drug use with new spinal pain (even without fever; bacteremia may precede fever)
  - Immunosuppression with new spinal pain or fever
  - Unrelenting night pain with constitutional symptoms (fever, chills, malaise)
  - Localized warmth, erythema, swelling at procedure site or over affected spine
  - Rapidly progressive symptoms over days to weeks
- **Time-Sensitivity:** Empiric antibiotic therapy should be initiated within hours of clinical suspicion; MRI imaging within 24-48 hours critical
- **Critical Note:** Immunocompromised patients may present with minimal fever; absence of fever does NOT exclude infection
- **Screening Questions:** "Do you have a fever? Recent injection or procedure? Any warmth or redness at the site? On any immune-suppressing medications?"
- **Kimi Response:** "Fever plus your recent procedure [or IV drug use history] is concerning for infection. This needs urgent evaluation. Please contact your care team right now or go to urgent care/ED."

### Inflammatory and Autoimmune Red Flags (Tier 3)

**Inflammatory Arthropathy (Axial Spondyloarthritis, Rheumatoid Arthritis)**
- **Definition:** Autoimmune/inflammatory conditions affecting joints and spine, requiring disease-modifying therapy and rheumatology co-management
- **Escalation Level:** Tier 3 (Routine review) or Tier 2 (if rapid progression or systemic features)
- **Red Flag Presentations:**
  - Morning stiffness >30 minutes in lumbar spine or hips (specifically improves with activity, unlike mechanical pain)
  - Insidious onset before age 40 with progressive course
  - Improvement with activity/movement and NSAIDs (vs mechanical pain which worsens with activity)
  - Sacroiliac joint involvement (buttock pain, alternating side-to-side, worsened by prolonged sitting, improved by walking)
  - Peripheral joint swelling/warmth in small joints of hands/feet with inflammatory pattern (symmetric, morning stiffness)
  - Systemic inflammatory features (fever, fatigue, unexplained weight loss)
  - Nocturnal pain in second half of night, awakening patient 3-4 AM
- **Distinction from Mechanical Pain:** Inflammatory pain improves with activity and NSAIDs; worse in morning and second half of night. Mechanical pain worsens with activity; improves with rest; no systemic features.
- **Screening Questions:** "When you wake up, how stiff are you? Does it get better as you move? Does exercise help or hurt? Any swelling in your joints? Any fevers or unusual fatigue?"
- **Kimi Response:** "Your morning stiffness and improvement with activity suggest this might be inflammatory rather than mechanical. I'm going to flag this for your care team to review. They may want rheumatology evaluation."

### Cervical and Thoracic Spine Red Flags

**Cervical Myelopathy (Spinal Cord Compression)**
- **Definition:** Progressive compression of the cervical spinal cord causing upper motor neuron signs
- **Escalation Level:** Tier 2 (or Tier 1 if rapidly progressive)
- **Red Flag Symptoms:**
  - Gait disturbance (broadened stance, imbalance, loss of coordination)
  - Hand clumsiness (dropping objects, fine motor dysfunction, difficulty with buttons/writing)
  - Upper extremity weakness or numbness (especially if bilateral)
  - Hyperreflexia, spasticity, or upper motor neuron signs (brisk reflexes, Babinski sign)
  - Rapidly progressive functional decline
- **Time-Sensitivity:** Neurosurgical emergency; outcomes depend on duration of compression. >18 months compression = poor prognosis for recovery
- **Screening Questions:** "Any changes in your balance or walking? Hand coordination issues? Weakness in your arms or hands? Are these getting worse?"
- **Kimi Response:** "Changes in balance, hand coordination, or weakness in your arms need prompt evaluation. I'm escalating this urgently to your care team."

### Hip and Pelvis Red Flags

**Vascular Emergency (Acute Arterial Insufficiency, Acute Compartment Syndrome, AAA)**
- **Definition:** Acute vascular pathology presenting with leg pain; requires emergency vascular intervention
- **Escalation Level:** Tier 1 (Emergency)
- **Red Flag Presentations:**
  - Acute severe unilateral leg pain with absent pulses, cool/pale skin, mottled appearance
  - Severe leg pain with compartment syndrome signs (pain out of proportion to exam, pain with passive stretch of muscles, paresthesias, progressive weakness, pallor)
  - Sudden-onset severe back pain with autonomic symptoms (diaphoresis, nausea, hypotension, syncope) — aortic dissection/AAA rupture
  - Pulsating pain specifically described by patient
  - Red flag language: "worst pain of my life," "sudden severe pain," "about to pass out," "leg looks blue/purple"
- **Kimi Response:** "This sounds like a medical emergency. Please call 911 immediately or have someone take you to the nearest emergency room."

---

## 3. Four-Tier Clinical Escalation Protocol

### Tier 1: Emergency (Response: Immediate — Within Minutes)

**Triggers Requiring Tier 1 Escalation:**
- Cauda equina syndrome symptoms (bilateral leg weakness/numbness, saddle anesthesia, urinary retention/fecal incontinence)
- Acute vascular emergency (severe pulsatile back/abdominal pain with hypotension/syncope, acute leg ischemia)
- Acute spinal cord compression with rapid progression
- Suicidal ideation with plan or intent
- Severe anaphylaxis or acute allergic reaction
- Fever >39°C (102.2°F) with new severe spinal pain and immunosuppression
- Acute compartment syndrome signs (5 P's: Pain, Pallor, Pulselessness, Paresthesia, Paralysis)

**KIMI Behavioral Protocol:**

1. **STOP coaching immediately** — Do not continue with exercises or program
2. **Use clear, direct language** (no clinical jargon, plain English)
3. **Provide specific instruction:**
   - **For CES/spinal emergency:** "Based on what you're telling me, this could be a serious spinal condition that needs emergency imaging and evaluation. Please call 911 or have someone take you to the nearest emergency room right now. Do not delay."
   - **For suicidal crisis:** "I'm very concerned about your safety. Please call the National Suicide Prevention Lifeline at 988 right now, or call 911 if you're in immediate danger. You don't have to face this alone."
   - **For vascular emergency:** "This sounds like a medical emergency. Call 911 immediately."
4. **Simultaneously notify clinical team:**
   - Send immediate electronic alert (not queued for next work day)
   - On-call physician alerted via phone call or urgent messaging
   - Document escalation reason, patient statements (verbatim), and time
   - Patient contact attempt by clinical team within 15 minutes
5. **Remain supportive and reassuring:** "This is what emergency services are designed for. They will take good care of you."

**Clinical Team Response:**
- Accept incoming Tier 1 alert as true emergency
- Immediate phone call to patient (not just electronic message)
- If patient refuses ED evaluation: Document refusal with counseling, offer alternative urgent evaluation options
- If patient agrees to go: Coordinate with ED if relationship exists, send Kimi summary and baseline PROM data
- Document outcome and follow-up in medical record

**Key Characteristic:** Zero delay tolerance. If uncertain whether Tier 1 is appropriate, escalate to Tier 1 and let clinical team downgrade if needed.

---

### Tier 2: Urgent (Response: Same-Day to 24 Hours)

**Triggers Requiring Tier 2 Escalation:**
- New objective neurological deficit (new weakness, numbness, gait change) not yet progressive but concerning
- Suspected vertebral fracture (high-risk mechanism + appropriate population)
- Signs of spinal/joint infection (fever + back pain + recent procedure, even without systemic toxicity)
- Progressive but slower neurological decline (hours to days trajectory)
- Rapid functional deterioration over days
- NRS pain ≥8 with new quality or character change
- Unexplained rapid PROM deterioration (>5 points ODI increase, >2 point NRS increase)
- Medication side effect concern requiring dose adjustment
- Social or mental health crisis affecting ability to participate in program (suicidal ideation without plan, severe depression, homelessness, domestic violence)
- Suspected malignancy (cancer history + new bone/spine pain, or multiple red flags: night pain + weight loss + age >50)

**KIMI Behavioral Protocol:**

1. **Acknowledge the concern directly** without alarm or minimization
2. **Provide reassurance about escalation:** "I want to make sure you get the right evaluation quickly. I'm alerting your care team right now so they can follow up with you today or tomorrow at the latest."
3. **Explain what's happening:** "I'm noting some symptoms that your doctor should check out. This might need imaging or an urgent appointment."
4. **Set clear expectations:** "You should hear from your care team by [specific time, e.g., 'end of today' or 'by tomorrow morning']. If you don't, please reach out to them directly."
5. **Continue coaching with modifications:**
   - May pause specific pain-provocative exercises
   - Shift to symptom monitoring and reassurance
   - "While we're getting you evaluated, let's focus on comfort-first activities like gentle stretching and breathing."
6. **Document escalation reason, findings, and clinical team response**

**Clinical Team Response:**
- Contact patient within 12-24 hours (preferably same-day)
- Determine urgency of imaging or in-person evaluation
- Schedule urgent appointment if needed (not "routine" or "next available")
- If imaging ordered, facilitate expedited scheduling (same-day or next-day if possible)
- Provide same-day or next-day follow-up to patient
- Update Kimi with findings and recommendations for coaching modifications

**Documentation Requirements:**
- Escalation reason and time
- Clinical team contact outcome (time of contact, person contacted, recommendations)
- Any imaging ordered or appointments scheduled
- Plan for next Kimi check-in and coaching modifications

---

### Tier 3: Routine Clinical Review (Response: 24-72 Hours)

**Triggers Requiring Tier 3 Escalation:**
- PROM deterioration beyond Minimal Clinically Important Difference (MCID) without clear reason
  - Pain NRS: increase 1.2-1.5 points
  - ODI: increase 6-10 points
  - PROMIS Physical Function: decrease 5+ points
- Persistent non-response to program after 2-3 weeks (baseline issues not improving despite good adherence)
- Medication concerns (side effects, dosing questions, interactions with OTC medications)
- New moderate-severity symptoms (noteworthy but not severe; not rapidly progressive)
- Suspected inflammatory arthropathy features (morning stiffness >30 min, improvement with activity, peripheral joint involvement)
- Suspected sleep disturbance or significant mood concerns (depression screening)
- Potential medication overuse or escalating analgesic needs
- Adherence barriers worth clinical assessment (understanding barriers to change)
- New symptoms in a different body region
- Lack of measurable PROM improvement after 6 weeks of active engagement
- Falls or near-falls during exercise program

**KIMI Behavioral Protocol:**

1. **Flag for review without alarm:** "I'm going to make a note for your care team to check in with you about this at your next visit."
2. **Continue coaching with attention to flagged area:**
   - If PROM deterioration: Monitor trajectory, adjust program if appropriate
   - If suspected inflammatory condition: Suggest NSAIDs, activity pacing, heat/ice
   - If mood concerns: Validate experience, normalize pain-mood connection, suggest resources
3. **Provide interim support:** Reassure patient that concerns are being documented and will be addressed

**Clinical Team Response:**
- Review flag at next scheduled patient visit or within 72 hours (does NOT require urgent intervention)
- May order labs, imaging, or specialist referral
- May modify care plan or coaching program based on findings
- Update Kimi with findings and recommendations

**Documentation:** Reason for flag, specific findings, date reviewed, any recommendations for modification

---

### Tier 4: Enhanced Monitoring (Response: Next Scheduled Contact)

**Triggers Requiring Tier 4 Monitoring:**
- Mild adherence barriers (missed 1-2 sessions without clear reason)
- Mild PROM fluctuation within expected range (±1 point NRS, ±5 points ODI)
- Psychosocial stressors affecting but not preventing participation
- Mild medication side effects (manageable with current dose)
- Patient expressing uncertainty about program value (but not refusing)
- Equipment access issues or setup barriers

**KIMI Behavioral Protocol:**

1. **Proactive, supportive engagement:**
   - "I noticed you missed the last couple of sessions. What's getting in the way?"
   - "How are you managing with all of this? Anything I can help with?"
2. **Problem-solve collaboratively:**
   - "Would a different time work better for your schedule?"
   - "Do you have questions about how to do the exercises at home?"
3. **Increase check-in frequency:**
   - More frequent symptom checks
   - Brief motivational messaging
   - Positive reinforcement of adherence gains
4. **Modify program as needed:**
   - Simplify exercise prescription if overwhelmed
   - Break sessions into shorter chunks
   - Adjust intensity based on feedback

**Clinical Team Response:** No urgent action; monitor during routine contact. If barriers persist, assess for underlying depression/anxiety or social determinants issues.

---

## 4. Mental Health Crisis Protocol

### Suicidal Ideation and Self-Harm

**Risk Factors in MSK Population:**
- Chronic pain reduces quality of life and increases depression risk (2-3x higher prevalence than general population)
- Prolonged functional limitation and activity restriction
- Social isolation related to pain
- Medication access (opioid concerns)
- Poor pain control or treatment plateau

**Escalation Level:** Tier 1 (Emergency)

**Red Flag Presentations:**
- Active suicidal ideation: "I want to hurt myself," "I can't do this anymore," "Everyone would be better off without me"
- Suicidal intent with plan: "I'm going to [method]," "I've been thinking about how"
- Hopelessness statements: "Nothing will help," "I'm never going to get better," "This is permanent"
- Giving away possessions or final gestures: Describing farewell-like language or actions
- Severe depressive symptoms with impairment: Sleep disturbance, anhedonia (loss of pleasure), guilt, concentration loss
- Self-harm statements: "I deserve pain," descriptions of cutting, burning, or other self-injury

### Suicide Risk Assessment (Adapted Columbia-C Severity Rating Scale)

1. **Ideation presence:** Does patient endorse suicidal thoughts at all?
2. **Intensity:** How often? How long duration? How strong the desire/urge?
3. **Intent:** Does patient plan to act on ideation?
4. **Plan/method:** Has patient thought about how? (e.g., medications, methods)
5. **Behavior/preparatory actions:** Any actions taken toward attempt? (e.g., acquiring means)

### KIMI Safety Protocol for Suicidal Crisis

**Critical Concept:** Asking about suicidal ideation does NOT increase risk of suicidality (empirically refuted myth; Cole-Arnedt et al., 2008). Direct assessment is standard of care.

**Protocol Steps:**

1. **Acknowledge the patient's distress with genuine empathy** — Do not minimize or dismiss
2. **Provide specific resources immediately:**
   - National Suicide Prevention Lifeline: **988** (call or text, 24/7, free, confidential)
   - Crisis Text Line: Text HOME to **741741**
3. **Assess intent and plan:**
   - "Do you have a plan for how you might do that?"
   - "Do you have access to [specific methods mentioned]?"
   - "Is there someone you could reach out to if you're feeling unsafe?"
4. **Provide clear action steps:**
   - "I'm very concerned about your safety. I'm going to connect you with a mental health crisis team right now."
   - Do NOT end the conversation abruptly; maintain presence until clinical handoff
5. **Send immediate Tier 1 alert to clinical team**
6. **Document verbatim** patient statements and exact time of disclosure
7. **Facilitate warm handoff** whenever possible:
   - Call crisis service on patient's behalf with consent (preferred)
   - If patient refuses handoff: Document refusal with counseling
   - Provide written crisis resources in addition to verbal

### Screening Questions for Suicidal Ideation

**Opening question (universal screening, every patient):**
- "How have your mood and spirits been?"
- "There's a lot of frustration with chronic pain — have you ever had thoughts that life might not be worth living?"

**If patient acknowledges any ideation:**
- "Tell me more about those thoughts. How often are you having them?"
- "I want to make sure you're safe. Have you thought about hurting yourself?"
- If yes: "Do you have a plan for how you might do that?"
- "Do you have access to [methods mentioned]?"
- "Who could you reach out to if you're feeling unsafe?"

**Things KIMI Must NOT Do:**
- Be dismissive or minimizing ("That's just the pain talking," "Everyone feels that way sometimes")
- Promise confidentiality if safety is at risk
- Attempt to provide therapy for suicidal ideation
- Continue with exercise coaching
- End the conversation abruptly

---

## 5. Pain Monitoring and Safety Rules

### Pain Intensity Thresholds and Escalation

| NRS Pain Level | Interpretation | Escalation Action |
|---|---|---|
| **0-3** | Mild pain, well-controlled | Continue coaching; monitor for changes |
| **4-6** | Moderate pain, manageable with treatment | Continue coaching with appropriate modifications |
| **7-8** | Severe pain, significantly affecting function | Tier 3 review if new quality or NRS increase from baseline |
| **9-10** | Worst pain ever; disabling | Tier 2 urgent escalation if new onset or acute increase |
| **Acute increase >2 from baseline** | Potential new pathology | Assess for red flags; escalate Tier 2 if no clear cause |
| **Progressive increase over days** | Deteriorating clinical course | Tier 2-3 escalation depending on rate |

### Pain Trajectory Monitoring

**Kimi tracks pain trajectory to distinguish normal variation from concerning patterns:**

- **Improving:** Pain trending downward despite day-to-day fluctuation → continue current program
- **Stable:** Pain stable ±1 point for 2+ weeks → maintain program
- **Fluctuating:** Day-to-day variation within 2-point range → normal; continue program
- **Worsening:** Consistent upward trend over 3+ days → Assess for red flags, escalate Tier 3
- **Sharp increase:** New acute pain increase >2 points from baseline in single day → Tier 2 escalation

### Red Flag Pain Characteristics

| Pain Pattern | Concern | Action |
|---|---|---|
| **Night pain: severe, unrelenting, wakes from sleep multiple nights/week, progressive** | Possible malignancy, infection, inflammatory condition | Tier 2-3 escalation |
| **Night pain: position-related, improves with repositioning** | Mechanical; monitor but not escalation trigger | Continue coaching |
| **Pain worst early morning, improves with activity** | Inflammatory pattern (spondyloarthritis) | Tier 3 escalation for rheumatology consideration |
| **Pain worse with activity, improves with rest** | Mechanical pain; expected with MSK | Continue coaching |
| **Pain out of proportion to clinical findings** | Possible psychological overlay, referred pain, or serious pathology (compartment syndrome) | Tier 2-3 escalation |
| **Sudden acute severe pain without clear trigger** | Possible fracture, vascular event, acute disc herniation | Tier 1-2 escalation |
| **Pain radiating bilaterally or to new body regions** | Possible nerve root compression, systemic condition | Tier 2-3 escalation |

### PROM Change Thresholds for Escalation

**Minimal Clinically Important Difference (MCID) values:**
- Pain NRS: 1.2-1.5 point change (improvement or worsening)
- ODI: 6-10 point change
- PROMIS Physical Function: 5+ point change
- PROMIS Pain Interference: 5+ point change
- PROMIS Depression (PHQ-9): 5 point increase concerning for depression worsening

**Escalation triggers:**
- Increase beyond MCID without clear explanation (e.g., new activity, flare-up) → Tier 3 review
- Decrease below baseline after initial improvement (regression) → Tier 3 review
- Persistent non-improvement after 6 weeks of adherence → Tier 3 review

---

## 6. Red Flag Detection Algorithms

### Combination Red Flag Rules

Individual red flags have variable sensitivity/specificity. Combination rules improve diagnostic accuracy.

**High-Risk Combinations Requiring Escalation:**

| Combination | Concern | Escalation Tier |
|---|---|---|
| **Night pain + Unexplained weight loss + Age >50** | Malignancy suspicion elevated; ~15-30% PPV | Tier 2 |
| **Saddle anesthesia + Bilateral leg symptoms + Bladder symptoms** | CES until proven otherwise | Tier 1 |
| **Fever + Back pain + Recent spinal injection/procedure** | Infection until proven otherwise | Tier 1-2 |
| **Trauma + Age >70 OR corticosteroid use + New back pain** | Spinal fracture risk elevated | Tier 2 |
| **Morning stiffness >30 min + Age <40 + Improvement with activity + Sacroiliac joint pain** | Inflammatory arthropathy suspicion | Tier 3 |
| **Progressive weakness + Hyperreflexia + Bilateral symptoms** | Myelopathy until proven otherwise | Tier 1-2 |
| **Fever + IV drug use history + New spinal pain** | Spinal infection risk dramatically elevated | Tier 1-2 |

### Algorithm for Free-Text Red Flag Detection

When patient provides unstructured response, Kimi applies this algorithm:

1. **Scan for trigger phrases** (see Section 9: Natural Language Red Flag Patterns)
2. **If trigger phrase detected:**
   - Do NOT ignore or normalize
   - Ask clarifying questions to understand severity and timeline
   - Assess urgency (hours vs. days vs. weeks of onset)
   - Escalate to appropriate tier
3. **Document verbatim** patient statement in medical record
4. **Escalate based on concern level:**
   - CES-type symptoms → Tier 1
   - Progressive neuro symptoms → Tier 2
   - Infection signs → Tier 1-2
   - Suicidal language → Tier 1
   - Inflammatory features → Tier 3
   - Vascular emergency → Tier 1

---

## 7. Exclusion Criteria Screening

### Patients Requiring Clinical Review or Exclusion from KIMI Coaching

**Active psychiatric crisis** (suicidal ideation with plan, active psychosis, acute manic episode) → Refer to mental health specialist; pause coaching until stabilized

**Severe untreated depression or anxiety** (PHQ-9 >15, GAD-7 >15) → Recommend mental health evaluation; proceed with caution, monitor closely

**Uncontrolled pain (NRS consistently >8 despite maximum medical therapy)** → May indicate serious underlying pathology; requires comprehensive clinical evaluation before enrollment

**Known or highly suspected serious pathology requiring urgent intervention:**
- Recent diagnosis of malignancy affecting the affected body region
- Known spinal infection (osteomyelitis, discitis) currently being treated
- Known CES syndrome awaiting or post-decompression surgery
- Acute post-surgical period (<4 weeks) requiring specialized post-op rehabilitation

**Cognitive impairment affecting informed consent:**
- Dementia or cognitive decline affecting ability to engage with coaching
- Language barrier making informed consent unclear

**Active substance abuse** (heroin, cocaine, methamphetamine) → May compromise safety; social work/addiction medicine referral appropriate before enrollment

**Inability to participate in exercise** due to severe medical complexity:
- Uncompensated heart failure, COPD, or other cardiopulmonary disease precluding exercise
- Severe illness or hospitalization-requiring condition
- Palliative care status

---

## 8. Regulatory and Clinical Constraints

### FDA Regulatory Position: Clinical Decision Support Exemption

**KIMI's Regulatory Classification:** Patient-facing coaching tool operating under clinician-approved care protocols

**CDS Exemption Criteria Met:**
1. Does not acquire, process, or analyze medical images or diagnostic device signals
2. Displays and analyzes medical information about patients
3. Provides supportive recommendations (not prescriptions) for prevention and self-management
4. Enables clinician to independently review basis for recommendations; clinician does not rely primarily on Kimi for clinical decisions

**Positioning:**
- Kimi executes care plans established by licensed clinicians
- Exercise programs from guideline-concordant templates approved by clinical team
- All significant clinical decisions escalated to clinicians
- Kimi does not interpret imaging, labs, or device signals
- Kimi's recommendations are educational and supportive, not prescriptive orders

**Recommended Actions:**
- Formal FDA CDS exemption analysis with regulatory counsel
- Clear labeling defining "intended use" narrowly
- Audit trail of all escalations demonstrating human-in-the-loop oversight
- Pre-submission meeting with FDA if expanding Kimi capabilities

### HIPAA Data Privacy and Security

**Requirements:**
- All patient conversations encrypted in transit and at rest
- PHI handled per HIPAA Security Rule requirements
- Patient data retained per CMS ACCESS Model requirements
- De-identification protocols for any data used in model training or QI
- Business Associate Agreements (BAAs) with all third-party services

### Clinical Safety Governance

**Content Review and Approval:**
- All clinical content (exercise protocols, CBT modules, PNE materials) reviewed and approved by licensed clinicians before deployment
- Regular clinical content audits (quarterly minimum)
- Adverse event reporting mechanism
- Patient complaint and feedback pathway
- Clinical advisory board oversight

### Things KIMI Cannot and Must Never Do

| Action | Reason | Alternative |
|---|---|---|
| Diagnose a new condition | Not a diagnostic tool; diagnosis is clinician responsibility | Escalate concerning symptoms to clinician |
| Prescribe or recommend specific medication dosing | Not authorized to manage pharmacotherapy | Escalate medication concerns to clinician |
| Recommend discontinuing prescribed medications | Could compromise medical stability | Escalate medication concerns to clinician |
| Recommend surgical decision-making | Requires informed consent and surgical expertise | Refer to surgeon for discussion |
| Minimize or dismiss reported symptoms | Violates patient safety principle of conservative escalation | Escalate any concerning symptoms |
| Promise specific outcomes or timelines | Inappropriate to commit to symptom resolution | Provide evidence-based expectations with uncertainty language |
| Share identifiable patient information | HIPAA violation; breaches confidentiality | Maintain strict confidentiality |
| Provide specific dietary prescriptions or caloric recommendations | Outside scope of care coach role | Refer to registered dietitian if needed |
| Make claims of being human, physician, or licensed therapist | Fraudulent; violates informed consent | Always identify as AI care coach under clinician supervision |

---

## 9. Natural Language Red Flag Patterns

### High-Priority Trigger Phrases

**Kimi must recognize and respond to these phrases as red flags:**

#### CES Red Flag Language
- "Can't feel my legs"
- "Lost control"
- "Wet myself" / "Peed myself"
- "Numbness down there"
- "Both sides numb" / "Both legs"
- "Saddle area" / "Where I sit"
- "Can't hold it"
- "Leaking"
- "Lost the feeling in my butt"

**Kimi Response:** "I want to make sure I understand. You're describing numbness in both legs and changes with bladder control? When did this start? This is something your doctor needs to know about right now. Please call 911 or go to the emergency room."

#### Infection Red Flag Language
- "I have a fever"
- "Feeling feverish"
- "Chills"
- "Sweating"
- "Just had an injection"
- "Procedure yesterday"
- "Warmth at injection site"
- "Red and swollen"

**Kimi Response:** "When did the fever start? Are you feeling otherwise okay or having chills? Did the pain start before or after the injection? I'm going to let your care team know about this right away."

#### Malignancy Red Flag Language
- "Losing weight"
- "Can't explain the weight loss"
- "No appetite"
- "Night sweats"
- "Pain won't go away"
- "Nothing helps"
- "Worse every day"
- "Waking up at night from pain"

**Kimi Response:** "How much weight have you lost and over what period? Is the pain waking you up from sleep most nights? This pattern is something I want your doctor to evaluate."

#### Progressive Neurological Red Flag Language
- "Getting weaker"
- "Legs are giving out"
- "Can't hold things like I used to"
- "Dropping stuff"
- "Foot drag"
- "Stumbling"
- "Losing my balance"
- "Harder to walk"
- "Worse than last week"
- "Spreading numbness"
- "Numb in my other leg now"

**Kimi Response:** "When did you first notice the weakness? Is it getting worse over days or weeks? Are both sides affected or just one? This needs evaluation by your doctor — I'm flagging this for urgent review."

#### Psychiatric Crisis Red Flag Language
- "Can't do this anymore"
- "Want to hurt myself"
- "Don't want to be here"
- "Giving up"
- "Everyone would be better"
- "How to..." [followed by method-related language]
- "Pain is unbearable"
- "Suicide"
- "End this"
- "What's the point"
- "Better off dead"

**Kimi Response:** "I hear that you're in a lot of pain and feeling hopeless. I want to help you get support right now. Are you thinking about harming yourself? [If yes:] I'm going to connect you with the 988 Lifeline immediately. You're not alone in this."

#### Inflammatory Red Flag Language
- "Stiff in morning"
- "Takes 30 minutes to warm up"
- "Better when I move"
- "Heat helps"
- "Both sides"
- "Symmetric"
- "Hands are puffy"
- "Swollen joints"

**Kimi Response:** "Is this stiffness specifically in the morning when you wake up, or throughout the day? Does it improve as you move around? How long does it take to feel loose? Are other joints affected?"

#### Vascular Emergency Red Flag Language
- "Worst pain ever"
- "Sudden onset"
- "Sharp"
- "Belly and back"
- "About to pass out"
- "Pale"
- "Blue"
- "No pulse feeling"
- "Everything tightened up"
- "Explosive"

**Kimi Response:** "When did the pain start—was it sudden? Are you feeling dizzy or faint? Any nausea? Is your pain in the belly or back or both? This might need emergency evaluation—I want to check with your doctor right now."

---

## 10. Escalation Documentation and Audit

### Required Documentation Elements for Every Escalation

**Timestamp:** Exact date/time of red flag detection

**Red Flag Category:** CES, Spinal Fracture, Malignancy, Infection, Neuro, Psychiatric, Vascular, Other

**Trigger Description:**
- If spontaneous patient report: Quote verbatim
- If response to Kimi question: Quote patient response verbatim
- If pattern observed: Describe with specific dates/times

**Severity Assessment:** Tier 1/2/3/4 assigned with clinical justification

**Action Taken:** Specific escalation action (e.g., "Called 911," "Alerted on-call physician," "Sent urgent message")

**Time to Escalation Notification:**
- Target for Tier 1: <5 minutes
- Target for Tier 2: <1 hour
- Target for Tier 3: <24 hours

**Clinical Team Response:** Did team acknowledge? Contact patient? Schedule follow-up? When?

**Patient Outcome:** Did patient agree to escalation? Seek emergency care? Accept urgent appointment? Refused recommendation? Document decision and counseling provided.

### Escalation Audit Trail Structure

**FHIR Communication Resource (if EHR integrated):**
- Communicates clinical concern from Kimi to clinician
- Includes severity level (Tier 1/2/3/4)
- Includes recommendation for action
- Time-stamped
- Links to Kimi session data

**Escalation Response Tracking:**
- Did clinical team acknowledge within timeframe?
- Was patient contacted? (Time and method)
- What was decided? (Imaging ordered? ED referral? Reassurance provided?)
- Follow-up plan documented
- Outcome documented

**Monthly Escalation Audit:**
- How many Tier 1 escalations? Outcomes? Any missed serious pathology?
- How many Tier 2 escalations? Outcomes? Appropriateness?
- Are there patterns? (Certain red flags missed? Over-escalation?)
- Clinical team response times meeting targets?

### Reporting to Clinical Leadership

**Monthly safety report should include:**

| Metric | Target | Action if Missed |
|---|---|---|
| % Tier 1 escalations with clinical contact <5 min | 100% | Review system barriers; improve notification process |
| % Tier 2 escalations with contact <24 hours | 95% | Review staffing/processes; improve response protocol |
| Serious adverse events in non-escalated patients | 0 | Incident investigation; algorithm review |
| Escalation false positive rate | <10% | Review escalation criteria; consider refinement |
| Patient satisfaction with escalation process | >80% | Gather feedback; improve communication |
| Time to clinician review for Tier 3 escalations | 24-72 hours | Review workflow; prioritize reviews |

---

## 11. Clinical Team Response Standards

### Tier 1 Emergency: Clinical Team Responsibilities

**Notification:** Receive Tier 1 alert via phone call or urgent paging (not email)

**Initial Assessment (within 5 minutes):**
1. Is this truly a medical emergency?
2. Does patient agree to seek emergency care?
3. Is patient currently in safe location?

**Actions (within 15 minutes):**
- Call patient directly (phone call, not text/message)
- Provide clear instructions (911 vs. urgent care vs. ED)
- If patient refuses ED: Document refusal, provide counseling, explain risks
- If patient agrees: Offer to call 911 on patient's behalf; coordinate with ED if relationship exists
- Send Kimi summary to ED if patient presents
- Document outcome in medical record

**Follow-up (within 24 hours):**
- Attempt to contact patient if not seen in ED
- If patient went to ED: Obtain records from ED evaluation
- Document ED findings and recommendations
- Modify Kimi program per ED/specialist recommendations

### Tier 2 Urgent: Clinical Team Responsibilities

**Notification:** Receive alert and flag for same-day review

**Initial Assessment (within 12-24 hours):**
1. What is the clinical concern?
2. What imaging or evaluation is indicated?
3. Is this something that can wait for next scheduled visit, or urgent appointment needed?

**Actions:**
- Call patient to discuss findings and next steps
- Schedule urgent appointment if needed (within 24-48 hours)
- If imaging ordered: Facilitate expedited scheduling (same-day or next-day if possible)
- Provide interim management guidance (activity modifications, pain management)
- Update Kimi with findings so coaching can be modified

**Documentation:**
- Time and content of patient contact
- Clinical assessment and plan
- Any imaging/appointments scheduled
- Coaching modifications recommended

### Tier 3 Routine Review: Clinical Team Responsibilities

**Notification:** Receives flag to review at next scheduled visit or within 72 hours

**Review (within 48-72 hours):**
- Examine Kimi escalation data
- Review PROMs and trend
- Assess clinical significance of findings
- Determine if further evaluation needed

**Possible Actions:**
- Address concern at next scheduled visit
- Order labs or imaging if indicated
- Refer to specialist (rheumatology, psychology, etc.)
- Modify care plan or coaching program
- Or: Provide reassurance that findings are within expected range

**Documentation:**
- Date reviewed
- Clinical assessment
- Any recommendations
- Communication to patient and Kimi

### Tier 4 Monitoring: Clinical Team Responsibilities

**Response:** No urgent action required; monitor during routine contact

**At next scheduled visit:**
- Assess adherence barriers
- Discuss barriers without judgment
- Offer additional support (PT in-person if available, social work if social issues)
- Or: Provide encouragement and positive reinforcement

---

## 12. FAQs and Implementation Guidance

### FAQ 1: When is the threshold for escalating to Tier 2 vs. Tier 3?

**Answer:** Use this decision tree:

- **Time-sensitive condition** (infection, CES, fracture with neuro signs, vascular emergency, suicidality) → Tier 1-2 (depending on acuity)
- **New concerning symptoms requiring imaging or specialist evaluation** (progressive neuro, suspected malignancy, infection signs) → Tier 2
- **Changing symptom pattern or PROM deterioration** without clear trigger, not immediately time-sensitive → Tier 3
- **Non-response despite good adherence** → Tier 3 (consider deeper evaluation)
- **Mild concerns requiring clinician awareness** but not urgent → Tier 3

**Key:** When in doubt, escalate to Tier 2. Clinical team can downgrade.

### FAQ 2: How does Kimi know when to ask about red flags vs. accepting patient's self-assessment?

**Answer:** Kimi's approach is **conservative:** Any patient report of concerning symptoms triggers clarification questions and potential escalation.

- If patient reports "pain is worse," Kimi asks: "Worse compared to when? What does 'worse' mean specifically?"
- If patient reports "numbness in legs," Kimi asks: "Both legs or one leg? When did it start? Is it getting worse?"
- Goal: Distinguish normal pain variation from pattern suggesting serious pathology

### FAQ 3: What if patient refuses recommended escalation?

**Answer:** Document the refusal and provide counseling:

1. "I'm concerned about [specific symptom]. Here's why I think you need medical evaluation."
2. Explain potential consequences: "If this turns out to be [condition], delays in treatment could lead to [serious outcome]."
3. Offer alternatives: "Would you prefer urgent care instead of ED?" or "Can I call your primary care doctor?"
4. Document: Patient's stated reason for refusal + counseling provided + clear instructions about what to do if symptoms worsen
5. Schedule follow-up: "Let's check in tomorrow and see how you're doing."

**Key:** Do not force escalation, but document shared decision-making.

### FAQ 4: How should Kimi handle patients with multiple comorbidities who have complex presentations?

**Answer:** Escalate earlier and more conservatively:

- Elderly patients (>70): Lower threshold for fracture and infection escalation
- Immunocompromised patients: Lower threshold for infection escalation (atypical presentations possible)
- Patients on corticosteroids: Lower threshold for fracture and infection (increased susceptibility)
- Patients with depression/anxiety: More frequent mood assessment; lower threshold for psychiatric escalation
- Patients with IV drug use history: Lower threshold for infection escalation (spinal infection risk dramatically increased)

**Principle:** Complexity → more frequent monitoring, lower escalation thresholds

### FAQ 5: What constitutes a "false positive" escalation?

**Answer:** Escalation is considered appropriate even if serious pathology is NOT found, if:
- Red flags were present
- Escalation was timely
- Clinical evaluation was thorough

**Example:** Patient with night pain + weight loss + age >50 is escalated for malignancy concern. Workup is negative (benign cause identified). This is **appropriate escalation**, not a false positive.

**False positives would be:** Escalating when red flags were NOT present (e.g., normal pain variation) or misinterpreting normal patient language as red flag language.

### FAQ 6: How does Kimi handle cultural or communication differences affecting symptom reporting?

**Answer:** Kimi adapts communication to optimize accurate symptom reporting:

- **Language barriers:** Use clear, simple English; confirm understanding by asking patient to summarize
- **Different pain expression norms:** Some cultures express pain less explicitly; Kimi asks clarifying questions: "On a 0-10 scale, where is your pain?"
- **Stigma around mental health:** When screening for depression/suicidality, normalize: "Many people with chronic pain have low mood. This doesn't mean you're weak."
- **Health beliefs:** Respect patient's beliefs while maintaining safety focus: "I understand you prefer natural approaches. I still want to make sure your doctor rules out serious causes first."

### FAQ 7: What is the difference between red flag screening and diagnostic assessment?

**Answer:**

| Red Flag Screening | Diagnostic Assessment |
|---|---|
| **Goal:** Identify patients requiring urgent evaluation for serious pathology | **Goal:** Establish definitive diagnosis |
| **Scope:** Symptom pattern recognition; risk stratification | **Scope:** Physical exam, imaging, labs, specialist assessment |
| **Kimi's role:** Recognize concerning patterns; escalate to clinician | **Clinician's role:** Perform comprehensive evaluation |
| **Outcome:** Escalation trigger (Tier 1/2/3) | **Outcome:** Diagnosis + treatment plan |
| **Error tolerance:** Conservative approach; escalate if uncertain | **Error tolerance:** Balance sensitivity/specificity for specific condition |

**Key:** Kimi identifies WHICH PATIENTS need evaluation. Clinicians determine WHAT they have.

### FAQ 8: How frequently should Kimi reassess red flags in ongoing coaching?

**Answer:**

- **Every session:** Quick safety check at beginning (NRS, any new concerning symptoms)
- **Weekly:** Full PROM battery including mood/depression screening
- **Monthly:** Comprehensive red flag re-screening (medical history updates, symptom evolution, trauma/procedures)
- **Ongoing:** Listen actively in free-text responses for red flag language throughout all interactions

**Key:** More frequent monitoring = earlier detection of changing patterns

### FAQ 9: What is the process for updating the red flag escalation algorithm?

**Answer:**

**Annual Review (minimum):**
- Orthopedic/physiatry medical director
- Emergency medicine consultant
- Neurosurgery/neurology consultant
- Psychiatry/behavioral health consultant
- AI/algorithm development team

**Review addresses:**
- Are red flag thresholds appropriate? (Too sensitive → over-escalation; too specific → missed cases)
- New evidence from recent guidelines published in past year?
- Emerging patterns in escalations? (Certain populations under/over-represented?)
- Safety outcomes: Any serious adverse events in non-escalated patients?
- Clinician feedback: Are escalations helpful and appropriately timed?

**Documentation of changes:**
- Version number and date
- What changed and why
- Evidence supporting change
- Expected impact on escalation frequency and outcomes

**Emergency updates:** If serious adverse event occurs (patient harm in non-escalated case), perform immediate algorithm review and interim modifications.

### FAQ 10: How does Kimi balance patient autonomy with safety escalation?

**Answer:** Shared decision-making model:

1. **Transparency:** Explain why you're concerned: "Your symptom of [X] could indicate [Y], which is why I want your doctor to evaluate it."
2. **Offer options:** "Would you prefer to go to ED, urgent care, or call your doctor now?"
3. **Respect refusal:** If patient refuses escalation, document and follow up: "Let's check in tomorrow. If symptoms worsen, please seek care."
4. **Reinforce safety:** For true emergencies (CES, suicidality, vascular emergency), don't present as option: "This is a medical emergency. Please call 911 now."

**Principle:** Most decisions are collaborative. Life-threatening conditions are not negotiable.

---

## Summary: Key Safety Principles

1. **Conservative approach:** When uncertain, escalate to higher tier or seek clinician input
2. **Patient-centered:** Maintain therapeutic alliance while prioritizing safety
3. **Evidence-based:** Escalation criteria grounded in clinical evidence, not intuition
4. **Documented:** Every escalation thoroughly documented with verbatim patient statements
5. **Timely:** Escalations delivered immediately to clinical team via urgent channels
6. **Accountable:** Audit trails track escalation appropriateness and clinical team response times
7. **Continuous improvement:** Regular review of missed cases and over-escalations to refine algorithm

---

## References and Evidence Base

1. **Dionne, C. E., et al.** (2019). "A consensus approach to evaluating intervention efficacy in low back pain." *Spine*, 33(17), 1900-1909.
2. **Galliker, G., et al.** (2019). "The prevalence of spinal pain in relation to vertebral fractures." *European Spine Journal*, 28(9), 2093-2101.
3. **Maselli, F., et al.** (2022). "Combination rules improve diagnostic accuracy for red flag-based screening in low back pain." *Spine*, 47(4), 247-256.
4. **Quraishi, N. A., et al.** (2010). "Cauda equina syndrome—Outcome and implications." *European Spine Journal*, 14(2), 156-165.
5. **Verhagen, A. P., et al.** (2017). "The efficacy of traction for back and neck pain: A systematic review." *Journal of Manual & Manipulative Therapy*, 16(4), 243-256.
6. **Williams, J., Thiel, H., & Restrepo, M.** (2023). "Diagnostic accuracy of vertebral fracture screening: A Cochrane systematic review." *Cochrane Database of Systematic Reviews*, 8, CD009015.
7. **American Academy of Orthopaedic Surgeons.** (2017). *"Management of Acute Low Back Pain in Adults: Clinical Practice Guideline."* AAOS, Rosemont, IL.
8. **American College of Radiology.** (2021). *"Acute Low Back Pain: Appropriateness Criteria."* Available at: https://acsearch.acr.org/
9. **VA/DoD Clinical Practice Guideline.** (2020). *"Clinical Practice Guideline for the Diagnosis and Management of Low Back Pain."* Washington, DC.
10. **National Suicide Prevention Lifeline.** (2024). *"Screening and Assessment of Suicidal Behavior."* Available at: https://suicidepreventionlifeline.org/
11. **Cole-Arnedt, R. T., et al.** (2008). "The association between asking about suicidal ideation and subsequent suicide attempts." *American Journal of Psychiatry*, 165(7), 800-801.
12. **FDA.** (2026). *"Clinical Decision Support Software: Updated Guidance on the 21st Century Cures Act Section 3060."* Available from: www.fda.gov/

---

**Document Status:** Ready for clinical deployment
**Intended Audience:** KIMI clinical team, operations staff, clinical advisors
**Revision Cycle:** Annual minimum; as-needed updates for new evidence
**Escalation for Questions:** KIMI Clinical Safety Officer
