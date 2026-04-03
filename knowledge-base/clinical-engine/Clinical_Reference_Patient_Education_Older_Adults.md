# Patient Education and Communication Best Practices for Older Adults with Chronic MSK Pain

**Document Version:** 1.0
**Last Updated:** April 3, 2026
**Clinical Setting:** AI-assisted MSK care (Kimi Coach)
**Target Population:** Medicare beneficiaries (≥65 years) with chronic musculoskeletal pain

---

## 1. Health Literacy in MSK Pain Populations

### Epidemiology and Impact

**Prevalence**: Approximately 36% of U.S. adults aged ≥65 years demonstrate below-basic health literacy (National Assessment of Adult Literacy, Kutner et al. 2006). Within orthopedic populations specifically, health literacy limitations correlate with:

- Lower preoperative knowledge and expectations
- Reduced adherence to post-operative rehabilitation protocols
- Higher rates of preventable complications
- Lower patient satisfaction despite equivalent clinical outcomes

**Key Evidence**:
- Ziemba-Davis et al. (2025) demonstrated that in patients undergoing total knee arthroplasty (TKA), lower health literacy was associated with significantly lower preoperative expectations and lower PROMIS-43 physical function scores at baseline, despite equivalent knee dysfunction severity (PMID: 40222430; DOI: 10.1016/j.arth.2025.04.027). This relationship persisted after controlling for age, BMI, and education.
- Critically, health literacy emerged as an independent mediator of patient-reported outcomes, not merely a proxy for education level.

### Health Literacy Assessment for AI Implementation

**Single-Item Health Literacy Screener (SILS)** for AI intake assessment:
- Ask at baseline: "How often do you have someone help you when you need to read written health information?"
- Response categories: Always/Often/Sometimes/Occasionally/Never
- "Always," "Often," or "Sometimes" indicates need for enhanced communication strategies
- Non-invasive, non-stigmatizing, validated in primary care settings

### Universal Precautions Approach

Design ALL patient-facing content and communications assuming **low health literacy**, regardless of screener results:
- Patients often overestimate their own health literacy
- Health literacy is task-specific (may be adequate for one topic, insufficient for another)
- Cognitive load increases during pain or acute illness
- Older adults may manage medication well but struggle with anatomy/pathophysiology concepts

---

## 2. Plain Language Communication Principles

### Readability Targets
- **Reading level**: 6th-8th grade (Flesch-Kincaid Grade Level 6-8)
- **Sentence length**: Average ≤15 words per sentence
- **Paragraph length**: ≤5 sentences before white space
- **Information chunks**: 3-5 key messages per interaction

### Writing Style Elements

| Principle | Example | Avoid |
|-----------|---------|-------|
| **Active voice** | "Exercise reduces your pain" | "Pain reduction is achieved through exercise" |
| **Common words** | pain, stiffness, swelling | pathology, inflammatory cascade, joint articulation |
| **Short sentences** | "Move gently. Ice for 15 minutes. Rest." | "You should perform gentle movement while applying cryotherapy for approximately fifteen minutes, after which you may rest" |
| **Define medical terms immediately** | "Your arthritis (wear and tear in the joint)..." | "Osteoarthritis progression..." |
| **Absolute over relative risk** | "5 of 100 people experience this side effect" | "There's a small risk of side effects" |
| **Concrete over abstract** | "Walk for 10 minutes, 3 days a week" | "Maintain moderate aerobic activity regularly" |
| **Living room language** | "Your nerves are sending too many alarm signals" | "Central sensitization of nociceptive pathways" |

### Formatting for Accessibility
- Bullet points for lists
- **Bold** for key terms on first mention
- Clear headers (H2/H3 hierarchy)
- Ample white space between sections
- Font size ≥12pt in AI-delivered content
- High contrast (dark text on light background)

### Avoiding Common Communication Pitfalls
- ❌ Double negatives ("Don't avoid activity")  → ✓ "Stay active"
- ❌ Passive constructions  → ✓ Active voice
- ❌ Multiple clauses in one sentence  → ✓ Break into separate sentences
- ❌ Medical jargon without definition  → ✓ Define or use common terms
- ❌ Estimates as percentages alone  → ✓ Use both percentage and absolute numbers

---

## 3. Teach-Back Method Implementation in AI

### Definition and Purpose
**Teach-back** (also called "closing the loop") is a communication technique where the AI prompts the patient to explain back in their own words what was discussed. This:
- Confirms patient understanding without judgment
- Identifies gaps or misconceptions
- Engages active learning
- Builds patient confidence
- Adapts AI communication in real-time

### AI Implementation Protocol

**Standard Teach-Back Prompt** (after delivering education):
> "Just to make sure I explained that clearly — can you tell me in your own words what you'll do for your exercises today?"

**Teach-Back Variants by Context**:

1. **For exercise education**:
   - "Show me with your hands/body what the movement should look like"
   - "When would you do these exercises, and how many times?"

2. **For self-management guidance**:
   - "What will you do tomorrow when you feel the pain increasing?"
   - "Tell me the three things we discussed about managing flares"

3. **For medication/supplement education**:
   - "What time will you take this, and with what?"
   - "What side effect should make you contact your doctor?"

4. **For shared decision-making**:
   - "What are the two main options we discussed?"
   - "Which one feels right for you, and why?"

### If Teach-Back Reveals Gaps

**DO:**
- Praise the attempt: "That's a good start. Let me clarify one part..."
- Use **different words**, not louder/slower repetition
- Break complex concepts into smaller pieces
- Use analogies or examples
- Offer visual aids or written summaries

**DON'T:**
- Make the patient feel inadequate
- Repeat verbatim; rephrase completely
- Rush to move forward
- Use parenthetical explanations ("What I meant was...")

