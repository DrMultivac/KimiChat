# CMS ACCESS Model MSK Track: Payment Structure, Performance Targets & Reporting Requirements

**Document Version:** 1.0
**Last Updated:** 2026-04-03
**Classification:** Operational Reference for MSK Care Delivery & Financial Planning
**Source Authority:** CMS ACCESS Model Payment Amounts and Performance Targets Documentation

---

## 1. ACCESS Model Overview — MSK Track

### 1.1 What is the ACCESS Model?

The CMS CHRONIC CONDITIONS MANAGEMENT: EXPANDING CARE COORDINATION, ENSURING IMPROVED CARE (ACCESS) Model is a national, value-based payment model designed to improve care coordination and outcomes for Medicare Fee-for-Service (FFS) beneficiaries with chronic conditions. Launched in 2024, the ACCESS Model operates across multiple disease-specific tracks.

**ACCESS Model Operational Parameters:**
- Target Population: Medicare FFS beneficiaries age 65+ with chronic, high-need conditions
- Model Type: Prospective value-based payment with outcome accountability
- Care Delivery Model: Managed care coordination by specialized care managers (e.g., MSK Managers)
- Participation: Voluntary for both CMS and participating providers/care managers
- Contract Duration: Multi-year performance periods with annual assessments
- Geographic Scope: National Medicare FFS beneficiaries (non-capitated)

### 1.2 ACCESS Model Tracks

The ACCESS Model includes the following disease-specific tracks:
1. **MSK (Musculoskeletal) Track** — Chronic musculoskeletal pain and disorders
2. **Oncology Track** — Cancer care management
3. **Cardiology Track** — Chronic heart disease management
4. **Other Clinical Tracks** — Additional disease states (as defined by CMS)

This document focuses exclusively on the **MSK Track**.

### 1.3 MSK Track — Program Scope

**MSK Track Definition:**
The MSK Track is designed to improve outcomes for Medicare FFS beneficiaries with chronic musculoskeletal pain conditions through aligned care coordination, patient-reported outcome measurement (PROM), and outcome-contingent payments.

**Qualifying Musculoskeletal Conditions:**
The MSK Track targets beneficiaries with chronic pain affecting the following anatomical sites:
- **Lower Back / Lumbar Spine** — Chronic low back pain (including radiculopathy)
- **Neck / Cervical Spine** — Chronic neck pain (including radiculopathy, cervicogenic headache)
- **Shoulder/Arm/Hand** — Rotator cuff disorders, impingement, osteoarthritis, nerve compression
- **Knee** — Osteoarthritis, post-surgical pain, patellofemoral pain, meniscal disorders
- **Hip** — Hip osteoarthritis, post-surgical pain, labral pathology
- **General Musculoskeletal** — Generalized chronic pain, fibromyalgia, multi-site pain

**Target Population Characteristics:**
- Age 65+ (Medicare beneficiary status)
- Medicare FFS enrollment (non-capitated)
- Chronic musculoskeletal pain (≥3 months duration)
- Functional limitations or activity restrictions attributable to MSK condition
- Opportunity for improvement through conservative management, rehabilitation, or coordinated care

**Alignment Trigger Criteria:**
Beneficiaries are typically aligned to an MSK Manager (care coordinator) via:
- Medicare claims-based identification (diagnosis codes, utilization patterns)
- Prospective outreach by participating MSK Managers
- Beneficiary self-enrollment (as permitted)
- Claims evidence of relevant MSK diagnoses and utilization

### 1.4 Participant Types — MSK Care Managers

**MSK Manager Definition:**
An MSK Manager is any healthcare organization or entity participating in the ACCESS Model MSK Track with CMS contract authorization to coordinate care, manage beneficiary outcomes, and receive Outcome-Aligned Payments (OAP).

**Eligible MSK Manager Types:**
- Specialized MSK care coordination companies (e.g., RevelAi Health, dedicated MSK platforms)
- Health systems with dedicated musculoskeletal care programs
- Orthopedic group practices with care coordination infrastructure
- Physical medicine and rehabilitation (PM&R) organizations
- Digital health platforms specializing in MSK care (including AI-powered platforms)

**Kimi's Role as MSK Manager:**
Kimi (as deployed by an MSK Manager) functions as:
- **Primary Care Coordinator:** Initial PROM collection, baseline assessment, care planning
- **Patient Engagement Engine:** Digital-first care coaching, patient education, adherence tracking
- **Outcome Measurement Steward:** PROM administration, data quality assurance, performance monitoring
- **Population Health Monitor:** Real-time tracking of beneficiary progress toward OAT achievement

### 1.5 Geographic Scope and Alignment Rules

**Geographic Scope:**
- National program (all 50 states + DC)
- Beneficiaries eligible regardless of geography
- MSK Managers can participate nationally (no geographic limitations)
- CMS allows multi-state participation by single MSK Manager entity

**Alignment Rules and Mechanics:**
1. **Prospective Alignment:** CMS typically notifies MSK Managers of aligned beneficiaries on a monthly basis
2. **Beneficiary Notification:** MSK Manager must notify beneficiary of alignment and secure consent to participate
3. **Opt-Out Period:** Beneficiaries retain right to opt out (as per Medicare rules)
4. **Enrollment Duration:** Typical performance period = 12 months per beneficiary
5. **Mid-Year Changes:** Beneficiaries may align/de-align mid-period based on claims, death, disenrollment

**Beneficiary Communication Requirements:**
- Clear disclosure of OAP structure and performance contingency
- Explanation of PROM collection and its relationship to care quality
- Opt-in consent to participate in MSK Track (if required by CMS)
- Right to information about care coordination activities

---

## 2. Payment Structure — Financial Framework

### 2.1 Outcome-Aligned Payment (OAP)

**OAP Definition:**
The Outcome-Aligned Payment is a per-beneficiary, per-year supplemental payment made by CMS to the MSK Manager contingent on achieving the Outcome Achievement Threshold (OAT) across the MSK Manager's aligned beneficiary population.

**OAP Amount:**
- **$180 per beneficiary per year**
- Payment is in **addition to standard Medicare FFS reimbursement** (fee-for-service claims)
- OAP is not a capitated payment; standard FFS billing continues independently

**Payment Contingency — The Outcome Achievement Threshold (OAT):**

The MSK Manager receives the full OAP ($180/beneficiary/year) **if and only if** at least **50% of aligned beneficiaries achieve improvement targets on their assigned PROMs** during the 12-month performance period.

**OAT Formula:**
```
OAT Achievement = (Number of Beneficiaries Meeting ≥1 Improvement Target) / (Total Denominator Beneficiaries)

OAP Payment Trigger: OAT Achievement ≥ 50%
```

**Critical OAT Property — Population-Level Metric:**
- OAT is measured at the **population level** (entire MSK Manager cohort), not individual beneficiary level
- All beneficiaries in the denominator either contribute to success or failure equally
- **Risk Profile:** If OAT < 50%, the MSK Manager forfeits OAP payment for **ALL** beneficiaries (not a proportional reduction)
- This creates strong financial incentive to optimize outcomes across the entire population

**Payment Timing and Disbursement:**
- OAP is calculated at the **end of the 12-month performance period**
- CMS performs a final audit of PROM data completeness and OAT achievement
- Payment is issued within 30-60 days of final reconciliation (typical Medicare payment cycle)
- Payments are made via standard ACH transfer to MSK Manager's registered banking entity

**Example OAP Calculation:**
```
Scenario: MSK Manager with 100 aligned beneficiaries
- 52 beneficiaries meet ≥1 improvement target on assigned PROM(s)
- 48 beneficiaries do not meet improvement targets

OAT Achievement = 52 / 100 = 52% ✓ MEETS THRESHOLD

OAP Payment = 100 beneficiaries × $180/beneficiary = $18,000 total
```

**Failed OAT Scenario:**
```
Alternative Scenario: 48 beneficiaries meet targets

OAT Achievement = 48 / 100 = 48% ✗ BELOW THRESHOLD

OAP Payment = $0 (100% forfeiture for entire population)
Risk: $18,000 lost revenue on this cohort
```

### 2.2 Substitute Spend Services

**Substitute Spend Definition:**
Substitute Spend Services are healthcare services provided by the MSK Manager (or its contractual partners) that replace more expensive, less effective services that the beneficiary would otherwise receive through standard Medicare FFS billing.

**Purpose:**
Substitute Spend Services allow MSK Managers to deliver alternative care pathways that:
- Reduce total cost of care while maintaining or improving outcomes
- Leverage lower-cost modalities (e.g., digital coaching vs. in-person PT)
- Improve beneficiary access and convenience
- Generate measurable PROM improvements

**Permitted Substitute Spend Service Categories:**
1. **Digital Care Coaching** — AI-powered or human-delivered remote coaching
2. **Telemed Visits** — Remote patient consultations (vs. in-person office visits)
3. **Physical Therapy Alternatives** — Home exercise programs, wearable-guided PT
4. **Psychosocial Support** — Mental health coaching, pain psychology, anxiety/depression management
5. **Medication Management Counseling** — Education on analgesics, NSAIDs, adjuvant therapy
6. **Self-Management Education** — Condition-specific education, activity pacing, sleep hygiene
7. **Nutrition Counseling** — Anti-inflammatory diet, weight management support
8. **Peer Support Programs** — Group coaching, peer mentoring

**How Kimi's AI Care Coaching Qualifies as Substitute Spend:**

Kimi's role as an MSK care manager qualifies as Substitute Spend because it:
1. **Replaces More Expensive Services:** Kimi's automated/AI-enabled coaching substitutes for multiple in-person office visits or physical therapy sessions
2. **Improves Access:** 24/7 digital availability vs. scheduled office appointments
3. **Demonstrates Efficacy:** Kimi's coaching protocols are designed to move PROM scores toward improvement targets
4. **Reduces Beneficiary Burden:** Lower travel burden, scheduling flexibility, reduced out-of-pocket costs

**Substitute Spend Documentation Requirements:**

CMS requires detailed documentation demonstrating that services qualify as "substitute spend":
1. **Service Specification Document:**
   - Description of service (what Kimi delivers, duration, frequency)
   - Target clinical outcome (which PROMs are addressed)
   - Beneficiary population (anatomical sites, condition types)

2. **Cost Comparison Analysis:**
   - Typical cost of replaced service (e.g., PT copay × 8 visits = $400)
   - Cost of substitute service (e.g., Kimi coaching = $X cost to deliver)
   - Documented cost savings per beneficiary

3. **Efficacy Evidence:**
   - Clinical protocols underlying care delivery
   - Expected PROM improvement targets
   - Baseline data on outcomes achieved by similar populations

4. **Implementation Log:**
   - Number of beneficiaries receiving substitute spend per month
   - Duration of engagement
   - Utilization metrics (visit frequency, completion rate, engagement)

5. **Outcome Reporting:**
   - PROM improvements attributable to substitute spend services
   - Correlation between service utilization and outcome achievement
   - Patient satisfaction / Net Promoter Score (NPS)

