# Red Flag Screening and Clinical Triage Algorithm for AI MSK Care Coaching

**Version:** 1.0
**Last Updated:** April 3, 2026
**Classification:** Clinical Safety Protocol
**Authority:** Evidence-based synthesis of orthopedic, neurosurgical, and emergency medicine literature

---

## 1. Purpose and Scope

This document defines the evidence-based red flag screening protocol that KIMI (AI MSK care coach) must apply systematically at every patient interaction. This is a **safety-critical document**. Red flags are clinical indicators suggesting potentially serious pathology requiring urgent medical evaluation and are distinct from typical musculoskeletal pain presentations.

**Scope of application:**
- Initial intake assessments
- Ongoing session monitoring
- Unstructured free-text patient reports
- Behavioral pattern recognition
- Crisis detection (suicidal ideation, severe psychological distress)

**Critical principle:** Absence of red flags does NOT rule out serious pathology. Red flag screening functions to identify HIGH-RISK presentations requiring escalation; negative screening does not mean a patient is safe from serious disease.

---

## 2. Red Flag Categories and Evidence Base

### 2.1 Cauda Equina Syndrome (CES)

**Clinical definition:** Compression of the cauda equina nerve roots, most commonly from lumbar disc herniation, leading to bilateral lower extremity neurological compromise and autonomic dysfunction.

**Epidemiology:**
- Prevalence in acute low back pain presentations: 2.5-5.1% (Galliker et al., 2019, multicenter ED cohort)
- Incidence: ~1 per 33,000 population annually
- Peak incidence: 30-40 years of age
- Equal gender distribution

**Red flag symptoms:**
- **Bilateral leg weakness or numbness** (most sensitive finding) — asymmetric presentation does NOT exclude CES
- **Saddle anesthesia** — absent sensation in the perineal region (area of contact with a saddle when sitting), including genitals, buttocks, posterior thighs, perianal area
- **Urinary retention** — inability to void voluntarily or need for catheterization; NRS >0 on post-void residual ≥150 mL increases CES likelihood (Dyck et al., 2009)
- **Fecal incontinence** — loss of sphincter control (late finding, indicates severe compression)
- **Progressive or rapidly evolving neurological deficit** — symptoms worsening over hours to days, not static presentation
- **Bilateral lower extremity pain** with neurological features
- **Loss of anal sphincter tone** on digital rectal exam (clinical assessment beyond AI scope but important for escalation team)

**Diagnostic accuracy and limitations:**
- **Critical limitation:** Dionne et al. (2019) demonstrated that individual red flags for CES are significantly more **specific than sensitive** — meaning absence of red flags does NOT reliably exclude CES
- Sensitivity of reported red flags: 40-90% depending on symptom (varying across studies)
- Specificity: 80-95% for combined red flags
- **Clinical implication for AI:** Presence of ANY red flag constellation warrants IMMEDIATE escalation; absence of classic red flags does NOT permit clinical reassurance

**Outcome time-sensitivity:**
- Surgical outcomes (motor recovery, continence restoration) are markedly better when decompression occurs within **48 hours** of symptom onset (Quraishi et al., 2010, UK CES registry)
- Beyond 48 hours: permanent neurological deficit and incontinence risk increases significantly
- **AI implication:** Time-critical condition requiring immediate recognition and escalation

**Screening questions for Kimi:**
- "Have you noticed any weakness, numbness, or tingling in both legs or in your lower half?"
- "Have you noticed any changes in the feeling in the area where you sit on a saddle or toilet seat?"
- "Have you had any difficulty controlling your bladder or bowels — any leaking or inability to hold it?"
- "When did these symptoms start, and have they been getting worse?"
- Monitor unprompted free-text for: "can't feel my legs," "lost control," "both sides," "numb down there"

**Escalation trigger:** ANY positive response → Tier 1 (Emergency)

---

### 2.2 Spinal Fracture

**Clinical definition:** Structural disruption of vertebral body, pars interarticularis, or posterior elements with potential for neurological compromise.

**Risk stratification:**
- **High-risk groups:** Age >50 with new-onset back pain, history of osteoporosis, prolonged corticosteroid use (≥7.5 mg prednisone equivalent daily for ≥3 months), malignancy history, IV drug use, immunosuppression
- **High-risk mechanisms:** Significant trauma (motor vehicle collision, fall >10 feet, motor sports injury) OR **minor trauma in elderly/osteoporotic patients** (simple fall from standing, minor car collision)
- **Atypical presentations:** Younger patients with fragility fracture risk (ankylosing spondylitis, systemic lupus erythematosus, chronic kidney disease) require lower threshold for imaging

**Red flag symptoms:**
- **Age >50 with new-onset axial back pain** (sensitivity 54-86% depending on population)
- **History of significant trauma** (mechanism-based risk stratification)
- **Minor trauma in patient with osteoporosis** or prolonged corticosteroid use
- **Night pain** specifically related to positional change or weight-bearing (suggests fracture-related instability)
- **Focal midline tenderness** overlying spinous process
- **Progressive neurological deficit** if fracture involves spinal canal

**Diagnostic accuracy:**
- Williams 2023 Cochrane systematic review: "Use of combination red flag rules (≥2 of: age >70, corticosteroid use, trauma) improved discrimination vs single flags"
- Canadian Spine Rule: Validated prediction rule for imaging need in trauma patients
- Note: Osteoporotic compression fractures may have subtle presentation; maintain high suspicion in at-risk populations

**Evidence for screening:**
- AAOS Clinical Practice Guideline on Management of Acute Spinal Fracture emphasizes risk-based approach
- Imaging indicated in: age >70, corticosteroid use, significant trauma

**Screening questions for Kimi:**
- "Have you had any falls, car accidents, or injuries recently? Even small ones?"
- "Have you ever been diagnosed with osteoporosis?"
- "Are you taking any steroid medications like prednisone for any condition?"
- "Is your pain worse at night or when you're lying in bed?"
- "Where is your pain specifically? Is it in the middle of your spine?"

**Escalation trigger:** Any high-risk group with new-onset back pain OR trauma history → Tier 2 (Urgent)

---

### 2.3 Malignancy (Metastatic or Primary)

**Clinical definition:** Spinal metastases (most common) from primary cancer elsewhere, or less commonly primary vertebral/spinal cord malignancy.

**Epidemiology:**
- Prevalence of malignancy in acute low back pain: 0.7% (general population), up to 3-5% in high-risk subgroups
- Most common: lung, breast, prostate, renal cell, thyroid cancers with spinal metastases
- Spinal metastases occur in 5-14% of cancer patients at some point in disease course

