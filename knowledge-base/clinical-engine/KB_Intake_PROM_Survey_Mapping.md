# KIMI MSK ACCESS Model — PROM Survey Mapping & Intake Administration Protocol

**Document Version:** 1.0
**Effective Date:** April 2026
**CMS Compliance:** ACCESS Model MSK Track (Table 6, OAP Measures)
**Knowledge Base Category:** Intake Protocol / PROM Administration

---

## Table of Contents

1. [Purpose — PROM Mapping at Intake](#section-1-purpose)
2. [ACCESS MSK Track Table 6 — Complete PROM Mapping](#section-2-table-6)
3. [PROM Selection Decision Logic](#section-3-selection-logic)
4. [Intake PROM Administration Protocol](#section-4-administration)
5. [PROM Baseline Scoring and Interpretation](#section-5-scoring)
6. [FHIR Data Submission Requirements](#section-6-fhir)
7. [Psychosocial Screening PROMs (Clinical, Not CMS-Mandated)](#section-7-psychosocial)
8. [Administration Sequencing at Intake](#section-8-sequencing)
9. [Quality Assurance](#section-9-qa)

---

## Section 1: Purpose — PROM Mapping at Intake {#section-1-purpose}

### Why Correct PROM Assignment at Enrollment Is Critical

Patient-Reported Outcome Measures (PROMs) are the **foundation of CMS payment and clinical quality reporting** under the ACCESS Model MSK Track. Every financial and clinical decision for the 12-month care period depends on selecting the correct PROM set at enrollment:

- **Payment Authority**: OAP (Outcome Achievement Payment) is worth **$180 per beneficiary per year**. Payment is contingent on valid PROM data submission within 60 days of alignment and achievement of 50% OAT (Outcome Achievement Threshold) across the beneficiary cohort.
- **Invalid PROM Assignment = Invalid CMS Data**: If the wrong PROM is assigned to a beneficiary (e.g., QuickDASH for a knee patient instead of KOOS JR), all baseline and follow-up data for that beneficiary become scientifically invalid. CMS will not accept the data, and the beneficiary's outcome progress cannot contribute to OAT achievement.
- **No Mid-Course Correction**: The same PROM set must be administered to each beneficiary at baseline (intake), 6 months, and end-of-period (12 months). Once assigned, the PROM set **cannot be changed** for that beneficiary. Switching instruments mid-enrollment invalidates all prior and subsequent data.
- **Site-Specific Validity**: Each PROM is **psychometrically validated for a specific anatomical site**. For example:
  - ODI is validated only for lower back pain; using it for neck pain is clinically and scientifically invalid.
  - KOOS JR is validated only for knee OA/injury; using it for hip patients yields meaningless data.
  - QuickDASH is validated for upper extremity (shoulder, elbow, wrist, hand); it cannot be used for lower extremity.

### The PROM-to-Site Mapping Determines Kimi's Entire Measurement Strategy

At intake, the enrollment clinician must:

1. **Identify the anatomical site(s) of pain** with highest functional impact (primary site) and any secondary sites.
2. **Assign the site-specific PROM(s)** according to Table 6.
3. **Assign universal PROMs** (PROMIS PF, PROMIS PI, NRS, PGIC — collected for ALL beneficiaries).
4. **Lock in the PROM set** in Kimi's care plan. This set will be administered at baseline, 6-month, and end-of-period assessments.
5. **Communicate the baseline PROM results** to the patient, setting realistic expectations for improvement (e.g., "Over the next 12 months, our goal is to reduce your pain score by at least 2 points and improve your function score by at least 2 points").

### Consistency and Compliance

The same PROM instruments must be used consistently because:

- **Longitudinal validity**: Comparison of baseline to 6-month to end-of-period scores is only valid if the same instrument is administered each time.
- **CMS reporting**: All baseline and follow-up PROM data are submitted to CMS via FHIR API. Each submission must include the LOINC code for the PROM. Changing PROMs mid-enrollment breaks the FHIR submission chain and flags data as invalid.
- **Outcome achievement calculation**: OAT achievement requires that ≥50% of beneficiaries achieve the minimum improvement target for their assigned PROMs. If a beneficiary has inconsistent PROM assignments, their data cannot be counted toward OAT.

---

## Section 2: ACCESS MSK Track Table 6 — Complete PROM Mapping {#section-2-table-6}

### CMS ACCESS Model MSK Track — OAP Measures (Table 6)

This table is the authoritative specification for all PROM collection under the ACCESS Model MSK Track. Every entry in this table is **mandatory and non-negotiable**.

| **Anatomical Site of Pain** | **Required PROM** | **Minimum Improvement Target** | **Response Direction** |
|---|---|---|---|
| **ALL sites** | PROMIS Physical Function (PF-10a) | ≥2-point increase | Higher = Better |
| **ALL sites** | PROMIS Pain Interference (PI-8a) | ≥2-point decrease | Lower = Better |
| **Lower Back** | Oswestry Disability Index (ODI) | ≥8-point reduction | Lower = Better |
| **Neck** | Neck Disability Index (NDI) | ≥8-point reduction | Lower = Better |
| **Shoulder, Arm, Hand, Elbow** | QuickDASH | ≥10-point reduction | Lower = Better |
| **Knee** | KOOS JR (Knee Injury & Osteoarthritis Outcome Score Joint Replacement) | ≥10-point increase | Higher = Better |
| **Hip** | HOOS JR (Hip Disability & Osteoarthritis Outcome Score Joint Replacement) | ≥10-point increase | Higher = Better |
| **ALL sites** | Numeric Rating Scale (NRS) | No more than 2-point increase | Lower = Better |
| **ALL sites (end-of-period only)** | Patient Global Impression of Change (PGIC) | Collected at end-of-period; not baseline | 7-point scale |

### Universal PROMs (Collected for ALL Beneficiaries)

The following measures must be administered to **every beneficiary** regardless of anatomical site:

1. **PROMIS Physical Function (PF-10a)**: Assesses general functional capacity across body systems.
2. **PROMIS Pain Interference (PI-8a)**: Measures the degree to which pain interferes with daily activities.
3. **Numeric Rating Scale (NRS)**: Single-item pain intensity rating.
4. **PGIC (Patient Global Impression of Change)**: Holistic assessment of change; collected only at end-of-period.

### Site-Specific PROMs

The following measures are collected **only for beneficiaries with the indicated anatomical site(s) as their primary complaint**:

- **ODI**: Lower back pain **only**
- **NDI**: Neck pain **only**
- **QuickDASH**: Shoulder, elbow, wrist/hand pain
- **KOOS JR**: Knee pain **only**
- **HOOS JR**: Hip pain **only**

### Special Cases

**Ankle/Foot Pain**: No disease-specific PROM is included in Table 6. Beneficiaries with primary ankle/foot pain receive:
- PROMIS PF (as primary outcome measure)
- PROMIS PI
- NRS
- PGIC (end-of-period)

**Multi-Site Pain**: Beneficiaries with pain in multiple anatomical regions receive:
- All universal PROMs (PF, PI, NRS, PGIC)
- ALL applicable site-specific PROMs for each region (e.g., a beneficiary with both lower back and knee pain receives ODI + KOOS JR)
- The primary site (region with greatest functional impact) is designated for outcome reporting to CMS

---

## Section 3: PROM Selection Decision Logic {#section-3-selection-logic}

### Step-by-Step Algorithm for PROM Assignment at Intake

```
INTAKE PROM ASSIGNMENT ALGORITHM

Step 1: IDENTIFY ANATOMICAL SITE(S)
   Question: "Where is your pain? Which area bothers you the most?"

   If patient reports SINGLE site → PRIMARY SITE = that site
   If patient reports MULTIPLE sites → PRIMARY SITE = site with highest functional impact
   Record all secondary sites.

Step 2: ASSIGN UNIVERSAL PROMs (ALL BENEFICIARIES)
   ✓ PROMIS Physical Function (PF-10a)
   ✓ PROMIS Pain Interference (PI-8a)
   ✓ Numeric Rating Scale (NRS)
   ✓ PGIC (at END-of-period only, NOT at intake)

Step 3: DETERMINE PRIMARY SITE CATEGORY
   Is primary site one of the following?

   a) Lower Back → ASSIGN ODI
   b) Neck → ASSIGN NDI
   c) Shoulder, Elbow, Wrist, Hand → ASSIGN QuickDASH
   d) Knee → ASSIGN KOOS JR
   e) Hip → ASSIGN HOOS JR
   f) Ankle, Foot, or Other → ASSIGN NONE (use PROMIS PF as primary outcome)

Step 4: ASSIGN SECONDARY SITE PROM(S) (if applicable)
   For each secondary site reported, apply Step 3 logic.
   If secondary site has a site-specific PROM, include it in the PROM set.

Step 5: DOCUMENT PROM SET IN CARE PLAN
   Create Kimi care plan entry:
   - Primary anatomical site: [site]
   - Assigned PROMs: [list all]
   - Baseline administration date: [date]
   - Next follow-up: 6-month assessment

   LOCK IN: This PROM set remains fixed for the entire 12-month enrollment period.

Step 6: COMMUNICATE TO PATIENT
   "Your pain is primarily in your [primary site]. Over the next 12 months, we'll measure
    your progress using several questionnaires. We're looking for improvement of at least
    [improvement target] in your [primary PROM] score. Let's start by collecting your
    baseline measurements today."
```

### Multi-Site Example

**Scenario**: 55-year-old female presents with lower back pain (primary) and right knee pain (secondary).

- **Primary site**: Lower back
- **Secondary site**: Right knee
- **Universal PROMs**: PROMIS PF-10a, PROMIS PI-8a, NRS, PGIC (end-of-period)
- **Site-specific PROMs**: ODI (lower back) + KOOS JR (knee)
- **Baseline PROM set** (6 instruments total): PF, PI, NRS, ODI, KOOS JR + PGIC at end-of-period
- **CMS Outcome Report**: Primary outcome = ODI improvement ≥8 points; Secondary outcome = KOOS JR improvement ≥10 points; Universal outcomes = PF increase ≥2 + PI decrease ≥2 + NRS no more than 2-point increase

### Elbow Mapping

**Important**: While the anatomical site table lists "Shoulder, Arm, Hand," elbow pain falls within the upper extremity category and is **mapped to QuickDASH**.

- **Elbow pain**: QuickDASH (validated for elbow)
- **Wrist/hand pain**: QuickDASH
- **Shoulder pain**: QuickDASH
- All three regions use the same instrument because the hand/arm/shoulder share common functional domains assessed by QuickDASH.

### Ankle/Foot Special Case

Ankle and foot pain do not have a dedicated site-specific PROM in Table 6. These beneficiaries are managed as follows:

- **Universal PROMs only**: PROMIS PF-10a, PROMIS PI-8a, NRS, PGIC
- **Primary outcome**: PROMIS Physical Function (≥2-point increase)
- **Secondary outcomes**: PROMIS PI (≥2-point decrease), NRS (no more than 2-point increase)
- **OAT contribution**: These beneficiaries contribute to the 50% OAT threshold through their universal PROM improvement targets.

---

## Section 4: Intake PROM Administration Protocol {#section-4-administration}

### 4.1 PROMIS Physical Function (PF-10a)

#### Overview
PROMIS (Patient-Reported Outcomes Measurement Information System) Physical Function assesses the ability to carry out activities ranging from self-care to walking and household chores. The 10-item version (PF-10a) is the brief, validated form for routine clinical use.

#### Instrument Specifications
- **Number of items**: 10
- **Administration time**: ~2 minutes
- **Response scale**: 5-point Likert (1 = Unable to do, 2 = With much difficulty, 3 = With some difficulty, 4 = With a little difficulty, 5 = Without any difficulty)
- **Scoring**: T-score (mean = 50, standard deviation = 10); higher scores indicate better physical function
- **Minimum Clinically Important Difference (MCID)**: ≥2-point increase
- **LOINC codes**:
  - 61323-6 (PROMIS PF overall)
  - 71007-9 (PROMIS Physical Function 10-item)

#### Item Text (Exact Wording)

In the past 7 days, how much difficulty do you have with the following:

1. Doing vigorous activities such as running, lifting heavy objects, participating in strenuous sports
2. Doing moderate activities such as moving a table, pushing a vacuum cleaner, bowling, or playing golf
3. Lifting or carrying groceries
4. Climbing one flight of stairs
5. Climbing several flights of stairs
6. Getting out of bed
7. Walking more than a mile
8. Walking several hundred yards
9. Walking one hundred yards
10. Bathing or dressing yourself

#### Response Options for Each Item

- 1 = Unable to do
- 2 = With much difficulty
- 3 = With some difficulty
- 4 = With a little difficulty
- 5 = Without any difficulty

#### Scoring Algorithm

1. **Sum all item responses**: Raw score = sum of responses to all 10 items (range: 10–50)
2. **Convert to T-score**: Use PROMIS conversion table or online calculator
   - T-score = (Raw Score − 11.02) × 1.835 + 47.03
   - Example: Raw score of 35 → T-score ≈ 52.5
3. **Interpret**:
   - T-score 60+ = Excellent function
   - T-score 50–60 = Good function
   - T-score 40–50 = Moderate function
   - T-score <40 = Poor function

#### Kimi's Conversational Delivery Script

---

**[After greeting and rapport-building]**

"Before we dive into your care plan, I'd like to understand how your [pain/condition] affects your daily activities. I'm going to read you 10 statements, and for each one, I'd like you to tell me how much difficulty you have right now. There's no right or wrong answer — I just want to understand your current situation.

Let me start: **In the past 7 days, how much difficulty do you have with the following?**

[Read each item slowly and clearly. Pause for response.]

**Item 1:** Doing vigorous activities like running, lifting heavy objects, or playing strenuous sports. Would you say: unable to do, with much difficulty, with some difficulty, with a little difficulty, or without any difficulty?

[Record response. Repeat format for Items 2–10, adjusting for patient comfort and clarity.]

After Item 10, acknowledge: 'Thank you. These answers help me understand how your pain is affecting your daily life right now.'"

---

#### Severity Classification for Patient Communication

| **T-Score Range** | **Functional Status** | **Clinical Interpretation** |
|---|---|---|
| 60–70 | Excellent | Near-normal functional capacity |
| 50–60 | Good | Mild functional limitations |
| 40–50 | Moderate | Moderate functional limitations; activities significantly restricted |
| 30–40 | Poor | Severe functional limitations; very limited activity tolerance |
| <30 | Very Poor | Extreme functional limitations; minimal independent activity |

---

### 4.2 PROMIS Pain Interference (PI-8a)

#### Overview
PROMIS Pain Interference measures the extent to which pain interferes with sleep, work, social activities, and emotional well-being over the past 7 days. Higher scores indicate greater pain-related interference.

#### Instrument Specifications
- **Number of items**: 8
- **Administration time**: ~2 minutes
- **Response scale**: 5-point Likert (1 = Not at all, 2 = A little bit, 3 = Somewhat, 4 = Quite a bit, 5 = Very much)
- **Scoring**: T-score (mean = 50, SD = 10); higher scores indicate more interference
- **MCID**: ≥2-point decrease (improvement = lower score)
- **LOINC codes**:
  - 61326-9 (PROMIS Pain Interference)
  - 71008-7 (PROMIS Pain Interference 8-item)

#### Item Text (Exact Wording)

In the past 7 days:

1. How much did pain interfere with your day-to-day activities?
2. How much did pain interfere with work around the house?
3. How much did pain interfere with your ability to participate in social activities?
4. How much did pain interfere with your household chores?
5. How much did pain interfere with your sleep?
6. How much did pain interfere with your ability to concentrate?
7. How much did pain interfere with your work or career?
8. How much did pain interfere with your leisure activities?

#### Response Options for Each Item

- 1 = Not at all
- 2 = A little bit
- 3 = Somewhat
- 4 = Quite a bit
- 5 = Very much

#### Scoring Algorithm

1. **Sum all item responses**: Raw score = sum of responses (range: 8–40)
2. **Convert to T-score**:
   - T-score = (Raw Score − 8.13) × 2.47 + 52.10
   - Example: Raw score of 24 → T-score ≈ 52.1
3. **Interpret**:
   - T-score <40 = Minimal pain interference
   - T-score 40–50 = Mild-to-moderate interference
   - T-score 50–60 = Moderate-to-high interference
   - T-score >60 = High pain interference

#### Kimi's Conversational Delivery Script

---

**[After PROMIS PF, with smooth transition]**

"Now I want to understand how your pain is affecting your daily life in different ways. I'll ask you about pain's impact on sleep, work, social activities, and other things you do. Remember, there are no right or wrong answers.

**In the past 7 days:**

[Read each item with pauses for response.]

**Item 1:** How much did pain interfere with your day-to-day activities? Would you say: not at all, a little bit, somewhat, quite a bit, or very much?

[Continue through Item 8 with same cadence.]

After Item 8: 'I appreciate you sharing that. This helps me understand how much pain is affecting your life right now.'"

---

#### Severity Classification for Patient Communication

| **T-Score Range** | **Interference Level** | **Clinical Implications** |
|---|---|---|
| <40 | Minimal | Pain has minimal impact on daily function |
| 40–50 | Mild-to-Moderate | Pain affects some daily activities; manageable with support |
| 50–60 | Moderate-to-High | Pain significantly impacts work, sleep, social engagement |
| >60 | High | Pain severely restricts life activities; urgent need for intervention |

---

### 4.3 Numeric Rating Scale (NRS)

#### Overview
The NRS is a single-item, 0–10 pain intensity scale. It is rapid, sensitive to change, and validated across all pain conditions and anatomical sites. Lower scores indicate less pain.

#### Instrument Specifications
- **Number of items**: 1
- **Administration time**: <30 seconds
- **Response scale**: 0–10 (0 = no pain, 10 = worst pain imaginable)
- **Scoring**: Raw score (0–10); no conversion needed
- **MCID**: Typically 2 points (varies slightly by condition; ACCESS specifies "no more than 2-point increase" as acceptable)
- **LOINC code**: 76605-6 (Pain severity 0-10 numeric rating scale)

#### Item Text (Exact Wording)

**"On a scale of 0 to 10, where 0 means no pain at all and 10 means the worst pain you can imagine, what is your pain level right now?"**

Optionally, offer visual reference:
- **0** = No pain at all
- **5** = Moderate pain (interferes with some activities)
- **10** = Worst pain imaginable (unable to function)

#### Scoring Algorithm

No conversion required. Record the patient's response as the pain score.

- Example: Patient responds "6" → NRS = 6/10

#### ACCESS Improvement Target

- **Baseline NRS**: Record at intake
- **End-of-period NRS**: Record at 12-month assessment
- **Acceptable change**: No more than 2-point increase (i.e., pain can stay the same or improve, but should not worsen by more than 2 points)
- **Ideal improvement**: Decrease of ≥2 points (consistent with other PROM MCID criteria)

#### Kimi's Conversational Delivery Script

---

**[Brief, conversational approach]**

"On a scale from 0 to 10, with 0 being no pain at all and 10 being the worst pain you can imagine, how would you rate your pain right now? Feel free to use any number between 0 and 10."

[Pause for response. Accept the number without judgment.]

"Thank you. So you're at a [number] right now. Over the next 12 months, our goal is to bring that number down. Let's see where we can get you."

---

#### Severity Classification for Patient Communication

| **NRS Score** | **Severity** | **Functional Impact** |
|---|---|---|
| 0–3 | Mild | Minimal impact; manageable |
| 4–6 | Moderate | Noticeable impact on some activities |
| 7–9 | Severe | Significant impact on most activities; impacts sleep |
| 10 | Maximum | Incapacitating; urgent intervention needed |

---

### 4.4 Oswestry Disability Index (ODI)

#### Overview
The ODI is the gold-standard, disease-specific measure of disability in patients with lower back pain. It assesses functional limitations across 10 domains: pain intensity, personal care, lifting, walking, sitting, standing, sleeping, social life, traveling, and work/activities. Higher scores indicate greater disability.

**When to administer**: **Lower back pain patients ONLY**

#### Instrument Specifications
- **Number of sections**: 10
- **Administration time**: ~5 minutes
- **Response scale**: 6-point ordinal (0–5) per section
- **Scoring**: Disability percentage (0–100%; higher = more disability)
- **MCID**: ≥8-point reduction (e.g., 45% → 37%)
- **LOINC code**: 89022-2 (Oswestry Disability Index)

#### Item Categories and Response Options

Each section presents a statement and asks the patient to select the response that best describes their current status:

**Section 1: Pain Intensity**
- 0: I have no pain at the moment
- 1: The pain is mild at the moment
- 2: The pain is moderate at the moment
- 3: The pain is fairly severe at the moment
- 4: The pain is very severe at the moment
- 5: The pain is the worst imaginable at the moment

**Section 2: Personal Care (washing, dressing, etc.)**
- 0: I can look after myself normally without causing increased pain
- 1: I can look after myself normally but it causes increased pain
- 2: It is painful to look after myself and I am slow and careful
- 3: I need some help but manage most of my personal care
- 4: I need help every day in most aspects of self-care
- 5: I do not get dressed, wash with difficulty, stay in bed

**Section 3: Lifting**
- 0: I can lift heavy weights without increased pain
- 1: I can lift heavy weights but it causes increased pain
- 2: Pain prevents me from lifting heavy weights off the floor, but I can if they are conveniently positioned (e.g., on a table)
- 3: Pain prevents me from lifting heavy weights, but I can manage light to medium weights if they are conveniently positioned
- 4: I can only lift very light weights
- 5: I cannot lift or carry anything at all

**Section 4: Walking**
- 0: Pain does not prevent me from walking any distance
- 1: Pain prevents me from walking more than a mile
- 2: Pain prevents me from walking more than a quarter mile
- 3: Pain prevents me from walking more than around the house
- 4: I can only walk while using a stick or crutches
- 5: I am in bed most of the time and have to crawl to the toilet

**Section 5: Sitting**
- 0: I can sit in any chair as long as I like
- 1: I can only sit in my favorite chair as long as I like
- 2: Pain prevents me from sitting more than 1 hour
- 3: Pain prevents me from sitting more than 30 minutes
- 4: Pain prevents me from sitting more than 10 minutes
- 5: Pain prevents me from sitting at all

**Section 6: Standing**
- 0: I can stand as long as I want without increased pain
- 1: I can stand as long as I want but it increases pain
- 2: Pain prevents me from standing more than 1 hour
- 3: Pain prevents me from standing more than 30 minutes
- 4: Pain prevents me from standing more than 10 minutes
- 5: Pain prevents me from standing at all

**Section 7: Sleeping**
- 0: My sleep is never disturbed by pain
- 1: My sleep is occasionally disturbed by pain
- 2: Because of pain, I have less than 6 hours sleep
- 3: Because of pain, I have less than 4 hours sleep
- 4: Because of pain, I have less than 2 hours sleep
- 5: Pain prevents me from sleeping at all

**Section 8: Social Life**
- 0: My social life is normal and does not increase pain
- 1: My social life is normal but increases pain
- 2: Pain has no effect on my social life apart from limiting my more energetic interests (e.g., sports)
- 3: Pain restricts my social life and I do not go out as often
- 4: Pain has restricted my social life to my home
- 5: I have hardly any social life because of pain

**Section 9: Traveling**
- 0: I can travel anywhere without increased pain
- 1: I can travel anywhere but it increases pain
- 2: Pain is increased by traveling more than 2 hours
- 3: Pain is increased by traveling more than 1 hour
- 4: Pain restricts me to short necessary journeys under 30 minutes
- 5: Pain prevents me from traveling except to receive care

**Section 10: Work/Leisure Activities**
- 0: I am able to engage in all my pre-injury work and leisure activities
- 1: I am able to engage in all my pre-injury work and leisure activities but with increased pain
- 2: I cannot do my pre-injury work but I am able to do all other leisure activities
- 3: I cannot do my pre-injury work or leisure activities
- 4: I can hardly do any pre-injury work or leisure activities
- 5: I am unable to engage in any pre-injury work or leisure activities

#### Scoring Algorithm

1. **Record response for each section** (0–5 points).
2. **Sum all 10 sections**: Raw score = sum of responses (range: 0–50)
3. **Convert to disability percentage**:
   - Disability % = (Raw Score / 50) × 100
   - Example: Raw score 25 → Disability = 50%
4. **Interpret**:
   - 0–20% = Minimal disability
   - 21–40% = Mild disability
   - 41–60% = Moderate disability
   - 61–80% = Severe disability
   - 81–100% = Complete disability

#### Kimi's Conversational Administration Script

---

**[After establishing rapport, introduce ODI clearly]**

"Because your main issue is lower back pain, I'm going to ask you more detailed questions about how it affects 10 different areas of your life — things like self-care, lifting, walking, sitting, and work. These questions help me understand exactly where you're struggling most.

For each category, I'll read you some options, and you tell me which one describes you best right now. Remember, there are no right or wrong answers. I'm just trying to understand your baseline.

Let's start:

**Section 1 — Pain Intensity:** Right now, would you say your pain is:
- No pain at all?
- Mild?
- Moderate?
- Fairly severe?
- Very severe?
- The worst pain you can imagine?

[Record response. Continue with conversational delivery for each section. Pause after each to ensure understanding.]

**Section 2 — Personal Care:** Can you look after yourself with bathing and dressing? Are you able to do this normally, or does it cause you pain? Do you need any help?

[Continue this conversational tone through all 10 sections.]

After completing all 10 sections:

'Thank you. Your answers paint a clear picture of where you are right now. Based on these, your disability level is about [percentage]%. Over the next 12 months, we're aiming to reduce that by at least 8 points — that's about a 16% improvement, which is meaningful and achievable. Let's build a plan.'"

---

#### Severity Classification and Patient Communication

| **Disability %** | **Severity** | **Functional Status** | **Improvement Goal** |
|---|---|---|---|
| 0–20% | Minimal | Minimal disability; most activities possible | Maintain or improve further |
| 21–40% | Mild | Mild disability; some activity limitations | Reduce by 8+ percentage points |
| 41–60% | Moderate | Moderate disability; significant activity restrictions | Reduce by 8+ percentage points |
| 61–80% | Severe | Severe disability; major activity limitations | Reduce by 8+ percentage points (high priority) |
| 81–100% | Complete | Incapacitating; minimal independent activity | Urgent intervention required; very high priority |

---

### 4.5 Neck Disability Index (NDI)

#### Overview
The NDI is the validated, disease-specific measure of disability in neck pain patients. It mirrors the ODI structure but is adapted for cervical spine conditions and functional domains relevant to neck pain (e.g., neck pain intensity, headaches, concentration, work). Higher scores indicate greater disability.

**When to administer**: **Neck pain patients ONLY**

#### Instrument Specifications
- **Number of sections**: 10
- **Administration time**: ~5 minutes
- **Response scale**: 6-point ordinal (0–5) per section
- **Scoring**: Disability percentage (0–100%)
- **MCID**: ≥8-point reduction
- **LOINC code**: 89023-0 (Neck Disability Index)

#### Item Categories and Response Options

**Section 1: Neck Pain Intensity**
- 0: I have no neck pain at the moment
- 1: The pain is very mild at the moment
- 2: The pain is mild at the moment
- 3: The pain is moderate at the moment
- 4: The pain is fairly severe at the moment
- 5: The pain is very severe at the moment

**Section 2: Headaches**
- 0: I have no headaches at all
- 1: I have very mild headaches that come infrequently
- 2: I have mild headaches that come infrequently
- 3: I have moderate headaches that come frequently
- 4: I have fairly severe headaches that come frequently
- 5: I have very severe headaches almost all of the time

**Section 3: Concentration**
- 0: I can concentrate fully when I want to with no difficulty
- 1: I can concentrate fully when I want to with slight difficulty
- 2: I have a fair degree of difficulty in concentrating when I want to
- 3: I have moderate difficulty in concentrating when I want to
- 4: I have considerable difficulty concentrating
- 5: I cannot concentrate at all

**Section 4: Work (or daily activities)**
- 0: I can do as much work as I want
- 1: I can do most of my usual work but with some alteration in method
- 2: I can work at all times but I cannot do my usual work
- 3: I can do little work but have to take frequent rests
- 4: I can do hardly any work and have to take frequent rests
- 5: I cannot do any work at all

**Section 5: Driving**
- 0: I can drive as long as I want
- 1: I can drive as long as I want but with some neck pain
- 2: I can drive as long as I want but with moderate neck pain
- 3: I cannot drive as long as I want because of neck pain
- 4: I can hardly drive at all because of neck pain
- 5: I cannot drive at all

**Section 6: Sleeping**
- 0: No sleep disturbance
- 1: Slight sleep disturbance
- 2: Sleep is mildly disturbed
- 3: Sleep is moderately disturbed
- 4: Sleep is greatly disturbed
- 5: Sleep is completely disturbed

**Section 7: Recreation**
- 0: I am able to engage in all recreational activities
- 1: I am able to engage in most of my recreational activities
- 2: I am able to engage in many of my recreational activities
- 3: I am able to engage in some of my recreational activities
- 4: I am able to engage in few recreational activities
- 5: I am unable to engage in any recreational activities

**Section 8: Frequency of Headaches**
- 0: Headaches never occur
- 1: Headaches rarely occur
- 2: Occasional headaches occur
- 3: Frequent headaches occur
- 4: Headaches are very frequent
- 5: Headaches are almost constant

**Section 9: Severity of Headaches**
- 0: Headaches are not severe
- 1: Headaches are slightly severe
- 2: Headaches are of moderate severity
- 3: Headaches are fairly severe
- 4: Headaches are very severe
- 5: Headaches are as severe as you can imagine

**Section 10: Lifting**
- 0: I can lift a heavy weight without increased neck pain
- 1: I can lift a heavy weight but it causes increased neck pain
- 2: Neck pain prevents me from lifting a heavy weight off the floor
- 3: Neck pain prevents me from lifting a heavy weight off a table
- 4: Neck pain prevents me from lifting light weights
- 5: I cannot lift anything at all

#### Scoring Algorithm

1. **Record response for each section** (0–5 points).
2. **Sum all 10 sections**: Raw score (range: 0–50)
3. **Convert to disability percentage**:
   - Disability % = (Raw Score / 50) × 100
4. **Interpret**: Same scale as ODI (0–20% minimal, 21–40% mild, etc.)

#### Kimi's Conversational Administration Script

---

**[Introduction, distinct from lower back focus]**

"Since your primary concern is neck pain, I'm going to ask 10 questions that specifically relate to neck conditions — things like neck pain intensity, headaches (which often go hand in hand with neck pain), concentration, driving, sleep, and activities.

Let's go through these together:

**Section 1 — Neck Pain Intensity:** How would you describe your neck pain right now?
- No pain at all?
- Very mild?
- Mild?
- Moderate?
- Fairly severe?
- Very severe?

[Continue conversationally through all 10 sections.]

**Section 2 — Headaches:** Do you experience headaches? If so, how often and how severe?

[Continue with careful attention to the unique domains for neck pain — concentration, driving, lifting head position, etc.]

After completing all sections:

'Your disability level from neck pain is currently [percentage]%. Our goal over the next 12 months is to reduce that by at least 8 percentage points. With proper management, many neck pain patients see significant improvement. Let's build your plan.'"

---

---

### 4.6 QuickDASH (Quick Disability of Arm, Shoulder and Hand)

#### Overview
QuickDASH is the validated, brief upper-extremity specific outcome measure for patients with pain, dysfunction, or disability affecting the shoulder, elbow, wrist, or hand. It assesses ability to perform specific arm/hand-dependent activities. Higher scores indicate greater disability.

**When to administer**: **Shoulder, elbow, wrist/hand pain patients ONLY**

#### Instrument Specifications
- **Number of items**: 11
- **Administration time**: ~3 minutes
- **Response scale**: 5-point Likert (1 = No difficulty, 2 = Mild difficulty, 3 = Moderate difficulty, 4 = Severe difficulty, 5 = Unable)
- **Scoring**: Disability score (0–100; higher = more disability)
- **MCID**: ≥10-point reduction
- **LOINC code**: 89011-5 (QuickDASH score)

#### Item Text (Exact Wording)

**Instructions**: "The following questions ask about the difficulty of your symptoms and your ability to perform certain activities. Please rate your ability to do the following activities in the past week."

1. Open a tight or new jar
2. Write
3. Perform usual work as best that you can
4. Perform usual hobbies or recreational activities as best that you can
5. Grip small objects (e.g., keys)
6. Prepare a meal
7. Do heavy household chores (e.g., wash walls, vacuum)
8. Garden or do yard work
9. Make a bed
10. Carry a shopping bag or briefcase
11. Wash your hair

#### Response Options for Each Item

- 1 = No difficulty
- 2 = Mild difficulty
- 3 = Moderate difficulty
- 4 = Severe difficulty
- 5 = Unable to do

#### Scoring Algorithm

1. **Record response for each of 11 items** (1–5).
2. **Sum all responses**: Raw score = sum of 11 items (range: 11–55)
3. **Convert to disability score**:
   - QuickDASH Score = [(Raw Score − 11) / 44] × 100
   - Example: Raw score 25 → [(25 − 11) / 44] × 100 = 31.8 (disability score ≈ 32)
4. **Interpret**:
   - 0–20 = Minimal disability
   - 21–40 = Mild disability
   - 41–60 = Moderate disability
   - 61–80 = Severe disability
   - 81–100 = Complete disability

#### Kimi's Conversational Administration Script

---

**[Establish context for upper extremity focus]**

"Your arm/hand symptoms can affect many daily tasks. I'm going to ask about 11 specific activities — opening jars, writing, gripping things, household chores, hobbies — and how difficult they are right now. For each one, tell me if it's easy, a little hard, moderately hard, really hard, or impossible.

Let's start:

**Item 1:** In the past week, how much difficulty have you had opening a tight or new jar?
- No difficulty?
- Mild difficulty?
- Moderate difficulty?
- Severe difficulty?
- Unable to do?

[Continue with same conversational format for all 11 items.]

[After Item 11]

'Thanks. Based on your answers, your disability from your arm/hand symptoms is about [disability score]. Over the next 12 months, we're targeting an improvement of at least 10 points. With the right treatment plan, we can definitely work toward that.'"

---

#### Severity Classification and Patient Communication

| **QuickDASH Score** | **Disability Level** | **Functional Impact** | **Treatment Priority** |
|---|---|---|---|
| 0–20 | Minimal | Minimal arm/hand disability; most activities possible | Maintenance/prevention |
| 21–40 | Mild | Mild disability; some task limitations | Standard management |
| 41–60 | Moderate | Moderate disability; significant functional impact | Intensive management recommended |
| 61–80 | Severe | Severe disability; major activity restrictions | High-priority intervention |
| 81–100 | Complete | Unable to perform most arm/hand-dependent activities | Urgent/emergency intervention |

---

### 4.7 KOOS JR (Knee Injury and Osteoarthritis Outcome Score — Joint Replacement)

#### Overview
KOOS JR is a validated, brief version of the full KOOS designed specifically for knee OA and injury patients. It captures pain, function in daily living, and function in sport/recreation. Importantly, **higher scores indicate BETTER function** (opposite direction from QuickDASH/ODI/NDI). This is the disease-specific knee outcome measure for the ACCESS MSK Track.

**When to administer**: **Knee pain patients ONLY**

#### Instrument Specifications
- **Number of items**: 7
- **Administration time**: ~2 minutes
- **Response scale**: 5-point Likert (0 = Extreme, 1 = Severe, 2 = Moderate, 3 = Mild, 4 = None)
- **Scoring**: 0–100 scale (higher = better function) — **NOTE: Inverted from ODI/NDI/QuickDASH**
- **MCID**: ≥10-point increase (improvement)
- **LOINC code**: 71311-0 (KOOS JR score)

#### Item Text (Exact Wording)

**Instructions**: "This questionnaire asks about your knee and how it functions in your everyday life."

1. Do you feel instability, i.e., the sensation that your knee might give way?
2. Difficulty squatting
3. Difficulty going up or down stairs
4. Difficulty bending the knee fully
5. Difficulty straightening your knee fully
6. Difficulty with kneeling
7. Difficulty walking on flat surface

#### Response Options for Each Item

For each item, ask: "What is your degree of difficulty or limitation with [activity]?"

- 0 = Extreme
- 1 = Severe
- 2 = Moderate
- 3 = Mild
- 4 = None

#### Scoring Algorithm

**Critical: KOOS JR uses an inverted scale — higher scores are better.**

1. **Record response for each of 7 items** (0–4).
2. **Sum all responses**: Raw score = sum of 7 items (range: 0–28)
3. **Convert to 0–100 scale**:
   - KOOS JR Score = (Raw Score / 28) × 100
   - Example: Raw score 20 → (20 / 28) × 100 = 71.4 (KOOS JR score ≈ 71)
4. **Interpret** (remember: **higher is better**):
   - 80–100 = Excellent function
   - 60–79 = Good function
   - 40–59 = Fair function
   - 20–39 = Poor function
   - 0–19 = Severe dysfunction

#### Kimi's Conversational Administration Script

---

**[Specific to knee focus]**

"Your knee is what's bringing you in today. I'm going to ask about 7 specific things that knee problems often affect — like stability, going up stairs, bending, straightening, kneeling, and walking. For each one, tell me how much difficulty or limitation you have. Let's go:

**Item 1:** Do you feel that your knee might give way or is unstable?
- Extreme instability?
- Severe instability?
- Moderate instability?
- Mild instability?
- No instability at all?

**Item 2:** How much difficulty do you have squatting?
[Continue with same format through Item 7.]

[After Item 7]

'Okay, based on your answers, your current knee function score is about [score] out of 100. Remember, higher is better. Our goal is to improve that by at least 10 points — getting you to a score of [baseline + 10] or higher. That represents real, meaningful improvement in your knee's ability to do what you need.'"

---

#### Severity Classification and Patient Communication

| **KOOS JR Score** | **Functional Status** | **Clinical Interpretation** | **Improvement Target** |
|---|---|---|---|
| 80–100 | Excellent | Minimal knee dysfunction; near-normal activities | Maintain or further improve |
| 60–79 | Good | Mild dysfunction; most activities possible with minimal modification | Increase by 10+ points |
| 40–59 | Fair | Moderate dysfunction; significant activity restrictions | Increase by 10+ points; high priority |
| 20–39 | Poor | Severe dysfunction; major limitation in walking, stairs, squatting | Increase by 10+ points; urgent priority |
| 0–19 | Severe | Extreme dysfunction; very limited independent mobility | Increase by 10+ points; intensive intervention required |

---

### 4.8 HOOS JR (Hip Disability and Osteoarthritis Outcome Score — Joint Replacement)

#### Overview
HOOS JR is the validated, brief version for hip OA and injury patients. Like KOOS JR, **higher scores indicate BETTER function**. It assesses pain, function in daily living, and function in sport/recreation specific to hip-dependent activities.

**When to administer**: **Hip pain patients ONLY**

#### Instrument Specifications
- **Number of items**: 6
- **Administration time**: ~2 minutes
- **Response scale**: 5-point Likert (0 = Extreme, 1 = Severe, 2 = Moderate, 3 = Mild, 4 = None)
- **Scoring**: 0–100 scale (higher = better function)
- **MCID**: ≥10-point increase (improvement)
- **LOINC code**: 71310-2 (HOOS JR score)

#### Item Text (Exact Wording)

**Instructions**: "This questionnaire asks about your hip and how it functions in your everyday life."

1. Do you feel instability, i.e., the sensation that your hip might give way?
2. Difficulty squatting
3. Difficulty going up or down stairs
4. Difficulty getting in or out of a car or bath
5. Difficulty with lying in bed
6. Difficulty walking on flat surface

#### Response Options for Each Item

- 0 = Extreme
- 1 = Severe
- 2 = Moderate
- 3 = Mild
- 4 = None

#### Scoring Algorithm

1. **Record response for each of 6 items** (0–4).
2. **Sum all responses**: Raw score = sum of 6 items (range: 0–24)
3. **Convert to 0–100 scale**:
   - HOOS JR Score = (Raw Score / 24) × 100
   - Example: Raw score 18 → (18 / 24) × 100 = 75 (HOOS JR score = 75)
4. **Interpret** (higher is better):
   - 80–100 = Excellent function
   - 60–79 = Good function
   - 40–59 = Fair function
   - 20–39 = Poor function
   - 0–19 = Severe dysfunction

#### Kimi's Conversational Administration Script

---

**[Hip-specific introduction]**

"Your hip is the main issue we're addressing. I'm going to ask about 6 hip-related activities that many people find challenging — getting in/out of cars, climbing stairs, squatting, walking, and sleeping. Let me know how much difficulty you have with each:

**Item 1:** Does your hip feel unstable, like it might give way?
[Continue through Item 6 with same conversational format.]

[After Item 6]

'Your current hip function score is approximately [score] out of 100. Our goal over 12 months is to improve that by at least 10 points. That will represent a real improvement in your hip stability and your ability to do daily tasks like getting in and out of cars, climbing stairs, and walking.'"

---

#### Severity Classification and Patient Communication

| **HOOS JR Score** | **Functional Status** | **Clinical Significance** | **Improvement Target** |
|---|---|---|---|
| 80–100 | Excellent | Minimal hip dysfunction; excellent ADL/mobility | Maintain or improve further |
| 60–79 | Good | Mild-to-moderate dysfunction; most activities possible with minor modification | Increase by 10+ points |
| 40–59 | Fair | Moderate dysfunction; significant restrictions in car transfers, stairs, squatting | Increase by 10+ points; standard care |
| 20–39 | Poor | Severe dysfunction; major limitations in mobility and ADL | Increase by 10+ points; high-priority care |
| 0–19 | Severe | Extreme dysfunction; minimal independent mobility; likely unable to perform ADL | Increase by 10+ points; intensive intervention required |

---

### 4.9 PGIC (Patient Global Impression of Change)

#### Overview
PGIC is a single-item, 7-point global assessment of whether the patient perceives their condition has improved, stayed the same, or worsened since baseline. It is **collected ONLY at end-of-period (12 months), NOT at intake baseline**. PGIC provides holistic context for other outcome measures.

#### Instrument Specifications
- **Number of items**: 1
- **Administration time**: <30 seconds
- **Response scale**: 7-point ordinal
- **Scoring**: Raw response (1–7); descriptive interpretation
- **LOINC code**: 75247-6 (Patient global impression of change)
- **When to administer**: **END-OF-PERIOD ONLY (12-month assessment)**

#### Item Text (Exact Wording)

**"Since you started this MSK care program [12 months ago], how would you describe the changes in your [condition/pain]?"**

Provide reference points for the patient:

- **1** = Very much improved
- **2** = Much improved
- **3** = Minimally improved
- **4** = No change
- **5** = Minimally worse
- **6** = Much worse
- **7** = Very much worse

#### PGIC Administration Protocol

**⚠️ CRITICAL: DO NOT ADMINISTER AT INTAKE ⚠️**

PGIC is administered **only at the end-of-period (12-month) follow-up visit**. At that time:

1. Remind patient of their baseline status 12 months prior.
2. Ask them to reflect on their overall experience in the care program.
3. Record their 7-point response.
4. Use this to contextualize other outcome measures (e.g., "Even though your pain score improved by 3 points, your global impression is 'minimally improved'—let's explore whether we need to adjust the treatment plan").

#### Interpretation and Clinical Use

| **PGIC Response** | **Interpretation** | **Clinical Action** |
|---|---|---|
| 1 = Very much improved | Excellent outcome; major positive change | Success; consider maintenance plan |
| 2 = Much improved | Good outcome; significant positive change | Success; standard follow-up |
| 3 = Minimally improved | Modest positive change; room for improvement | Acceptable but explore optimization |
| 4 = No change | No perceived improvement or decline | Reassess treatment efficacy; consider adjustment |
| 5 = Minimally worse | Slight negative change | Investigate cause; adjust care plan |
| 6 = Much worse | Significant worsening | Urgent reassessment; consider alternative intervention |
| 7 = Very much worse | Severe deterioration | Critical review; possible escalation needed |

#### Example Kimi Script (End-of-Period Only)

---

**[At 12-month follow-up, after administering all other PROMs]**

"Now I want to ask you something broad. When you started this program 12 months ago, your [condition] was [describe baseline status]. Reflecting on the past year, how would you describe the overall change in your condition?

Would you say you're:
- Very much improved?
- Much improved?
- Minimally improved?
- No change?
- Minimally worse?
- Much worse?
- Very much worse?

[Patient responds.]

Thank you. This overall impression, combined with your specific measurement scores, helps us understand not just the numbers, but how you actually feel about your progress. Let's review both together."

---

---

## Section 5: PROM Baseline Scoring and Interpretation {#section-5-scoring}

### How Kimi Communicates Baseline Results to the Patient

After administering all baseline PROMs, Kimi should **synthesize findings in language the patient understands** and **set realistic expectations for 12-month improvement**.

#### Communication Framework

**1. Acknowledge the Effort**
"Thank you for completing those assessments. They give us a clear picture of where you're starting from."

**2. Summarize Key Findings**
Present the most relevant scores:
- **Universal measures**: PROMIS PF, PROMIS PI, NRS
- **Site-specific measure**: The primary outcome (ODI, NDI, QuickDASH, KOOS JR, HOOS JR)

Example:
"Your pain right now is a [NRS score] out of 10. Your main limitation is [based on QuickDASH/ODI/etc.] — specifically, you're having the most trouble with [specific activity]. Your overall physical function is in the [mild/moderate/severe] range."

**3. Contextualize Severity**
Use the severity classification tables to give context:
- "A pain score of 7 is moderate-to-severe. It's affecting your sleep and work, which is consistent with what you've told me."
- "Your function score puts you in the moderate disability range, which means many activities are possible but require modification or cause pain."

**4. Set Realistic Improvement Targets**
"Over the next 12 months, here's what we're aiming for:
- We want to reduce your pain by at least 2 points — from [baseline] to [target]
- We want to improve your function score by at least 2 points
- And for your [shoulder/back/knee], we're targeting a [10-point or 8-point] improvement in your [QuickDASH/ODI/etc.] score

These are modest but meaningful targets. Patients who engage with their care plan typically achieve these or better."

**5. Connect to Treatment Plan**
"To get there, we'll focus on [specific interventions: PT, behavioral change, medication adjustment, etc.]. Your consistent effort and engagement are critical."

---

### Red Flag PROM Scores That Suggest Need for Escalation

Certain baseline scores signal the need for additional assessment or urgent intervention:

#### Red Flag Thresholds

| **PROM** | **Red Flag Score** | **Trigger Action** |
|---|---|---|
| **NRS** | ≥8/10 | Assess for pain catastrophizing; consider pain psychology referral; verify medications adequate |
| **PROMIS PI** | T-score >65 | Pain interference is severe; assess impact on work/sleep/relationships; psychosocial screening urgent |
| **PROMIS PF** | T-score <35 | Severe functional limitations; assess for depression/anxiety; may need intensive/supervised PT |
| **ODI** | >60% | Severe back disability; assess for red flags (serious pathology); may need imaging or specialist referral |
| **NDI** | >60% | Severe neck disability; assess for neurological signs; verify appropriate imaging has been done |
| **QuickDASH** | >60 | Severe upper extremity disability; assess for nerve compression or serious pathology; may need specialist input |
| **KOOS JR** | <40 | Severe knee dysfunction; assess for instability or structural damage; may need imaging or orthopedic referral |
| **HOOS JR** | <40 | Severe hip dysfunction; assess for OA severity; may need imaging or orthopedic evaluation |

#### Red Flag Response Protocol

When a red flag score is identified:

1. **Do not dismiss as "just baseline"**. Red flag scores warrant additional assessment.
2. **Perform targeted screening**:
   - **Psychosocial red flags** (high PI, high NRS): Administer PHQ-2 + GAD-2; consider PCS and TSK screens (see Section 7)
   - **Neurological red flags** (NDI >60): Assess for radiculopathy, nerve compression, myelopathy signs
   - **Structural red flags** (KOOS JR <40, HOOS JR <40, ODI >60): Verify appropriate imaging; consider orthopedic or spine specialist referral
3. **Escalate if needed**: If red flags + additional findings suggest serious pathology or psychological barriers, escalate to supervising clinician or specialist before finalizing care plan.
4. **Adjust expectations**: A patient with a baseline KOOS JR of 25 may need 6+ months to achieve a 10-point improvement; don't expect linear progress if red flags are present.

---

### Setting Expectations: The Improvement Talk

After baseline data is collected, conduct the "improvement talk":

**Script Example:**

"Based on your baseline assessments, here's what improvement looks like over the next 12 months:

**Your Pain (NRS):** You're at a 7 right now. We want to get you to a 5 or lower. A 2-point reduction is meaningful — that's the difference between pain that wakes you up at night and pain that's manageable with activity modification.

**Your Function (PROMIS PF):** Your function score is 42, which is in the 'moderate' range. We're targeting a 2-point improvement to 44. That might sound small, but it means you'll be able to do a few more things without pain or limitation.

**Your [Site-Specific Measure] ([PROM Name]):** This is your most important outcome. You're at [baseline]. Over 12 months, we're targeting [baseline + minimum target]. That represents a real change in your ability to [specific activity].

**How do we get there?** This depends on consistent effort from you:
- Attending PT or other appointments
- Doing your home exercises 5 days a week
- Being mindful of your movement and posture
- Managing stress and sleep, which affect pain

Not everyone hits these exact targets, but most engaged patients do. Some exceed them. The key is consistency and communication. If something isn't working, we adjust. Any questions?"

---

---

## Section 6: FHIR Data Submission Requirements {#section-6-fhir}

### Baseline Submission Timeline and Compliance

**Critical deadline**: All baseline PROM data must be submitted to CMS via FHIR API within **60 days of the alignment date**.

- **Alignment date**: The date the beneficiary is formally enrolled in the ACCESS MSK Track care program.
- **Baseline assessment date**: Ideally completed on alignment date or within 1 week of alignment.
- **Submission deadline**: Day 60 of enrollment.

**Non-compliance**: Failure to submit baseline PROM data within 60 days disqualifies the beneficiary from OAP payment, even if outcome measures are collected at 6-month or end-of-period.

### FHIR Resource Types for PROM Submission

Each PROM is submitted as a **QuestionnaireResponse** or **Observation** resource, depending on the measure:

#### QuestionnaireResponse Resources (Preferred for Structured Questionnaires)

Used for multi-item questionnaires:
- PROMIS Physical Function (PF-10a)
- PROMIS Pain Interference (PI-8a)
- ODI (Oswestry Disability Index)
- NDI (Neck Disability Index)
- QuickDASH
- KOOS JR
- HOOS JR

**Required FHIR fields for QuestionnaireResponse**:
- `resourceType`: "QuestionnaireResponse"
- `id`: Unique identifier for this response (system-generated or user-assigned UUID)
- `questionnaire`: Reference to the Questionnaire resource (canonical URL or logical ID)
- `status`: "completed" (at baseline submission)
- `subject`: Reference to Patient resource
- `authored`: Timestamp of when PROM was administered (ISO 8601 format, e.g., "2026-04-03T10:30:00-05:00")
- `item`: Array of items, each containing:
  - `linkId`: Identifier matching Questionnaire item linkId
  - `answer`: Array with single `valueInteger` or `valueString` representing the patient's response

#### Observation Resources (Single-Item Measures)

Used for single-item measures:
- Numeric Rating Scale (NRS)
- Patient Global Impression of Change (PGIC — only at end-of-period)

**Required FHIR fields for Observation**:
- `resourceType`: "Observation"
- `id`: Unique identifier
- `status`: "final"
- `code`: LOINC code for the measure
- `subject`: Reference to Patient resource
- `effectiveDateTime`: Timestamp when observed (ISO 8601)
- `valueQuantity` or `valueCodeableConcept`: The patient's response (numeric for NRS; coded concept for PGIC)

### LOINC Codes for All Measures

| **PROM** | **LOINC Code** | **Resource Type** | **Notes** |
|---|---|---|---|
| PROMIS Physical Function (PF-10a) | 71007-9 | QuestionnaireResponse | Brief form; validates overall function |
| PROMIS Pain Interference (PI-8a) | 71008-7 | QuestionnaireResponse | Brief form; assesses pain's impact on life |
| Numeric Rating Scale (NRS) | 76605-6 | Observation | Pain intensity 0–10 |
| Oswestry Disability Index (ODI) | 89022-2 | QuestionnaireResponse | Lower back disability; 0–100% scale |
| Neck Disability Index (NDI) | 89023-0 | QuestionnaireResponse | Neck disability; 0–100% scale |
| QuickDASH | 89011-5 | QuestionnaireResponse | Upper extremity disability; 0–100 scale |
| KOOS JR | 71311-0 | QuestionnaireResponse | Knee function; 0–100 scale (higher = better) |
| HOOS JR | 71310-2 | QuestionnaireResponse | Hip function; 0–100 scale (higher = better) |
| PGIC | 75247-6 | Observation | 7-point global impression (end-of-period) |

### Data Validation Requirements

Before submission, validate:

1. **Completeness**: All required items are answered. No missing data.
2. **Value ranges**:
   - PROMIS responses: 1–5
   - ODI/NDI/QuickDASH/KOOS JR/HOOS JR items: Response within expected range
   - NRS: 0–10 integer
   - PGIC: 1–7 integer
3. **Patient identifier**: Beneficiary ID or MRN matches enrollment records.
4. **Anatomical site match**: Verify that site-specific PROM(s) match the documented primary pain site.
5. **LOINC code accuracy**: Each PROM's LOINC code is correct.
6. **Timestamp format**: All dates in ISO 8601 format with timezone offset.

### Baseline vs. Follow-Up Submission

- **Baseline submission**: Must occur within 60 days of alignment. Contains only baseline data (T0).
- **6-month submission**: Submitted at or after 6-month follow-up. Contains 6-month data (T6) using the SAME PROMs as baseline.
- **End-of-period submission**: Submitted at or after 12-month follow-up. Contains end-of-period data (T12) using the SAME PROMs as baseline, plus PGIC (T12 only).

**Critical**: Do not re-submit the same PROM at a different timepoint without updating the `effectiveDateTime` and status. Each timepoint is a separate submission.

---

---

## Section 7: Psychosocial Screening PROMs (Clinical, Not CMS-Mandated) {#section-7-psychosocial}

### Overview

The following PROMs are **not required by CMS** and are **not submitted to CMS for OAP payment**. However, they are **clinically essential** for identifying psychosocial barriers to recovery and informing care planning. All should be administered at baseline intake if the patient's risk profile or PROM scores suggest need (e.g., high NRS, high PROMIS PI, or red flag scores).

### 7.1 PHQ-2 (Patient Health Questionnaire — 2 items)

#### Purpose
Screen for depression. Two items from the PHQ-9.

#### Items and Response Scale

**Over the past 2 weeks, how often have you been bothered by:**

1. Little interest or pleasure in doing things?
   - 0 = Not at all
   - 1 = Several days
   - 2 = More than half the days
   - 3 = Nearly every day

2. Feeling down, depressed, or hopeless?
   - 0 = Not at all
   - 1 = Several days
   - 2 = More than half the days
   - 3 = Nearly every day

#### Scoring and Cutoff

- **Total score**: Sum of both items (range: 0–6)
- **Cutoff for concern**: **≥3 suggests moderate depression risk**
- **Action**: If PHQ-2 ≥3, administer full PHQ-9 for detailed assessment

#### Clinical Relevance for MSK

Depression is common in chronic pain populations and predicts poor pain outcomes and treatment engagement. Screening at baseline allows early intervention.

---

### 7.2 GAD-2 (Generalized Anxiety Disorder — 2 items)

#### Purpose
Screen for generalized anxiety disorder.

#### Items and Response Scale

**Over the past 2 weeks, how often have you been bothered by:**

1. Feeling nervous, anxious, or on edge?
   - 0 = Not at all
   - 1 = Several days
   - 2 = More than half the days
   - 3 = Nearly every day

2. Not being able to stop or control worrying?
   - 0 = Not at all
   - 1 = Several days
   - 2 = More than half the days
   - 3 = Nearly every day

#### Scoring and Cutoff

- **Total score**: Sum of both items (range: 0–6)
- **Cutoff for concern**: **≥3 suggests moderate anxiety risk**
- **Action**: If GAD-2 ≥3, administer full GAD-7 for detailed assessment

#### Clinical Relevance for MSK

Anxiety amplifies pain perception and reduces physical engagement in treatment. Early identification allows targeted behavioral intervention.

---

### 7.3 Pain Catastrophizing Scale — Short Form (PCS-4)

#### Purpose
Assess rumination, magnification, and helplessness related to pain. The 4-item short form is practical for intake.

#### Items and Response Scale

**When I'm in pain, I...**

1. Worry all the time about whether the pain will end
   - 0 = Not at all
   - 1 = To a slight degree
   - 2 = To a moderate degree
   - 3 = To a great degree
   - 4 = All the time

2. Feel I can't stand it anymore
   - 0–4 (same scale)

3. Become afraid that the pain will get worse
   - 0–4 (same scale)

4. Think it's terrible and I think it's never going to get better
   - 0–4 (same scale)

#### Scoring

- **Total score**: Sum of all 4 items (range: 0–16)
- **Interpretation**:
  - 0–4 = Low catastrophizing
  - 5–9 = Moderate catastrophizing
  - 10–16 = High catastrophizing
- **Cutoff for concern**: **≥10 suggests significant catastrophizing**

#### Clinical Relevance for MSK

Catastrophic thinking (rumination, magnification, helplessness) is a key psychological barrier to pain recovery and strongly predicts poor outcome. High scores warrant targeted cognitive-behavioral intervention.

---

### 7.4 Tampa Scale of Kinesiophobia — Short Form (TSK-4)

#### Purpose
Assess fear of movement and re-injury, which drives avoidance behavior.

#### Items and Response Scale

1. It's really not safe for a person with a condition like mine to be physically active
   - 1 = Strongly disagree
   - 2 = Disagree
   - 3 = Agree
   - 4 = Strongly agree

2. My body is telling me I have something dangerously wrong
   - 1–4 (same scale)

3. My accident has put me at risk for a serious injury
   - 1–4 (same scale)

4. I'm afraid that if I do something physical it might injure me
   - 1–4 (same scale)

#### Scoring

- **Total score**: Sum of all 4 items (range: 4–16)
- **Interpretation**:
  - 4–8 = Low fear of movement
  - 9–12 = Moderate fear
  - 13–16 = High fear of movement
- **Cutoff for concern**: **≥13 suggests significant kinesiophobia**

#### Clinical Relevance for MSK

Fear of movement and re-injury drive avoidance, physical deconditioning, and poor treatment engagement. High scores indicate need for exposure therapy, reassurance, and graded activity progression.

---

### Administration and Clinical Action Protocol

#### Timing

Administer PHQ-2 and GAD-2 at baseline intake for **all beneficiaries**. Administer PCS-4 and TSK-4 if:
- NRS ≥7, OR
- PROMIS PI T-score >60, OR
- Site-specific PROM suggests severe disability

#### Interpretation and Care Planning

| **Screening Result** | **Clinical Action** |
|---|---|
| PHQ-2 <3, GAD-2 <3, PCS-4 <10, TSK-4 <13 | Standard care plan; routine follow-up |
| PHQ-2 ≥3 | Administer PHQ-9; if PHQ-9 ≥10, refer to mental health or PCP; adjust pain expectations |
| GAD-2 ≥3 | Administer GAD-7; if GAD-7 ≥10, refer for anxiety treatment; incorporate relaxation into care plan |
| PCS-4 ≥10 | Refer to pain psychology or CBT-trained therapist; teach cognitive restructuring; expect slower pain improvement |
| TSK-4 ≥13 | High priority for graded exposure therapy and reassurance; adjust PT progression; consider pain psychology referral |

#### Patient Communication

If screening reveals psychosocial barriers:

"Your assessments show that [anxiety/depression/fear of movement] is playing a role in your pain experience. This is really common, and it's important to address. Along with physical therapy, I'm recommending that we work with a [psychologist/counselor/therapist] who specializes in pain. They can help you break patterns that are keeping your pain stuck. Addressing this typically improves pain outcomes significantly."

---

---

## Section 8: Administration Sequencing at Intake {#section-8-sequencing}

### Optimal PROM Administration Sequence

Administering PROMs in the correct sequence minimizes survey fatigue and maximizes data quality.

#### Recommended Sequence (Total Time: 30–40 Minutes)

**Phase 1: Single-Item Quick Measures (2 minutes)**
1. **NRS** — Start with the simplest measure to ease into questionnaires
   - "On a scale of 0–10, how is your pain right now?"
   - Establishes baseline pain intensity immediately

**Phase 2: Universal PROMs (PROMIS) (4 minutes)**
2. **PROMIS Physical Function (PF-10a)** — Assesses general capacity
   - 10 items, ~2 minutes
   - Moves patient into thinking about function

3. **PROMIS Pain Interference (PI-8a)** — Assesses pain's impact
   - 8 items, ~2 minutes
   - Naturally follows PF as patients consider how pain interferes

**Phase 3: Disease-Specific PROM (3–5 minutes)**
4. **Site-specific measure** (ODI, NDI, QuickDASH, KOOS JR, HOOS JR)
   - Deepens focus on primary anatomical site
   - Administered only for relevant sites
   - More detailed (10–11 items); place after simpler measures

**Phase 4: Psychosocial Screening (optional, 3–5 minutes)**
5. **PHQ-2 + GAD-2** — If time permits or red flags noted
   - 4 items total, quick assessment
   - Can be deferred if time is tight; administer within 1 week

6. **PCS-4 + TSK-4** — If NRS >7 or other red flags
   - 8 items total
   - Can be deferred if initial assessments suggest low risk

**Do NOT administer PGIC at baseline.**

### Grouping Strategy by Body Region

#### Lower Back Intake (Total Time: 35–40 minutes)

1. NRS (pain) — 1 min
2. PROMIS PF-10a — 2 min
3. PROMIS PI-8a — 2 min
4. ODI — 5 min
5. PHQ-2 + GAD-2 (if indicated) — 3 min
6. PCS-4 + TSK-4 (if NRS >7) — 3 min
**Total: 16–23 minutes for required measures; 35–40 with optional**

#### Neck Intake (Total Time: 35–40 minutes)

1. NRS — 1 min
2. PROMIS PF-10a — 2 min
3. PROMIS PI-8a — 2 min
4. NDI — 5 min
5. PHQ-2 + GAD-2 — 3 min
6. PCS-4 + TSK-4 (if indicated) — 3 min
**Total: 35–40 minutes**

#### Shoulder/Elbow/Wrist Intake (Total Time: 30–35 minutes)

1. NRS — 1 min
2. PROMIS PF-10a — 2 min
3. PROMIS PI-8a — 2 min
4. QuickDASH — 3 min
5. PHQ-2 + GAD-2 (if indicated) — 3 min
6. PCS-4 + TSK-4 (if indicated) — 3 min
**Total: 30–35 minutes**

#### Knee Intake (Total Time: 25–30 minutes)

1. NRS — 1 min
2. PROMIS PF-10a — 2 min
3. PROMIS PI-8a — 2 min
4. KOOS JR — 2 min (shortest site-specific PROM)
5. PHQ-2 + GAD-2 (if indicated) — 3 min
6. PCS-4 + TSK-4 (if indicated) — 3 min
**Total: 25–30 minutes**

#### Hip Intake (Total Time: 25–30 minutes)

1. NRS — 1 min
2. PROMIS PF-10a — 2 min
3. PROMIS PI-8a — 2 min
4. HOOS JR — 2 min (shortest site-specific PROM)
5. PHQ-2 + GAD-2 (if indicated) — 3 min
6. PCS-4 + TSK-4 (if indicated) — 3 min
**Total: 25–30 minutes**

---

### Multi-Session Administration (If Needed)

For patients unable to complete all PROMs in one session (e.g., fatigue, time constraints):

**Session 1 (Required, ~15 minutes)**
- NRS
- PROMIS PF-10a
- PROMIS PI-8a
- Site-specific PROM (if brief, e.g., KOOS JR, HOOS JR)

**Session 2 (Within 1 week, ~15 minutes)**
- Site-specific PROM (if deferred; ODI/NDI/QuickDASH)
- PHQ-2 + GAD-2
- PCS-4 + TSK-4 (if indicated)

**Important**: All baseline data must be collected within 14 days of enrollment and submitted within 60 days to meet CMS deadline.

---

### Strategies to Minimize Survey Fatigue

1. **Brief introduction**: "These questionnaires will take about 30 minutes. They're essential for tracking your progress. I'll read them to you, and we'll go through together."
2. **Conversational delivery**: Read items conversationally rather than robotically. Pause for reflection.
3. **Physical breaks**: If administration spans >30 minutes, offer a 2-minute stretch break between phases.
4. **Positive framing**: "These questions help us understand exactly where you're struggling, so we can target our treatment."
5. **Avoid rushing**: Don't hurry through items. Allow 15–30 seconds per item for patient reflection.
6. **Reassurance**: "There's no rush. Take your time. These answers are for our medical team, and they're confidential."

---

---

## Section 9: Quality Assurance {#section-9-qa}

### Missing Data Handling

**Scenario**: Patient skips an item or gives ambiguous response (e.g., "sort of" for NRS).

**Protocol**:

1. **Immediate follow-up** (during same session): "You didn't answer item 5. Can you tell me how much difficulty you have with [activity]? Just pick the option that best matches."
2. **If patient cannot answer**: Document reason (e.g., "not applicable to patient's activity level"). Do NOT leave blank or guess.
3. **For single-item measures** (NRS, PGIC): All responses are required. Re-ask if ambiguous.
4. **For multi-item measures**: If >1 item is missing, contact patient within 3 days by phone and re-administer. Complete data is required for CMS submission.

**Submission requirement**: All items must have valid responses before FHIR submission.

---

### Floor and Ceiling Effects and Implications

**Floor effect**: Patient scores at the lowest possible value, indicating either minimal symptoms or inability to function below that threshold.

**Ceiling effect**: Patient scores at the highest possible value, indicating either maximal symptoms or maximal function.

#### Identifying Floor/Ceiling Effects

| **PROM** | **Floor Score** | **Ceiling Score** | **Implication** |
|---|---|---|---|
| PROMIS PF | T-score <30 | T-score >70 | Floor = severe limitation; Ceiling = no limitation |
| PROMIS PI | T-score <30 | T-score >70 | Floor = no interference; Ceiling = severe interference |
| NRS | 0 | 10 | Floor = no pain; Ceiling = worst pain |
| ODI | 0% | 100% | Floor = no disability; Ceiling = complete disability |
| NDI | 0% | 100% | Floor = no disability; Ceiling = complete disability |
| QuickDASH | 0 | 100 | Floor = no disability; Ceiling = complete disability |
| KOOS JR | 0 | 100 | Floor = severe dysfunction; Ceiling = excellent function |
| HOOS JR | 0 | 100 | Floor = severe dysfunction; Ceiling = excellent function |

#### Clinical Actions for Floor/Ceiling Effects

**Floor effect** (e.g., PROMIS PF T-score = 25, or QuickDASH = 90):
- **Action**: Verify that patient actually has minimal/severe limitation. Ask clarifying questions: "So you can't do any of these activities without significant difficulty or help?"
- **Interpretation**: Real floor effect may indicate disease severity beyond pain management scope; escalate for specialist evaluation or interdisciplinary intervention.
- **Follow-up tracking**: At 6-month and end-of-period, monitor for ANY improvement. Even 1–2-point shifts are meaningful at floor.

**Ceiling effect** (e.g., NRS = 0, or KOOS JR = 100):
- **Action**: Verify. If patient legitimately has no pain or perfect function, document as valid.
- **Interpretation**: Ceiling effects suggest either successful early intervention or that patient is high-functioning baseline.
- **Follow-up tracking**: Limited room for improvement; focus on maintaining function and preventing decline.

---

### When to Re-Administer (If Patient Seems Confused or Responses Are Inconsistent)

**Red flags for invalid responses**:

1. **Logical inconsistencies**:
   - Patient reports "no pain" (NRS = 0) but scores high on PROMIS PI (indicating substantial pain interference)
   - Patient reports "severe disability" (ODI = 80%) but then describes normal work and recreational activities

2. **Response pattern anomalies**:
   - Patient answers all items with the same response (all 3s, all 4s) without variation
   - Random or nonsensical pattern suggests patient is not engaging

3. **Patient verbal feedback**:
   - "I don't understand what you're asking"
   - "These questions don't match my situation"
   - "I'm confused about what response you want"

4. **Observed confusion**:
   - Patient takes unusually long to answer simple items
   - Patient asks for repeated clarification of same item
   - Patient shows signs of fatigue or cognitive difficulty

**Re-administration protocol**:

1. **Pause and assess**: "I notice the answers might not fully capture your situation. Can we go through [problematic item(s)] again? Let me rephrase it."
2. **Clarify item meaning**: "By 'difficulty squatting,' I mean: Can you squat down to pick something up? How much discomfort does that cause?"
3. **Validate response**: Confirm patient understands scale. "So on a 0–10 scale, 0 is no pain at all, 10 is worst pain you can imagine. Your pain is [X]?"
4. **Re-record**: Use the clarified response.
5. **Document**: "Initial response unclear; re-administered with clarification on [items]. Final responses recorded."

**If confusion persists after one re-administration**: Defer to next session or phone. Document inability to complete at this time. Contact patient within 1 week to complete baseline.

---

### Data Quality Checklist Before FHIR Submission

Before uploading baseline PROM data to CMS, verify:

- [ ] **All required PROMs completed** for the patient's anatomical site
- [ ] **All items answered** with valid responses (no blanks or ambiguous entries)
- [ ] **Response values within expected range** (e.g., NRS 0–10, ODI 0–100)
- [ ] **Scores calculated correctly** (re-check conversions from raw scores)
- [ ] **Patient identifier matches enrollment** (no MRN/ID mismatches)
- [ ] **Anatomical site matches PROM selection** (e.g., knee pain = KOOS JR, not HOOS JR)
- [ ] **Administration dates recorded** (baseline date is within 7 days of alignment)
- [ ] **LOINC codes verified** against reference table (Section 6)
- [ ] **No obvious outliers or errors** (e.g., KOOS JR score of 250 is impossible)
- [ ] **Secondary PROM data included if applicable** (e.g., multi-site patient has all site-specific PROMs)

---

### Ongoing Compliance Monitoring

After baseline submission, maintain compliance by:

1. **6-month follow-up**: Administer **identical PROM set** at 6-month mark (±2 weeks)
2. **End-of-period follow-up**: Administer **identical PROM set + PGIC** at 12-month mark
3. **Data reconciliation**: Verify that follow-up data matches baseline PROMs (no switching instruments mid-enrollment)
4. **Outcome tracking**: Monitor achievement toward 50% OAT (≥50% of cohort achieving improvement targets for assigned PROMs)
5. **Red flag monitoring**: Any beneficiary regressing significantly should trigger care plan review

---

---

## Quick Reference: PROM Assignment by Anatomical Site

| **Primary Pain Site** | **Universal PROMs** | **Site-Specific PROM** | **Minimum Improvement Target** | **Administration Time** |
|---|---|---|---|---|
| **Lower Back** | PROMIS PF, PI, NRS, PGIC* | ODI | ≥8-point reduction | 15 min |
| **Neck** | PROMIS PF, PI, NRS, PGIC* | NDI | ≥8-point reduction | 15 min |
| **Shoulder** | PROMIS PF, PI, NRS, PGIC* | QuickDASH | ≥10-point reduction | 12 min |
| **Elbow** | PROMIS PF, PI, NRS, PGIC* | QuickDASH | ≥10-point reduction | 12 min |
| **Wrist/Hand** | PROMIS PF, PI, NRS, PGIC* | QuickDASH | ≥10-point reduction | 12 min |
| **Knee** | PROMIS PF, PI, NRS, PGIC* | KOOS JR | ≥10-point increase | 10 min |
| **Hip** | PROMIS PF, PI, NRS, PGIC* | HOOS JR | ≥10-point increase | 10 min |
| **Ankle/Foot** | PROMIS PF, PI, NRS, PGIC* | None | PROMIS PF ≥2-point increase | 10 min |

**Note**: *PGIC administered only at end-of-period (12 months), not at baseline.

---

## Document History and Maintenance

| **Version** | **Date** | **Author** | **Changes** |
|---|---|---|---|
| 1.0 | April 2026 | KIMI Clinical Operations | Initial version; incorporates CMS ACCESS Table 6 specifications |

---

**Document Classification**: Internal Use / Clinical Operations
**Compliance Owner**: KIMI MSK Program Director
**Next Review**: April 2027

---

**END OF DOCUMENT**

