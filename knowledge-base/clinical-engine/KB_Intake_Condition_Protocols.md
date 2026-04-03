# KIMI MSK Agent: Body-Region-Specific Intake Condition Protocols
**Version 1.0** | **Last Updated:** 2026-04-03 | **Classification:** Clinical Decision Support (RAG-Optimized)

---

## Table of Contents
1. [Overview & Purpose](#overview--purpose)
2. [Lower Back (Lumbar Spine)](#2-lower-back-lumbar-spine)
3. [Neck (Cervical Spine)](#3-neck-cervical-spine)
4. [Knee](#4-knee)
5. [Hip](#5-hip)
6. [Shoulder](#6-shoulder)
7. [Elbow](#7-elbow)
8. [Wrist & Hand](#8-wrist--hand)
9. [Ankle & Foot](#9-ankle--foot)
10. [Multi-Site Pain Protocol](#10-multi-site-pain-protocol)
11. [Red Flag Escalation Matrix](#11-red-flag-escalation-decision-matrix)

---

## Overview & Purpose

This document provides **condition-specific clinical logic for KIMI's intake decision tree (Step 5: Clinical Eligibility Assessment)**. Each anatomical region has unique:
- **Qualifying conditions** (ICD-10 aligned with ACCESS MSK Track)
- **Condition-specific screening questions** (conversational, 6th-8th grade reading level)
- **Red flag protocols** (spine-specific, region-specific, high-risk conditions)
- **Required Patient-Reported Outcomes (PROMs)** at baseline enrollment

### How to Use This Document
- **KIMI intake agents:** Use this as the clinical knowledge base during Step 5 screening
- **Red flag triggers:** Escalate immediately per the decision matrix (Section 11)
- **PROM selection:** Each region specifies mandatory baseline instruments
- **Primary care fallback:** If uncertain, escalate to clinical reviewer (non-emergency)

---

## 2. Lower Back (Lumbar Spine)

### 2.1 Qualifying Conditions (ACCESS MSK Track)

**ICD-10 Codes:**
- **M54.5** — Low back pain, unspecified
- **M54.50** — Low back pain with myelopathy, unspecified
- **M54.51** — Low back pain with myelopathy, lumbar region
- **M54.16** — Radiculopathy, lumbar region (nerve root compression)
- **M54.17** — Radiculopathy, lumbosacral region
- **M48.06** — Spinal stenosis of lumbar region
- **M51.16** — Intervertebral disc disorder (lumbar) with myelopathy
- **M51.17** — Intervertebral disc disorder (lumbosacral) with myelopathy

**Clinical Entry Criteria:**
- Pain duration ≥4 weeks
- Functional limitation (sitting, standing, or walking tolerance decreased)
- Imaging evidence (MRI/CT) OR clinical examination consistent with diagnosis
- Age 18–80 years
- No red flags identified in screening

### 2.2 Condition-Specific Intake Questions

**Use in conversational tone during enrollment call:**

1. **Pain Onset & Mechanism**
   - "How did your back pain start? Was there an injury, or did it come on gradually?"
   - *Trigger: Sudden onset after trauma in patients >50 suggests fracture risk*
   - "Did you feel or hear anything pop or snap at the time?"

2. **Pain Pattern & Radiation**
   - "Where exactly is the pain? Just in your lower back, or does it travel down your leg?"
   - "If it goes down your leg, does it go all the way to your foot?"
   - *Trigger: Below-knee radiation suggests radiculopathy (nerve); above-knee may be referred pain*
   - "Does the pain stay on one side of your body, or both sides?"

3. **Neurological Symptoms**
   - "Do you have any numbness, tingling, or pins-and-needles feeling in your legs or feet?"
   - "Have you noticed any weakness in your legs — trouble lifting your foot when you walk?"
   - *Trigger: Bilateral leg weakness + numbness + bladder/bowel changes = CAUDA EQUINA EMERGENCY*

4. **Functional Limitations**
   - "How long can you sit comfortably before pain gets worse?" (minutes/hours)
   - "How long can you stand before needing to sit or lie down?"
   - "Can you walk? If yes, how far before you need to stop?"
   - *Use to establish baseline for progress tracking*

5. **Bladder & Bowel Function**
   - "Have you noticed any changes in when you need to go to the bathroom?"
   - "Any loss of control with urine or stool? Any numbness in the genital or buttock area?"
   - *Trigger: YES to any = CAUDA EQUINA PROTOCOL — escalate immediately*

6. **Previous Treatments**
   - "Have you tried physical therapy? If yes, when and for how long?"
   - "Have you had any injections into your back (steroid shots)?"
   - "Have you had back surgery? If yes, which procedure and when?"
   - *Used to determine appropriate treatment level; post-surgical cases may need specialist referral*

7. **Red Flag Screening (see Section 2.3 below)**

### 2.3 Red Flag Screening — Spine-Specific

#### **RED FLAG 1: Cauda Equina Syndrome (CES)**

**Definition:** Emergency compression of nerve roots below the spinal cord termination (L4+).

**Screening Questions (if patient endorses neurological symptoms):**
- "Do you have weakness in both legs?"
- "Any numbness in the genital area, buttocks, or inner thigh that won't go away?"
- "Any trouble controlling your bladder or bowel? Leaking urine or stool?"
- "Difficulty with urination or bowel movement (straining, incomplete emptying)?"

**Example Patient Utterances Triggering CES Escalation:**
- "I can't feel my butt anymore."
- "I'm leaking urine; my pants are wet."
- "Both my legs are numb and weak now."
- "I can't control when I go to the bathroom."
- "My genital area went numb last night."

**Escalation:** EMERGENCY — Call 911 or route to ED immediately. Do NOT proceed with intake.

---

#### **RED FLAG 2: Spinal Fracture (Trauma or Pathologic)**

**Screening Questions:**
- "Did your pain start after a fall, car accident, or sports injury?"
- "Do you have osteoporosis or brittle bones? Have you taken steroids long-term (months/years)?"
- "Do you have cancer history, or are you being treated for cancer?"
- "Is there pain at night that wakes you up from sleep?"

**Example Patient Utterances Triggering Fracture Escalation:**
- "I fell off a ladder three days ago and now my back is killing me."
- "I'm on prednisone for my lupus — my bones are weak."
- "I have breast cancer; the back pain came out of nowhere."
- "The pain is worst at night when I try to sleep."

**Risk Factors for Pathologic Fracture:**
- Age >50 + trauma (even minor) + osteoporosis
- History of cancer
- Long-term steroid use (predisposes to osteoporosis)
- Unexplained weight loss >10 lbs in past 6 months

**Escalation:** URGENT — Refer to ED for imaging (X-ray ± MRI) before starting physical therapy. Patient may be ineligible until fracture ruled out.

---

#### **RED FLAG 3: Malignancy (Spinal Cancer)**

**Screening Questions:**
- "Do you have a history of cancer (any type)?"
- "Have you lost weight recently without trying? How much, and over how long?"
- "Is your pain worse at night, even when you lie down?"
- "Have you had fever, chills, or night sweats?"

**Example Patient Utterances Triggering Malignancy Escalation:**
- "I had breast cancer 5 years ago and the pain is in my back now."
- "I've lost 15 pounds in the last 3 months; I don't know why."
- "The pain wakes me at 3 a.m. no matter how I position myself."
- "I've been running low-grade fevers."

**Escalation:** CLINICAL REVIEW — Refer to primary care for workup (CBC, ESR/CRP, consider advanced imaging). Hold enrollment pending clearance.

---

#### **RED FLAG 4: Spinal Infection (Vertebral Osteomyelitis / Discitis)**

**Screening Questions:**
- "Have you had a fever in the last week?"
- "Have you ever injected drugs intravenously?"
- "Have you had a recent surgery, procedure, or injection near your spine?"
- "Are you on medications that lower your immune system?"

**Example Patient Utterances Triggering Infection Escalation:**
- "I've got a fever and my back is really sore."
- "I had a spinal injection two weeks ago; now the pain is worse and I have chills."
- "I use IV drugs — started getting this back pain."
- "I'm on chemo for my cancer; my back started hurting yesterday."

**Escalation:** URGENT — Refer to ED for blood cultures, spinal imaging (MRI preferred), and possible infectious disease consult.

---

#### **RED FLAG 5: Abdominal Aortic Aneurysm (AAA)**

**Screening Questions:**
- "Is the pain in the front of your belly, sides, or deep in the abdomen?"
- "Do you have a pulsing feeling in your belly?"
- "Do you have a history of high blood pressure or smoking?"
- "Age >60: Any sudden severe pain?"

**Example Patient Utterances Triggering AAA Escalation:**
- "I have terrible pain in my lower abdomen and back at the same time."
- "I can feel my pulse in my belly when I touch it."
- "I smoked for 30 years; now I'm 65 and have this sudden back-belly pain."

**Escalation:** EMERGENCY — Suspected AAA rupture/dissection. Call 911. This is a vascular emergency mimicking back pain.

---

### 2.4 Risk Stratification Tools

**STarT Back Tool (at intake):**
- 9-item screening tool for psychosocial risk factors
- Score 0–3: Low risk → suitable for KIMI self-management track
- Score 4–8: Medium risk → suitable for KIMI supervised track (additional monitoring)
- Score 9+: High risk → may need specialist input; discuss with clinical reviewer

**Fear-Avoidance Beliefs Questionnaire (FABQ-abbreviated, 4 items):**
- Assess catastrophizing about movement
- Scores >40: Recommend cognitive-behavioral component in KIMI program

### 2.5 Required PROMs at Baseline Enrollment

| Instrument | Purpose | Minimum Clinically Important Difference (MCID) | Required at Intake? |
|------------|---------|------------------------------------------------|-------------------|
| **PROMIS Physical Function (PF)** | Universal functional capacity | 3–5 points | YES |
| **PROMIS Pain Intensity (PI)** | Universal pain severity | 1 point on 0–10 scale | YES |
| **Oswestry Disability Index (ODI)** | Lumbar-specific functional limitation (disability) | 8 points | YES (site-specific) |
| **Numeric Rating Scale (NRS 0–10)** | Quick pain rating | 2 points for clinically meaningful improvement | YES |

**Scoring Notes:**
- PROMIS uses T-score (mean 50, SD 10; lower = worse function, higher = better)
- ODI: 0–20% (minimal disability) to 80%+ (total disability)
- Track these at baseline, 12 weeks, 24 weeks for outcome reporting to ACCESS

---

## 3. Neck (Cervical Spine)

### 3.1 Qualifying Conditions (ACCESS MSK Track)

**ICD-10 Codes:**
- **M54.2** — Cervicalgia (neck pain)
- **M54.12** — Radiculopathy, cervical region
- **M47.2** — Spondylosis of cervical spine
- **M48.02** — Spinal stenosis of cervical spine
- **M43.2** — Spondylolisthesis of cervical spine
- **M51.12** — Intervertebral disc disorder (cervical) with myelopathy

**Clinical Entry Criteria:**
- Neck pain ≥4 weeks AND/OR cervical radiculopathy with functional impact
- Age 18–80 years
- No red flags identified in screening
- Able to tolerate cervical mobilization/exercises

### 3.2 Condition-Specific Intake Questions

**Conversational tone during enrollment:**

1. **Pain Onset & Location**
   - "When did your neck pain start? Was it sudden or gradual?"
   - "Where exactly is the pain? Front of neck, back, side?"
   - *Anterior neck pain may suggest pharyngeal; posterior/unilateral suggests muscular/nerve*

2. **Radiation Pattern (Arm/Hand Involvement)**
   - "Does the pain go down your arm? If yes, where — shoulder, upper arm, forearm, hand?"
   - "Does it go past your elbow, all the way to your fingers?"
   - *Trigger: Radicular pattern below elbow + tingling = cervical radiculopathy*
   - "Do specific fingers feel numb? Which ones — thumb/index, or pinky side?"

3. **Headaches & Dizziness**
   - "Do you get headaches that start in the neck or back of your head?"
   - "Do you ever feel dizzy or lightheaded, especially when you turn your head?"
   - *Trigger: Severe new headache + neck pain = vertebral artery dissection risk*

4. **Neurological Symptoms**
   - "Any clumsiness in your hands? Trouble with buttons, fine motor tasks?"
   - "Any tingling or weakness in your hands?"
   - "Any loss of balance or trouble walking?"
   - *Trigger: Gait disturbance, clumsiness = myelopathy (spinal cord compression)*

5. **Lhermitte's Phenomenon** (indicator of spinal cord irritation)
   - "When you bend your neck forward, do you ever feel an electric shock sensation that runs down your back or into your arms/legs?"
   - *Trigger: YES = myelopathy concern*

6. **Functional Limitations**
   - "Can you turn your head side to side? If limited, which way is worse?"
   - "How long can you work at a computer or look at a phone before pain increases?"
   - "Have you stopped any activities because of neck pain?"

7. **Previous Treatments**
   - "Any prior PT, injections, or surgery on your neck?"

### 3.3 Red Flag Screening — Cervical-Specific

#### **RED FLAG 1: Cervical Myelopathy (Spinal Cord Compression)**

**Definition:** Compression of the spinal cord in the neck causing progressive weakness, loss of fine motor control, and gait disturbance.

**Screening Questions:**
- "Have you noticed your hands feel clumsy? Trouble buttoning shirts or writing?"
- "Any loss of balance or trouble walking in a straight line?"
- "When you bend your neck forward, do you feel an electric shock down your spine?"
- "Any loss of strength in your arms or legs?"

**Example Patient Utterances Triggering Myelopathy Escalation:**
- "I'm dropping things; my hands don't work right anymore."
- "I walk like I'm drunk now; my balance is off."
- "Every time I touch my chin to my chest, I get a shock down my back."
- "My legs feel weak and stiff."

**Escalation:** URGENT — Refer to spine specialist or ED. Myelopathy can progress to permanent neurological damage if untreated. Hold KIMI enrollment pending specialist evaluation.

---

#### **RED FLAG 2: Vertebral Artery Dissection (VAD)**

**Definition:** Tear in the wall of the vertebral artery (runs through cervical vertebrae), risking stroke.

**Screening Questions:**
- "Did your neck pain come on suddenly? Any recent trauma, chiropractic manipulation, or forceful neck movement?"
- "Do you have a severe new headache along with the neck pain?"
- "Any dizziness, weakness on one side of body, or vision changes?"
- "Any facial numbness or difficulty swallowing?"

**Example Patient Utterances Triggering VAD Escalation:**
- "The chiropractor yanked my neck and now I have the worst headache of my life."
- "Sharp pain in the back of my neck plus bad dizziness and weakness on my left side."
- "My vision went blurry after my neck started hurting."
- "I can't swallow; my throat feels funny."

**Risk Factors:**
- Recent cervical manipulation (chiropractic)
- Trauma or forceful neck extension
- Connective tissue disorders (Marfan, Ehlers-Danlos)
- Spontaneous occurrence possible in young patients

**Escalation:** EMERGENCY — Stroke risk. Refer to ED immediately for vascular imaging (CT/MR angiography) and neurology consult.

---

#### **RED FLAG 3: Upper Motor Neuron Signs (Spinal Cord Dysfunction)**

**Screening Questions:**
- "Have your reflexes felt different? Do doctors comment on brisk reflexes?"
- "Any involuntary muscle jerking or spasms?"
- "Any weakness or stiffness that's getting worse?"

**Clinical Examination Findings to Note:**
- Hyperreflexia (exaggerated deep tendon reflexes)
- Clonus (rhythmic muscle contractions when tendon is stretched)
- Babinski sign positive (abnormal toe response to sole stimulation)

**Example Patient Utterances Triggering UMN Escalation:**
- "The doctor said my reflexes are too jumpy."
- "My legs jerk involuntarily."

**Escalation:** URGENT — Refer to neurology/spine specialist for myelopathy evaluation. Do not start KIMI program until cleared.

---

### 3.4 Red Flag Screening Summary (Cervical)

| Red Flag | Trigger Questions | Escalation | Action |
|----------|------------------|-----------|--------|
| Myelopathy | Hand clumsiness? Gait disturbance? Lhermitte's? | URGENT | Spine specialist + hold enrollment |
| Vertebral artery dissection | Sudden severe headache + neck pain? Recent manipulation? Vision changes? | EMERGENCY | ED + stroke alert |
| Upper motor neuron signs | Hyperreflexia? Clonus? Weakness progressing? | URGENT | Neurology consult |
| Infection | Fever + recent procedure? IV drug use? | URGENT | ED + ID consult |
| Malignancy | Cancer history? Weight loss >10 lbs? Night pain? | CLINICAL REVIEW | Primary care workup |

### 3.5 Required PROMs at Baseline

| Instrument | Purpose | MCID |
|------------|---------|------|
| **PROMIS PF** | Universal physical function | 3–5 points |
| **PROMIS PI** | Universal pain intensity | 1 point |
| **Neck Disability Index (NDI)** | Cervical-specific disability | 8 points |
| **NRS 0–10** | Pain severity | 2 points |

---

## 4. Knee

### 4.1 Qualifying Conditions (ACCESS MSK Track)

**ICD-10 Codes:**
- **M17.0** — Bilateral osteoarthritis, knees
- **M17.1** — Unilateral osteoarthritis, knees
- **M17.2** — Bilateral secondary osteoarthritis, knees
- **M17.3** — Unilateral secondary osteoarthritis, knees
- **M76.1** — Patellar tendinitis and tenosynovitis
- **M77.4** — Metatarsalgia (anterior knee pain from patellofemoral syndrome)

**Clinical Entry Criteria:**
- Knee pain ≥4 weeks
- Functional limitation (stairs, walking, squatting, sports)
- Radiographic evidence of OA (Kellgren-Lawrence Grade 1–3) OR clinical diagnosis of patellofemoral syndrome
- Age 40–80 years (OA typically; younger patients with PFP acceptable)
- No red flags

### 4.2 Condition-Specific Intake Questions

1. **Pain Location & Onset**
   - "Is the pain in the front of your knee, back, inner side, or outer side?"
   - "How did it start? Injury, or gradually over time?"
   - *Front/around kneecap = patellofemoral; diffuse = OA; localized lateral = meniscal*

2. **Mechanical Symptoms**
   - "Does your knee lock (get stuck)? Does it catch?"
   - "Does your knee ever give way or feel unstable?"
   - "Do you feel swelling or water on the knee?"
   - *Trigger: Locking + catching = meniscal tear risk*

3. **Functional Limitations**
   - "Can you climb stairs? Is it going up or down that hurts more?"
   - "Can you squat or kneel?"
   - "How far can you walk before pain increases?"
   - "Can you play sports or run?"

4. **Stiffness Pattern**
   - "Is the knee stiffest when you first get up in the morning? How long does it take to loosen up?"
   - "Does stiffness come back after sitting for a while?"
   - *Morning stiffness >30 min = OA; brief stiffness = mechanical*

5. **Swelling & Night Pain**
   - "Does your knee swell? When — after activity or all the time?"
   - "Pain at night? Does it wake you up?"
   - *Swelling + night pain = inflammatory process or severe OA*

6. **Previous Treatments**
   - "Injections in your knee? Physical therapy?"
   - "Any prior knee surgery?"

### 4.3 Red Flag Screening — Knee-Specific

#### **RED FLAG 1: Septic Arthritis (Joint Infection)**

**Screening Questions:**
- "Did the pain come on suddenly — like overnight?"
- "Is your knee hot, red, or very swollen?"
- "Do you have a fever?"
- "Can you put weight on your leg? Can you straighten it?"

**Example Patient Utterances:**
- "My knee swelled up overnight and is burning hot to touch."
- "I have a fever of 101 and can't bend my knee at all."
- "I had a knee injection last week and now my knee is so swollen I can't walk."

**Risk Factors:**
- Recent knee injection or procedure
- Immunosuppression (rheumatoid arthritis on biologics, diabetes, HIV)
- IV drug use
- Bacteremia/systemic infection

**Escalation:** EMERGENCY — Refer to ED immediately. Joint aspiration and cultures needed. Do NOT put weight on knee; do NOT flex; ice and elevate. This requires urgent orthopedic evaluation.

---

#### **RED FLAG 2: Deep Vein Thrombosis (DVT)**

**Screening Questions:**
- "Is only one leg swollen? Is the calf tender?"
- "Do you have redness or warmth in the calf?"
- "Recent surgery, immobilization, or long flight/car ride?"
- "Do you take birth control or have a clotting disorder?"

**Example Patient Utterances:**
- "My left calf is swollen and tender; the swelling is only on one side."
- "I had knee surgery two weeks ago and now my calf is huge."
- "My leg is red and hot from my thigh to my ankle."

**Risk Factors:**
- Recent knee surgery or immobilization
- Birth control or HRT use
- Cancer history
- Inflammatory bowel disease
- Clotting disorder history

**Escalation:** URGENT — Refer to ED for compression ultrasound. Do NOT massage calf. Do NOT apply heat. Elevate leg. This is a PE risk.

---

#### **RED FLAG 3: Fracture**

**Screening Questions:**
- "Did this start after a fall or accident?"
- "Can you put any weight on your knee? Does it feel unstable?"
- "Is there severe swelling that came on within minutes/hours?"

**Example Patient Utterances:**
- "I fell skiing; my knee won't support any weight."
- "I heard a crack when I fell; the knee swelled immediately."

**Escalation:** URGENT — Refer to ED for X-rays (minimum AP, lateral, sunrise views) ± MRI for soft tissue.

---

### 4.4 Required PROMs at Baseline

| Instrument | Purpose | MCID |
|------------|---------|------|
| **PROMIS PF** | Universal physical function | 3–5 points |
| **PROMIS PI** | Universal pain intensity | 1 point |
| **KOOS-Jr** | Knee-specific outcome (7 items, quicker) | 10 points |
| **NRS 0–10** | Pain rating | 2 points |

---

## 5. Hip

### 5.1 Qualifying Conditions (ACCESS MSK Track)

**ICD-10 Codes:**
- **M16.0** — Bilateral osteoarthritis, hips
- **M16.1** — Unilateral osteoarthritis, hips
- **M16.2** — Bilateral secondary osteoarthritis, hips
- **M16.3** — Unilateral secondary osteoarthritis, hips
- **M76.0** — Gluteal tendinitis
- **M76.1** — Psoas tendinitis (iliopsoas syndrome)
- **M76.3** — Greater trochanteric pain syndrome (GTPS)
- **M77.2** — Hip labral pathology (if causing pain)

**Clinical Entry Criteria:**
- Hip pain ≥4 weeks
- Functional limitation (walking, stairs, sleep due to hip pain)
- Radiographic evidence of OA OR clinical diagnosis of GTPS/labral pathology
- Age 40–85 years
- No red flags

### 5.2 Condition-Specific Intake Questions

1. **Pain Location & Character**
   - "Where is the pain? In the groin, outer hip, or buttock?"
   - *Groin = intra-articular (femoroacetabular impingement, OA); outer hip = GTPS; buttock = piriformis*
   - "Is it sharp, dull, achy, or burning?"

2. **Mechanical Symptoms**
   - "Do you feel catching or clicking in the hip?"
   - "Any locking or giving way?"
   - "Does the pain change with different positions?"

3. **Night Pain & Sleep**
   - "Do you have pain at night? Does it wake you up?"
   - "Can you sleep on that hip, or do you have to stay on your back?"
   - *Trigger: Persistent night pain = OA severity or infection risk*

4. **Functional Limitations**
   - "Can you climb stairs? How many steps before pain?"
   - "Can you walk? How far before you need to rest?"
   - "Can you cross your legs? Put on shoes?"
   - "Can you get in and out of a car, chair, or bed?"

5. **Activity Modification**
   - "Have you given up running, sports, or hobbies?"
   - "Do you need a cane or walker?"

6. **Previous Treatments**
   - "PT, injections, or hip surgery?"

### 5.3 Red Flag Screening — Hip-Specific

#### **RED FLAG 1: Avascular Necrosis (AVN) of Hip**

**Definition:** Death of bone tissue in femoral head due to loss of blood supply; leads to collapse and rapid progression to OA.

**Screening Questions:**
- "Have you ever taken steroids long-term (months or years)? For what condition?"
- "Do you drink heavily or have a history of alcohol use disorder?"
- "Do you have sickle cell disease?"
- "Have you had a hip fracture or injury?"
- "Is the pain sudden and severe, even at night?"

**Example Patient Utterances:**
- "I was on prednisone for my lupus for 6 months; now my hip is killing me."
- "I drink a lot; my hip just started hurting for no reason."
- "I have sickle cell; my hip pain came on overnight."
- "I broke my hip 2 years ago and it never fully recovered."

**Risk Factors:**
- Chronic corticosteroid use (prednisolone, prednisone, dexamethasone)
- Chronic alcohol use
- Sickle cell disease
- HIV
- Recent hip fracture
- Idiopathic (spontaneous)

**Escalation:** URGENT — Refer to hip specialist/orthopedics for MRI evaluation. AVN progresses rapidly and may require surgery. Do not enroll in KIMI until specialist has evaluated.

---

#### **RED FLAG 2: Septic Arthritis (Hip)**

**Screening Questions:**
- "Did the hip pain come on suddenly?"
- "Do you have a fever?"
- "Can you move your hip freely, or is it very stiff and painful?"
- "Any IV drug use or recent hip procedure?"

**Example Patient Utterances:**
- "My hip is so painful I can't move it; I have a fever."
- "I had a hip injection yesterday; now I'm febrile and my hip is on fire."

**Escalation:** EMERGENCY — Refer to ED immediately. Septic hip is a surgical emergency; requires joint aspiration and possible drainage.

---

#### **RED FLAG 3: Hip Fracture (Femoral Neck or Intertrochanteric)**

**Screening Questions (especially age >65):**
- "Did the pain start after a fall, even a minor one?"
- "Can you walk or put weight on your leg?"
- "Does your leg look shorter or rotated outward?"
- "Any history of osteoporosis?"

**Example Patient Utterances:**
- "I fell in my bathroom; my hip is killing me and I can't get up."
- "My leg looks shorter than the other one now."
- "I have osteoporosis; I fell on my hip and can't bear weight."

**Escalation:** URGENT — Refer to ED for X-rays (AP pelvis, lateral, frog-leg views) ± MRI. Hip fracture is an orthopedic emergency, especially if displacement. May require surgical repair.

---

### 5.4 Required PROMs at Baseline

| Instrument | Purpose | MCID |
|------------|---------|------|
| **PROMIS PF** | Universal physical function | 3–5 points |
| **PROMIS PI** | Universal pain intensity | 1 point |
| **HOOS-Jr** | Hip-specific outcome (7 items) | 10 points |
| **NRS 0–10** | Pain rating | 2 points |

---

## 6. Shoulder

### 6.1 Qualifying Conditions (ACCESS MSK Track)

**ICD-10 Codes:**
- **M75.1** — Rotator cuff syndrome (tendinitis, impingement)
- **M75.0** — Adhesive capsulitis (frozen shoulder)
- **M75.4** — Impingement syndrome of shoulder
- **M19.0** — Shoulder osteoarthritis
- **M75.2** — Bicipital tenosynovitis
- **M25.5** — Shoulder instability

**Clinical Entry Criteria:**
- Shoulder pain ≥4 weeks
- Functional limitation (overhead activities, arm elevation, sleep)
- Clinical examination consistent with tendinopathy or OA
- Age 18–80 years
- No red flags or instability concerns (unless pt. candidates for PT-based stabilization)

### 6.2 Condition-Specific Intake Questions

1. **Pain Onset & Location**
   - "When did the shoulder pain start? Sudden or gradual?"
   - "Is it on the top of shoulder, front, or side?"
   - *Top/lateral = supraspinatus tendinitis; front = biceps; top of shoulder + trapezius = cervical referred*

2. **Overhead Activity Tolerance**
   - "Can you reach overhead? If yes, how high before pain?"
   - "Can you reach behind your back?"
   - "Can you throw a ball or play tennis?"
   - "What activities have you stopped doing?"

3. **Night Pain & Sleep Position**
   - "Pain at night? Does it wake you up?"
   - "Can you sleep on that shoulder?"
   - "Do you have pain when you roll over in bed?"

4. **Weakness vs. Pain**
   - "Do you have true weakness (can't lift your arm even when you try), or is it pain-limited strength?"
   - *True weakness = rotator cuff tear risk; pain-limited = tendinitis/impingement likely*

5. **Instability Symptoms**
   - "Does your shoulder ever feel like it's slipping out of socket?"
   - "Any popping or clicking?"
   - "History of shoulder dislocation?"

6. **Previous Treatments**
   - "PT, injections, or shoulder surgery?"

### 6.3 Red Flag Screening — Shoulder-Specific

#### **RED FLAG 1: Acute Rotator Cuff Tear (Full-Thickness)**

**Screening Questions:**
- "Did you hear a pop or feel a tearing sensation?"
- "Did the pain and weakness come on suddenly after an injury?"
- "Can you lift your arm at the shoulder or is it completely helpless?"

**Example Patient Utterances:**
- "I felt my shoulder rip when I threw a ball; I can't lift my arm at all now."
- "I fell and heard a pop; my shoulder is useless."

**Clinical Exam (agent notes):**
- Drop-arm test: arm drops involuntarily when held at 90 degrees abduction
- Supraspinatus atrophy (visible indentation above spine of scapula)

**Escalation:** URGENT — Refer to orthopedic surgeon for imaging (MRI or ultrasound) and consideration of surgical repair. Acute tears have better surgical outcomes if repaired within 6–8 weeks. Patient may not be appropriate for conservative KIMI program if tear is confirmed.

---

#### **RED FLAG 2: Referred Cardiac Pain**

**Screening Questions:**
- "Do you have chest tightness or pressure along with the shoulder pain?"
- "Any shortness of breath?"
- "Any radiation to your left arm or jaw?"
- "Do you have heart disease risk factors (age, smoking, diabetes, high cholesterol)?"

**Example Patient Utterances:**
- "My left shoulder hurts and I feel tight in my chest."
- "I'm short of breath and my shoulder aches."
- "I'm a smoker; I have chest pressure and left shoulder pain."

**Trigger: Any combination of shoulder pain + chest symptoms in patient with cardiac risk**

**Escalation:** EMERGENCY — Refer to ED or call 911. Cardiac chest pain can present as shoulder pain. Do not delay cardiac evaluation.

---

#### **RED FLAG 3: Tumor/Malignancy**

**Screening Questions:**
- "Do you have a history of cancer?"
- "Is the pain progressive (getting worse over weeks/months)?"
- "Pain at night that doesn't improve with position changes or rest?"
- "Unexplained weight loss or night sweats?"

**Example Patient Utterances:**
- "I had lung cancer; my shoulder started hurting and it's getting worse."
- "The pain is night pain; nothing helps it."

**Escalation:** CLINICAL REVIEW — Refer to primary care or oncology for imaging workup. Hold KIMI enrollment pending clearance.

---

### 6.4 Required PROMs at Baseline

| Instrument | Purpose | MCID |
|------------|---------|------|
| **PROMIS PF** | Universal physical function | 3–5 points |
| **PROMIS PI** | Universal pain intensity | 1 point |
| **QuickDASH** | Shoulder/arm disability (11 items, quick) | 10 points |
| **NRS 0–10** | Pain rating | 2 points |

---

## 7. Elbow

### 7.1 Qualifying Conditions (ACCESS MSK Track)

**ICD-10 Codes:**
- **M77.0** — Lateral epicondylitis (tennis elbow)
- **M77.0** — Medial epicondylitis (golfer's elbow)
- **M19.0** — Elbow osteoarthritis
- **M70.2** — Olecranon bursitis
- **G56.2** — Cubital tunnel syndrome (ulnar nerve compression)

**Clinical Entry Criteria:**
- Elbow pain ≥4 weeks
- Functional limitation (gripping, lifting, throwing)
- Clinical exam or imaging consistent with diagnosis
- Age 18–80 years
- No red flags

### 7.2 Condition-Specific Intake Questions

1. **Pain Location & Onset**
   - "Is the pain on the outside of your elbow (tennis elbow), inside (golfer's elbow), or back of the elbow?"
   - "Did it start from an injury or sport, or gradually?"
   - *Lateral = tennis elbow; medial = golfer's elbow; posterior = olecranon bursitis*

2. **Provocation Activities**
   - "What activities make it hurt? Gripping, throwing, lifting?"
   - "Can you grip tightly? How long before pain?"
   - "Can you throw?"

3. **Neurological Symptoms (if suspecting cubital tunnel)**
   - "Any numbness or tingling in your ring or pinky finger?"
   - "Any numbness in the inside of your hand?"
   - "Any weakness in gripping or finger movement?"

4. **Functional Limitations**
   - "Can you carry objects? How much weight?"
   - "Can you open a jar?"
   - "What activities have you stopped?"

5. **Previous Treatments**
   - "PT, injections, straps/braces?"

### 7.3 Red Flag Screening — Elbow-Specific

#### **RED FLAG 1: Septic Arthritis / Olecranon Bursitis (Infection)**

**Screening Questions:**
- "Is the back of your elbow swollen, red, and hot?"
- "Do you have a fever?"
- "Recent elbow injury, scratch, or insect bite?"
- "Recent elbow injection?"

**Example Patient Utterances:**
- "The back of my elbow is swollen and I can see redness; I have a fever."
- "I had an elbow injection and now it's infected."

**Escalation:** URGENT — Refer to ED for evaluation. Bursal infection may require needle aspiration and antibiotics. Joint infection requires joint aspiration and imaging.

---

#### **RED FLAG 2: Fracture**

**Screening Questions:**
- "Did the pain start after a fall or impact?"
- "Can you straighten your elbow?"
- "Severe swelling that came on quickly?"

**Escalation:** URGENT — Refer to ED for X-rays (AP, lateral, oblique views).

---

#### **RED FLAG 3: Ulnar Nerve Compression (Progressive)**

**Screening Questions:**
- "Is the numbness in your pinky and ring finger getting worse over time?"
- "Is your grip strength declining?"
- "Any visible muscle wasting in your hand (between thumb and index finger)?"

**Example Patient Utterances:**
- "My pinky and ring finger are getting more numb; I'm dropping things."
- "I can see my hand is getting thinner."

**Escalation:** URGENT — Refer to neurology/orthopedics for nerve conduction study and EMG. Progressive compression may require surgical decompression.

---

### 7.4 Required PROMs at Baseline

| Instrument | Purpose | MCID |
|------------|---------|------|
| **PROMIS PF** | Universal physical function | 3–5 points |
| **PROMIS PI** | Universal pain intensity | 1 point |
| **QuickDASH** | Arm/elbow disability | 10 points |
| **NRS 0–10** | Pain rating | 2 points |

---

## 8. Wrist & Hand

### 8.1 Qualifying Conditions (ACCESS MSK Track)

**ICD-10 Codes:**
- **G56.0** — Carpal tunnel syndrome
- **M19.0** — Wrist osteoarthritis
- **M18.1** — Thumb CMC (carpometacarpal) osteoarthritis
- **M65.3** — De Quervain's tenosynovitis (thumb tendinitis)
- **M89.0** — Wrist osteoarthritis
- **M77.0** — Wrist epicondylitis (less common)

**Clinical Entry Criteria:**
- Wrist/hand pain ≥4 weeks
- Functional limitation (gripping, fine motor, typing)
- Clinical exam or imaging consistent with diagnosis
- Age 18–80 years
- No red flags (no acute compartment syndrome, vascular compromise)

### 8.2 Condition-Specific Intake Questions

1. **Pain & Location**
   - "Where is the pain? Whole wrist, base of thumb, or fingers?"
   - "Is it constant or does it come and go?"

2. **Hand Function & Fine Motor**
   - "Can you grip things tightly?"
   - "Can you pinch (thumb and finger together)?"
   - "Can you button shirts or tie shoes?"
   - "Can you type or write?"

3. **Nighttime Symptoms (Carpal Tunnel Specific)**
   - "Do you wake up at night with numb or tingling hands?"
   - "Does shaking out your hand help, or do you have to get up and walk around?"
   - *Trigger: Yes = CTS likely*

4. **Specific Symptom Patterns**
   - "Which fingers are numb? Thumb, index, middle (CTS pattern) or pinky side (ulnar)?"
   - "De Quervain's: Pain at base of thumb when you pinch your thumb and fingers together?"
   - "CMC OA: Pain at the base of thumb, especially with gripping or thumb movement?"

5. **Phalen's & Tinel's History**
   - "Has a doctor done a wrist test where they bend your wrist forward (Phalen's)?"
   - "Or tapped on your wrist nerve (Tinel's)?"

6. **Functional Limitations**
   - "Can you use tools or screwdrivers?"
   - "Can you hold a coffee cup?"
   - "Have you stopped any hobbies or work tasks?"

### 8.3 Red Flag Screening — Wrist/Hand-Specific

#### **RED FLAG 1: Acute Compartment Syndrome (Post-Trauma)**

**Screening Questions:**
- "Was there a recent traumatic injury to the wrist or forearm (fracture, crush)?"
- "Are you experiencing severe pain out of proportion to the injury?"
- "Increasing swelling or numbness despite ice and elevation?"
- "Severe numbness in fingers + inability to move fingers (paralysis)?"

**Example Patient Utterances:**
- "I broke my wrist two hours ago; the pain is unbearable even with pain meds."
- "My fingers are numb and I can't move them; it's getting worse."

**Escalation:** EMERGENCY — Potential compartment syndrome. Refer to ED immediately. This requires urgent surgical fasciotomy if confirmed; do NOT delay for imaging.

---

#### **RED FLAG 2: Vascular Compromise**

**Screening Questions:**
- "Recent trauma or crush injury?"
- "Is the hand pale or blue? Colder than the other side?"
- "No pulse palpable in the wrist?"

**Escalation:** EMERGENCY — Vascular emergency. Refer to ED immediately. May require vascular surgery.

---

#### **RED FLAG 3: Progressive Thenar Atrophy (Ulnar/Median Nerve)**

**Screening Questions:**
- "Is the muscle in your thumb getting smaller (visible on heel of thumb)?"
- "Rapid onset of numbness in thumb/index/middle fingers?"
- "Severe weakness in thumb pinch?"

**Example Patient Utterances:**
- "My thumb is getting thinner and I'm losing grip strength."
- "The numbness came on fast in my thumb."

**Escalation:** URGENT — Refer to neurology for EMG/NCS and imaging. May indicate progressive nerve compression requiring surgical intervention.

---

### 8.4 Required PROMs at Baseline

| Instrument | Purpose | MCID |
|------------|---------|------|
| **PROMIS PF** | Universal physical function | 3–5 points |
| **PROMIS PI** | Universal pain intensity | 1 point |
| **QuickDASH** | Hand/wrist disability | 10 points |
| **NRS 0–10** | Pain rating | 2 points |

---

## 9. Ankle & Foot

### 9.1 Qualifying Conditions (ACCESS MSK Track)

**ICD-10 Codes:**
- **M19.0** — Ankle osteoarthritis
- **M79.3** — Plantar fasciitis
- **M76.6** — Achilles tendinitis/tendinopathy
- **M25.3** — Ankle instability (chronic)
- **M77.5** — Metatarsalgia (midfoot pain)

**Clinical Entry Criteria:**
- Ankle/foot pain ≥4 weeks
- Functional limitation (walking, stairs, weight-bearing)
- Clinical exam or imaging consistent with diagnosis
- Age 18–80 years
- No red flags (DVT, fracture, acute compartment syndrome, Charcot foot)

### 9.2 Condition-Specific Intake Questions

1. **Pain Location & Onset**
   - "Where is the pain? Bottom of foot (plantar fasciitis), back of heel (Achilles), ankle joint itself, or top of foot?"
   - "Did it start from an injury or activity, or gradually?"

2. **Weight-Bearing Tolerance**
   - "Can you walk? How far before pain?"
   - "Can you climb stairs?"
   - "Can you put full weight on the foot or do you limp?"
   - *Use to establish baseline functional status*

3. **First-Step Pain (Plantar Fasciitis Specific)**
   - "Is the pain worse when you first get out of bed in the morning?"
   - "Does it improve as you walk, or get worse?"
   - *Trigger: Yes to both = classic PF*

4. **Instability (Chronic Ankle Sprains)**
   - "Does your ankle feel unstable or 'wobbly'?"
   - "Have you had prior ankle sprains?"
   - "Does your ankle give way when walking on uneven ground?"

5. **Achilles-Specific Questions**
   - "Is the pain in the back of your heel, especially during walking or climbing stairs?"
   - "Any tightness in your calf?"
   - "Pain worse in the morning or after activity?"

6. **Footwear & Activity**
   - "What type of shoes do you usually wear?"
   - "Have you changed activity level recently?"
   - "What activities make it worse?"

### 9.3 Red Flag Screening — Ankle/Foot-Specific

#### **RED FLAG 1: Deep Vein Thrombosis (DVT)**

**Screening Questions:**
- "Is only one ankle/foot swollen (not both)?"
- "Is your calf tender or red?"
- "Recent surgery, immobilization, or long flight/car ride?"
- "Birth control or clotting disorder?"

**Example Patient Utterances:**
- "My left ankle and calf are swollen and tender; the right side is normal."
- "I was in a cast for my ankle fracture; now my calf is huge."

**Escalation:** URGENT — Refer to ED for compression ultrasound. Do NOT massage. Do NOT apply heat. Elevate. This is a PE risk.

---

#### **RED FLAG 2: Fracture**

**Screening Questions:**
- "Did the pain start after a fall or twisting injury?"
- "Can you walk or put weight on your foot?"
- "Severe swelling that came on quickly?"

**Example Patient Utterances:**
- "I twisted my ankle; it swelled immediately and I can't walk on it."

**Escalation:** URGENT — Refer to ED for X-rays (AP, lateral, mortise views for ankle; foot views for foot fractures). Use Ottawa Ankle Rules if available.

---

#### **RED FLAG 3: Acute Compartment Syndrome (Post-Trauma)**

**Screening Questions:**
- "Recent crush injury to foot or lower leg?"
- "Severe pain out of proportion to the visible injury?"
- "Increasing numbness in toes despite ice and elevation?"
- "Foot pale or cold?"

**Escalation:** EMERGENCY — Refer to ED immediately. Fasciotomy may be needed.

---

#### **RED FLAG 4: Charcot Foot (Diabetics)**

**Screening Questions (if patient has diabetes or neuropathy):**
- "Have you noticed swelling in your foot that came on gradually?"
- "Any change in the shape of your foot?"
- "Significant foot pain with little or no nerve sensation?"
- "Redness or warmth in the foot?"
- "History of foot ulcers?"

**Example Patient Utterances:**
- "I'm diabetic; my foot is swollen and shaped differently now."
- "I have numbness in my feet but my foot is hot and swollen."

**Escalation:** URGENT — Refer to endocrinology or podiatry. Charcot foot requires specialized offloading and management to prevent progression and ulceration.

---

### 9.4 Required PROMs at Baseline

**Note:** ACCESS does not specify a site-specific ankle/foot PROM. Use PROMIS PF as primary outcome measure.

| Instrument | Purpose | MCID |
|------------|---------|------|
| **PROMIS PF** | Universal physical function (primary) | 3–5 points |
| **PROMIS PI** | Universal pain intensity | 1 point |
| **NRS 0–10** | Pain rating | 2 points |
| **Timed Up and Go (TUG)** | Functional mobility (optional) | 1.7 seconds improvement |

---

## 10. Multi-Site Pain Protocol

### 10.1 Patient Presentation with ≥2 Qualifying Body Regions

**Definition:** Patient reports pain in multiple distinct anatomical sites, each meeting ACCESS eligibility criteria independently.

**Enrollment Approach:**

1. **Identify All Qualifying Regions**
   - Ask about pain in all 8 body regions during comprehensive intake
   - Record pain severity (NRS) and functional impact for each

2. **Designate PRIMARY Site**
   - Primary site = region with highest functional limitation or pain severity
   - This is the site for which KIMI program is tailored
   - Primary site determines which site-specific PROM is used (ODI for back, KOOS-Jr for knee, etc.)

3. **Secondary / Tertiary Sites**
   - Up to 2 additional sites can be monitored (non-primary)
   - For secondary sites, use PROMIS PF (universal) to track function
   - Do NOT use site-specific PROMs for secondary sites to avoid assessment burden

4. **Nociplastic Pain Screening Trigger**
   - **If patient endorses pain in ≥4 body regions:** Trigger nociplastic pain protocol
   - Administer Central Sensitization Inventory (CSI) or Widespread Pain Index (WPI)
   - Consider referral for cognitive-behavioral or mind-body intervention within KIMI program
   - *Rationale:* Polyregional pain suggests centralized pain processing rather than isolated joint/tissue pathology

### 10.2 Reporting Multiple Sites

**ACCESS MSK Track Reporting:**
- Report only PRIMARY site in ACCESS outcome reporting (maintains data integrity)
- Document secondary sites in clinical note for reference
- If secondary site improves substantially during treatment, consider "site transition" at 12-week review for second enrollment period

### 10.3 Treatment Prioritization

- **Weeks 1–6:** Focus exclusively on PRIMARY site
- **Weeks 7–12:** If primary site improving, introduce targeted intervention for most bothersome secondary site
- Do NOT attempt equal attention to all regions; this leads to program failure

---

## 11. Red Flag Escalation Decision Matrix

### Escalation Tiers & Time-to-Action Requirements

| RED FLAG CATEGORY | Escalation Tier | Time-to-Action | KIMI Agent Communication Script |
|---|---|---|---|
| **Cauda Equina Syndrome** | EMERGENCY | Immediate (call 911) | "I need you to go to the emergency room immediately. You may have a serious spinal condition that requires emergency evaluation. Call 911 or have someone drive you to the nearest ED right now. Do not wait." |
| **Vertebral Artery Dissection** | EMERGENCY | Immediate (911) | "The symptoms you're describing could indicate a serious blood vessel problem in your neck. This is a stroke risk. Please go to the emergency room immediately or call 911." |
| **Acute Compartment Syndrome** | EMERGENCY | Immediate (911) | "You may have a serious condition called compartment syndrome that requires emergency surgery. Go to the ED or call 911 immediately. This is time-critical." |
| **Vascular Compromise** | EMERGENCY | Immediate (911) | "Your hand/foot is not getting enough blood flow. This is a surgical emergency. Go to the ED immediately or call 911." |
| **Suspected Cardiac Pain** | EMERGENCY | Immediate (911) | "The pain you're describing could be related to your heart. Call 911 or go to the emergency room immediately. Do not drive yourself." |
| **Spinal Fracture (acute trauma, >50 yo, steroid use)** | URGENT | Within 24 hours to ED | "Based on your injury and medical history, you may have a broken bone in your back. You need to go to the ER today or tomorrow for X-rays to make sure you don't have a fracture." |
| **Spinal Infection (fever + recent procedure)** | URGENT | Within 24 hours to ED | "You may have an infection in your spine. Given your fever and recent procedure, you need to go to the emergency room or see your doctor today for blood tests and imaging." |
| **Septic Arthritis (hot, red, swollen joint + fever)** | URGENT | Within 6–12 hours to ED | "Your joint may be infected. The swelling, heat, and fever you're describing need urgent evaluation. Go to the ER today." |
| **Deep Vein Thrombosis (unilateral leg swelling)** | URGENT | Within 24 hours to ED | "You may have a blood clot in your leg. You need to go to the ER today for ultrasound. Do not massage or apply heat to your leg. Keep it elevated." |
| **Hip Fracture (elderly, fall + unable to bear weight)** | URGENT | Within 24 hours to ED/Orthopedics | "You may have broken your hip. You need to go to the ER today for X-rays and evaluation by an orthopedic doctor." |
| **Cervical Myelopathy (hand clumsiness + gait disturbance)** | URGENT | Within 24–48 hours to Spine Specialist | "You need to see a spine specialist urgently. The symptoms you're describing suggest your spinal cord may be compressed in your neck. Please call your doctor today or go to urgent care for a referral." |
| **Progressive Nerve Compression (progressive weakness, atrophy)** | URGENT | Within 48 hours to Neurology | "Your symptoms suggest a nerve compression that may need surgery if it's getting worse. You need to see a neurologist within the next couple of days. Contact your doctor for an urgent referral." |
| **Acute Rotator Cuff Tear (sudden weakness post-injury)** | URGENT | Within 1–2 weeks to Orthopedics | "You may have torn a major tendon in your shoulder. You should see an orthopedic surgeon within the next 1–2 weeks. Ask your doctor for a referral." |
| **Avascular Necrosis (steroid history + sudden hip pain)** | URGENT | Within 1 week to Hip Specialist | "Your symptoms are concerning for a serious hip condition called avascular necrosis. You need to see an orthopedic surgeon within the next week for MRI and evaluation." |
| **Charcot Foot (diabetic neuropathy + swelling/shape change)** | URGENT | Within 1 week to Endocrinology/Podiatry | "You need specialized care for your foot. See your endocrinologist or podiatrist within the next week to prevent serious complications." |
| **Malignancy (cancer history + unexplained weight loss + night pain)** | CLINICAL REVIEW | Within 1–2 weeks to Primary Care | "Given your cancer history and symptoms, your doctor should evaluate you within the next 1–2 weeks. Please call your oncologist or primary care doctor to schedule a visit." |
| **Infection Risk (immunosuppressed + fever + pain)** | CLINICAL REVIEW | Within 48 hours to Primary Care / ID | "You need to see your doctor or an infectious disease specialist in the next 1–2 days to rule out infection." |
| **Nociplastic Pain (pain in ≥4 body regions)** | CLINICAL REVIEW | Within 2–4 weeks to Program Lead | "Your pain pattern suggests we may need to adjust how we approach your treatment. We'll discuss this with our care team and may recommend additional support." |
| **Uncertain Red Flag Presentation** | CLINICAL REVIEW | Within 24–48 hours to Clinical Reviewer | "I want to make sure we're not missing anything important. Let me have our clinical team review your case, and we'll get back to you within 24 hours with next steps." |

### Critical Escalation Language for KIMI Agents

**For EMERGENCY (Immediate, 911):**
- "This is a medical emergency. Please call 911 or go to the nearest emergency room right now."
- "Do not wait. Do not drive yourself if you're experiencing chest pain or weakness."
- "This is time-critical. Emergency room evaluation needed immediately."

**For URGENT (Within 24 hours):**
- "You need to be evaluated by a doctor [or specialist] as soon as possible — ideally today or tomorrow."
- "This needs imaging or blood work that I can't do over the phone. Go to the ER today."
- "Do not start the KIMI program until [specialist] has evaluated you."

**For CLINICAL REVIEW (Within 1–2 weeks):**
- "I want to check with our clinical team about your case before we proceed. We'll follow up with you within 24 hours."
- "Your symptoms need a more thorough evaluation. We may need to adjust our approach or get input from a specialist."
- "This is not an emergency, but we want to make sure we're treating the right condition."

---

## 12. Quick Reference: Red Flag Screening Checklist by Body Region

### Lower Back
- [ ] Bilateral leg weakness / numbness / saddle anesthesia / bladder-bowel dysfunction → **CAUDA EQUINA** (EMERGENCY)
- [ ] Trauma + age >50 / osteoporosis / steroids + pain waking at night → **FRACTURE** (URGENT)
- [ ] Cancer history / weight loss >10 lbs / night pain → **MALIGNANCY** (CLINICAL REVIEW)
- [ ] Fever + recent procedure / IV drug use → **INFECTION** (URGENT)
- [ ] Age >60 + pulsatile abdominal mass + cardiovascular risk → **AAA** (EMERGENCY)

### Neck
- [ ] Hand clumsiness / gait disturbance / Lhermitte's → **MYELOPATHY** (URGENT)
- [ ] Severe new headache + neck pain + recent manipulation + vision changes → **VAD** (EMERGENCY)
- [ ] Hyperreflexia / clonus / Babinski → **UMN SIGNS** (URGENT)

### Knee
- [ ] Hot / red / swollen / fever / unable to bear weight → **SEPTIC ARTHRITIS** (EMERGENCY)
- [ ] Unilateral calf swelling + tender + birth control / recent surgery → **DVT** (URGENT)
- [ ] Trauma + severe swelling / inability to bear weight → **FRACTURE** (URGENT)

### Hip
- [ ] Long-term steroids / alcohol / sickle cell + sudden severe pain → **AVN** (URGENT)
- [ ] Hot / red / swollen / fever / unable to move → **SEPTIC ARTHRITIS** (EMERGENCY)
- [ ] Fall + age >65 + unable to walk + shortened/externally rotated leg → **HIP FRACTURE** (URGENT)

### Shoulder
- [ ] Pop + sudden weakness + can't lift arm → **ROTATOR CUFF TEAR** (URGENT)
- [ ] Chest tightness / SOB + left shoulder + cardiac risk factors → **CARDIAC** (EMERGENCY)
- [ ] Cancer history + progressive pain + night pain + mass → **TUMOR** (CLINICAL REVIEW)

### Elbow
- [ ] Hot / red / swollen + fever → **SEPTIC ARTHRITIS** (URGENT)
- [ ] Trauma + inability to extend → **FRACTURE** (URGENT)
- [ ] Progressive pinky/ring numbness + atrophy → **CUBITAL TUNNEL** (URGENT)

### Wrist/Hand
- [ ] Crush injury + severe pain + numb toes + can't move fingers → **COMPARTMENT SYN.** (EMERGENCY)
- [ ] Pale / blue / cold / no pulse post-trauma → **VASCULAR** (EMERGENCY)
- [ ] Rapid thenar atrophy + weakness → **NERVE COMPRESSION** (URGENT)

### Ankle/Foot
- [ ] Unilateral swelling + tender calf + recent surgery → **DVT** (URGENT)
- [ ] Trauma + severe swelling / inability to walk → **FRACTURE** (URGENT)
- [ ] Crush injury + severe pain + numbness → **COMPARTMENT SYN.** (EMERGENCY)
- [ ] Diabetic + foot swelling + shape change + redness → **CHARCOT FOOT** (URGENT)

---

## 13. Integration with KIMI Decision Tree (Step 5)

This document supports **Step 5: Clinical Eligibility Assessment** in KIMI's intake decision tree. After KIMI agent:
1. Confirms patient meets basic criteria (chronic MSK pain ≥4 weeks)
2. Identifies primary body region
3. **[THIS DOCUMENT — Step 5]** Performs region-specific intake + red flag screening
4. If red flag triggered: escalate per decision matrix; do NOT proceed to enrollment
5. If no red flags + patient eligible: proceed to Step 6 (PROM administration)
6. After baseline PROMs complete: enroll in KIMI program; assign to appropriate track (self-managed vs. supervised)

---

**Document Version Control:**
- v1.0 | 2026-04-03 | Initial creation for 8-region ACCESS MSK Track
- Estimated size: 1,680 lines
- Intended for RAG retrieval: Each section designed as independent clinical module
- Update frequency: Quarterly review per ACCESS MSK protocol updates

---

**End of KB_Intake_Condition_Protocols.md**