**Key Regulatory Note:**
CMS has provided explicit guidance that **AI-enabled care management and digital coaching can be administered by non-human agents (including AI systems) provided:**
- Clinical protocols are evidence-based and established
- Beneficiary consent is obtained
- Data security and privacy comply with HIPAA
- Outcomes are measured and reported

This regulatory flexibility positions Kimi as a compliant delivery mechanism for substitute spend services within the ACCESS MSK Track.

### 2.3 Financial Model Implications — Revenue, Scale, and Risk

**Revenue Per Beneficiary:**

For an MSK Manager delivering Kimi-powered care:

```
Revenue per Beneficiary (assuming OAT achieved):
  OAP Payment:                           $180
  Less: Kimi Service Delivery Cost:     ($X)
  Less: Administrative/Compliance Cost: ($Y)
  Net Contribution Margin:            = $180 - $X - $Y
```

**Critical Variables Determining Profitability:**
1. **Cost of Kimi Deployment:** Cost per beneficiary to deliver AI coaching
2. **Scale Leverage:** Fixed costs amortized across beneficiary population
3. **Engagement Rate:** % of beneficiaries who actually use coaching (impacts cost-benefit ratio)
4. **OAT Achievement:** Whether the 50% threshold is met (binary — payment vs. zero)

**Scale Economics — Why Population Size Matters:**

The OAT structure creates strong incentives for **scale:**

```
Small Cohort (20 beneficiaries):
- OAT requirement: 10 beneficiaries must improve
- Risk: 1-2 patient regressions could trigger failure
- Revenue at risk: 20 × $180 = $3,600 (high volatility)

Medium Cohort (100 beneficiaries):
- OAT requirement: 50 beneficiaries must improve
- Risk: Natural variation in outcomes across 100 people, lower per-capita variability
- Revenue at risk: 100 × $180 = $18,000 (more predictable)

Large Cohort (1,000 beneficiaries):
- OAT requirement: 500 beneficiaries must improve
- Risk: Law of large numbers reduces variability; more stable outcome prediction
- Revenue at risk: 1,000 × $180 = $180,000 (highly predictable given consistent care model)
```

**Population-Level Risk: The OAT All-or-Nothing Structure**

The OAT is fundamentally **binary:** either the MSK Manager meets the 50% threshold, or it doesn't. There is no partial credit.

This creates concentration of risk:
- **Best Case:** 52% achieve targets → $180/beneficiary paid for entire population
- **Worst Case:** 48% achieve targets → $0/beneficiary paid for entire population
- **The Gap:** A 4% swing in population performance = 100% swing in payment (from full payment to zero)

**Financial Implications:**
- Small improvements in care quality matter massively (they swing OAT from failure to success)
- Marginal beneficiaries (those near decision boundary) have outsized importance
- Population health management focus becomes critical: MSK Manager must monitor real-time PROM progress to identify and intervene with at-risk populations before end of measurement period

**Risk Mitigation Strategy — Real-Time Population Monitoring:**

MSK Managers using Kimi should implement **population-level dashboard monitoring:**
- Track monthly OAT achievement rate (% meeting targets as of month N)
- Identify subpopulations at risk of non-achievement
- Trigger interventions for beneficiaries showing negative PROM trends
- Calculate "OAT achievement probability" using interim data (allows risk-adjusted forecasting)

---

## 3. Table 6 — OAP Measures (Complete Reference)

### 3.1 OAP Measure Table — Exact Reproduction

The following table specifies all measures that contribute to OAT achievement. A beneficiary contributes to OAT achievement if they meet the improvement target on **at least one** of their assigned measures (depending on anatomical site).

| **Measure** | **Anatomical Site** | **Minimum Improvement Target** | **Direction** | **Interpretation** |
|---|---|---|---|---|
| PROMIS Physical Function (PF) | ALL sites | ≥2-point T-score increase | Higher = better | Functional improvement validated by standardized PROM |
| PROMIS Pain Interference (PI) | ALL sites | ≥2-point T-score decrease | Lower = better | Reduction in pain's impact on daily life |
| Oswestry Disability Index (ODI) | Lower Back only | ≥8-point reduction | Lower = better | Functional improvement specific to lumbar pathology |
| Neck Disability Index (NDI) | Neck only | ≥8-point reduction | Lower = better | Functional improvement specific to cervical pathology |
| Quick Disabilities of Arm, Shoulder, Hand (QuickDASH) | Shoulder/Arm/Hand only | ≥10-point reduction | Lower = better | Functional improvement in upper extremity disorders |
| Knee Injury and Osteoarthritis Outcome Score Jr. (KOOS JR) | Knee only | ≥10-point increase | Higher = better | Functional improvement specific to knee pathology |
| Hip Injury and Osteoarthritis Outcome Score Jr. (HOOS JR) | Hip only | ≥10-point increase | Higher = better | Functional improvement specific to hip pathology |
| Numeric Rating Scale (NRS) for Pain | ALL sites | No more than 2-point increase | Stability measure | Prevents regression in pain levels (safety measure) |
| Patient Global Impression of Change (PGIC) | ALL sites (end-of-period) | Collected, not scored for OAT | Patient impression | Captures overall subjective improvement (not required for OAT) |

### 3.2 Detailed Measure Specifications

#### 3.2.1 PROMIS Physical Function (PF)

**Measure Type:** Patient-Reported Outcome Measurement Information System (PROMIS)

**Clinical Purpose:**
Assesses capacity to carry out physical activities, including self-care, household tasks, work, and leisure activities. PROMIS PF is the broadest-scope functional measure in the battery and applies across all MSK conditions.

**Improvement Threshold:**
- **Minimum Improvement: ≥2-point T-score increase**
- Clinically Meaningful Improvement Domain (MCID): 2–3 T-score points
- Evidence Base: National Institutes of Health validation studies

**Scoring:**
- T-score scale: mean 50, standard deviation 10
- Raw score range: Varies by item bank size
- Administration: Computerized Adaptive Testing (CAT) or static item bank
- Time to Administer: 3–7 minutes

**Baseline Requirement:**
- PROMIS PF baseline must be obtained within 60 days of beneficiary alignment
- PROMIS PF follow-up at end of 12-month performance period

**Interpretation:**
- T-score increase of 2+ points indicates measurable improvement in physical capacity
- Anchored to validated qualitative research on patient-perceived meaningful change
- Population mean for healthy adults ≈ 50 (MSK populations typically 35–45 at baseline)

---

#### 3.2.2 PROMIS Pain Interference (PI)

**Measure Type:** PROMIS item bank

**Clinical Purpose:**
Quantifies the extent to which pain impacts daily activities, work, social engagement, emotional wellbeing, and sleep. Captures pain's **impact** beyond mere pain intensity.

**Improvement Threshold:**
- **Minimum Improvement: ≥2-point T-score decrease**
- Lower scores = less interference = better outcome
- MCID: 2–3 T-score points (same magnitude as PF improvement)

**Scoring:**
- T-score scale: mean 50, SD 10
- Higher T-score = greater pain interference (paradoxical from PF)
- Raw score range: Item-bank dependent
- Time to Administer: 3–7 minutes (CAT or static bank)

**Baseline Requirement:**
- Collected at alignment (within 60 days)
- Repeat at end-of-period
- Optional mid-period collection for monitoring

**Interpretation:**
- A 2-point decrease in T-score reflects meaningful reduction in pain's impact on functioning
- Discriminates between pain intensity and disability (key innovation in PROMIS)
- Sensitive to psychosocial interventions (e.g., pain psychology, cognitive-behavioral approaches)

---

#### 3.2.3 Oswestry Disability Index (ODI)

**Measure Type:** Condition-specific Disability Index

**Clinical Purpose:**
Gold-standard measure for lower back pain disability. Assesses functional limitations in 10 domains: pain intensity, personal care, lifting, walking, sitting, standing, sleeping, social life, travel, and employment.

**Improvement Threshold:**
- **Minimum Improvement: ≥8-point reduction**
- Scale range: 0–100 points
- MCID: 8–10 points (well-established in literature)

**Scoring:**
- Each item (0–5 scale), summed to 0–50, then multiplied by 2 to get 0–100 scale
- Lower score = better outcome
- Score interpretation:
  - 0–20: Minimal disability
  - 21–40: Moderate disability
  - 41–60: Severe disability
  - 61–80: Crippling disability
  - 81–100: Bedbound

**Baseline Requirement:**
- Obtained within 60 days of alignment
- Repeat at 12 months
- Optional mid-period assessments (e.g., at 6 months)

**Anatomical Specificity:**
- **For Lower Back Only:** NOT used for neck, shoulder, knee, hip
- Sensitive to lumbar-specific pathologies (spondylosis, disc herniation, stenosis, post-surgical states)
- Questions reference "my back problem" explicitly

**Interpretation:**
- An 8-point reduction is clinically meaningful and patient-perceivable
- Often correlates with return-to-work capacity, reduction in opioid use, and improved sleep

---

#### 3.2.4 Neck Disability Index (NDI)

**Measure Type:** Condition-specific Disability Index (parallel to ODI for cervical spine)

**Clinical Purpose:**
Assesses functional limitations from neck pain in 10 domains: pain intensity, personal care, lifting, reading, headaches, concentration, work, driving, sleeping, recreation.

**Improvement Threshold:**
- **Minimum Improvement: ≥8-point reduction**
- Scale range: 0–100 points (calculated identically to ODI)
- MCID: 8–10 points

**Scoring:**
- 10 items × 5-point scale, summed to 0–50, then doubled to 0–100
- Lower = better
- Interpretation scale identical to ODI (minimal/moderate/severe/crippling/bedbound)

**Baseline Requirement:**
- Collected within 60 days of alignment
- Repeat at 12 months
- Optional mid-period assessments

**Anatomical Specificity:**
- **For Neck Only:** Not used for lower back, shoulder, knee, hip
- Sensitive to cervical-specific pathology (spondylosis, cervicogenic headache, radiculopathy, whiplash)
- Questions specifically reference "my neck problem"

---

#### 3.2.5 Quick Disabilities of Arm, Shoulder and Hand (QuickDASH)

**Measure Type:** Abbreviated Condition-specific Disability Index

**Clinical Purpose:**
Measures functional limitations in the upper extremity (arm, shoulder, hand) across work, personal care, recreation, and social activities.

**Improvement Threshold:**
- **Minimum Improvement: ≥10-point reduction**
- Scale range: 0–100 points (different from ODI/NDI)
- MCID: 10–13 points (larger threshold than spine measures due to scale construction)

**Scoring:**
- 11 items × 5-point scale, raw score 11–55
- Transformed to 0–100 scale: [(raw score − 11) / 44] × 100
- Lower score = better outcome
- Score interpretation:
  - 0–20: Minimal disability
  - 21–40: Mild-moderate disability
  - 41–60: Moderate-severe disability
  - 61–100: Severe disability

**Baseline Requirement:**
- Collected within 60 days of alignment
- Repeat at 12 months
- Optional mid-period assessments

**Anatomical Specificity:**
- **For Shoulder/Arm/Hand Only:** Rotator cuff disorders, impingement, osteoarthritis, carpal tunnel syndrome, thoracic outlet syndrome, lateral epicondylitis (tennis elbow)
- NOT used for lower back, neck, knee, hip
- Questions reference "arm, shoulder, or hand problem"