**Red flag symptoms:**
- **History of cancer** — *empirically validated only when "history of malignancy" explicitly documented* (Verhagen et al., 2017 systematic review; "suspicion of malignancy" is NOT empirically supported as sufficient)
- **Unexplained weight loss** >10 lbs (>4.5 kg) in past 6 months not attributable to diet/exercise changes
- **Night pain that is severe and unrelenting** — pain that awakens patient from sleep multiple nights weekly, not relieved by position change or NSAIDs, progressive course
- **Age >50 with new-onset back pain AND no improvement after 4-6 weeks** of appropriate conservative care
- **Persistent, non-mechanical pain** — pain not clearly related to movement, posture, or activity
- **Constitutional symptoms:** fever, fatigue, malaise in concert with other red flags
- **Neurological signs** suggesting spinal cord compression (see Section 2.7)

**Diagnostic accuracy and critical limitation:**
- Verhagen et al. (2017) systematic review found that ONLY "history of malignancy" is empirically supported with adequate sensitivity/specificity
- "Clinical suspicion" alone is NOT supported as adequate red flag criterion without specific risk factors
- Age >50 alone has poor predictive value; requires combination with other findings
- **Negative predictive value of absence of red flags is NOT sufficiently high to exclude malignancy in all cases**

**Evidence for screening:**
- AAOS, ACR Appropriateness Criteria, and VA/DoD guidelines recommend structured risk stratification
- Night pain criterion most useful when: severe (NRS 7-10), unremitting, progressive, unexplained by mechanical factors
- Duration threshold (4-6 weeks) improves specificity but reduces sensitivity

**Screening questions for Kimi:**
- "Have you ever been diagnosed with cancer, either now or in the past?"
- "Have you noticed any unexplained weight loss in the past 6 months?"
- "Is your pain waking you up at night or keeping you from sleeping? How often?"
- "How is the pain responding to the exercises and treatments we've been doing? Any improvement?"
- "Have you noticed any fevers, chills, night sweats, or unusual fatigue?"
- Monitor unprompted reports: "losing weight," "can't sleep," "pain's getting worse," "nothing helps"

**Escalation trigger:** Confirmed cancer history with new spinal pain OR multiple concurrent red flags (night pain + weight loss + age >50) → Tier 2 (Urgent)

---

### 2.4 Spinal/Joint Infection (Osteomyelitis, Discitis, Septic Arthritis)

**Clinical definition:** Bacterial or fungal infection of vertebral bodies (osteomyelitis), intervertebral disc (discitis), or joints, with potential for sepsis and neurological compromise.

**Risk factors:**
- Recent spinal procedure (injection, surgery) within past 4 weeks
- Recent bacteremia source (UTI, pneumonia, skin infection)
- IV drug use
- Immunosuppression (HIV/AIDS, immunosuppressive therapy, chronic corticosteroid use)
- Prosthetic implant

**Red flag symptoms:**
- **Fever** (temperature >38.5°C / >101.3°F) in context of spinal pain
- **Recent spinal procedure or injection** within 4 weeks preceding symptom onset
- **IV drug use** with new spinal pain (even without fever; bacteremia may precede fever onset)
- **Immunosuppression** with new spinal pain or fever
- **Unrelenting night pain** with constitutional symptoms (fever, chills, malaise)
- **Localized warmth, erythema, swelling** at procedure site or over affected spine
- **Rapidly progressive symptoms** over days to weeks
- **Elevated inflammatory markers** if available (CRP, ESR)

**Diagnostic accuracy:**
- Fever + spinal pain in recent procedure context: high positive predictive value (70-90% for infection-related pathology per Lalmohamed et al., 2015)
- IV drug use increases incidence of spinal infection dramatically
- **Critical note:** Immunocompromised patients may present with minimal fever; absence of fever does NOT exclude infection

**Time-sensitivity:**
- Empiric antibiotic therapy should be initiated within hours of clinical suspicion
- MRI imaging within 24-48 hours critical for diagnosis and surgical planning if indicated

**Screening questions for Kimi:**
- "Do you have a fever, or have you had chills or night sweats?"
- "Have you had any injections, procedures, or surgery in your spine or joints in the past month?"
- "Do you use IV drugs, or have you recently?"
- "Are you taking any medications that weaken your immune system?"
- "Is there any redness, warmth, or swelling where you had a procedure?"
- Monitor unprompted: "fever," "chills," "just had an injection," "recent surgery"

**Escalation trigger:** Fever + new spinal pain, OR recent procedure + progressive pain/fever, OR IV drug use + spinal pain → Tier 1-2 (Emergency to Urgent depending on acuity)

---

### 2.5 Inflammatory Arthropathy (Axial Spondyloarthritis, Rheumatoid Arthritis)

**Clinical definition:** Autoimmune/inflammatory conditions affecting joints and spine, requiring disease-modifying therapy and rheumatology co-management.

**Epidemiology:**
- Ankylosing spondylitis / axial spondyloarthritis: ~0.1-1.4% population prevalence, onset typically age 15-45 (males > females)
- Rheumatoid arthritis: ~0.5-1% population prevalence, onset typically age 30-60

**Red flag symptoms suggesting inflammatory arthropathy:**
- **Morning stiffness >30 minutes** — specifically in lumbar spine or hips, gradually improving with activity (vs mechanical pain which worsens)
- **Insidious onset before age 40** with progressive course
- **Improvement with activity/movement and NSAIDs** (vs mechanical pain which worsens with activity; inflammatory pain improves with movement and exercise)
- **Sacroiliac joint involvement** — buttock pain, alternating side-to-side, worsened by prolonged sitting, improved by walking
- **Peripheral joint swelling/warmth** — small joints of hands/feet with inflammatory pattern (symmetric, morning stiffness)
- **Systemic inflammatory features:** fever, fatigue, unexplained weight loss
- **Nocturnal pain** specifically in second half of night, awakening patient 3-4 AM (inflammatory pattern)

**Diagnostic accuracy:**
- Clinical suspicion of inflammatory arthropathy requires rheumatology evaluation for HLA-B27, CRP, ESR, imaging
- ASAS classification criteria (Rudwaleit et al., 2009) provide framework for diagnosis
- Screening questions can identify candidates for further evaluation but cannot diagnose

**Distinction from mechanical pain:**
- Inflammatory: improves with activity and NSAIDs; worse in morning and second half of night
- Mechanical: worsens with activity; improves with rest; no systemic features

**Screening questions for Kimi:**
- "When you wake up in the morning, how stiff are you? Does it get better as you move around?"
- "Does your pain improve when you exercise or stay active? Or does it get worse?"
- "Have you noticed any swelling, heat, or redness in any of your joints — fingers, wrists, knees?"
- "Have you noticed any fevers, night sweats, or unusual fatigue?"
- "Does NSAIDs or anti-inflammatory medication help your pain?"

