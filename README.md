# KIMI MSK Care Coach — Knowledge Base & Architecture

**KIMI** (Knowledge-Informed MSK Intelligence) is an AI-powered musculoskeletal care coach built by [RevelAi Health](https://revelaihealth.com) for the **CMS ACCESS Model, MSK Track** — a 10-year national value-based care model launching July 5, 2026.

KIMI coaches Medicare beneficiaries with chronic MSK pain through evidence-based exercise therapy, CBT-informed pain coping strategies, and structured four-phase rehabilitation protocols, all while managing CMS-mandated outcome reporting for Outcome-Aligned Payments (OAPs).

---

## Repository Structure

```
kimi-msk-agent/
├── README.md                          ← You are here
├── ENGINEERING.md                     ← Implementation guide for engineering team
├── prd/
│   └── KIMI_Clinical_Architecture_PRD.md   ← Full product requirements document
├── architecture/
│   ├── index.html                     ← Interactive hub (deployable)
│   ├── KIMI_3D_Brain_Architecture.html ← 3D architecture visualization
│   └── KIMI_Engineering_Overview.html  ← Visual engineering documentation
├── knowledge-base/
│   ├── agent-spec/                    ← Core agent specification
│   ├── clinical-engine/               ← Intake, phenotyping, care plans, protocols
│   ├── safety/                        ← Guardrails, red flag triage
│   ├── exercise-library/              ← Region-specific exercise protocols
│   ├── education/                     ← Patient education modules
│   ├── conversation/                  ← Conversation scripts, CBT communication
│   ├── outcomes/                      ← PROM instruments and collection strategy
│   ├── regulatory/                    ← CMS ACCESS Model APIs, payment, compliance
│   └── programs/                      ← Duke Joint Health, Spine Health protocols
└── source-documents/                  ← Original reference PDFs
```

## Quick Start for Engineers

1. **Read `ENGINEERING.md`** — maps every file to the system component it informs and explains implementation priorities.
2. **Read `knowledge-base/agent-spec/KB_00_Agent_Specification.md`** — the definitive behavioral contract for KIMI (what it does, what it refuses, scope boundaries).
3. **Read `knowledge-base/regulatory/KB_ACCESS_API_Implementation.md`** — CMS API integration requirements (Eligibility, Alignment, Unalignment, Data Reporting).
4. **Explore `architecture/`** — open `index.html` in a browser for interactive architecture views.

## Key Technical Concepts

| Concept | Summary |
|---|---|
| **ACCESS Model** | CMS 10-year national model; MSK track covers chronic pain ≥3 months in Medicare beneficiaries |
| **OAP** | Outcome-Aligned Payments — $180/beneficiary/year cap, contingent on PROM improvement |
| **Four CMS APIs** | Eligibility, Alignment, Unalignment, Data Reporting — all FHIR-based, async POST+poll |
| **15-Day Validity Window** | CMS-mandated PROMs must be submitted within 15 days of collection |
| **Two-Tier PROM Strategy** | Tier 1 = CMS-mandated (baseline, quarterly, end-of-period); Tier 2 = clinical optimization (daily/weekly) |
| **Four-Phase Rehab** | Acute → Sub-Acute → Functional → Return to Play, with PROMIS-based progression gates |
| **Pain Phenotyping** | Nociceptive, neuropathic, nociplastic — determines exercise selection and coaching approach |
| **8 Body Regions** | Lower back, neck, knee, hip, shoulder, elbow, wrist/hand, ankle/foot |
| **Red Flag Triage** | 4-tier safety escalation (Emergent → Urgent → Semi-Urgent → Monitoring) |

## CMS Compliance — What Matters Most

The single most payment-critical requirement: **collect and submit Tier 1 PROMs on schedule.**

- **Baseline** within 60 days of alignment
- **Quarterly** at Q1, Q2, Q3
- **End of Period** at 12 months (or up to 180 days early for favorable outcomes)
- **Submit to CMS within 15 days** of each collection
- **PGIC** collected only at end of period

Missing a Tier 1 collection = no improvement denominator = no OAP payment for that beneficiary.

See `knowledge-base/outcomes/KB_PROM_Instruments.md` Section 11 for the full two-tier collection strategy with CMS RFA citations.

## Architecture Overview

KIMI uses a 6-layer, 12-component architecture:

| Layer | Components |
|---|---|
| **Input** | Intake Engine, Conversation Manager |
| **Clinical Reasoning** | Clinical Decision Engine, Pain Phenotyping Engine |
| **Treatment** | Care Plan Builder, Exercise Prescription Engine |
| **Monitoring** | PROM Collector, Progress Tracker |
| **Safety** | Red Flag Scanner, Escalation Gateway |
| **Output** | Response Generator, Reporting Engine |

## Platform Integration

KIMI operates on the **Limber platform**, which provides:
- Structured home-exercise therapy programs
- Four-phase rehabilitation protocols with PROMIS-based progression
- Remote PTA monitoring
- Clinically validated risk stratification (100% sensitivity, Mayo Clinic validated)

## License

Proprietary — RevelAi Health, Inc. All rights reserved.