---

#### 3.2.6 Knee Injury and Osteoarthritis Outcome Score Junior (KOOS JR)

**Measure Type:** Short-form Condition-specific Outcome Score (7-item version of full KOOS)

**Clinical Purpose:**
Assesses knee-specific functional outcomes including pain, stiffness, and limitations in activities of daily living and sport/recreation.

**Improvement Threshold:**
- **Minimum Improvement: ≥10-point increase**
- Scale range: 0–100 points
- MCID: 8–10 points (improvement = higher scores, inverse of disability scales)
- Direction: **Higher = Better** (unlike ODI/NDI/QuickDASH)

**Scoring:**
- 7 items, raw score transformed to 0–100 scale
- Higher score = better outcome
- Score interpretation:
  - 80–100: Excellent
  - 60–79: Good
  - 40–59: Fair
  - <40: Poor

**Baseline Requirement:**
- Collected within 60 days of alignment
- Repeat at 12 months
- Optional mid-period collection

**Anatomical Specificity:**
- **For Knee Only:** Knee osteoarthritis, post-operative knee pain, meniscal disorders, patellofemoral pain
- NOT used for back, neck, shoulder, hip
- Questions reference "knee symptoms"

---

#### 3.2.7 Hip Injury and Osteoarthritis Outcome Score Junior (HOOS JR)

**Measure Type:** Short-form Condition-specific Outcome Score (7-item version of full HOOS)

**Clinical Purpose:**
Assesses hip-specific functional outcomes including pain, stiffness, and limitations in daily living and recreation.

**Improvement Threshold:**
- **Minimum Improvement: ≥10-point increase**
- Scale range: 0–100 points
- MCID: 8–10 points
- Direction: **Higher = Better** (same as KOOS JR)

**Scoring:**
- 7 items, raw score transformed to 0–100
- Higher = better outcome
- Score interpretation identical to KOOS JR (excellent/good/fair/poor)

**Baseline Requirement:**
- Collected within 60 days of alignment
- Repeat at 12 months
- Optional mid-period collection

**Anatomical Specificity:**
- **For Hip Only:** Hip osteoarthritis, post-surgical hip pain, labral pathology
- NOT used for back, neck, shoulder, knee
- Questions reference "hip symptoms"

---

#### 3.2.8 Numeric Rating Scale (NRS) for Pain

**Measure Type:** Pain Intensity Scale (11-point scale)

**Clinical Purpose:**
Simple, validated single-item measure of current pain intensity. Serves as a **safety measure** in the OAT to prevent beneficiary pain from worsening substantially.

**Threshold Specification:**
- **Target: No more than 2-point increase from baseline**
- Scale range: 0–10 (0 = no pain, 10 = worst pain imaginable)
- This is **NOT** an improvement target; it's a **stability target**
- Prevents payment if pain significantly worsens

**Scoring:**
- Single item: "On a scale of 0–10, how much pain are you having right now?"
- 0–3: Mild pain
- 4–6: Moderate pain
- 7–10: Severe pain

**Baseline Requirement:**
- Collected at alignment
- Repeat at end of period
- Optional: monthly collection for real-time monitoring

**Interpretation:**
- NRS is included to guard against negative outcomes
- If pain increases by >2 points (e.g., baseline 4 → follow-up 7), this indicates potential harm
- A beneficiary with stable or improving NRS + improved primary measure (e.g., PROMIS PF) counts as OAT success
- A beneficiary with worsened NRS may indicate over-aggressive intervention or disease progression requiring re-evaluation

**Key Distinction:**
- Unlike PROMIS PF, PROMIS PI, ODI, NDI, QuickDASH, KOOS JR, HOOS JR — NRS is **NOT required for OAT achievement**
- Rather, it acts as a **quality assurance filter:** signals when intervention may be harmful

---

#### 3.2.9 Patient Global Impression of Change (PGIC)

**Measure Type:** Global Impression Measure (Single-Item, 7-point scale)

**Clinical Purpose:**
Captures the beneficiary's overall subjective perception of change over the 12-month period, independent of specific measure scores. Provides a qualitative anchor for reported improvement.

**Administration Requirement:**
- Collected at **end of 12-month performance period only** (not at baseline)
- Single question: "Compared to your status before entering this program, how would you describe your status now?"
- 7-point response scale:
  1. Very much improved
  2. Much improved
  3. Minimally improved
  4. No change
  5. Minimally worse
  6. Much worse
  7. Very much worse

**Scoring and OAT Treatment:**
- **PGIC is collected but NOT scored for OAT achievement**
- Scores 1–3 are conventionally considered "improved" by patient self-report
- However, CMS does not require PGIC ≥3 for OAT payment

**Purpose and Use:**
- Validation check: Ensure objective PROM improvements correspond to beneficiary perception
- Discordance detector: If objective measures improve but PGIC is "no change," investigates potential measurement artifact or beneficiary expectations mismatch
- Quality indicator: High concordance between improved PROMs and PGIC score indicates robust improvement

**Regulatory Specification:**
- CMS currently requires PGIC collection for data completeness but has not mandated it as an OAT criterion
- Future CMS guidance may incorporate PGIC as a co-requirement (e.g., "at least 50% must improve on primary measure AND report improvement on PGIC")

---

### 3.3 Measure Assignment Logic — Which Beneficiary Gets Which Measure?

**Fundamental Rule:**
All beneficiaries receive **all measures that are not anatomically contraindicated.**

**Specific Assignment Rules:**

1. **PROMIS Physical Function (PF):** ALL beneficiaries (universally applied)
2. **PROMIS Pain Interference (PI):** ALL beneficiaries (universally applied)
3. **NRS Pain Intensity:** ALL beneficiaries (universally applied)
4. **PGIC:** ALL beneficiaries at end-of-period only (universally applied)

5. **ODI:** Beneficiaries with **lower back pain diagnoses ONLY**
   - Not administered to neck, shoulder, knee, hip patients
   - Can be administered in addition to PROMIS measures

6. **NDI:** Beneficiaries with **neck pain diagnoses ONLY**
   - Not administered to lower back, shoulder, knee, hip patients
   - Can be administered in addition to PROMIS measures

7. **QuickDASH:** Beneficiaries with **shoulder/arm/hand pain diagnoses ONLY**
   - Not administered to lower back, neck, knee, hip patients
   - Can be administered in addition to PROMIS measures

8. **KOOS JR:** Beneficiaries with **knee pain diagnoses ONLY**
   - Not administered to lower back, neck, shoulder, hip patients
   - Can be administered in addition to PROMIS measures

9. **HOOS JR:** Beneficiaries with **hip pain diagnoses ONLY**
   - Not administered to lower back, neck, shoulder, knee patients
   - Can be administered in addition to PROMIS measures

**Multi-Site Pain Beneficiaries:**
If a beneficiary has pain at multiple anatomical sites (e.g., lower back + knee pain):
- Administer PROMIS PF, PROMIS PI, NRS to all beneficiaries
- Administer ODI for back component, KOOS JR for knee component
- Beneficiary counts as "achieving OAT" if **≥1 measure meets improvement threshold**

**Example Multi-Site Assignment:**
```
Beneficiary: 72-year-old with lower back pain AND knee osteoarthritis

PROM Assignment:
  - PROMIS Physical Function ✓ (required)
  - PROMIS Pain Interference ✓ (required)
  - NRS Pain Intensity ✓ (required)
  - PGIC at 12 months ✓ (required)
  - ODI (for back) ✓ (anatomically relevant)
  - KOOS JR (for knee) ✓ (anatomically relevant)

OAT Contribution Logic:
  - If PROMIS PF ↑2+ AND PROMIS PI ↓2+ → Counts as OAT achievement
  - If PROMIS PF ↑2+ but PROMIS PI stable → Counts as OAT achievement
  - If ODI ↓8+ (independent of PROMIS measures) → Counts as OAT achievement
  - If KOOS JR ↑10+ (independent of PROMIS measures) → Counts as OAT achievement
  - Only needs ONE measure to meet threshold to contribute to OAT
```

---

### 3.4 PROM Measurement Validity and Instrument Specifications

**Validated Instrument Requirement:**
CMS requires that all PROM measures be administered using **validated instrument versions.** The following versions are explicitly approved:

| **Measure** | **Approved Version** | **Publisher** | **Validation Status** |
|---|---|---|---|
| PROMIS Physical Function | CAT or static bank (v2.0+) | NIH/HealthMeasures | FDA-cleared item bank |
| PROMIS Pain Interference | CAT or static bank (v1.1+) | NIH/HealthMeasures | FDA-cleared item bank |
| Oswestry Disability Index (ODI) | Version 2.1a | Original authors | ISO 9001 validated |
| Neck Disability Index (NDI) | Current version | Original authors | Internationally validated |
| QuickDASH | Current version (11-item) | DASH, Inc. | License required |
| KOOS JR | Short-form (7-item) | Original authors | Validated subset of KOOS |
| HOOS JR | Short-form (7-item) | Original authors | Validated subset of HOOS |
| NRS Pain | Standard 0–10 scale | Various (not proprietary) | Widely validated |
| PGIC | Standard 7-point scale | Standard implementation | Widely accepted |

**Implementation Notes:**
- **Proprietary Measures (QuickDASH):** CMS requires licensing documentation for use; ensure your MSK Manager has appropriate licensing agreements
- **PROMIS:** Electronic administration via HealthMeasures portal preferred; paper/tablet versions acceptable if validated
- **Non-Proprietary Measures:** ODI, NDI, NRS, PGIC may be administered via any validated format (digital or paper)

**Language and Accessibility:**
- **English:** All measures available in English
- **Spanish:** PROMIS PF, PROMIS PI, ODI, QuickDASH available in validated Spanish translations
- **Accessibility:** All measures available in large-print format
- **Cognitive/Visual Impairment:** Accommodations per ADA standards required (e.g., screen reader compatibility, verbal administration)

---

## 4. Performance Targets — Detailed Analysis

### 4.1 The Improvement-Only Model (No Control Group)

**Model Structure:**
The ACCESS MSK Track employs an **improvement-only payment model**, meaning there is **no control group for comparison.** Each beneficiary's outcome is measured solely against their own baseline performance.

**Key Contrast with Traditional RCTs:**
- **Traditional RCT Model:** Treatment arm vs. control arm; payment based on superiority of treatment over control
- **ACCESS MSK Model:** Single-arm design; payment based on aggregate improvement from baseline across the population

**Implication:**
Each beneficiary either improves by the MCID threshold or does not, independent of how others perform.

**OAT Definition in Improvement-Only Model:**

```
OAT Achievement = (Count of Beneficiaries with Improvement ≥ MCID) / (Total Denominator Beneficiaries)

Where:
  - Improvement = Change score from baseline to follow-up
  - MCID threshold = Measure-specific minimum improvement target (e.g., ≥2 T-score points for PROMIS PF)
  - Total Denominator = All aligned beneficiaries (adjusted for exclusions, deaths, disenrollment)
```

### 4.2 Statistical and Clinical Implications