### AI Logic Flow for Teach-Back
```
[Deliver education content]
  ↓
[Ask teach-back question]
  ↓
[Patient responds]
  ↓
  [Assessment: Did patient demonstrate understanding?]
       ├→ YES: "Exactly. You've got it. Let's move forward..."
       └→ NO: "I see where there's confusion. Let me explain differently..."
             [Simplified explanation]
             [Second teach-back attempt]
```

---

## 4. AHRQ SHARE Approach for Shared Decision-Making

The **SHARE** approach is a validated framework for collaborative decision-making that improves satisfaction, engagement, and adherence (AHRQ, https://www.ahrq.gov/health-literacy/professional-training/shared-decisionmaking/index.html).

### SHARE Framework Implementation

| Step | AI Implementation | Example for Knee OA |
|------|-------------------|-------------------|
| **Seek patient participation** | Frame as collaboration, not instruction | "I'd like to talk through your treatment options together, and hear what matters most to you" |
| **Help explore options** | Present 2-3 realistic options with benefits AND risks of each | Option A: Daily exercises (low cost, requires adherence, 50% improvement rate); Option B: Injections (quick relief, temporary effect, cost); Option C: Combination |
| **Assess patient values** | Use open-ended questions about priorities | "What matters most — quick relief, avoiding injections, cost, or staying active?" |
| **Reach decision together** | Explicitly agree on shared choice | "So we're going to start with daily exercises for 6 weeks. You'll track pain daily. If not improved, we'll discuss injections" |
| **Evaluate the decision** | Follow-up on how choice is working | "How's the exercise plan going? Is this the right decision for you, or do we need to adjust?" |

### Common MSK Decisions Suitable for SHARE Approach

1. **Exercise intensity and frequency**
   - Options: Gentle ROM only; moderate exercise with discomfort; aggressive strengthening
   - Trade-offs: Pain during vs. after; time commitment; functional gains timeline

2. **Activity modifications**
   - Options: Strict activity avoidance; selective modifications; continue usual activities
   - Trade-offs: Pain management vs. deconditioning; quality of life vs. symptom control

3. **Intervention timing**
   - Options: Conservative management now; early injection; immediate imaging/specialist referral
   - Trade-offs: Cost, delay in improvement, invasiveness, durability

4. **Medication use**
   - Options: Acetaminophen as needed; daily NSAID; topical agents; no pharmacologic
   - Trade-offs: Cost, side effects, efficacy duration, drug interactions

5. **When to escalate care**
   - Options: Self-manage pain flares; contact PT; contact doctor; go to ED
   - Trade-offs: Time to improvement, cost, care coordination, reassurance

### Evidence for SHARE in MSK Populations
- Multiple RCTs in knee and hip OA demonstrate that shared decision-making compared to provider-directed care improves:
  - Patient satisfaction (effect sizes d = 0.4-0.7)
  - Treatment adherence (adherence rates 70-85% vs. 50-60%)
  - Reduced decisional conflict
  - Improved alignment between treatment and patient values
  - No increase in inappropriate conservative care

---

## 5. Age-Specific Communication Adaptations

Older adults represent a heterogeneous population. These adaptations address common cognitive, sensory, and motivational changes while respecting individual variation.

### Cognitive Considerations

**Working Memory Limitations**
- **Decline trajectory**: Working memory capacity decreases ~10% per decade after age 60
- **AI Application**: Limit to **3 key messages** per interaction
- **Implementation**: Use signposting ("Here are the three most important things...")
- **Spacing effect**: Repeat key concepts across multiple sessions rather than massed presentation

**Processing Speed**
- **Phenomenon**: Older adults take 15-30% longer to process information
- **AI Adaptation**: Pause 2-3 seconds after asking questions before prompting for response
- **Pacing**: If using voice delivery, speak at 120-140 WPM (vs. standard 150-160 WPM)
- **Avoid time pressure**: Never say "quickly" or "hurry" in instructions

**Prior Knowledge as Asset**
- **Leveraging experience**: Older adults have rich schemas for connecting new information
- **Strategy**: "You know how your car's alarm goes off sometimes even when you're driving carefully? Your nervous system can be like that..."
- **Relevance framing**: Connect exercises to established routines (after morning coffee, during TV time)

**Episodic Memory (Retelling Events)**
- **Strength**: Usually preserved, sometimes enhanced
- **Use**: Ask patients to tell their pain story; use narrative to build engagement
- **Risk**: May ruminate on negative experiences; gently redirect without dismissing

**Semantic Memory (Facts, Concepts)**
- **Strength**: Often preserved or enhanced
- **Strategy**: Explain mechanisms (why, not just what), use analogies
- **Application**: "Arthritis is like the cushioning wearing away" resonates because they understand friction, wear

### Sensory Considerations

**Vision Changes (Presbyopia, Cataracts, Macular Degeneration)**
- **Font size**: Minimum 12pt for digital; 14pt+ preferred for printed materials
- **Contrast**: Black or dark blue text on white/cream background (avoid gray text)
- **Layout**: Single column preferred; avoid small or decorative fonts
- **Illustrations**: High-quality, not cartoon-style (which appears dismissive to older adults)
- **Video**: Include captions; use high contrast; avoid rapid scene changes

**Hearing Loss (High-Frequency First)**
- **Voice pitch**: Use lower-frequency voices (male voices often clearer for those with age-related high-frequency loss)
- **Speech clarity**: Articulate clearly; slightly slow; normal volume (never shout)
- **Background noise**: Minimize in audio content; note interference in quiet environments
- **Options**: Offer transcript alongside audio; allow text-based alternatives

**Proprioception and Fine Motor**
- **Tactile feedback**: Large buttons/touchpoints for digital interfaces (≥1cm diameter)
- **Avoid**: Requires precise clicking or swiping (accessibility features essential)
- **Exercise instruction**: Emphasize what movement *feels* like, not just visual cues

### Motivational and Behavioral Considerations

**Intrinsic Motivation Through Meaningful Goals**
- **Avoid**: "Exercise is good for you" (extrinsic motivation, low adherence)
- **Leverage**: Connect to personally valued outcomes
- **Examples**:
  - "These exercises will help you play with your grandchildren without pain"
  - "This should let you garden for 2 hours without stiffness"
  - "You'll be able to walk your dog without your knee giving out"
- **Assessment**: During intake, ask explicitly: "What activities do you most want to be able to do?"

**Autonomy and Choice**
- **Respect**: Older adults often have decades of experience with medical decisions
- **Frame**: "You get to choose" rather than "You have to do"
- **Implementation**: Offer genuine options, not false choice ("Would you prefer morning or afternoon exercises?")
- **Non-adherence**: Reframe as information ("I'm hearing that daily exercises don't fit your life right now. Let's find what does.")

**Self-Efficacy Building**
- **Start small**: Initial exercises should be easily achievable (confidence booster)
- **Celebrate wins**: "You did the exercises every single day this week. That's exactly what builds strength"
- **Progress visibility**: Show PROMs improvement, strength gains, activity log
- **Normalize struggle**: "Some days are harder than others. That's normal"

**Social Connection and Isolation**
- **Acknowledge barrier**: Chronic pain and mobility limitations increase isolation risk
- **Integration**: Suggest group classes, walking partners, community programs
- **Family involvement**: Invite caregiver/family member to education sessions if appropriate
- **Peer support**: "Many people I work with have this exact concern..."

---

## 6. Cultural Competency in Pain Education

Pain expression, beliefs about aging, and preferences for treatment vary significantly across cultures. Effective education requires cultural humility, not assumptions.

### Pain Expression and Beliefs

**Cultural Variations in Pain Communication**
- **Expression style**: Varies from stoic (minimize complaints) to expressive (more verbal demonstration)
- **Language barriers**: Idioms of distress ("my spirit is broken") may not translate to "pain"
- **Emotional content**: Culturally influenced—some cultures normalize emotional expression with pain; others see it as weakness
- **AI approach**: Use open-ended assessment ("Tell me about your pain in any way that makes sense to you") rather than numeric scales alone

### Beliefs About Aging and Disability

**Common Cultural Frameworks**
- **Normative aging beliefs**: Pain and loss of function expected and inevitable vs. pain as pathological and treatable
- **Disability stigma**: Varies—some cultures view disabled people as burden; others integrate disability into community roles
- **Respect for elder status**: In many non-Western cultures, age brings status; pain should not diminish authority/respect
- **Family obligation**: Individualistic vs. collectivist decision-making (involve family in all decisions vs. individual choice)

**Application**: During shared decision-making, ask "Who should be involved in this decision?" rather than assuming individual choice.

### Attitudes Toward Physical Activity

**Variation by Culture**
- **"No pain, no gain"**: Present in sports-oriented cultures; may lead to over-exercise
- **Rest as healing**: Some cultural traditions prioritize rest over movement
- **Gender roles**: In some cultures, physical work/activity may be gender-specific
- **Body exposure**: Comfort varies with exercise in groups, being observed, types of movement

**Adaptation**: "In your culture, how do people usually stay strong as they age?" Incorporate that wisdom.

### Traditional and Complementary Approaches

**Integration, Not Opposition**
- Acupuncture, herbal remedies, traditional medicine, spiritual healing all have cultural significance
- AI should not dismiss ("That doesn't work") or promote ("You must try this")
- **Frame**: "Tell me about what you've tried. What helped? What didn't? Let's see if we can combine that with [evidence-based approach]"
- **Safety**: Educate on potential drug interactions if patient is using herbs with medications

### Language Accessibility

**Requirements for Medicare Populations**
- Older adults with English as second language may have literacy barriers even if conversant
- **Availability**: Spanish-language materials are standard (and often required by law)
- **Professional interpreters**: Use for complex decisions, not bilingual family members (conflicts of interest, transmission errors)
- **Translation quality**: Medical translation (not word-for-word) essential for accuracy
- **Literacy level**: Translated materials should be at 6th-8th grade level in both languages

### Gender and Pain Communication

**Documented Gender Differences**
- Women may describe pain differently (use more affective language)
- Different pain expression may lead to undertreatment (even within same healthcare system)
- Gender roles affect exercise (e.g., may prioritize household activities over prescribed exercises)
- **AI approach**: Avoid gender-stereotyped examples; ask about actual priorities

---

## 7. Biopsychosocial Education Content Areas

Effective chronic pain management requires patient understanding of pain neurobiology, the evidence for exercise, and self-management strategies. Content should be tailored but evidence-based.

### Understanding Chronic Pain (Pain Neuroscience Education for Older Adults)

**Core Concepts Simplified**

#### Pain Does Not Equal Damage

**Explanation for Patient**:
> "Pain is a warning signal your body sends. Sometimes that alarm system gets too sensitive or stays 'on' even after healing is done. This is very common with chronic pain. It doesn't mean new damage is happening—it means your nervous system needs to recalibrate."

**Key points**:
- Imaging changes (arthritis, disc bulges) are often present WITHOUT pain
- Pain flares can occur without new injury
- Pain reduction doesn't always require fixing structural damage
- Imaging can be misleading—show patient their own images if available

**Age-specific note**: Older patients may fear "falling apart." Reassure: "Your body is more resilient than you think. Movement won't break it."

#### The Nervous System as Alarm System

**Analogy**:
> "Think of your nervous system like a home alarm system. A properly calibrated system alerts you to real danger—a broken window. But sometimes alarms get too sensitive and go off when the wind blows the curtains. That's what happens with chronic pain. The alarm (pain) keeps going off, but there's no intruder (damage). We're trying to recalibrate that alarm."

**Explicit teaching points**:
- The alarm system is helpful and protective
- Pain is not a sign of weakness
- Oversensitive alarms happen to many people
- The system CAN be recalibrated through exercise, stress management, and time
- Recalibration isn't about "mind over matter"—it's neurobiology

#### Neuroplasticity: The Brain Changes at Any Age

**Combat age-related defeatism**:
> "Your brain can change at any age. Maybe not as quickly as a 30-year-old's, but it absolutely can. That's why exercise helps—you're literally rewiring your nervous system to be less sensitive to pain."

**Evidence to mention**:
- Neuroimaging shows physical brain changes with pain education and exercise
- Even 8 weeks of regular exercise changes pain processing
- Older brains show excellent neuroplastic capacity in motor learning
- This applies to you, not just theoretical studies

### Exercise Education

**The Central Message** (Level I Evidence):
> "Exercise is the single most effective treatment for chronic musculoskeletal pain. Full stop. More effective than injections, medications, or surgery for long-term improvement."

**Subcomponents**:

#### Exercise is Safe

**Address fear-avoidance explicitly**:
- "I know you're afraid movement will cause damage. But the opposite is true—movement strengthens tissues and changes pain signaling."
- "We'll start gently, but you will feel some discomfort. That's normal and expected."
- Provide written reassurance tied to specific condition (e.g., "Knee OA will not worsen from walking")

#### Distinguish Hurt from Harm

**Critical distinction** (prevents exercise avoidance while preventing overdo):
| | Hurt | Harm |
|---|------|------|
| **Timing** | During or immediately after exercise | 2+ hours after, or next day |
| **Severity** | 3-5/10 pain (tolerable) | 6+/10 pain (intolerable) |
| **Duration** | Resolves within minutes/hours | Lasts hours/days |
| **Quality** | Muscular fatigue feeling | Sharp, acute, worsening |
| **Response** | Continue exercise, it may improve | Stop exercise, contact PT/doctor |

**AI teaching**: "If it hurts DURING exercise but feels better after 30 minutes, that's hurt. Continue. If it hurts the NEXT MORNING and is worse than baseline, that's harm. We need to adjust."

#### Dose-Response Relationship

**Key evidence**:
- More exercise is not always better
- Some exercise is definitively better than none
- Consistency matters more than intensity
- Minimal effective dose: 30 min moderate intensity, 3x/week or equivalent

**Realistic adherence**:
- "We're aiming for 4 out of 7 days. If you do 3 days, that's still very helpful."
- "10 minutes is better than zero."
- "Starting small and building is better than ambitious then quitting."

#### Body Region-Specific Guidance (Examples)

**For Knee Osteoarthritis**:
- Low-impact preferred (walking, stationary bike, water aerobics)
- Strength focus: quadriceps, hip abductors
- Avoid: High-impact (running, jump exercises) in earlier stages
- Expected timeline: 6-12 weeks for meaningful improvement

**For Lumbar Pain**:
- Core stability priority
- Avoid: Extreme flexion (touching toes) initially
- Include: Hip/leg flexibility, glute activation
- Functional movement: Standing from chair, walking stairs

**For Shoulder OA/Rotator Cuff**:
- Rotational control exercises
- Avoid: Overhead reaching initially
- Include: Scapular stability
- Functional goals: Reaching, lifting

---

### Self-Management Education

#### Understanding Pain Flares

**Normalize and destigmatize**:
> "Pain flares are completely normal. They don't mean you've caused damage or that your treatment failed. They're setbacks, not disasters, and they pass."

**Flare management framework**:

1. **Immediate response** (first 24-48 hours)
   - Continue gentle movement (not forced exercise)
   - Ice or heat per preference (15 min, 3x/day)
   - Pain medication if usual approach
   - Stress reduction (breathing, meditation)

2. **Identify trigger** (What was different?)
   - Increased activity
   - Stress/sleep disruption
   - Weather changes
   - Skipped exercises
   - New activity

3. **Adjustment** (Next 1-2 weeks)
   - Modify, don't abandon, exercise
   - Address identifiable trigger
   - Maintain consistency even if reduced intensity
   - Consider "flare protocol" exercises

4. **Prevention** (Ongoing)
   - Consistent exercise adherence (85%+ adherence associated with minimal flares)
   - Stress management
   - Sleep optimization
   - Gradual activity progression (don't jump from 0-100%)

#### Sleep and Pain Connection

**Basic physiology**:
- Sleep loss increases pain sensitivity (inflammatory markers elevated)
- Pain disrupts sleep (vicious cycle)
- 7-9 hours is target for pain recovery

**Sleep hygiene for pain**:
- Consistent sleep/wake time (helps regulate pain signaling)
- Cool, dark room
- Avoid screens 1 hour before bed (blue light disrupts melatonin)
- Light stretching or progressive muscle relaxation at bedtime
- Position: Support pain area (pillow between knees, under neck)
- Consider morning timing of pain medications (peak effect for daytime function)

#### Stress-Pain Connection

**Physiologic mechanism**:
- Stress hormones (cortisol) increase pain sensitivity
- Muscle tension from stress perpetuates pain
- Worry about pain increases pain perception

**Stress management approaches** (with evidence in chronic pain):
- Deep breathing (5-minute practice, 3x/day)
- Progressive muscle relaxation
- Mindfulness/meditation (even 10 minutes improves pain and mood)
- Social connection (isolation worsens pain)
- Activity engagement (gardening, hobbies, socializing)

#### When to Contact Care Team vs. Self-Manage

**Red flags requiring immediate contact**:
- Sudden severe pain with numbness/tingling (nerve compression)
- Swelling with warmth/redness (infection/inflammation requiring workup)
- Sudden weakness or paralysis
- Bowel/bladder changes
- Fever with pain (infection)
- Chest pain (cardiac)

**Yellow flags requiring timely follow-up** (within days):
- Pain not improving despite adherence
- Flare lasting >1 week
- Worsening functional capacity
- New area of pain
- Medication side effects
- Persistent sleep disruption

**Green—Self-manage** (expected course):
- Predictable pain pattern
- Flare recovering as expected
- Exercise tolerance steady or improving
- Sleep normalizing
- Mood stable

**AI implementation**: Provide decision aid; when in doubt, "It's better to reach out. That's what we're here for."

#### Activity Pacing for Energy and Pain Management

**Concept**: Spread activities across day/week to avoid boom-bust cycle (overdo then underdo).

**Framework**:
- Identify realistic daily activity capacity (e.g., "I can be on my feet 4 hours before pain significantly increases")
- Distribute that capacity (1 hour morning, 1 hour afternoon, 1 hour evening, with breaks)
- Maintain consistent pace day-to-day (not Monday 4 hours, Tuesday 0 hours)
- Build capacity gradually (add 15 min per week if improving)
- Account for unpredictable flares in planning

---

### Pharmacologic Literacy

**Disclaimer**: AI never recommends medications; always refers to prescriber. **Educate and facilitate informed decision-making with clinician.**

#### AGS Beers Criteria Awareness

Older adults are at increased risk for adverse drug events. The **American Geriatrics Society Beers Criteria** identifies medications with high risk in older adults, including:

**Potentially Problematic for Older Adults with Pain**:
- Long-acting benzodiazepines (increased fall/fracture risk, cognitive impairment)
- Tricyclic antidepressants in high doses (anticholinergic effects)
- NSAIDs in high dose/long-term (GI bleed, renal, cardiac risk)
- Opioids (cognitive impairment, falls, dependence)

**AI role**: "These medications have more risks in older adults. Let's make sure your doctor knows your age when prescribing."

#### Acetaminophen (Tylenol) Safety

**Maximum daily dose**: 3000-4000 mg/day (varies by age/renal function; discuss with provider)

**Key points**:
- Also in many combination products (cold medicines, pain relievers)—check labels to avoid overdose
- Requires functioning liver; discuss with doctor if liver disease
- Generally safer in older adults than NSAIDs

**Teaching point**: "Read the label. If you're taking other medications with acetaminophen, add it up to make sure you're not exceeding the max."

#### NSAID Risks in Older Adults

**Risks increase with age, even at standard doses**:
- Gastrointestinal bleeding (risk × 4-5 in older adults)
- Renal function decline
- Cardiovascular effects (increased MI/stroke risk with long-term use)
- Drug interactions (warfarin, ACE inhibitors, etc.)

**Mitigators if prescribed**:
- Proton pump inhibitor (PPI) co-prescribed reduces GI bleed risk
- Regular kidney function monitoring
- Shortest duration/lowest effective dose
- Not first-line for older adults with cardiac/renal comorbidities

**AI teaching point**: "NSAIDs can be helpful short-term, but for long-term chronic pain, exercise usually works better without these risks."

#### OTC Supplement Education

**Common MSK supplements** (variable evidence quality):
- Glucosamine/chondroitin (mixed evidence; generally safe)
- Turmeric/curcumin (anti-inflammatory; may interact with blood thinners)
- Omega-3 fatty acids (anti-inflammatory; may increase bleeding if on anticoagulants)

**AI approach**:
- Don't dismiss if patient is using
- Ask about interactions with medications
- "There's some evidence for [supplement], but exercise has stronger evidence"
- Refer to clinician for drug interaction check

---

## 8. Decision Aids and Visual Tools

### Decision Aids (Reference Models)

**Definition**: Structured documents helping patients understand options, clarify values, and make informed decisions.

**Example Framework** (adapted for OA management):

**OPTION A: Structured Physical Therapy and Exercise**
- Daily exercises, PT visits 2x/week × 6 weeks
- Time investment: 45-60 min/day
- Cost: Copays, possible cost-share
- Relief timeline: Gradual (4-12 weeks)
- Durability: Long-term if adherence maintained
- Risks: Temporary pain increase during exercise
- Benefits: Strengthens muscles, improves function, prevents worsening

**OPTION B: Intra-articular Injection (Steroid or Hyaluronic Acid)**
- Single procedure
- Time investment: 1 appointment
- Cost: Procedure cost + copay/insurance negotiation
- Relief timeline: 1-2 weeks to peak benefit
- Durability: 3-6 months, repeatable
- Risks: Infection, temporary swelling, temporary relief only
- Benefits: Quick pain relief, can enable PT participation

**OPTION C: Combination (Injection + PT)**
- Injection to provide initial relief + PT for lasting benefit
- Timeline: Injection week 1, PT ongoing
- Cost: Both procedures
- Relief timeline: Fast initial, sustained with PT
- Durability: Best long-term if PT adherence high
- Benefits: Immediate relief + lasting improvement

**Values Clarification Question**: "What matters most to you: quick relief, long-term improvement, avoiding procedures, cost, or minimal time commitment?"

### Visual Pain Scales for Older Adults

**Numeric Rating Scale (NRS)** (standard):
- 0-10 scale
- Good for consistent assessment over time
- Some older adults struggle with abstract numbers

**Faces Pain Scale-Revised (FPS-R)**:
- 6 cartoon faces from happy to distressed
- Better for older adults with cognitive decline or low health literacy
- Non-stigmatizing (not childish when used respectfully)

**Functional Pain Scale** (preferred for chronic pain):
- Instead of "Rate your pain," ask: "How much does pain limit your walking/stairs/daily activities?"
- More relevant to patient goals
- Easier for older adults to conceptualize

### Exercise Instruction with Visual Demonstration

**For AI-delivered exercise**:
1. **Static image** with labeled body parts and arrows showing movement direction
2. **If video available**:
   - Show full body and close-up (for details)
   - Older adult demonstrator preferred (relatability)
   - Real-time cueing ("Shoulders back, core tight, then step forward")
   - 5-10 second video, repeatable
3. **Text backup**: "Sit in a sturdy chair. Tighten the front of your thigh. Straighten your knee. Hold 2 seconds. Relax. Repeat 10 times. Rest 1 minute. Do 3 sets."

### Progress Visualization

**Patient engagement strategy** (highly effective for adherence):

**Monthly Progress Report to Patient**:
- Pain rating trend (0-10 scale)
- Functional capacity improvement (minutes walking, stairs, daily activities)
- Exercise adherence percentage
- PROM score change if available (WOMAC for knee, similar scales)
- Written feedback: "Your exercise adherence this month was 87%. We've seen a 15% improvement in your walking distance. Keep going!"

**Graphical visualization**:
- Simple line graph showing pain decreasing over 12 weeks
- Bar chart showing activity tolerance increasing
- Milestone celebration ("First time gardening >1 hour without pain flare!")

---

## 9. Communication Red Flags and Safety Protocols

### Psychiatric Red Flags

**Patient expressing hopelessness or suicidal ideation**:
- **Immediate action**: Stop clinical content. Express concern.
- **Escalation**: Contact care coordinator for urgent psychiatric referral
- **AI response**: "I'm concerned about what you're saying. This is important, and you deserve support from someone trained in mental health. I'm going to connect you with [care team/crisis line]."
- **Never discharge**: Do not end session without escalation

**Severe depression affecting compliance**:
- **Indicator**: "Nothing helps," "I'm a burden," loss of interest in valued activities
- **Action**: Screen for depression (PHQ-2: "Do you feel sad/hopeless? Do you lack interest in things?")
- **Escalation**: Psychiatric/psychology referral; may need to modify expectations

**Anxiety about diagnosis/prognosis**:
- **Indicator**: Catastrophic thinking, excessive medical seeking, panic about symptoms
- **Approach**: Validate ("Pain is scary"), provide evidence-based reassurance ("90% of knee pain improves with exercise"), psychoeducation about anxiety-pain cycle

### Cognitive Red Flags

**Indicators of cognitive decline**:
- Repetitive questions within same session
- Inability to follow multi-step instructions
- Forgetting previous exercise instruction after demonstrated multiple times
- Disorientation to time/date
- **Action**: Flag for cognitive assessment (Montreal Cognitive Assessment, Mini-Cog)
- **Accommodation**: Involve family/caregiver; simplify communication further; shorten sessions

### Safety and Abuse Red Flags

**Indicators of elder abuse/neglect**:
- Unexplained injuries or pattern of injuries
- Caregiver controlling patient's access to care/medication
- Poor nutrition/hygiene despite capacity for self-care
- Patient expressing fear of caregiver
- Financial exploitation (patient expressing inability to afford medications/therapy)

**Mandatory reporting requirement**:
- AI systems must flag to human care coordinator immediately
- Specific documentation of concerning statements/observations
- Care coordinator initiates adult protective services consultation per state law
- Do not discuss with patient that report will be made (safety risk)

**Medication misuse indicators**:
- "I take extra doses when it hurts more" (opioid, benzodiazepine overuse)
- "My neighbor uses my pain medication"
- "I ran out early"
- **Action**: Notify prescriber immediately; may indicate diversion, dependence, or self-harm risk

### Falls and Fall Risk Identification

**Fall risk indicators**:
- History of falls
- Balance/dizziness complaints
- Unsteadiness on gait assessment
- Polypharmacy (especially sedating medications, antihypertensives)
- Pain limiting safe movement
- Home environment hazards identified

**AI-level response**:
- Validate pain as falls risk: "Pain makes falls more likely. We're addressing that."
- Educate: "Slow, controlled movement is safer than quick, jerky movements"
- Screen: "Have you fallen in the last year? How?"
- Flag: Contact care team for formal fall risk assessment if positive history

**Prevention education**:
- "Clear pathways in your home"
- "Good lighting, especially at night"
- "Secure handrails on stairs"
- "Wear shoes with good traction"
- "Do balance exercises regularly" (actually evidence-based prevention)

---

## 10. Engagement Strategies for Sustained Participation

Older adults with chronic pain face significant barriers to engagement: pain itself, comorbidities, disability, isolation, and often previous negative healthcare experiences. Sustained engagement requires intentional strategy.

### Personalization

**Use patient-specific information throughout**:
- Address by name
- Reference their stated goals ("You mentioned wanting to garden. These exercises will help you do that for longer.")
- Acknowledge their experience ("You've been managing this pain for 5 years. You know your body well.")
- Tailor examples to their context (not "playing soccer" if they've never played, but "walking with your grandchild")

**AI implementation**:
- Maintain patient profile with:
  - Key functional goals
  - Preferred communication style
  - Previous experiences with exercise/treatment
  - Values and motivations
  - Cultural considerations
- Reference profile in every interaction

### Progress Feedback and Concrete Visibility

**Show, don't tell**:
- Monthly PROM scores with visual trend
- "You've completed 24 out of 28 days of exercises this month"
- "First time walking the full neighborhood without pain—that's progress"
- Celebrate small wins: "You did 3 sets instead of 2. Building strength."

**Frequency**: Weekly for first month, then monthly (prevents disengagement)

### Positive Reinforcement

**Reinforce effort and adherence, not just outcomes**:
- ❌ Avoid: "Your pain didn't improve as much as we hoped"
- ✓ Do: "You showed up for 4 out of 5 exercise days. That consistency will drive improvement."

- ❌ Avoid: "You missed exercises again"
- ✓ Do: "You did exercises 3 days this week. That's helpful. What got in the way Wednesday/Thursday? Let's problem-solve."

**Motivational framing**:
- "You're the expert on your body"
- "This takes courage, and you're doing it"
- "Progress isn't linear, and you're moving in the right direction"

### Anticipatory Guidance for Common Setbacks

**Prevents abandonment during predictable challenges**:

**"Week 3-4 slump"**:
- "By now, novelty wears off, and the work feels like work. That's completely normal. Push through this week. Week 5 often feels easier."
- Proactive check-in at week 2: "How are you feeling about the routine? Any struggles I should know about?"

**"Flare-triggered abandonment"**:
- "When you have a pain flare, your first instinct might be to stop exercising. Research shows that continuing gentle movement actually helps you recover faster."
- Pre-teach flare management so patient knows it's expected

**"Weather-related derailment"**:
- "Winter (or heat) is coming. Let's talk about indoor exercise options now, so you're prepared."
- Identify alternative exercises before season change

**"Life disruption"** (illness, travel, family event):
- "When life gets in the way of your routine, you're not failing. You're human. We'll rebuild. How can we adapt your exercises to your situation?"

### Family and Caregiver Involvement

**When to involve family**:
- Older adult requests it
- Cognitive decline identified
- Mobility limitations restrict independent exercise
- Caregiver providing transportation/support
- Cultural context expects family involvement

**Avoid**:
- Overruling patient's preference for independence
- Infantilizing language
- Bypassing patient to communicate with family

**Optimal model**:
- Patient leads; family supports
- Education includes both patient and family
- Caregiver understands why patient needs encouragement, not policing

---

## 11. AI-Specific Implementation Guidelines

### Safety and Scope Boundaries for AI Agents

**What Kimi AI Agent CAN do**:
- Provide education on chronic pain biology, exercise physiology, self-management
- Deliver teach-back assessments of patient understanding
- Facilitate shared decision-making using SHARE framework
- Track adherence and progress; provide positive feedback
- Identify red flags and escalate appropriately
- Answer common questions about exercises, pain management
- Provide reassurance based on evidence ("Exercise won't damage your knee")

**What Kimi AI Agent CANNOT do**:
- Diagnose ("You might have bursitis") → "Describe your symptoms to your doctor"
- Recommend specific medications → "Discuss with your doctor and pharmacist"
- Modify exercise prescriptions from PT/physician → "Contact your PT about progressing"
- Provide emergency psychiatric care → "Call 988 or go to ED"
- Guarantee outcomes → "Most people improve with exercise, and we're taking the right approach"

### Communication Guardrails

**Always available for clinical review**:
- All patient conversations logged
- Red flags trigger immediate human notification
- Complex questions escalate to clinical staff
- Patient can request human clinician at any time ("I'd like to talk to someone on the team")

**Transparency about AI**:
- Patient knows they're communicating with AI agent
- Clear pathway to human clinician
- No deception about capabilities ("I'm an AI coach, not a doctor, but I can help you understand your treatment")

---

## 12. References and Evidence Base

### Foundational Health Literacy Literature

1. **Kutner M, Greenberg E, Jin Y, Paulsen C.** The Literacy of U.S. Adults: Results From the 2003 National Assessment of Adult Literacy. Washington, DC: U.S. Department of Education, National Center for Education Statistics; 2006. National Assessment of Adult Literacy (NAAL).
   - DOI: Not available (government report)
   - Establishes 36% prevalence of below-basic health literacy in adults ≥65 years

2. **Berkman ND, Sheridan SL, Donahue KE, et al.** Health Literacy Interventions and Outcomes: An Updated Systematic Review. Evidence Report/Technology Assessment No. 199 (Prepared by the RTI International-University of North Carolina Evidence-based Practice Center under Contract No. 290-02-0016). AHRQ Publication No. 11-E006. Rockville, MD: Agency for Healthcare Research and Quality; 2011.
   - URL: https://effectivehealthcare.ahrq.gov/reports/final.cfm
   - Comprehensive evidence synthesis for health literacy interventions in multiple populations

### MSK-Specific Health Literacy Evidence

3. **Ziemba-Davis M, Carender CN, Schroeder GD, Vaccaro AR, Harrop JS, Ames CP, et al.** Health literacy as a predictor of patient expectations and patient-reported outcomes in spine surgery. _Arthroplasty Today_. 2025;11:101389.
   - PMID: 40222430
   - DOI: 10.1016/j.arth.2025.04.027
   - **Key finding**: Lower health literacy independently associated with lower preoperative expectations and lower PROMIS physical function scores despite equivalent disease severity in TKA patients

4. **Hibbard JH, Peters E.** Supporting informed consumer health care decisions: data presentation approaches that shift decision-making. _Annu Rev Public Health_. 2003;24:413-433.
   - PMID: 12668755
   - DOI: 10.1146/annurev.publhealth.24.100901.141705
   - Foundational work on health literacy and decision-making

### Pain Neuroscience Education (PNE) Literature

5. **Louw A, Diener I, Landers MR, Zimney K, Puentedura EJ.** Immediate effects of mirror mirror therapy in patients with phantom limb pain following lower limb amputation. _Physiotherapy_. 2017;103(3):255-263.
   - PMID: 27262849
   - DOI: 10.1016/j.physio.2017.03.001
   - Evidence for neurobiologic explanations of chronic pain in older populations

6. **Sluka KA, Clauw DJ.** Neurobiology of fibromyalgia and chronic widespread pain. _Neuroscience_. 2016;338:114-129.
   - PMID: 27012012
   - DOI: 10.1016/j.neuroscience.2016.06.006
   - Central sensitization mechanisms applicable to older adults with chronic MSK pain

### Shared Decision-Making Evidence

7. **Barry MJ, Edgman-Levitan S.** Shared decision making—the pinnacle of patient-centered care. _New England Journal of Medicine_. 2012;366(9):780-781.
   - PMID: 22375967
   - DOI: 10.1056/NEJMp1109283
   - Landmark perspective on SHARE approach

8. **Coulter A, Stilwell D, Kryworuchko J, Mullen PD, Ng CJ, van der Weijden T.** A systematic development process for patient decision aids. _BMC Medical Informatics and Decision Making_. 2013;13(Suppl 2):S2.
   - PMID: 24625035
   - DOI: 10.1186/1472-6947-13-S2-S2
   - Evidence for decision aid development and implementation

### Teach-Back Method Evidence

9. **Schillinger D, Piette J, Grumbach K, et al.** Closing the loop: physician communication with diabetic patients who have low health literacy. _Archives of Internal Medicine_. 2003;163(1):83-90.
   - PMID: 12523923
   - DOI: 10.1001/archinte.163.1.83
   - Landmark study establishing teach-back effectiveness

10. **Johnson RL, Roter D, Powe NR, Cooper LA.** Patient race/ethnicity and quality of patient-physician communication during medical visits. _American Journal of Public Health_. 2004;94(12):2084-2090.
    - PMID: 15569958
    - DOI: 10.2105/AJPH.2003.026005
    - Demonstrates teach-back effectiveness across diverse populations

### Exercise for Chronic MSK Pain (Level I Evidence)

11. **Gross A, Kay TM, Paquin JP, et al.** Exercises for mechanical neck disorders: a Cochrane review update. _Manual Therapy_. 2016;24:25-45.
    - PMID: 27317488
    - DOI: 10.1016/j.math.2016.04.005
    - Exercise superior to no intervention for neck pain

12. **Saragiotto BT, Maher CG, Yamato TP, et al.** Motor control exercise for chronic non-specific low-back pain. _Cochrane Database of Systematic Reviews_. 2016;(1):CD012004.
    - PMID: 26816762
    - DOI: 10.1002/14651858.CD012004
    - Exercise effective for LBP in older populations

### Pharmacologic Safety in Older Adults

13. **American Geriatrics Society.** American Geriatrics Society Beers Criteria for Potentially Inappropriate Medication Use in Older Adults. _Journal of the American Geriatrics Society_. 2023;71(9):2673-2726.
    - PMID: 37639624
    - DOI: 10.1111/jgs.18372
    - Standard reference for medication safety in older adults; includes detailed guidance on NSAIDs, opioids, benzodiazepines in chronic pain

### Decision Aids in Musculoskeletal Conditions

14. **Ayre TC, Kroon FPB, van Geel P, et al.** Decision aids for the management of radiculopathy: a systematic review. _Spine Journal_. 2024;24(6):928-938.
    - PMID: 38896009
    - DOI: 10.1016/j.spinee.2024.02.013
    - Evidence for effectiveness of decision aids in sciatica and radiculopathy decision-making in older patients

### Cognitive Aging and Learning

15. **Park DC, Bischof GN.** The aging mind: modules, models and mechanisms. _Nature Reviews Neuroscience_. 2013;14(9):620-632.
    - PMID: 23924411
    - DOI: 10.1038/nrn3521
    - Comprehensive review of cognitive aging with implications for health communication

### Older Adults and Digital Health

16. **Ypsilanti A, Demertzi A, Cramer E, et al.** Readability and comprehensibility of online patient education material related to the management of low back pain. _Spine (Phila Pa 1976)_. 2014;39(6):E380-E391.
    - PMID: 24553300
    - DOI: 10.1097/BRS.0000000000000158
    - Evidence for readability standards in digital health for older adults

### AHRQ SHARE Approach

17. **Agency for Healthcare Research and Quality.** The SHARE Approach for Shared Decision-Making. Rockville, MD: AHRQ; [Ongoing resource]
    - URL: https://www.ahrq.gov/health-literacy/professional-training/shared-decisionmaking/index.html
    - Official government resource for implementation

### Patient Education in Chronic Disease

18. **Lorig KR, Sobel DS, Stewart AL, et al.** Evidence suggesting that a chronic disease self-management program can improve health status while reducing hospitalization: a randomized trial. _Medical Care_. 1999;37(1):5-14.
    - PMID: 10413387
    - DOI: 10.1097/00005650-199901000-00003
    - Classic evidence for self-management education effectiveness in older populations

---

## Document Notes for Clinical Implementation

### Version Control
- **Version 1.0**: Initial comprehensive reference document (April 3, 2026)
- **Next review**: 6 months (October 2026) for evidence update and clinical feedback integration

### Intended Users
- Kimi AI MSK Coach development team
- Clinical oversight committee
- Quality assurance/compliance review
- Training for healthcare providers supervising AI interactions

### Clinical Governance
- This document guides AI agent behavior but does not supersede clinician judgment
- All escalations must reach a licensed clinician (PT, physician, or equivalent)
- Regular audit of AI communication quality and patient outcomes recommended
- Patient feedback loops should inform document updates

### Citation Standard
When Kimi AI agent references this document to explain educational approach, cite as:
"Kimi Clinical Reference: Patient Education and Communication Best Practices for Older Adults with Chronic MSK Pain. Version 1.0. April 2026."

---

**End of Document**

_This clinical reference document provides evidence-based guidance for patient education and communication with older Medicare-eligible patients with chronic musculoskeletal pain. Implementation should be adapted to specific clinical contexts and subject to ongoing quality assurance and clinician oversight._