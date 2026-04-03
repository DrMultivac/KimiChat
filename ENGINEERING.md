# KIMI MSK Agent — Engineering Implementation Guide

This document maps every file in this repository to the KIMI system component it informs, with implementation notes and priority guidance.

---

## Implementation Priority Order

Build in this order. Each tier depends on the one above it.

### P0 — Must Have for Launch (July 5, 2026)

| System Component | Knowledge Base Files | What to Build |
|---|---|---|
| **CMS API Integration** | `regulatory/KB_ACCESS_API_Implementation.md` | FHIR R4 client for all 4 CMS APIs (Eligibility, Alignment, Unalignment, Data Reporting). Async POST+poll pattern. See Section 8 for integration architecture. |
| **PROM Collector** | `outcomes/KB_PROM_Instruments.md` | Tier 1 collection engine: baseline, quarterly, end-of-period. 15-day submission deadline tracking. Auto-trigger CMS data submission. Support NRS, PROMIS PF 6b/CAT, PROMIS PI 6a/CAT, PGIC, site-specific PROMs. |
| **Intake Engine** | `clinical-engine/KB_Intake_Architecture.md`, `KB_Intake_Condition_Protocols.md`, `KB_Intake_Pain_Phenotyping.md`, `KB_Intake_PROM_Survey_Mapping.md` | Patient onboarding flow → Eligibility API pre-check → Alignment API → baseline PROM collection within 60 days. |
| **Red Flag Triage** | `safety/Clinical_Reference_Red_Flag_Triage_Algorithm.md`, `safety/KB_Clinical_Guardrails_Safety.md` | 4-tier escalation system. Non-bypassable safety layer. Must run on every patient interaction. |
| **Agent Core** | `agent-spec/KB_00_Agent_Specification.md` | Behavioral contract: scope boundaries, refusal patterns, escalation triggers, clinical guardrails. This is the system prompt foundation. |

### P1 — Core Clinical Functionality

| System Component | Knowledge Base Files | What to Build |
|---|---|---|
| **Pain Phenotyping Engine** | `clinical-engine/KB_Intake_Pain_Phenotyping.md`, `clinical-engine/Clinical_Reference_Exercise_by_Pain_Phenotype.md` | Classify nociceptive vs. neuropathic vs. nociplastic. Drives exercise selection and coaching tone. |
| **Care Plan Builder** | `clinical-engine/KB_Intake_Care_Plan_Construction.md` | Generate individualized care plans. Four-phase protocol assignment based on PROMIS scores. |
| **Exercise Prescription** | `exercise-library/KB_Exercise_Library_Knee_Hip.md`, `KB_Exercise_Library_Spine.md`, `KB_Exercise_Library_Upper_Extremity.md`, `KB_Flare_Management_Falls_Prevention.md` | Region-specific exercise libraries. Phenotype-matched selection. Flare management protocols. |
| **Conversation Manager** | `conversation/KB_Conversation_Scripts.md`, `conversation/Clinical_Reference_CBT_Communication_Protocol.md` | Empathetic coaching dialogue. CBT-informed communication. Motivational interviewing techniques. |
| **Progress Tracker** | `outcomes/KB_PROM_Instruments.md`, `clinical-engine/Clinical_Reference_Coaching_Cadence_Protocol.md` | Track PROMIS scores over time. Phase progression logic. Detect deterioration (>10% decline). |

### P2 — Enhanced Care Quality

| System Component | Knowledge Base Files | What to Build |
|---|---|---|
| **Patient Education** | `education/KB_Patient_Education_Joint_OA.md`, `KB_Patient_Education_Spine.md`, `education/KB_CBT_Pain_Psychology_Modules.md`, `education/KB_Nutrition_Sleep_Lifestyle.md` | Structured education modules delivered at appropriate care phases. |
| **Biopsychosocial Assessment** | `clinical-engine/Clinical_Reference_Biopsychosocial_Model.md`, `clinical-engine/Clinical_Reference_Patient_Education_Older_Adults.md` | Psychosocial factor screening. Fear-avoidance, catastrophizing, depression/anxiety flags. |
| **Decision Aids** | `clinical-engine/KB_Decision_Aids_Shared_Decision_Making.md` | AHRQ SHARE approach. Informed consent support. Treatment option comparison. |
| **Program Protocols** | `programs/KB_Duke_Joint_Health_Program.md`, `programs/KB_Spine_Health_Program.md` | Structured multi-week programs based on validated clinical protocols. |