#### 4.2.1 Population-Level Analysis — What 50% OAT Means

An **OAT Achievement of 50%** means that **at least 1 in 2 beneficiaries must improve by at least the MCID** on at least one assigned PROM.

**Interpretation Scenarios:**

**Scenario A: Homogeneous High-Efficacy Population**
```
Scenario: 100 beneficiaries, all receive identical Kimi coaching protocol

Outcome Distribution:
  - 60 beneficiaries: Achieve ≥2 T-score improvement on PROMIS PF ✓
  - 35 beneficiaries: Stable PROMIS PF, but improve on PROMIS PI ✓
  - 3 beneficiaries: No improvement on any measure ✗
  - 2 beneficiaries: Missing data / excluded

OAT Achievement = (60 + 35) / 100 = 95% >>> EXCEED TARGET
OAP Payment: $18,000 (100 × $180)
```

**Scenario B: Heterogeneous Population with Mixed Response**
```
Scenario: 100 beneficiaries, mixed risk profiles and engagement levels

Outcome Distribution:
  - 35 beneficiaries: Improve on primary anatomical measure ✓
  - 18 beneficiaries: Improve on PROMIS measures only ✓
  - 32 beneficiaries: Minimal improvement despite engagement ✗
  - 10 beneficiaries: Non-engagement (low Kimi utilization) ✗
  - 5 beneficiaries: Excluded due to disenrollment

OAT Achievement = (35 + 18) / 100 = 53% >> BARELY MEET TARGET
OAP Payment: $18,000 (100 × $180) — still full payment despite marginal success
```

**Scenario C: Population Below Threshold**
```
Scenario: 100 beneficiaries, poor outcome despite intervention

Outcome Distribution:
  - 25 beneficiaries: Achieve improvement targets ✓
  - 75 beneficiaries: No improvement / regression ✗

OAT Achievement = 25 / 100 = 25% << FAIL THRESHOLD
OAP Payment: $0 (100% forfeiture)
Revenue Impact: Lost $18,000 on this cohort
```

#### 4.2.2 Natural History Baseline — "Spontaneous Improvement" Without Intervention

**Critical Context:**
In any population of patients with chronic MSK pain, **a percentage will improve spontaneously over 12 months without formal intervention.** This is because:

1. **Pain Fluctuation:** Chronic pain fluctuates naturally; some patients enter care during pain spikes and naturally regress toward their long-term mean
2. **Healing Timeline:** Some acute-on-chronic injuries naturally heal within 12 months (ligament sprains, muscle strains, post-surgical inflammation)
3. **Activity Modification:** Beneficiaries often self-modify activities or seek alternative remedies outside formal coaching
4. **Placebo Effect:** Expectations of improvement and attention to health measures can drive measurable PROM gains

**Empirical Data from Literature:**
- **Low Back Pain:** ~30–40% of chronic LBP patients show clinically significant improvement without intervention over 12 months
- **Neck Pain:** ~35–45% show spontaneous improvement over 12 months
- **Knee OA:** ~25–30% show improvement without formal intervention
- **Shoulder Pain:** ~40–50% show improvement over 12 months (high spontaneous recovery rate)

**Implication for 50% OAT Threshold:**
The 50% OAT threshold appears to be **calibrated below expected natural history improvement rates**, meaning:
- It's achievable without perfect intervention efficacy
- Beneficiaries with high spontaneous recovery potential partially "offset" those with resistant disease
- If Kimi coaching provides even **modest incremental improvement** over natural history, the 50% target should be attainable

**Risk Frame:**
Populations with **high treatment-resistant phenotypes** (e.g., chronic nociplastic pain, high psychosocial risk, opioid-dependent, high catastrophizing) will have lower spontaneous improvement rates and require more intensive intervention to reach OAT.

#### 4.2.3 Regression to the Mean Effect

**Definition:**
Regression to the mean (RTM) is the statistical phenomenon where individuals with extreme values on a first measurement tend to have less extreme values on a second measurement.

**How RTM Applies to MSK Baseline PROMs:**

Beneficiaries in the MSK Track are often enrolled **because they have recent high pain or disability levels** (that motivated them to seek care). These high baseline values may include:
- Recent acute pain spike superimposed on chronic baseline
- Peak disability during flare-up
- Elevated disability due to recent injury or surgery

**RTM Prediction:**
Even without intervention, some beneficiaries' baseline-to-follow-up change will reflect **natural drift toward their long-term mean**, not treatment effect.

**Example:**
```
Beneficiary with 2-month acute exacerbation of chronic LBP:
  Baseline (during acute spike): ODI = 55 (severe disability)
  Follow-up (after acute subsides): ODI = 42 (moderate disability)
  Change: 13-point improvement

  Likely Cause Mix:
    - Kimi coaching: ~2–3 points improvement
    - Natural resolution of acute phase: ~8–10 points improvement (RTM)

  OAT Attribution: Beneficiary counts as "improved ≥8 points" ✓
  But actual intervention contribution: ~20–30% of total change
```

**Implication for OAT:**
- RTM **inflates apparent intervention efficacy** and makes OAT easier to achieve
- MSK Managers benefit from regression to mean in their OAT calculation
- However, it also indicates that **baseline PROM collection timing is critical** (should reflect true habitual baseline, not acute spike)

---

### 4.3 Strategies to Exceed the 50% OAT Threshold

MSK Managers aiming to reliably exceed the 50% OAT threshold should implement:

#### 4.3.1 Population Stratification and Risk-Based Intervention

**High-Responder Phenotype (Target for Early, Light Intervention):**
- Acute-on-chronic pain (within 3–6 months of injury/flare)
- High pain catastrophizing (treatable with education)
- Low to moderate opioid use (room for improvement without safety concerns)
- Younger age (better tissue healing, higher exercise tolerance)
- High motivation and health literacy
- No active psychiatric comorbidity (or managed depression/anxiety)

**Expected OAT Contribution:** 60–70% will achieve improvement targets

**Mid-Responder Phenotype (Target for Moderate Intervention):**
- Chronic pain (>2 years), but stable or improving trajectory
- Moderate psychosocial risk (manageable anxiety/depression)
- Regular physical activity engagement
- Realistic expectations
- Willing to participate in digital coaching

**Expected OAT Contribution:** 40–50% will achieve improvement targets

**Low-Responder Phenotype (High-Touch, Intensive Intervention):**
- Complex nociplastic pain (central sensitization features)
- High catastrophizing, kinesiophobia
- Multiple comorbidities (depression, anxiety, substance use)
- Low health literacy
- Social isolation
- Previous failed interventions

**Expected OAT Contribution:** 20–30% will achieve improvement targets (if engaged)
**Risk:** Non-engagement → 0% contribution

**Strategy Implication:**
To achieve 50% OAT across a mixed population:
```
Assumption: Population of 100 beneficiaries with typical MSK distribution
  - 30% high-responders: 30 × 65% = 19.5 contributors
  - 50% mid-responders: 50 × 45% = 22.5 contributors
  - 20% low-responders: 20 × 25% = 5 contributors

Total OAT Contributors: 47/100 = 47% >> MISS THRESHOLD

Adjusted Strategy (with targeted intensive intervention):
  - 30% high-responders: 30 × 65% = 19.5 contributors
  - 50% mid-responders: 50 × 50% = 25 contributors
  - 20% low-responders (intensive support): 20 × 35% = 7 contributors

Total OAT Contributors: 51.5/100 = 51.5% >> EXCEED THRESHOLD
```

#### 4.3.2 Optimize Baseline PROM Collection Timing

**Baseline Timing Imperative:**
Baseline PROMs must be collected **within 60 days of alignment.** The timing within this window has substantial implications:

**Optimal Timing:**
- Collect baseline PROM **early in the 60-day window** (days 1–14 after alignment)
- Benefits: Captures true clinical status before acute exacerbations resolve naturally
- Allows maximum time for intervention effect to accumulate

**Suboptimal Timing:**
- Collect baseline PROM **late in the 60-day window** (days 45–60)
- Risk: Acute symptoms may already be resolving naturally, reducing room for further improvement
- Reduces apparent intervention efficacy

**Implication:**
Kimi should collect baseline PROMs immediately upon beneficiary engagement, not delay.

#### 4.3.3 Measure Selection Optimization for Multi-Site Patients

For beneficiaries with multiple pain sites, **strategic measure selection** can optimize OAT contribution:

**Principle:**
Assign anatomically specific measures where intervention is most likely to succeed.

**Example:**
```
Beneficiary: 75-year-old with chronic lower back pain and mild knee OA

Suboptimal Assignment (collect all possible measures):
  - ODI (back focus) — back pain improved ✓
  - KOOS JR (knee focus) — knee OA unchanged ✗
  - PROMIS PF, PI (global) — modest improvement ✓

OAT Contribution: Yes (improved on ≥1 measure)

Optimized Assignment (focus intervention on higher-response site):
  - ODI (back, primary site) — intensive coaching → improved ✓
  - PROMIS PF (global) — addresses back function → improved ✓
  - De-emphasize KOOS JR (lower-response site, less intervention focus)

OAT Contribution: Yes (robust improvement on primary measures)
```

#### 4.3.4 Real-Time Population Monitoring and Mid-Period Intervention

**Population Dashboard Requirement:**
MSK Managers should implement **monthly or quarterly OAT tracking** to:
1. Calculate running OAT achievement rate (% meeting targets as of month N of 12)
2. Identify subpopulations at risk of non-achievement
3. Trigger intensive interventions for at-risk beneficiaries before end-of-period

**Early Warning System:**
- Month 3: If <40% show improvement trends, escalate intervention intensity
- Month 6: If <45% have achieved improvement targets, add intensive support (high-touch outreach, psychology consultation)
- Month 9: If <48% likely to achieve, consider intensive individual care plans for remaining beneficiaries

**Example Mid-Period Intervention:**
```
Month 6 Assessment: 100 beneficiaries, 42 have achieved improvement targets (42%)
Forecast: At current trajectory, only 44% will achieve by month 12 (below 50% threshold)

Response:
  1. Identify 30 "at-risk" beneficiaries (showing <1 T-score change)
  2. Add 1 phone consultation with clinician for each at-risk beneficiary
  3. Increase Kimi coaching frequency (2x weekly → daily)
  4. Supplement with 1 telehealth PT visit
  5. Assess for psychosocial barriers (depression, catastrophizing)

Expected Outcome: 15–20 additional beneficiaries achieve improvement targets
Revised Forecast: 57–62% by month 12 >> EXCEED THRESHOLD
```

---

## 5. Data Reporting Requirements

### 5.1 Baseline Data Collection and Submission

**Submission Timeline:**
- **Deadline:** Within 60 days of beneficiary alignment
- **Format:** FHIR API submission (preferred) or secure web portal upload (alternate)
- **Frequency:** One-time baseline submission per beneficiary per performance period

**Required Baseline Data Elements:**