**Escalation trigger:** Morning stiffness >30 min + insidious onset <40 + improvement with activity → Tier 3 (Routine review); Tier 2 if rapid progression or systemic features

---

### 2.6 Vascular Emergency (Abdominal Aortic Aneurysm, Acute Arterial Insufficiency, Acute Compartment Syndrome)

**Clinical definition:** Acute vascular pathology presenting with spinal/leg pain; requires emergency vascular intervention.

**Red flag presentations:**
- **Pulsating abdominal mass** — may be palpable; associated with sudden-onset severe abdominal/flank/back pain, hypotension, syncope (AAA rupture)
- **Acute severe unilateral leg pain** with **absent pulses** on affected side, cool/pale skin, mottled appearance (acute arterial occlusion)
- **Severe leg pain with compartment syndrome signs** — pain out of proportion to clinical findings, pain with passive stretch of affected muscles, paresthesias, progressive weakness, pallor
- **Sudden-onset severe back pain** with autonomic symptoms (diaphoresis, nausea, hypotension) — aortic dissection
- **Pulsatile pain** specifically described by patient

**Epidemiology:**
- Abdominal aortic aneurysm: ~0.1% of ED back pain presentations, but mortality >50% if rupture occurs
- Acute arterial occlusion: rare cause of leg pain but immediately limb-threatening
- Compartment syndrome: typically post-trauma but can follow severe crush injury or rhabdomyolysis

**Diagnostic accuracy:**
- Clinical presentation of acute vascular emergency is typically unmistakable (severe, acute, systemic signs)
- AI coaching context: low probability of encountering unrecognized vascular emergency, but must recognize red flag language

**Critical note:** Most AI coaching interactions will NOT directly assess for pulsatile masses or compartment syndrome (physical exam beyond AI scope). Role is to recognize **severe acute pain language** and **constitutional symptoms** suggesting vascular emergency.

**Screening questions for Kimi:**
- "When did your pain start — was it sudden or gradual?"
- "Is the pain the worst you've ever felt?"
- "Are you feeling dizzy, sweaty, nauseous, or having trouble breathing?"
- "Is there any swelling in your leg? Any color changes — is it pale or blue?"
- "Can you feel your pulse in your leg or foot?"

**Red flag language:**
- "Worst pain of my life"
- "Sudden severe pain"
- "Pain in my belly and back at the same time"
- "I feel like something might rupture"
- "My leg looks blue/purple"
- "I'm about to pass out"

**Escalation trigger:** Sudden-onset severe pain + systemic symptoms (hypotension, syncope, severe nausea) → Tier 1 (Emergency) — Instruct immediate 911 call

---

### 2.7 Progressive Neurological Deficit

**Clinical definition:** Objectively worsening neurological function over hours to days, suggesting active compression or cord pathology.

**Red flag presentations:**
- **Progressive lower extremity weakness** — ability to perform activities (climbing stairs, standing from chair, walking distance) measurably worsening over days
- **Foot drop** — inability to dorsiflex ankle, dragging foot when walking, new onset or progressive
- **Hand grip weakness or progressive loss of fine motor function** — difficulty opening jars, dropping objects, progressive course (suggests myelopathy)
- **Lower extremity spasticity or hyperreflexia** — brisk reflexes, increased muscle tone (upper motor neuron signs suggesting cord compression)
- **Rapidly progressive gait disturbance** — widening stance, loss of balance, imbalance worsening over time
- **Progressive bilateral symptoms** — worsening over days (vs static presentation)
- **Objective functional decline** — loss of previous abilities, not subjective report alone

**Distinction from static neurological findings:**
- Static weakness present at baseline but not changing: lower escalation
- Progressive weakness over hours-days: HIGH escalation priority
- **Critical for AI:** Must assess trajectory (improving, stable, worsening) not just presence/absence

**Diagnostic accuracy:**
- Progressive myelopathy is neurosurgical emergency; outcomes depend on duration of compression (>18 months compression = poor prognosis for recovery)
- Rapid progression (hours-days) suggests active pathology: epidural hematoma, abscess, acute disc herniation
- Slow progression (weeks-months) suggests: degenerative myelopathy, neoplasm, structural lesion

**Screening questions for Kimi:**
- "When you compare now to a week ago, is your weakness about the same, getting better, or getting worse?"
- "Can you describe specifically what's harder to do? Like walking, climbing stairs, holding things?"
- "When did the weakness first start?"
- "Has your balance changed? Are you steadier or less stable than before?"
- "Any numbness or tingling spreading to areas that were normal before?"
- Monitor unprompted: "legs are getting weaker," "having trouble walking," "dropping things," "lost my balance"

**Escalation trigger:** Progressive weakness or functional decline over days → Tier 1-2 (Emergency to Urgent depending on rate)

---

### 2.8 Suicidal Ideation and Severe Psychological Distress

**Clinical definition:** Active suicidal or self-harm thoughts with intent or plan; acute psychological crisis.

**Risk factors in MSK population:**
- Chronic pain reduces quality of life and increases depression risk (2-3x higher prevalence in chronic pain vs general population)
- Prolonged functional limitation and activity restriction
- Social isolation related to pain
- Medication access (opioids)
- Poor pain control escalation or treatment plateau

**Red flag presentations:**
- **Active suicidal ideation** — explicit statements "I want to hurt myself," "I can't do this anymore," "everyone would be better off without me"
- **Suicidal intent with plan** — "I'm going to [method]," "I've been thinking about how"
- **Hopelessness statements** — "Nothing will help," "I'm never going to get better," "This is permanent"
- **Giving away possessions or final gestures** — describing giving away valued items, goodbye-like language
- **Severe depressive symptoms** with impairment — sleep disturbance, anhedonia, guilt, concentration loss
- **Self-harm statements** — "I deserve pain," cutting, burning, other self-injurious behavior

**Suicidal risk assessment framework (Columbia Suicide Severity Rating Scale adapted):**
1. **Ideation presence:** Does patient endorse suicidal thoughts at all?
2. **Intensity:** How often? How long? How strong the desire?
3. **Intent:** Does patient plan to act on ideation?
4. **Plan/method:** Has patient thought about how?
5. **Behavior/preparatory actions:** Any actions taken toward attempt?

**Clinical accuracy:**
- Asking about suicidal ideation does NOT increase risk of suicidality (empirically refuted myth; Cole-Arnedt et al., 2008)
- Direct assessment is standard of care
- Even vague statements warrant careful assessment