---

## File-by-File Reference

### `knowledge-base/agent-spec/`

| File | Purpose | Implements |
|---|---|---|
| `KB_00_Agent_Specification.md` | **Master behavioral contract.** Defines KIMI's identity, scope, capabilities, refusal patterns, and clinical guardrails. | System prompt, agent configuration, scope enforcement |

### `knowledge-base/clinical-engine/`

| File | Purpose | Implements |
|---|---|---|
| `KB_Intake_Architecture.md` | Multi-step intake flow with branching logic | Intake Engine conversation flow |
| `KB_Intake_Condition_Protocols.md` | Condition-specific intake questions per body region | Intake Engine question routing |
| `KB_Intake_Pain_Phenotyping.md` | Nociceptive/neuropathic/nociplastic classification criteria | Pain Phenotyping Engine |
| `KB_Intake_PROM_Survey_Mapping.md` | Which PROMs to administer based on condition and body region | PROM Collector instrument selection |
| `KB_Intake_Care_Plan_Construction.md` | Rules for generating individualized care plans | Care Plan Builder |
| `Clinical_Reference_Coaching_Cadence_Protocol.md` | When and how to check in with patients | Conversation Manager scheduling |
| `Clinical_Reference_Exercise_by_Pain_Phenotype.md` | Exercise selection rules by pain phenotype | Exercise Prescription Engine |
| `Clinical_Reference_Biopsychosocial_Model.md` | Psychosocial screening and integration | Biopsychosocial assessment module |
| `Clinical_Reference_Patient_Education_Older_Adults.md` | Age-appropriate education adaptations | Patient Education module |
| `KB_Decision_Aids_Shared_Decision_Making.md` | AHRQ SHARE approach implementation | Decision Aid module |

### `knowledge-base/safety/`

| File | Purpose | Implements |
|---|---|---|
| `Clinical_Reference_Red_Flag_Triage_Algorithm.md` | Red flag symptoms → escalation tier mapping | Red Flag Scanner |
| `KB_Clinical_Guardrails_Safety.md` | Safety boundaries, scope limits, escalation rules | Escalation Gateway, agent guardrails |

### `knowledge-base/exercise-library/`

| File | Purpose | Implements |
|---|---|---|
| `KB_Exercise_Library_Knee_Hip.md` | Knee and hip exercise protocols by phase | Exercise Prescription Engine (lower extremity) |
| `KB_Exercise_Library_Spine.md` | Lumbar and cervical exercise protocols | Exercise Prescription Engine (spine) |
| `KB_Exercise_Library_Upper_Extremity.md` | Shoulder, elbow, wrist/hand protocols | Exercise Prescription Engine (upper extremity) |
| `KB_Flare_Management_Falls_Prevention.md` | Flare response and falls prevention protocols | Flare Management module |

### `knowledge-base/education/`

| File | Purpose | Implements |
|---|---|---|
| `KB_Patient_Education_Joint_OA.md` | Osteoarthritis education content | Patient Education (joint OA) |
| `KB_Patient_Education_Spine.md` | Spine condition education content | Patient Education (spine) |
| `KB_CBT_Pain_Psychology_Modules.md` | CBT-based pain coping modules | CBT module delivery |
| `KB_Nutrition_Sleep_Lifestyle.md` | Lifestyle modification guidance | Lifestyle coaching module |

### `knowledge-base/conversation/`

| File | Purpose | Implements |
|---|---|---|
| `KB_Conversation_Scripts.md` | Scripted dialogue templates for key interactions | Conversation Manager templates |
| `Clinical_Reference_CBT_Communication_Protocol.md` | CBT communication techniques and language patterns | Conversation Manager tone/style |