| **Data Element** | **Format** | **Required?** | **Notes** |
|---|---|---|---|
| Beneficiary Medicare ID | Numeric | Yes | Used for matching to CMS alignment file |
| Alignment Date | YYYY-MM-DD | Yes | Start of 12-month performance period |
| Baseline PROM Collection Date | YYYY-MM-DD | Yes | Must be ≤60 days after alignment date |
| Primary MSK Diagnosis Code(s) | ICD-10 | Yes | Identifies anatomical site, drives measure assignment |
| PROMIS Physical Function T-score | Numeric (30–80) | Yes | Baseline raw score and T-score |
| PROMIS Physical Function Item Responses | JSON array | Yes | Raw item-level data for audit trail |
| PROMIS Pain Interference T-score | Numeric (30–80) | Yes | Baseline raw score and T-score |
| PROMIS Pain Interference Item Responses | JSON array | Yes | Raw item-level data |
| NRS Pain Intensity | Numeric (0–10) | Yes | Baseline pain rating |
| ODI (if applicable) | Numeric (0–100) | Conditional | Only if back pain diagnosis |
| ODI Item Responses | JSON array | Conditional | Raw item-level data if ODI completed |
| NDI (if applicable) | Numeric (0–100) | Conditional | Only if neck pain diagnosis |
| NDI Item Responses | JSON array | Conditional | Raw item-level data if NDI completed |
| QuickDASH (if applicable) | Numeric (0–100) | Conditional | Only if shoulder/arm/hand diagnosis |
| QuickDASH Item Responses | JSON array | Conditional | Raw item-level data if QuickDASH completed |
| KOOS JR (if applicable) | Numeric (0–100) | Conditional | Only if knee pain diagnosis |
| KOOS JR Item Responses | JSON array | Conditional | Raw item-level data if KOOS JR completed |
| HOOS JR (if applicable) | Numeric (0–100) | Conditional | Only if hip pain diagnosis |
| HOOS JR Item Responses | JSON array | Conditional | Raw item-level data if HOOS JR completed |
| Mode of Administration | Categorical | Yes | Options: Digital/Tablet, Paper, Telephone, In-person |
| Language of Administration | Categorical | Yes | Options: English, Spanish, Other (specify) |
| Administering Professional | Text | Yes | Name, credentials (e.g., "AI Agent — Kimi Healthcare" or "PT, John Smith") |
| Accessibility Accommodations | Text | Conditional | Specify if large print, verbal administration, screen reader used |

**FHIR API Submission Specification:**
- MSK Manager submits baseline PROM data via FHIR Observation resources
- Each PROM measure = 1 Observation resource
- Item-level responses submitted via FHIR QuestionnaireResponse resources
- Data submission encrypted (TLS 1.3) and authenticated via OAuth 2.0

**Data Quality Assurance:**
- CMS automated validation checks:
  - Score range verification (e.g., NRS 0–10, ODI 0–100)
  - Collection date within 60 days of alignment
  - All required elements populated
  - ICD-10 diagnosis codes valid
- MSK Manager must correct any rejected submissions within 10 business days

---

### 5.2 Ongoing Data Collection and Mid-Period Reporting

**Mid-Period Collection Frequency (Optional but Recommended):**

CMS does not mandate mid-period PROM collection, but **best practice for OAT tracking requires:**

- **Month 6 (±30 days):** Interim PROM collection on all beneficiaries
  - Allows real-time assessment of OAT achievement trajectory
  - Enables mid-period intervention adjustment (see Section 4.3.4)
  - Submission deadline: Month 7

- **Month 3 (Optional):** Early check-in on PROMIS PF and PI only
  - Light-touch assessment for engagement/feasibility
  - Not required by CMS

**Monthly Engagement Metrics (Not PROMs):**
MSK Managers should track and report:
- % of beneficiaries actively engaged with Kimi coaching (≥1 interaction in past month)
- Average Kimi session frequency per active beneficiary
- Completion rate for assigned coaching modules
- Kimi utilization by anatomical site (% back vs. neck vs. shoulder, etc.)

**Mid-Period Reporting to CMS:**
- Deadline: Month 7 (if Month 6 collection completed)
- Format: Interim PROM data submitted via same FHIR API as baseline
- Assessment: CMS provides feedback on interim OAT achievement rate
- Confidentiality: CMS may provide aggregated population-level feedback but not individual beneficiary identifiers

---

### 5.3 End-of-Period Data Collection and Final Reporting

**Final PROM Collection Timeline:**
- **Collection Window:** Months 11–13 (centered around 12-month anniversary of alignment)
- **Submission Deadline:** Month 14 (30 days after 12-month anniversary)
- **Data Finalization:** CMS performs OAT calculation and reconciliation by Month 15

**End-of-Period Data Elements:**

Same as baseline data elements (see Section 5.1), PLUS:

| **Additional Element** | **Format** | **Required?** | **Notes** |
|---|---|---|---|
| Follow-up PROM Collection Date | YYYY-MM-DD | Yes | Date PROMs were administered at ~12 months |
| Follow-up PROMIS PF T-score | Numeric | Yes | Final measurement |
| Follow-up PROMIS PI T-score | Numeric | Yes | Final measurement |
| Follow-up NRS Pain Intensity | Numeric (0–10) | Yes | Final pain rating |
| Follow-up ODI (if baseline ODI collected) | Numeric (0–100) | Conditional | Must match baseline collection |
| Follow-up NDI (if baseline NDI collected) | Numeric (0–100) | Conditional | Must match baseline collection |
| Follow-up QuickDASH (if baseline QuickDASH collected) | Numeric (0–100) | Conditional | Must match baseline collection |
| Follow-up KOOS JR (if baseline KOOS JR collected) | Numeric (0–100) | Conditional | Must match baseline collection |
| Follow-up HOOS JR (if baseline HOOS JR collected) | Numeric (0–100) | Conditional | Must match baseline collection |
| PGIC Score | Categorical (1–7) | Yes | Patient Global Impression of Change |
| PGIC Collected Date | YYYY-MM-DD | Yes | Date PGIC administered |
| Beneficiary Status at Follow-up | Categorical | Yes | Options: Active, Disenrolled, Deceased, Moved, Unknown |
| Exclusion Indicators | Categorical | Conditional | Any mid-period exclusion criteria triggered? |
| Care Plan Summary | Text | Optional | Brief description of care coordination activities |

**PGIC Collection and Scoring:**
```
Standard PGIC Question:
"Compared to how you were before you joined the ACCESS program,
how much has your [condition] changed?"

Response Options:
  1 = Very much improved
  2 = Much improved
  3 = Minimally improved
  4 = No change
  5 = Minimally worse
  6 = Much worse
  7 = Very much worse

CMS Reporting Requirement: Report raw PGIC score (1–7), not binary improvement/no improvement
```

**OAT Calculation Process (Performed by CMS):**

1. **Denominator Definition:** Count of beneficiaries with complete baseline and follow-up PROM data
2. **Improvement Determination:** For each beneficiary, determine if they met ≥1 improvement target:
   - PROMIS PF: baseline T-score → follow-up T-score, calculate change (≥2-point increase = improvement)
   - PROMIS PI: baseline T-score → follow-up T-score, calculate change (≥2-point decrease = improvement)
   - Condition-specific measure (ODI/NDI/QuickDASH/KOOS JR/HOOS JR): Calculate change (≥MCID = improvement)
   - NRS: Verify no >2-point increase (safety check; not a primary improvement measure)
3. **OAT Achievement Rate:** (Count of beneficiaries meeting ≥1 improvement target) / Denominator
4. **OAP Payment Decision:**
   - OAT ≥ 50% → MSK Manager receives full OAP ($180 × denominator beneficiaries)
   - OAT < 50% → MSK Manager receives $0 OAP

**End-of-Period Reconciliation:**
- CMS cross-checks PROM data against beneficiary eligibility file (deaths, disenrollment)
- Excludes beneficiaries with <30 days of actual service (if applicable)
- Calculates final OAT and notifies MSK Manager within 30 days of data receipt
- OAP payment issued within 60 days of final reconciliation

---

## 6. PROM Administration Standards and Best Practices

### 6.1 Validated Instrument Versions and Administration Modes

**PROMIS Administration Standards:**

**Approved Platforms:**
- HealthMeasures Online (official PROMIS portal): NIH-hosted system with CAT and fixed-form options
- Alternate Validated Platforms: Any platform certified as PROMIS-compliant by NIH
- Paper/Tablet: Printed PROMIS instruments allowed if item-level responses are manually entered into electronic record

**Computerized Adaptive Testing (CAT) vs. Fixed-Form:**
- **CAT Advantage:** Reduces burden (fewer items, ~5–7 items vs. full bank 20–40 items); better precision
- **Fixed-Form Advantage:** Consistent content across beneficiaries; easier scoring; allows offline administration
- **CMS Requirement:** Either CAT or fixed-form acceptable; no preference stated

**PROMIS T-Score Calculation:**
- T-score: Mean = 50, SD = 10
- Calculation: T-score = 50 + 10 × (theta estimate / SE)
- Raw score is converted to T-score using NIH-published algorithms
- Improvement target: ≥2-point T-score change (e.g., baseline 45 → follow-up ≥47)

**Condition-Specific Measure Administration:**

| **Measure** | **Recommended Mode** | **Acceptable Alternates** | **Scoring** |
|---|---|---|---|
| ODI | Digital form (web/tablet) | Paper, verbal phone interview | Raw 0–50 → multiply by 2 = 0–100 |
| NDI | Digital form (web/tablet) | Paper, verbal phone interview | Raw 0–50 → multiply by 2 = 0–100 |
| QuickDASH | Digital form (web/tablet) | Paper | Raw 11–55 → transform to 0–100 |
| KOOS JR | Digital form (web/tablet) | Paper | Raw transform to 0–100 |
| HOOS JR | Digital form (web/tablet) | Paper | Raw transform to 0–100 |
| NRS Pain | Any mode (digital, phone, paper) | Verbal rating | Single numeric 0–10 |
| PGIC | Digital form or phone | Verbal | Single categorical 1–7 |

**Kimi's Administration Role:**
Kimi is approved to administer PROMs **via digital interactive interface** (chatbot-based questionnaire). CMS guidance explicitly permits:
- AI-enabled PROM administration (Kimi qualifies)
- Automated scoring (Kimi calculates T-scores, MCID achievement automatically)
- Electronic data capture and validation
- Automated data submission to FHIR API

---

### 6.2 Language and Accessibility Requirements

**Language Availability:**

**Mandatory:**
- **English:** All measures available in English at beneficiary request

**Highly Recommended (strongly encouraged by CMS):**
- **Spanish:** All core measures (PROMIS PF, PI, ODI, NDI, QuickDASH) available in validated Spanish translations
  - Spanish translations must use published, CMS-approved versions
  - Kimi should deploy bilingual interface (English/Spanish language switching)

**Optional (as funding/infrastructure permits):**
- Other languages (Mandarin, Vietnamese, Korean, etc.) may be offered but not required by CMS

**Accessibility Accommodations (Required under ADA):**

1. **Visual Impairment:**
   - Large-print versions available (≥18pt font minimum)
   - Screen-reader compatible (WCAG 2.1 AA compliance required)
   - High-contrast mode for digital administration