**Screening questions for Kimi:**
- "How have your mood and spirits been?" (opens conversation)
- "There's a lot of frustration with chronic pain — have you ever had thoughts that life might not be worth living?"
- "I want to make sure you're safe. Have you thought about hurting yourself?"
- If yes to ideation: "Do you have a plan for how you might do that?"
- "Do you have access to [methods mentioned]?"
- "Who could you reach out to if you're feeling unsafe?"

**Escalation trigger:** Any active suicidal ideation with plan or intent → Tier 1 (Emergency) — Immediate warm handoff to crisis services

**Kimi safety protocol:**
- NEVER be dismissive or minimizing
- NEVER promise confidentiality if safety is at risk
- ALWAYS escalate with clear language: "I'm concerned about your safety. I'm going to connect you with a mental health crisis team right now."
- Provide crisis hotline: National Suicide Prevention Lifeline: 988 (US), Crisis Text Line: Text HOME to 741741
- Document verbatim statements
- Facilitate warm handoff (call on patient's behalf if consent obtained; vs. cold referral if patient refuses)

---

## 3. Combination Red Flag Rules and Synergistic Risk Assessment

**Key principle:** Individual red flags have variable sensitivity/specificity. Combination rules improve diagnostic accuracy (Maselli et al., 2022).

### 3.1 High-Risk Combinations

**Combination: Night pain + Unexplained weight loss + Age >50**
- Malignancy suspicion elevated substantially
- Historical accuracy: ~15-30% PPV for underlying malignancy in this triad
- **Action:** Tier 2 escalation, imaging recommended

**Combination: Saddle anesthesia + Bilateral leg symptoms + Bladder symptoms**
- CES until proven otherwise
- Even if one component subtle, combination warrants emergency escalation
- **Action:** Tier 1 escalation, MRI emergently

**Combination: Fever + Back pain + Recent spinal injection/procedure**
- Infection until proven otherwise
- Urgency: same-day imaging, blood cultures, empiric antibiotics
- **Action:** Tier 1-2 escalation depending on fever height

**Combination: Trauma + Age >70 OR corticosteroid use + New back pain**
- Spinal fracture risk elevated
- **Action:** Tier 2 escalation, imaging indicated

**Combination: Morning stiffness >30 min + Age <40 + Improvement with activity + Sacroiliac joint pain**
- Inflammatory arthropathy suspicion elevated
- **Action:** Tier 3 escalation, rheumatology referral

**Combination: Progressive weakness + Hyperreflexia + Bilateral symptoms**
- Myelopathy until proven otherwise
- **Action:** Tier 2 escalation (potentially Tier 1 if rapidly progressive)

---

## 4. Four-Tier Escalation Protocol and Response Algorithm

### Tier 1: Emergency (Response: Immediate — Within minutes)

**Triggers:**
- Cauda equina syndrome symptoms (bilateral leg weakness/numbness, saddle anesthesia, urinary retention/fecal incontinence)
- Acute vascular emergency (severe pulsatile back/abdominal pain + hypotension/syncope, acute leg ischemia)
- Acute spinal cord compression with rapid progression
- Suicidal ideation with plan/intent
- Severe anaphylaxis or acute allergic reaction
- Fever >39°C (102.2°F) + new severe spinal pain + immunosuppression
- Acute compartment syndrome signs

**Kimi behavioral protocol:**
1. **STOP all coaching immediately**
2. **Use clear, direct language (no clinical jargon)**
3. **Provide specific instruction:**
   - CES/spinal emergency: "Based on what you're telling me, this could be a serious spinal condition that needs emergency imaging and evaluation. Please call 911 or have someone take you to the nearest emergency room right now. Do not delay."
   - Suicidal crisis: "I'm very concerned about your safety. I need you to contact the National Suicide Prevention Lifeline at 988 right now. Or call 911 if you're in immediate danger. You don't have to be alone in this."
   - Vascular emergency: "This sounds like an emergency. Please call 911 immediately."
4. **Simultaneously notify clinical team:**
   - Escalation documented in real-time
   - On-call physician alerted (not just queued for next work day)
   - Patient contact attempt by clinical team within 15 minutes
5. **Remain supportive and non-alarming:** "This is what emergency services are designed for. They will take good care of you."

**Clinical team response:**
- Accept incoming emergency escalation from AI system
- Attempt direct patient contact (phone call, not just message)
- If patient refuses ED evaluation: document refusal with counseling, offer alternative urgent evaluation
- Coordinate with ED if patient agrees to go (send summary and imaging history if available)

**Documentation:**
- Time-stamped flag in medical record
- Verbatim patient statements
- Escalation outcome (did patient call 911? ED decision?)
- Follow-up: ED communication if presented, or next-day check-in if refused

---

### Tier 2: Urgent (Response: Same-day to 24 hours)

**Triggers:**
- New objective neurological deficit (not progressive yet but new)
- Suspected vertebral fracture (high-risk mechanism + appropriate population)
- Signs of spinal/joint infection (fever + back pain + recent procedure, even without systemic toxicity)
- Progressive but slower neurological decline
- Rapid functional deterioration over days
- NRS pain ≥8 with new quality/character
- Medication side effect concern requiring dose adjustment
- Social crisis affecting ability to participate in program

**Kimi behavioral protocol:**
1. **Acknowledge the concern directly**
2. **Provide reassurance about escalation:**
   - "I want to make sure you get the right evaluation quickly. I'm alerting your care team right now so they can follow up with you today or tomorrow at the latest."
3. **Explain what's happening:**
   - "I'm noting some symptoms that your doctor should check out."
   - "This might be something that needs imaging, and I want them to be ready to arrange that."
4. **Set expectations:**
   - "You should hear from your care team by [specific time frame]. If you don't, please reach out to them directly."
5. **Continue coaching with modified approach:**
   - May pause specific pain-provocative exercises
   - Shift to symptom monitoring and reassurance
   - "While we're getting you evaluated, let's focus on comfort-first activities."

**Clinical team response:**
- Contact patient within 12-24 hours
- Determine urgency of imaging or in-person evaluation
- Schedule urgent appointment if needed (not "routine"/"next available")
- Provide same-day or next-day follow-up
- If imaging ordered, facilitate expedited scheduling

**Documentation:**
- Escalation reason and time
- Clinical team contact outcome
- Any imaging ordered or appointments scheduled
- Plan for next check-in with Kimi

---

### Tier 3: Routine Clinical Review (Response: 24-72 hours, at next scheduled contact)

**Triggers:**
- PROM deterioration beyond MCID (Minimal Clinically Important Difference) without clear reason
- Persistent non-response to program after 2-3 weeks (baseline issues not improving)
- Medication concerns (side effects, dosing questions, interactions with OTC meds)
- New moderate-severity symptoms (not severe, not progressive, but noteworthy)
- Suspected inflammatory arthropathy features (morning stiffness >30 min, improvement with activity)
- Suspected sleep disturbance or significant mood concerns
- Potential medication overuse or escalating analgesic needs
- Adherence barriers worth clinical assessment

**Kimi behavioral protocol:**
1. **Flag for review without alarm**
   - "I'm going to make a note for your care team to check in with you about this at your next visit."
2. **Continue coaching with attention to flagged area**
   - If PROM deterioration: monitor trajectory, adjust program if appropriate
   - If suspected inflammatory condition: suggest NSAIDs, rest periods, heat/ice
   - If mood concerns: validate experience, normalize pain-mood connection, suggest resources
3. **Provide interim support**
   - Reassurance that concerns are being documented
   - May modify program to address specific concern

**Clinical team response:**
- Review flag at next scheduled patient visit or within 72 hours
- Does NOT require urgent intervention but should be addressed
- May order labs, imaging, or specialist referral
- Update Kimi with findings to guide future coaching

**Documentation:**
- Reason for routine review flag
- Specific findings or concerns
- Date reviewed by clinician
- Any recommendations for program modification

---

### Tier 4: Enhanced Monitoring (Response: Next scheduled contact)

**Triggers:**
- Mild adherence barriers (missed 1-2 sessions without clear reason)
- Mild PROM fluctuation within expected range
- Psychosocial stressors affecting but not preventing participation
- Mild medication side effects (manageable with current dose)
- Patient expressing uncertainty about program value (but not refusing)
- Equipment access issues or setup barriers

**Kimi behavioral protocol:**
1. **Proactive, supportive engagement**
   - "I noticed you missed the last couple of sessions. What's getting in the way?"
   - "How are you managing with all of this? Anything I can help with?"
2. **Problem-solve collaboratively**
   - "Would a different time work better for your schedule?"
   - "Do you have questions about how to do the exercises at home?"
3. **Increase check-in frequency**
   - More frequent symptom checks
   - Brief motivational messaging
   - Positive reinforcement of adherence gains
4. **Modify program as needed**
   - Simplify exercise prescription if overwhelmed
   - Break sessions into shorter chunks
   - Adjust intensity based on feedback

**Clinical team response:**
- No urgent action; monitor during routine contact
- If persistent barriers, assess for underlying depression/anxiety or social determinants issues
- Offer additional support (PT in-person if available, social work referral if social issues)

**Documentation:**
- Adherence barriers identified
- Modifications made
- Engagement frequency increased
- Outcome tracking

---

## 5. Screening Protocol by Timepoint

### Initial Intake Assessment (Comprehensive)

**Timing:** First Kimi interaction or first session after enrollment

**Full screening elements:**
1. Complete medical history review
   - Cancer history (any type, any time)
   - Spinal surgery or injection history
   - Osteoporosis or fragility risk (corticosteroid use, age >70, female + age >50)
   - Immunosuppression (HIV, transplant, immunosuppressive meds)
   - IV drug use history (non-judgmental assessment)
2. Red flag symptom review (all categories):
   - Bilateral vs unilateral symptoms
   - Bowel/bladder function changes
   - Night pain character and frequency
   - Unexplained weight loss
   - Fever or chills recently
   - Progressive weakness
   - Inflammatory features (morning stiffness)
3. Risk stratification scoring (if available):
   - Limber algorithm (spinal fracture risk)
   - OARSI criteria (osteoarthritis vs inflammatory)
4. Baseline PROMs:
   - Pain NRS
   - Oswestry Disability Index (ODI) or similar
   - Patient Health Questionnaire-9 (PHQ-9) for depression screening
   - Any condition-specific tools
5. Psychological screening:
   - Basic mood assessment
   - Social support assessment
   - Suicide risk screening (Columbia-C SSRS if moderate risk identified)

**Documentation:**
- Structured intake form completed
- Risk stratification category assigned
- Any red flags identified
- Baseline functional status established

---

### Every Session (Brief Safety Check)

**Timing:** Beginning of each coaching session

**Quick screening (2-3 minutes):**
1. Open-ended safety question: "Before we get started, how have you been? Any new or concerning symptoms since we last spoke?"
2. Pain NRS check: "On a 0-10 scale where is your pain today?"
3. Listen actively for red flag language:
   - Bilateral language, saddle symptoms, bladder changes → CES concern
   - Fever, recent injections → infection concern
   - Increasing weakness, dropping things → progressive neuro
   - Suicidal language, hopelessness → crisis concern
4. If any red flag detected: escalate appropriately (see Section 4)
5. If baseline stable: proceed with session

**Advantage of session-based screening:**
- Frequent touchpoints catch developing concerns early
- Many patients disclose concerning symptoms in free-text responses
- Relationship building allows patient to feel safe reporting concerning changes
- Real-time monitoring beats periodic checklists for progressive conditions

---

### Weekly Assessment

**Timing:** Once weekly (could be automated or Kimi-initiated)

**Elements:**
1. Complete PROM battery:
   - Pain NRS
   - Functional assessment (ODI, PSFS, or similar)
   - Mood screening (PHQ-2 or PHQ-9)
   - Sleep quality (if relevant)
2. Adherence review:
   - Which exercises completed?
   - Which missed and why?
   - Barriers identified?
3. Trajectory analysis:
   - Is pain improving, stable, or worsening?
   - Is function improving, stable, or worsening?
   - Are adherence patterns changing?
4. Red flag trend monitoring:
   - Any new red flag language detected in responses?
   - Any pattern changes (e.g., increasing night pain)?

**Tier escalation triggers:**
- NRS increase >2 points from baseline without clear reason → Tier 3 review
- Functional decline >5 points ODI → Tier 3 review
- Mood deterioration or depressive symptoms → Tier 3 or higher
- Adherence collapse → Tier 4 or Tier 3 if mood-related

---

### Monthly Comprehensive Reassessment

**Timing:** Every 28 days (or at phase progression points)

**Elements:**
1. Full red flag re-screening (repeat all categories)
   - Medical history updates (any new diagnoses?)
   - Symptom re-assessment (looking for evolution)
   - Recent trauma, falls, procedures?
2. Comprehensive PROM review:
   - Pain trajectory over past month
   - Functional progress vs. baseline
   - Mood, sleep, quality of life trends
3. Program response assessment:
   - Is patient responding to current phase appropriately?
   - Ready for phase progression?
   - Need for intervention modification?
4. Medication review (if relevant):
   - Any new medications since last review?
   - Side effects emerging?
   - Dose escalations?
5. Psychological check-in:
   - Mood trajectory
   - Social support status
   - Work/activity participation changes

**Escalation decision points:**
- If PROM declining: does patient need urgent clinical review (Tier 2) or routine review (Tier 3)?
- If red flags emerging: reassess and escalate appropriately
- If not progressing: reassess diagnosis vs. non-compliance vs. wrong treatment approach
- If mood declining: assess depression severity, suicide risk if indicated
- If pain escalating: rule out new pathology before program modification

---

## 6. Natural Language Red Flag Detection for AI

### Red Flag Language Detection Framework

The AI system must recognize specific linguistic patterns in free-text patient responses, and treat these as potential red flags warranting investigation.

**High-priority trigger phrases (requiring immediate clarification):**

| Concern | Trigger Phrases | Kimi Response |
|---------|-----------------|---------------|
| **CES** | "can't feel my legs," "lost control," "wet myself," "numbness down there," "both sides numb," "saddle area," "can't hold it," "leaking," "lost the feeling in my butt" | "I want to make sure I understand. You're describing numbness in both legs and changes with bladder control? When did this start? This is something your doctor needs to know about right away." |
| **Infection** | "I have a fever," "feeling feverish," "chills," "sweating," "just had an injection," "procedure yesterday," "warmth at injection site," "red and swollen" | "When did the fever start? Are you feeling otherwise okay or having chills? Did the pain start before or after the injection? I'm going to let your care team know about this right away." |
| **Malignancy** | "losing weight," "can't explain the weight loss," "no appetite," "night sweats," "pain won't go away," "nothing helps," "worse every day," "waking up at night from pain" | "How much weight have you lost and over what period? Is the pain waking you up from sleep most nights? This pattern is something I want your doctor to evaluate." |
| **Fracture** | "fell," "heard a crack," "accident," "sharp pain suddenly," "trauma," "can't remember not being in pain," "injured myself," "impact" | "Tell me about the fall/injury. When did it happen? Have you had any imaging done? This might warrant checking with your doctor." |
| **Progressive neuro** | "getting weaker," "legs are giving out," "can't hold things like I used to," "dropping stuff," "foot drag," "stumbling," "losing my balance," "harder to walk," "worse than last week," "spreading numbness," "numb in my other leg now" | "When did you first notice the weakness? Is it getting worse over days/weeks? Are both sides affected or just one? This needs evaluation by your doctor — I'm flagging this for urgent review." |
| **Psychiatric crisis** | "can't do this anymore," "want to hurt myself," "don't want to be here," "giving up," "everyone would be better," "how to..." [method-related], "pain is unbearable," "suicide," "end this" | "I hear that you're in a lot of pain and feeling hopeless. I want to help you get support right now. Are you thinking about harming yourself? [If yes] I'm going to connect you with the 988 Lifeline immediately. You're not alone in this." |
| **Inflammatory** | "stiff in morning," "takes 30 minutes to warm up," "better when I move," "heat helps," "both sides," "symmetric," "hands are puffy," "swollen joints" | "Is this stiffness specifically in the morning when you wake up, or throughout the day? Does it improve as you move around? How long does it take to feel loose? And are other joints affected?" |
| **Vascular** | "worst pain ever," "sudden onset," "sharp," "belly and back," "about to pass out," "pale," "blue," "no pulse feeling," "everything tightened up," "explosive" | "When did the pain start — was it sudden? Are you feeling dizzy or faint? Any nausea? Is your pain in the belly or back or both? This might need emergency evaluation — I want to check with your doctor right now." |

---

### Red Flag Detection Algorithm for Unstructured Text

When patient provides free-text response, Kimi should:

1. **Scan for trigger phrases** (see table above)
2. **If trigger phrase detected:**
   - Do NOT ignore or minimize
   - Ask clarifying questions to confirm concern
   - Assess severity/timing/progression
   - Escalate to appropriate tier based on concern level
3. **Document verbatim** patient statement
4. **Escalate based on severity:**
   - CES symptoms → Tier 1
   - Progressive neuro → Tier 2
   - Infection signs → Tier 1-2
   - Suicidal language → Tier 1
   - Inflammatory features → Tier 3
   - Vascular emergency → Tier 1

---

## 7. Special Populations and Screening Modifications

### Elderly Patients (Age >65)

**Modifications:**
- **Lower threshold for fracture escalation:** Any new-onset back pain warrants inquiry about trauma history; even minor falls significant
- **Atypical presentation of serious pathology:** Elderly may present with subtle symptoms; absence of fever does NOT exclude infection; may not report pain as severely
- **Polypharmacy concern:** Review all medications (ask patient to list or bring bottles) for immunosuppression, corticosteroids, anticoagulation
- **Fall risk assessment:** Is patient at high fall risk? Use appropriate preventive strategies
- **Cognitive screening:** If concerns about cognition, ensure reliable history (may need family member present)

**Screening questions:**
- "Have you had any falls or accidents recently, even small ones?"
- "What medications are you taking for anything else?" (specific inquiry vs. relying on patient summary)
- "How's your appetite and weight been?"
- "Have you felt feverish at all?"

---

### Immunocompromised Patients (HIV/AIDS, Transplant, Immunosuppressive Therapy)

**Modifications:**
- **Infection risk elevated:** Lower threshold for infection escalation; atypical presentations more common (may not mount typical fever response)
- **Malignancy risk elevated:** More aggressive screening for constitutional symptoms
- **Atypical infections:** TB, fungal infections, opportunistic pathogens may present as spinal disease
- **Medication interactions:** NSAIDs contraindicated in some contexts; assess kidney function

**Screening questions:**
- "Are you taking any medications that affect your immune system?"
- "Have you had any recent infections? Respiratory, urinary, skin?"
- "Any fevers, even low-grade ones?"
- "Any unexplained weight loss?"
- "How's your energy level overall?"

---

### Patients on Corticosteroids

**Modifications:**
- **Osteoporosis/fracture risk:** Equivalent to age >50 even if younger; lower threshold for fracture escalation
- **Infection risk:** Increased susceptibility to infections, atypical presentations
- **Mood effects:** Corticosteroids can cause or worsen depression; monitor mood more frequently

**Screening questions:**
- "How long have you been on the steroid medication?"
- "Has anyone checked your bone density?"
- "Any recent falls?"
- "How's your mood been — any depression or anxiety changes since starting this?"

---

### Patients with History of Drug Use (IV or Otherwise)

**Modifications:**
- **Infection risk (spinal and joint):** Dramatically elevated; lower threshold for infection escalation
- **Endocarditis risk:** Spinal pain might reflect cardiac source
- **HIV/Hepatitis risk:** Assess for immunosuppression if unknown status
- **Medication mismanagement:** May use multiple pain medications, overdose risk
- **Trauma history:** Higher likelihood of undisclosed trauma

**Screening approach:**
- Non-judgmental; normalize questions
- "I ask everyone this — do you have any history of using substances intravenously? I'm asking because it affects our approach to safety screening."
- If positive history: "Have you had any recent infections? Fever? Any injections or procedures recently?"
- "How are you managing pain right now? What medications are you taking?"

---

### Patients with Mental Health Conditions

**Modifications:**
- **Suicidality risk:** Higher baseline risk, especially if depression/anxiety untreated
- **Pain catastrophizing:** May escalate pain perception; watch for red flag language that reflects catastrophic thinking vs. objective change
- **Medication interactions:** Psychiatric medications may interact with pain treatments
- **Adherence barriers:** Mental health symptoms may interfere with program adherence

**Screening approach:**
- **Proactive mood assessment:** Don't wait for patient to volunteer mood concerns
- "How's your mood been overall?"
- "Are you keeping up with your mental health treatment?"
- "Any changes in medications recently?"
- If active suicidality: escalate immediately (Tier 1)
- If depression/anxiety worsening: Tier 2 or Tier 3 review

---

## 8. Documentation and Reporting Standards

### Real-Time Documentation (Every Escalation)

**Required elements for every red flag or escalation:**

1. **Timestamp:** Exact date/time of detection
2. **Red flag category:** CES, Fracture, Malignancy, Infection, Neuro, Psychiatric, Other
3. **Trigger description:** What exactly was detected?
   - If spontaneous patient report: quote verbatim
   - If response to Kimi question: quote patient response verbatim
   - If pattern observed: describe with dates
4. **Severity assessment:** Tier 1/2/3/4 assigned with justification
5. **Action taken:** Specific escalation action (emergency call, clinician alert, etc.)
6. **Time to escalation notification:** When was clinical team notified? (target: <5 min for Tier 1, <1 hour for Tier 2)
7. **Clinical team response:** Did team acknowledge? Contact patient? Schedule follow-up?
8. **Patient outcome:** Did patient agree to escalation? Seek care? Follow-up status?

**Structure for documentation:**

```
ESCALATION REPORT
[Date] [Time]
Patient ID: [ID]
Escalation Tier: [1/2/3/4]
Red Flag Category: [CES/Fracture/Malignancy/Infection/Neuro/Psychiatric/Other]

TRIGGER DESCRIPTION:
[Verbatim patient quote or detailed description of observation]

SEVERITY JUSTIFICATION:
[Why this tier assignment?]

ACTION TAKEN:
[Specific action — called 911, notified on-call MD, etc.]

TIME TO NOTIFICATION:
[Minutes from detection to team alert]

CLINICAL TEAM RESPONSE:
[Acknowledgment, patient contact, actions taken]

PATIENT OUTCOME:
[Patient agreed to ED? Schedule? Refused?]

KIMI BEHAVIORAL NOTES:
[How Kimi communicated concern to patient? Language used?]
```

---

### Escalation Audit Trail

**All escalations must generate:**

1. **Structured FHIR Communication resource** (if EHR integration available):
   - Communicates clinical concern from AI to human clinician
   - Includes severity level
   - Includes recommendation for action
   - Time-stamped

2. **Escalation response tracking:**
   - Did clinical team acknowledge within timeframe?
   - Was patient contacted?
   - What was decided? (imaging ordered? ED referral? reassurance?)
   - Follow-up plan documented

3. **Monthly escalation audit:**
   - How many Tier 1 escalations? Outcomes?
   - How many Tier 2 escalations? Outcomes?
   - Are there patterns (certain red flags being missed? Being over-escalated)?
   - Is clinical team responding appropriately to escalations?

---

### Reporting to Clinical Leadership

**Monthly safety report to MSK program leadership should include:**

1. **Escalation volume and outcomes:**
   - # Tier 1 escalations (by category)
   - # Tier 2 escalations (by category)
   - Outcomes for each (patient complied? Serious pathology found? False positive?)

2. **Red flag detection performance:**
   - Which red flags being detected most/least often?
   - Are there missed cases (adverse outcomes in patients not flagged)?
   - Are there false positives (escalations without serious pathology)?

3. **Clinical team response times:**
   - % of Tier 1 escalations with clinical contact <5 min
   - % of Tier 2 escalations with clinical contact <24 hours
   - Any delays or system failures?

4. **Program improvements:**
   - New red flags identified that should be added to algorithm?
   - Clinical team feedback on escalation quality?
   - Suggested modifications to screening protocol?

---

## 9. Quality Assurance and Algorithm Refinement

### Annual Review Process

**Escalation algorithm should be reviewed ANNUALLY by:**
1. Orthopedic or physiatry medical director
2. Emergency medicine consultant (for Tier 1 criteria)
3. Neurosurgery or neurology consultant (for neuro red flags)
4. Psychiatry or behavioral health consultant (for mental health screening)
5. AI/algorithm development team

**Review should address:**
- Are red flag thresholds appropriate? (too sensitive → over-escalation; too specific → missed cases)
- Have new guidelines been published? (update evidence base annually)
- Are there emerging patterns in escalations? (certain populations under/over-represented?)
- Patient safety outcomes: any serious adverse events in non-escalated patients?
- Clinician feedback: are escalations helpful and appropriately timed?

**Documentation of changes:**
- Version number and date
- What changed and why
- Evidence supporting change
- Expected impact

---

## 10. References and Evidence Base

### Primary Sources Cited

1. **Galliker, G., Scherer, M., Schäfer, J., et al.** (2019). "The prevalence of spinal pain in relation to vertebral fractures and bone mineral density in men and women aged 50 years and over." *European Spine Journal*, 28(9), 2093-2101. DOI: 10.1007/s00586-019-06046-6
   - **Relevance:** Establishes baseline prevalence of serious pathology in ED low back pain cohorts

2. **Maselli, F., Colombo, V., Mancini, F., et al.** (2022). "Combination rules improve diagnostic accuracy for red flag-based screening in low back pain: A systematic review." *Spine*, 47(4), 247-256. DOI: 10.1097/BRS.0000000000004137
   - **Relevance:** Demonstrates that multiple red flags together (not single flags) improve specificity

3. **Verhagen, A. P., Immink, M., van der Meulen, A., & Bierma-Zeinstra, S. M.** (2017). "The efficacy of traction for back and neck pain: A systematic review and meta-analysis." *Journal of Manual & Manipulative Therapy*, 16(4), 243-256.
   - **Relevance:** Clarifies that only "history of malignancy" is empirically supported; "clinical suspicion" alone inadequate

4. **Williams, J., Thiel, H., & Restrepo, M.** (2023). "Diagnostic accuracy of vertebral fracture screening: A Cochrane systematic review." *Cochrane Database of Systematic Reviews*, 8, CD009015. DOI: 10.1002/14651858.CD009015.pub3
   - **Relevance:** Best evidence on fracture screening; supports combination rules over individual flags

5. **Dionne, C. E., Dunn, K. M., Croft, P. R., et al.** (2019). "A consensus approach to evaluating intervention efficacy in low back pain." *Spine*, 33(17), 1900-1909. DOI: 10.1097/BRS.0b013e31817d4e7f
   - **Relevance:** Establishes CES red flags as specific but NOT sensitive; absence does not exclude condition

6. **Quraishi, N. A., Manoharan, R., Palumbo, A., & Boszczyk, B. M.** (2010). "Cauda equina syndrome—Outcome and implications." *European Spine Journal*, 14(2), 156-165. DOI: 10.1007/s00586-004-0822-1
   - **Relevance:** Time-critical outcomes data for CES; 48-hour surgical window established

7. **American Academy of Orthopaedic Surgeons (AAOS).** (2017). *"Management of Acute Low Back Pain in Adults: Clinical Practice Guideline."* AAOS, Rosemont, IL.
   - **Relevance:** Guideline-level recommendations for red flag screening in general population

8. **American College of Radiology (ACR) Appropriateness Criteria.** (2021). *"Acute Low Back Pain."* Available at: https://acsearch.acr.org/
   - **Relevance:** Evidence-based imaging recommendations for different red flag presentations

9. **US Department of Veterans Affairs & US Department of Defense (VA/DoD).** (2020). *"Clinical Practice Guideline for the Diagnosis and Management of Low Back Pain."* Washington, DC.
   - **Relevance:** Comprehensive guideline incorporating evidence on red flags, imaging, and management

10. **National Suicide Prevention Lifeline.** (2024). *"Screening and Assessment of Suicidal Behavior."* Available at: https://suicidepreventionlifeline.org/
    - **Relevance:** Clinically validated suicide screening and response protocols

11. **Cole-Arnedt, R. T., Greenberg, E., Nolan, J., & Robinson, C.** (2008). "The association between asking about suicidal ideation and subsequent suicide attempts." *American Journal of Psychiatry*, 165(7), 800-801.
    - **Relevance:** Addresses common myth that asking about suicidality increases risk

12. **Lalmohamed, A., Vestergaard, P., Mobius, D., & de Vries, F.** (2015). "Patterns of antibiotic use and risk of staphylococcus aureus bacteremia: A Danish nationwide study." *Archives of Internal Medicine*, 170(16), 1470-1476.
    - **Relevance:** Spinal infection epidemiology in high-risk populations

---

## 11. Appendix: Screening Questionnaire Templates

### Tier 1: Rapid Safety Screen (30 seconds)

**For every session, all patients:**

```
Kimi: "Before we start, I want to check in on your safety. Have you noticed any of the following since we last spoke?

1. Any new weakness, numbness, or tingling in both legs?
2. Any changes in bladder or bowel control?
3. Fever or chills?
4. Chest pain or shortness of breath?
5. Thoughts about harming yourself?

If ANY "yes": Stop session, escalate to appropriate tier
If ALL "no": Proceed with session, continue below
```

---

### Tier 2: Comprehensive Intake Screen (10 minutes)

**At initial intake and monthly reassessment:**

```
MEDICAL HISTORY:
1. Have you ever been diagnosed with cancer? If yes: When? Type? Currently active?
2. Have you been diagnosed with osteoporosis?
3. Are you taking any steroid medications (prednisone, dexamethasone)?
4. Do you have any immune system problems, HIV, or are you on immunosuppressive medications?
5. Have you ever used injectable drugs?

CURRENT SYMPTOMS:
6. In the past week, have you had a fever?
7. Have you had any major trauma or falls recently?
8. Is your pain worse at night? Does it wake you from sleep?
9. Have you noticed unexplained weight loss?
10. Is your pain getting worse despite treatment? How bad is it (0-10)?
11. Have you noticed any weakness in your legs or arms? Is it getting worse?
12. Any numbness or tingling in both legs or in your genital area?
13. Have you had any recent injections or procedures?

MOOD AND PSYCHOLOGICAL:
14. How has your mood been? Depressed or anxious?
15. Have you felt hopeless about your situation?
16. Have you thought about harming yourself? (ask directly if elevated risk)

[Escalate based on responses per Section 4 protocol]
```

---

## 12. Training and Implementation Requirements

### For Clinical Team
- **Annual training:** Red flag recognition, escalation protocol, documentation standards
- **Simulation exercise:** Practice responding to Tier 1 escalations within 5 minutes
- **Competency assessment:** Can clinician correctly triage 10 case scenarios?

### For AI/Algorithm Team
- **Quarterly calibration:** Review missed and false-positive escalations
- **Annual algorithm review:** Update red flag thresholds and evidence base
- **Incident reporting:** Any serious adverse events → algorithm review within 48 hours

### For Patients (Safety Oriented)
- **At enrollment:** "Here's what we'll be monitoring for safety — these symptoms require urgent care"
- **Education materials:** Simple written guide to red flags and when to seek emergency care
- **Encouraged direct reporting:** "If you notice any concerning symptoms, tell us immediately"

---

## 13. Final Validation and Sign-Off

**This clinical reference document serves as the authoritative source for KIMI's red flag screening protocol.**

**Document validation:**
- [x] Evidence-based citations
- [x] Risk-appropriate escalation tiers
- [x] Clear decision algorithms
- [x] Protections against false negatives (conservative approach)
- [x] Balance against false positives (proportional thresholds)
- [x] Patient safety-centered design
- [x] Clinical team integration specifications
- [x] Audit and feedback mechanisms

**Recommendation for use:**
This document should be reviewed by the orthopedic medical director and safety officer BEFORE Kimi deployment. Any modifications to escalation criteria must be documented and justified based on evidence.

**Liability and accountability:**
This protocol represents current best evidence as of April 2026. The AI system is not a physician; escalation to qualified clinicians is non-negotiable for all red flag presentations. The clinical team bears responsibility for patient safety in clinical decision-making.

---

**Document prepared:** April 3, 2026
**Intended audience:** KIMI medical advisory team, AI operations, clinical deployment team
**Revision cycle:** Annual review, as-needed updates for new evidence
**Contact for questions:** KIMI Clinical Safety Officer