### `knowledge-base/outcomes/`

| File | Purpose | Implements |
|---|---|---|
| `KB_PROM_Instruments.md` | All PROM instruments, scoring, two-tier collection strategy, CMS compliance rules | PROM Collector, CMS Data Reporting |

### `knowledge-base/regulatory/`

| File | Purpose | Implements |
|---|---|---|
| `KB_ACCESS_Model_Reference.md` | ACCESS Model overview, eligibility, track requirements | Business logic, eligibility rules |
| `KB_ACCESS_MSK_Payment_Performance.md` | OAP payment structure, performance targets | Payment tracking, early success reporting |
| `KB_ACCESS_API_Implementation.md` | All 4 CMS API specs, auth, FHIR profiles, integration architecture | CMS API client implementation |

### `knowledge-base/programs/`

| File | Purpose | Implements |
|---|---|---|
| `KB_Duke_Joint_Health_Program.md` | Duke University joint health protocol | Structured program: Joint Health |
| `KB_Spine_Health_Program.md` | Spine health program protocol | Structured program: Spine Health |

### `prd/`

| File | Purpose |
|---|---|
| `KIMI_Clinical_Architecture_PRD.md` | Full product requirements document covering all 12 components, clinical scope, data flows, and deployment architecture |

### `architecture/`

| File | Purpose |
|---|---|
| `index.html` | Interactive landing page — open in browser to explore architecture visually |
| `KIMI_3D_Brain_Architecture.html` | 3D interactive visualization of KIMI's 6-layer, 12-component architecture |
| `KIMI_Engineering_Overview.html` | Visual engineering documentation with RevelAi branding |

---

## CMS API Integration Checklist

The CMS ACCESS APIs are the highest-priority integration. All are FHIR R4, async POST+poll.

- [ ] **Authentication**: Configure per CMS Implementation Guide on Digital Services GitHub
- [ ] **Eligibility API** (`$check-eligibility` / `$submission-status`): Pre-check before enrollment
- [ ] **Alignment API** (`$align` / `$submission-status`): Formal patient enrollment
- [ ] **Unalignment API** (`$unalign` / `$submission-status`): Patient removal for approved reasons
- [ ] **Data Reporting API** (`$report-data` / `$submission-status`): PROM data submission within 15-day windows
- [ ] **FHIR Subscription handling**: Process automatic notifications (lock-in expiry, reporting deadlines, unalignment events)
- [ ] **HIE connectivity**: Bidirectional clinical exchange required within 12 months of model start

## PROM Submission Pipeline

This is the payment-critical data flow:

```
Patient completes PROM → KIMI scores it → Validate completeness
    → Generate ACCESSDataReportingBundle (FHIR)
    → POST to Data Reporting API ($report-data)
    → Poll $submission-status until accepted
    → Log submission timestamp and CMS response
    → Alert if approaching 15-day deadline without submission
```

**Hard deadlines:**
- Baseline: within 60 days of alignment
- Quarterly: Q1 (~90d), Q2 (~180d), Q3 (~270d)
- End of period: 365 days (or 180 days early if scores are favorable)
- Each submission: within 15 days of PROM collection date

## Key Engineering Decisions

1. **Instrument versioning**: Pick either PROMIS Short Form OR CAT at enrollment and use it for the entire episode. Do not switch mid-episode.
2. **PGIC timing**: Only collected at end of period. No baseline. It measures "since you started, how much has your condition changed?"
3. **Early success reporting**: If a patient's scores are strong at month 6+, submit end-of-period measures early to lock in favorable OAP.
4. **Safety is non-bypassable**: Red Flag Triage runs on every interaction. No configuration flag to disable it.
5. **Risk stratification at intake**: Limber's validated triage algorithm (Mayo Clinic validated, 100% sensitivity) must execute before any care plan generation.

---

*Last updated: April 3, 2026*