2. **Cognitive Impairment:**
   - Verbal administration option (Kimi can read items aloud via text-to-speech)
   - Extra time for response (no time limits)
   - Simplified language option (if available)

3. **Hearing Impairment:**
   - Written forms (already standard)
   - Closed captions if Kimi uses video instruction

4. **Physical Limitations:**
   - Large touchscreen buttons (≥1 inch minimum)
   - Voice input option (Kimi can accept voice responses for NRS, PGIC)
   - Single-hand operation possible

**Kimi Accessibility Checklist:**
- ✓ WCAG 2.1 AA compliance for all digital interfaces
- ✓ Screen-reader compatibility tested
- ✓ Text-to-speech for all items
- ✓ Voice-input capability for ratings
- ✓ Large-print and high-contrast modes
- ✓ English and Spanish languages
- ✓ No time limits for response

---

### 6.3 Missing Data Handling and Exclusion Criteria

**Missing Data Definition:**
- Beneficiary aligned but did not complete baseline PROM within 60-day window
- Beneficiary completed baseline but missing follow-up PROM (or follow-up >13 months after baseline)
- Individual PROM items missing or invalid (e.g., NRS response = 999, ODI scores incomplete)

**Impact on Denominator:**
- Beneficiaries with **complete baseline AND follow-up** PROMs are included in OAT denominator
- Beneficiaries with **incomplete baseline or missing follow-up** are typically **excluded from OAT denominator**
- Exclusion may result in lower denominator (e.g., 75 of 100 beneficiaries contribute to OAT calculation)

**Exclusion Triggers (Mid-Period):**

| **Trigger** | **Effect on OAT** | **Timing** |
|---|---|---|
| Beneficiary deceased | Excluded from denominator | As reported to CMS |
| Medicare disenrollment (non-FFS) | Excluded from denominator | As reported to CMS |
| Moved out of US (non-resident alien) | Excluded from denominator | As reported to CMS |
| <30 days of MSK Manager service | May be excluded (MSK Manager discretion) | Month 1–2 |
| Beneficiary withdrew consent | Excluded from denominator | As reported to MSK Manager |
| Second primary cancer diagnosis (triggers oncology track) | May be excluded (if dual-track conflict) | As reported to CMS |

**Exclusion Impact Example:**
```
Scenario: MSK Manager with 100 aligned beneficiaries

Actual Outcomes:
  - 88 beneficiaries: Complete baseline + follow-up data
  - 7 beneficiaries: Deceased or disenrolled during year
  - 5 beneficiaries: Missing follow-up PROM data

OAT Denominator = 88 beneficiaries (excluded: 7 + 5 = 12)

OAT Achievement:
  - 48 beneficiaries improved ≥MCID
  - OAT = 48 / 88 = 54.5% >> MEETS THRESHOLD

OAP Payment: 88 × $180 = $15,840 (payment based on included denominator, not original 100)
```

**Best Practice — Minimize Missing Data:**
- Kimi should collect baseline PROM on day 1 of engagement (not delay to day 60)
- Automated follow-up reminders at month 11 (≥30 days before deadline)
- Proactive outreach to at-risk beneficiaries (those showing low engagement with coaching)
- Secure follow-up contact information at baseline (phone, email, preferred outreach method)

---

## 7. Exclusion Criteria and OAT Denominator Management

### 7.1 Pre-Alignment Exclusions (Beneficiary Eligibility Screening)

**Beneficiaries Ineligible for MSK Track (Excluded Before Alignment):**

1. **Age:** <65 years (Medicare eligibility requirement)
2. **Enrollment Status:** Not Medicare FFS (e.g., MA, Medicaid-only)
3. **Primary Diagnosis:** No active ICD-10 MSK diagnosis in recent claims (typically requires ≥1 diagnosis in past 6 months)
4. **Concurrent Alignment:** Already aligned to another MSK Manager in same performance period
5. **Hospice/Palliative Care:** Enrolled in Medicare Hospice (signals end-of-life status)
6. **Exclusionary Comorbidity:** Active malignancy (other than non-melanoma skin cancer) that requires chemotherapy/radiation (typically routed to Oncology track instead)

**Kimi Screening Protocol:**
Upon beneficiary referral, Kimi should verify:
- Medicare age (≥65) ✓
- Medicare FFS status (not capitated) ✓
- Recent MSK diagnosis claim ✓
- No active hospice enrollment ✓
- No current chemotherapy/radiation ✓

---

### 7.2 Mid-Period Exclusions (Triggered During Performance Period)

**Beneficiaries Excluded During the 12-Month Performance Period:**

| **Exclusion Event** | **Trigger** | **Timing** | **Impact on OAT** |
|---|---|---|---|
| **Beneficiary Death** | Medicare records updated | Within 30 days | Removed from denominator (as reported to CMS) |
| **Medicare Disenrollment** | Beneficiary loses FFS coverage (switches to MA, Medicaid loss) | Within 30 days of state notification | Removed from denominator |
| **Geographic Move Out of US** | Beneficiary relocates to non-US resident alien status | As reported | Removed from denominator |
| **Enrollment in Second CMS Model** | Beneficiary aligns to conflicting CMS track (e.g., Oncology) | Within 30 days | May be excluded (CMS guidance) |
| **Beneficiary Opt-Out** | Beneficiary formally withdraws from MSK Track | As requested | Removed from denominator (if during performance period) |
| **Incarceration** | Beneficiary incarcerated (Medicare suspends FFS) | As reported | Removed from denominator |

**CMS Reconciliation Process:**
- CMS cross-checks MSK Manager's beneficiary roster against monthly Medicare Administrative Records
- Flags any beneficiary status changes (death, disenrollment, etc.)
- Notifies MSK Manager of exclusions (typically monthly)
- Final reconciliation at Month 15 (30 days after end of performance period)

---

### 7.3 OAT Denominator Calculation — Worked Example

**Scenario: 12-Month Performance Reconciliation**

```
Initial Cohort (Month 1): 150 beneficiaries aligned to MSK Manager

Mid-Year Status (Month 6):
  - 3 beneficiaries deceased
  - 5 beneficiaries switched to Medicare Advantage (disenrolled)
  - 1 beneficiary incarcerated
  - 141 beneficiaries active and engaged

Year-End Status (Month 13, Final Data Collection):
  - Total alive and enrolled: 142 beneficiaries (150 - 3 - 5 = 142)
  - BUT: 1 additional death reported between Month 6 and Month 13
  - AND: 1 beneficiary moved to Canada mid-year
  - Final active roster: 140 beneficiaries

PROM Data Completeness:
  - Baseline + Follow-up complete: 132 beneficiaries
  - Baseline only (missing follow-up): 6 beneficiaries → EXCLUDED
  - Follow-up only (missing baseline): 2 beneficiaries → EXCLUDED
  - Final denominator: 132 beneficiaries

OAT Achievement Calculation:
  - Beneficiaries meeting ≥1 improvement target: 71
  - OAT Achievement = 71 / 132 = 53.8% >> MEETS THRESHOLD

OAP Payment Calculation:
  - Payment = 132 beneficiaries × $180/beneficiary
  - Total OAP = $23,760

Note: Original cohort was 150, but payment is calculated on 132-beneficiary denominator
(reduced due to deaths, disenrollment, and missing data)
```

---

## 8. Quality Measures Beyond OAP

### 8.1 Additional Reporting Requirements

**ACCESS Model Quality Assurance:**
Beyond the OAP achievement metric, CMS requires MSK Managers to report on:

1. **Data Quality Measures:**
   - Baseline PROM completeness rate (% of aligned beneficiaries with complete baseline within 60 days)
   - Follow-up PROM completeness rate (% with complete follow-up within 12–13 months)
   - Data accuracy (% of data passing CMS validation checks without error)

2. **Beneficiary Experience Measures:**
   - Patient satisfaction (optional: NPS or HCAHPS-equivalent)
   - Care coordination perceived helpfulness (optional survey)
   - Accessibility of Kimi coaching (uptime, response time, language availability)

3. **Safety and Adverse Events:**
   - Serious adverse events related to care coordination (falls, medication errors, missed diagnoses)
   - Beneficiary complaints or grievances related to coaching or data practices
   - Privacy/security incidents (HIPAA breaches)

4. **Utilization Metrics:**
   - Average MSK Manager contact frequency per beneficiary per month
   - Substitute spend utilization (% of beneficiaries using Kimi coaching)
   - Engagement trends (month-by-month active engagement rates)

---

### 8.2 Patient Experience and Satisfaction

**Optional but Recommended Metrics:**

CMS does not currently mandate patient satisfaction reporting for MSK Track, but **best-practice MSK Managers track:**

- **Net Promoter Score (NPS):** "Would you recommend this care coordination program to a friend?"
  - Industry benchmark for healthcare coaching: 40–60 NPS
  - Kimi target: ≥50 NPS

- **Satisfaction with Kimi Coaching:** "How helpful has the AI coaching been for managing your pain?"
  - Benchmark: ≥80% report "helpful" or "very helpful"

- **Accessibility Ratings:** "Was it easy to use Kimi and access coaching?"
  - Benchmark: ≥85% report "easy" or "very easy"

---

### 8.3 Benchmark Comparisons and Performance Accountability

**CMS Transparency:**
CMS may publish aggregated performance data on ACCESS Model performance, including:
- Average OAT achievement rate across all MSK Managers
- Range of OAT achievement rates (25th to 75th percentile)
- Data quality benchmarks (completeness rates, error rates)

**MSK Manager Accountability:**
- Consistent OAT underperformance (e.g., <40% for 2+ years) may trigger CMS intervention or contract non-renewal
- Data quality failures (missing >20% of baseline PROMs) may result in payment withholding
- Patient safety issues trigger CMS investigation and potential corrective action plans

---

## 9. Timeline and Key Dates

### 9.1 ACCESS Model Implementation Timeline

```
2024:
  - Q1: CMS announces ACCESS Model launch date (typically March)
  - Q3: Pre-launch registration period for MSK Managers
  - Q4: First cohort of beneficiaries aligned (pilot markets or national rollout)

2025:
  - Q1: First full calendar year of MSK Track operation
  - Ongoing: Monthly beneficiary alignment and enrollment
  - Q3–Q4: Baseline PROM deadline for early 2025 alignments

2026:
  - Q1: First group of beneficiaries reaching end of 12-month performance period
  - Q1–Q2: Submission of end-of-period PROM data and OAT calculation
  - Q2: First OAP payments issued (for Year 1 cohorts)
  - Ongoing: Multiple overlapping performance periods (rolling 12-month periods per beneficiary)
```

### 9.2 Per-Beneficiary Performance Period Timeline

```
Month 1:
  - Beneficiary alignment notification
  - Beneficiary consent/opt-in (if required)
  - Kimi onboarding and baseline PROM collection begins

Month 1–2:
  - Baseline PROM data collection window (ideally complete by end of Month 2)

Month 3:
  - Optional: Month 3 interim check-in (PROMIS PF/PI and engagement metrics)

Month 6:
  - Recommended: Month 6 interim PROM collection (assess OAT trajectory)
  - Optional: Month 6 interim reporting to CMS for early course correction

Month 9:
  - Kimi coaching continues at full intensity
  - Optional: Month 9 interim assessment

Month 11–13:
  - Follow-up PROM collection window (12-month + allowable 30-day buffer)
  - PGIC collection at end of period

Month 14:
  - Data submission deadline to CMS
  - MSK Manager final reconciliation of beneficiary status

Month 15:
  - CMS OAT calculation and data validation
  - MSK Manager notified of OAT achievement status

Month 16:
  - OAP payment issued (if OAT ≥50%)
  - Payment processing time: 30–60 days typical

Next Cycle:
  - New beneficiaries align continuously throughout year
  - Each beneficiary on separate 12-month cycle from their individual alignment date
```

### 9.3 Critical Reporting Deadlines

| **Reporting Item** | **Deadline** | **Format** | **Recipient** |
|---|---|---|---|
| Baseline PROM Data | Month 2 (ideally) / Month 3 (latest) | FHIR API / Web Portal | CMS |
| Interim PROM Data (optional) | Month 7 (if Month 6 collection) | FHIR API / Web Portal | CMS |
| End-of-Period PROM Data | Month 14 (30 days post-12m) | FHIR API / Web Portal | CMS |
| OAT Achievement Confirmation | Month 15 (auto-calculated by CMS) | CMS notification to MSK Mgr | N/A |
| OAP Payment | Month 16–17 | ACH transfer | MSK Manager bank account |
| Annual Summary Report | Month 18 (optional CMS request) | PDF / Narrative | CMS program office |

---

## 10. Operational Implications for Kimi and MSK Care Delivery

### 10.1 How the Payment Structure Drives Kimi's Clinical Priorities

**The $180 OAP Payment Drives Three Core Priorities:**

#### Priority 1: Baseline PROM Accuracy and Collection

**Financial Impact:** $180 per beneficiary is at stake; missing baseline = that beneficiary cannot contribute to OAT.

**Kimi Implementation:**
- **Immediate baseline collection:** Within 24–48 hours of alignment (don't wait until day 60)
- **Accuracy verification:** Confirm beneficiary understands each PROM question; validate response logic
- **Data entry validation:** Prevent missing items or out-of-range scores (e.g., NRS = 999)
- **Beneficiary education:** Explain that baseline data is compared to follow-up; incentivize honest baseline response

**Risk to Kimi:** If 10% of baseline PROMs are invalid/incomplete, that's 10% of beneficiaries lost from OAT denominator → equivalent of ~$180 × 0.10 × cohort size in recoverable revenue.

#### Priority 2: Outcome-Focused Coaching (MCID Achievement)

**Financial Impact:** Kimi's value proposition is "improve PROMs to meet MCID targets."

**Kimi Implementation:**
- **Measure-specific coaching protocols:** ODI improvement → back-focused exercise, pain psychology, activity pacing
- **PROM-responsive intervention:** Real-time PROM trending drives coaching adjustments
- **Multimodal approach:** Address physical, psychological, social, and behavioral contributors to pain disability
- **High-responder targeting:** Allocate more Kimi resources to "movable middle" beneficiaries (those close to MCID threshold)

**Example Protocol — Lumbar ODI Improvement:**
```
Goal: Achieve ≥8-point ODI reduction over 12 months

Kimi Coaching Sequence:
  Week 1–2: Pain education (central sensitization, nocebo effects)
  Week 3–4: Movement retraining (address fear-avoidance, kinesiophobia)
  Week 5–6: Graded exercise introduction (walking, core engagement)
  Week 7–8: Return-to-activity planning (work, home tasks)
  Week 9–12: Behavioral modification (sleep, stress, pacing)
  Month 4–12: Maintenance and progression

Progress Monitoring:
  - Month 2: Early ODI check-in (looking for ≥2-point change)
  - Month 6: Interim ODI (looking for ≥4-point change)
  - Month 12: Final ODI (looking for ≥8-point change)

Red Flag Intervention:
  - If Month 6 shows <2-point improvement, escalate to clinician consultation
  - Add 1–2 telehealth PT visits + intensive Kimi coaching (daily vs. weekly)
```

#### Priority 3: Population-Level OAT Monitoring

**Financial Impact:** OAT is a population metric (all-or-nothing); Kimi must track **in real-time** whether the cohort is tracking toward ≥50% improvement.

**Kimi Implementation:**
- **Monthly OAT Dashboard:** Calculate running OAT achievement rate (% meeting ≥MCID by month N)
- **Risk Stratification:** Identify "at-risk" beneficiaries (low engagement, negative PROM trends, low baseline PROM scores)
- **Tiered Intervention:** Light intervention for high-responders; intensive support for at-risk beneficiaries
- **Forecast Modeling:** Use interim data to predict Month 12 OAT achievement probability

**Example OAT Monitoring Dashboard:**
```
MSK Manager Cohort: 200 beneficiaries aligned Jan 2026

Monthly OAT Tracking:
  Month 3: 25 improved (12.5%) — Early engagement phase, expected low rate
  Month 6: 65 improved (32.5%) — Progress acceptable, 6-month interim OAT
  Month 9: 105 improved (52.5%) — OAT threshold already achieved (52.5% ≥ 50%)
  Month 12 (projected): 110–115 improved (55–58%) — Final OAT expected to exceed threshold

Forecast Confidence:
  - Month 9 data suggests 90%+ probability of final OAT ≥50%
  - Action: Maintain current Kimi coaching intensity; no emergency intervention required
```

**Alternative Scenario — At-Risk OAT:**
```
Month 6 Status: 55 improved / 180 eligible = 30.6% OAT — BELOW TRAJECTORY

Forecast: At current pace, Month 12 OAT = ~42% (BELOW 50% threshold)

Emergency Action (Month 6–9):
  1. Identify 60 "near-miss" beneficiaries (showing 0–1 T-score change)
  2. Deploy intensive Kimi support:
     - Daily coaching (vs. weekly)
     - Clinician phone consultations (weekly)
     - PT consult for movement barriers
  3. Target: Move 15–20 near-miss beneficiaries above MCID threshold

Revised Forecast: 70–75 improved / 180 = 39–42% OAT — STILL AT RISK
  - Final escalation: Consider substitute spend expansion (add paid PT, psychology)
  - CPT revenue impact vs. OAP stakes: Invest $X in PT to preserve $Y in OAP revenue
```

---

### 10.2 Why Baseline PROM Accuracy Drives Everything

**Baseline PROM Accuracy Has Outsized Importance in Three Ways:**

**1. Baseline Defines the Denominator**
- Invalid/missing baseline = beneficiary excluded from OAT denominator
- Example: 5% missing baselines = 5% reduction in cohort size = equivalent $180 × 5% × cohort size lost revenue
- Kimi must **ruthlessly prevent missing baseline data**

**2. Baseline Defines the MCID Threshold**
- An invalid baseline (e.g., beneficiary wasn't truthful, didn't understand scale) inflates or deflates follow-up change score
- Example: Beneficiary reports ODI = 20 at baseline (dishonest/optimistic), then ODI = 25 at follow-up (realistic) → -5-point change (worsening) → fails OAT
- Reality: True baseline was ~35, true follow-up was ~25 → +10-point improvement (success)
- Kimi must **educate beneficiaries on importance of honest baseline**

**3. Baseline Timing Affects Natural History Regression to Mean**
- If baseline collected during acute pain spike, natural resolution improves PROM scores even without intervention
- If baseline collected during chronic baseline, all improvement reflects intervention efficacy
- Kimi should **collect baseline when pain is stable/representative, not during acute exacerbation**

**Operational Practice — Kimi Baseline Protocol:**

```
Upon beneficiary alignment:

1. IMMEDIATE PROM COLLECTION (Day 0–2):
   - Administer PROMIS PF and PROMIS PI via Kimi chatbot
   - Administer NRS pain intensity
   - Verify scores are in valid range; flag outliers
   - If PROMIS T-scores <25 or >75, re-administer (likely data entry error)

2. ANATOMICAL-SPECIFIC PROM (Day 3–5):
   - Based on ICD-10 diagnoses, administer ODI/NDI/QuickDASH/KOOS JR/HOOS JR
   - Provide clear instructions and examples
   - Offer verbal explanation option (Kimi reads items aloud)

3. DATA QUALITY CHECK (Day 5–7):
   - Kimi confirms: No missing items, all scores in valid range
   - Beneficiary: Receives email/SMS summary ("Your baseline pain rating: 7/10,
     Disability: 45/100. We'll track your improvement over 12 months.")
   - Confirm beneficiary agrees with baseline accuracy

4. SUBMISSION (Day 7–14):
   - Upload to FHIR API with full item-level data and audit trail
   - Confirm CMS receipt and validation

Risk: If baseline contains errors/missing data, OAT denominator reduced by that beneficiary's potential contribution.
```

---

### 10.3 Population Health Management: Monitoring OAT Achievement

**Core Principle:**
OAT is achieved at the **population level**, not individual level. MSK Managers must monitor the entire cohort's progress monthly to identify and intervene with at-risk populations before the end of the measurement period.

**Population Dashboard Metrics:**

| **Metric** | **Calculation** | **Monthly Target** | **Action Trigger** |
|---|---|---|---|
| **OAT Achievement Rate** | (# improved ≥MCID) / (# with complete PROM data) | Month 12: ≥50% | <35% at Month 6 → escalate |
| **Engagement Rate** | (# with ≥1 Kimi session in month) / (# active) | ≥80% | <70% → outreach |
| **Baseline Completeness** | (# with complete baseline PROM) / (# aligned) | ≥95% by Month 2 | <90% by Month 2 → outreach |
| **Follow-Up Completeness** | (# with complete follow-up PROM) / (# with baseline) | ≥90% by Month 13 | <85% → priority escalation |
| **Mean PROMIS PF Change** | Average (Month N PROMIS PF – Baseline) | Month 6: ≥0.8 T-scores | Negative trend → protocol review |
| **Mean PROMIS PI Change** | Average (Month N PROMIS PI – Baseline) | Month 6: ≥-0.8 T-scores | Positive trend (worsening) → escalate |
| **% Showing Any Improvement** | (# with ≥1 T-score change) / (# with data) | Month 6: ≥60% | <50% → protocol review |

**Real-Time Population Monitoring Tools (Kimi Implementation):**

Kimi should provide MSK Manager administrators with:

1. **Monthly Cohort Report (auto-generated):**
   - Current OAT achievement rate (%)
   - Comparison to target trajectory
   - Breakdown by anatomical site (% improving in back, knee, shoulder, etc.)
   - Engagement trends

2. **At-Risk Beneficiary Alerts:**
   - List of beneficiaries showing negative PROM trends (↓PROMIS PF, ↑PROMIS PI, ↑NRS)
   - List of non-engaged beneficiaries (<1 Kimi session in 30 days)
   - List of beneficiaries at "MCID cliff" (0–1 T-score away from achieving threshold)

3. **Predictive OAT Forecast:**
   - Based on Month 6 interim data, calculate probability of achieving ≥50% OAT by Month 12
   - Confidence interval around forecast (e.g., "73% likely to achieve OAT, 95% CI 68–78%")

4. **Intervention Effectiveness Tracker:**
   - For at-risk beneficiaries who received intensive coaching, track PROM changes post-intervention
   - Identify which interventions correlate with greatest PROM improvement

---

### 10.4 Identifying High-Risk Beneficiaries for Non-Achievement

**Phenotypes at Highest Risk of Not Achieving MCID:**

#### **Red Flag #1: Very Low Baseline PROM Scores (Floor Effect)**
```
Beneficiary with baseline ODI = 8 (minimal disability)
  - MCID threshold: ≥8-point reduction
  - Floor: Cannot reduce below 0
  - Maximum possible improvement: 8 points (meets MCID exactly)
  - Risk: Any measurement error or natural fluctuation could cause failure

Kimi Strategy:
  - Distinguish between "true minimal disability" vs. "patient minimization of disability"
  - Verify baseline is representative (not exceptional good day)
  - Consider qualifying disabilty measures (e.g., PROMIS PI might show pain's impact even if ODI floor)
  - May be better suited for competing measure (PROMIS PF/PI) than condition-specific measure
```

#### **Red Flag #2: Nociplastic/Central Sensitization Pain Phenotype**
```
Clinical Features:
  - Widespread pain (multiple anatomical sites)
  - High pain catastrophizing
  - High kinesiophobia (fear of movement)
  - Mood disorder (anxiety, depression)
  - Sleep disturbance
  - Pain disproportionate to imaging findings

Expected MCID Achievement Rate: 20–30% (vs. 50–60% for mechanical pain)

Kimi Intervention:
  - Pain neuroscience education (focus on pain processing, not tissue damage)
  - Graded exercise (even small improvements are meaningful)
  - Cognitive-behavioral strategies (address catastrophizing, kinesiophobia)
  - Psychosocial support (recommend psychology consultation if available)
  - Measure PROMIS pain interference, not just PROMIS physical function
    (PI may improve even if function doesn't)
```

#### **Red Flag #3: Opioid Dependency / Substance Use Disorder**
```
Clinical Features:
  - Chronic high-dose opioid use (≥50 morphine equivalent daily dose)
  - History of substance use disorder
  - Medication-seeking behavior or substance misuse
  - PROM scores artificially elevated due to opioid side effects / adverse effects

Expected MCID Achievement Rate: 15–25%

Kimi Limitation:
  - Kimi cannot manage opioid weaning or addiction treatment (out of scope)
  - Should refer to addiction medicine specialist or pain management
  - PROM improvement unlikely unless opioid use is addressed independently

OAT Strategy:
  - Consider whether beneficiary should be included in MSK Track (may be better suited to specialized pain management program)
  - If included, focus on opioid education, refer to specialist, support non-pharmacologic approaches
  - Set realistic expectations for PROM improvement without addiction treatment
```

#### **Red Flag #4: Severe Psychosocial Comorbidity**
```
Clinical Features:
  - Major depression (unmedicated or treatment-resistant)
  - Severe anxiety or PTSD
  - Social isolation
  - Untreated mental health condition
  - Low health literacy
  - Cognitive impairment

Expected MCID Achievement Rate: 25–40%

Kimi Intervention:
  - Screen for mental health conditions (PHQ-9, GAD-7 if available)
  - Provide psychosocial support within Kimi coaching (validate, normalize)
  - Refer to mental health provider if untreated psychiatric condition identified
  - Adapt coaching to lower health literacy (simpler explanations, shorter sessions)
  - Build strong alliance with beneficiary (address barriers to engagement)
```

#### **Red Flag #5: Acute Post-Surgical Status at Baseline**
```
Scenario: Beneficiary enrolled 2 weeks post-knee replacement surgery
  - Baseline KOOS JR = 15 (severe dysfunction due to post-operative pain, immobility)
  - MCID threshold: ≥10-point increase
  - Expected trajectory: Strong recovery over 3–6 months (partly natural healing, partly PT)
  - Likely OAT contribution: YES (likely to improve ≥10 points)

But Risk if Baseline Misclassified:
  - If baseline collected during acute post-op pain peak (vs. stabilized post-op)
  - Natural healing may dominate PROM improvement (regression to mean)
  - May appear that Kimi coaching was effective, when actually natural post-op recovery drove improvement

Kimi Strategy:
  - Verify post-op timeline; consider delaying baseline until post-op pain stabilized (4–6 weeks)
  - If baseline during acute phase, document this and interpret improvement conservatively
  - Recognize that post-op cohorts will have higher OAT achievement rates (natural recovery boost)
```

---

### 10.5 Strategies for the "Movable Middle" Beneficiaries

**"Movable Middle" Definition:**
Beneficiaries whose PROM scores at baseline are positioned such that achieving the MCID is **realistic but not certain**. These beneficiaries have the **highest return-on-investment for Kimi coaching intensity**.

**Identification:**
```
PROMIS T-Score Example (MCID = 2-point increase):
  - Baseline PROMIS PF T-score: 42
  - MCID threshold: Achieve T-score ≥44
  - Movable middle: Baseline 40–47 (within 5 T-scores of MCID threshold)

  - Out-of-range (low): Baseline <35 (floor effect; unlikely to improve substantially)
  - Out-of-range (high): Baseline >50 (ceiling effect; already high function; less room to improve)
  - Movable middle: Baseline 40–48 (realistic opportunity for 2–4 T-score improvement)

ODI Example (MCID = 8-point reduction):
  - Movable middle: Baseline ODI 18–35
  - Out-of-range low: Baseline <15 (floor effect)
  - Out-of-range high: Baseline >60 (may need surgical intervention; coaching alone insufficient)
```

**Movable Middle Coaching Strategy:**

1. **Identify Movable Middle Beneficiaries (Month 1):**
   ```
   Cohort: 100 beneficiaries
   Baseline PROMIS PF distribution:
     - Ceiling (T-score >50): 15 beneficiaries (low improvability)
     - Movable middle (T-score 40–50): 55 beneficiaries (HIGH PRIORITY)
     - Floor (T-score <40): 30 beneficiaries (specialized intervention needed)
   ```

2. **Allocate Kimi Coaching Resources:**
   ```
   Ceiling Group (15 beneficiaries):
     - Light touch: 1 weekly Kimi session
     - Goal: Prevent regression, maintain gains
     - Expected OAT contribution: 70% (already functional; focus on stability)

   Movable Middle (55 beneficiaries):
     - Intensive: 2–3 weekly Kimi sessions + biweekly clinician touchpoints
     - Goal: Push across MCID threshold (2–3 T-score improvement)
     - Expected OAT contribution: 55–65% (best leverage for coaching)
     - Resource allocation: 60% of total Kimi effort

   Floor Group (30 beneficiaries):
     - Specialized: Daily Kimi + PT consult + psychology support
     - Goal: Establish foundation for improvement (may not achieve MCID, but prevent worsening)
     - Expected OAT contribution: 25–35% (requires multi-modal intervention)
     - Resource allocation: 40% of total Kimi effort (smaller group, more intensive per capita)
   ```

3. **Movable Middle Coaching Protocols — Examples:**

   **For Movable Middle ODI (Back Pain):**
   ```
   Target: Baseline ODI 18–35; Goal ≥8-point reduction

   Weeks 1–2: Pain Education & Mindset Shift
     - Explain pain neuroscience: Pain ≠ Tissue damage
     - Reframe disability: Movement is safe; activity helps healing
     - Set specific functional goal (e.g., "Walk 20 minutes without increased pain")

   Weeks 3–4: Movement Retraining
     - Guided body scan to identify movement limitations (knee flexion, hip extension, spinal rotation)
     - Gentle range-of-motion exercises (supine, side-lying, hands-and-knees positions)
     - Posture and body mechanics education

   Weeks 5–8: Progressive Activity
     - Graded return to walking (target: 15–20 minutes daily)
     - Core activation exercises (bird-dog, dead bug, planks progression)
     - Functional task training (standing, bending, carrying)

   Weeks 9–12: Activity Integration
     - Return to home/work activities (gardening, housework, shopping)
     - Maintenance exercise program
     - Relapse prevention (pain flare management plan)

   Monitoring:
     - Month 2 check-in: ODI at 30–32 (expecting 3–5-point improvement by Month 6)
     - Month 6 interim: ODI at 22–26 (expecting ≥8-point reduction by Month 12) ← Movable middle success!
     - If <6-point improvement by Month 6: Escalate to PT consultation
   ```

4. **Predictive Modeling for Movable Middle:**
   ```
   Using Month 3 interim PROM data, predict Month 12 OAT:

   Scenario: 100-beneficiary cohort
   Month 3 Status:
     - 15 ceiling beneficiaries: 12/15 showing stability (80%) ✓
     - 55 movable middle: 28/55 showing ≥1 T-score improvement (51%) ✓
     - 30 floor beneficiaries: 8/30 showing any improvement (27%)

   Interim OAT at Month 3: (12 + 28 + 8) / 100 = 48%

   Forecast to Month 12 (based on acceleration of response):
     - Ceiling: Likely 12/15 continue to improve/stabilize → 80% contribution
     - Movable middle: Likely 35–40/55 achieve MCID by Month 12 → 65% contribution
     - Floor: Likely 8–10/30 achieve with intensive intervention → 30% contribution

   Predicted final OAT: (12 + 38 + 9) / 100 = 59% >> EXCEED THRESHOLD
   Confidence: High (trending above 50% even in conservative scenario)
   ```

---

## Conclusion: Financial Stakes and Clinical Imperative

**The $180 Outcome-Aligned Payment** drives three non-negotiable operational requirements for Kimi and all MSK Managers:

1. **Baseline PROM Accuracy:** Missing or invalid baselines directly reduce OAT denominator and forfeit $180 per affected beneficiary.

2. **MCID Achievement Focus:** Clinical protocols must systematically move PROM scores by the MCID; the population goal is ≥50% achieving improvement.

3. **Real-Time Population Monitoring:** Each month, the MSK Manager must forecast whether the cohort is tracking toward OAT success and adjust resource allocation accordingly.

**The All-or-Nothing OAT Structure** (≥50% = full payment; <50% = zero payment) creates powerful financial incentives to:
- Maximize treatment efficacy (even marginal improvements matter)
- Identify and intervene with at-risk populations mid-period
- Stratify beneficiaries by risk and allocate coaching resources to highest-leverage individuals
- Prevent attrition and missing data (both reduce denominator)

**For Kimi Specifically:**
The AI care coaching platform must be positioned as the **core lever for PROM improvement**, with capability to:
- Deliver evidence-based protocols targeting MCID thresholds
- Monitor population-level progress real-time
- Flag at-risk beneficiaries for escalation
- Scale coaching intensity based on individual and population response

This document serves as the operational and financial foundation for understanding ACCESS MSK Track implementation and the critical role of outcome measurement in driving sustainable revenue and clinical impact.

---

**Document End**

**Total Sections:** 10 primary sections + subsections
**Total Length:** ~980 lines
**Structured for RAG:** Comprehensive tables, explicit formulas, worked examples, phenotype descriptions, and financial scenarios enable easy retrieval and application

