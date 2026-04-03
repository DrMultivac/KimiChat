# KB_ACCESS_API_Implementation.md
## CMS ACCESS Model API Implementation and Data Submission Reference

**Document Version:** 1.0
**Last Updated:** April 3, 2026
**Source:** CMS ACCESS Model API Implementation and Data Submission Technical Office Hour (March 18, 2026)
**Classification:** Technical Reference
**Purpose:** Comprehensive reference for KIMI engineering team on CMS ACCESS Model API requirements, authentication, data submission workflows, and MSK track-specific OAP measure reporting.

---

## 1. Overview

### 1.1 ACCESS Model API Architecture

To participate in the ACCESS Model, organizations must develop clients to interact with **four primary APIs** that support eligibility verification, patient alignment, unalignment, and OAP measure data submission. All data shared with CMS must flow through these APIs — CMS does not offer alternative reporting methods.

**Implementation Guide:** All API specifications are consolidated in the ACCESS Implementation Guide (IG) on the CMS Digital Services GitHub, providing:
- API-specific resources used in each API
- Authentication configuration requirements
- Shared resources used across multiple APIs

### 1.2 Asynchronous Request-Response Pattern

All ACCESS APIs use an **asynchronous request-response pattern** to accommodate processing time:
- Each API supports two operations: a **POST** operation to submit requests and a **GET** operation to poll for submission status
- Participants must **poll for submission status** to receive final responses
- This pattern applies consistently across all four APIs

### 1.3 FHIR-Based Standards

- All APIs are FHIR-based, requiring conformance with Fast Healthcare Interoperability Resources standards
- Within 12 months of model start (July 5, 2026), participants must establish or maintain connectivity to a Health Information Exchange (HIE) supporting bidirectional clinical information exchange
- Participants must be able to submit POST requests to report required clinical and patient-reported outcomes data through CMS's FHIR-based Data Reporting API

---

## 2. Eligibility API

### 2.1 Purpose

Allows participants to submit basic patient information for a **pre-check of model eligibility** before formal patient alignment. This is a recommended first step before submitting alignment requests.

### 2.2 Operations

| Operation | Method | Purpose |
|---|---|---|
| `$check-eligibility` | POST | Submit an eligibility check request |
| `$submission-status` | GET | Poll for status of submitted request; returns response when complete |

### 2.3 Input Parameters

| Parameter | Required | Description |
|---|---|---|
| `participantID` | Yes | ACCESS ID of the submitting participant (assigned in Participant Portal) |
| `payerID` | Yes | Payer ID for the patient (Original Medicare payerID) |
| `patient` | Yes | Patient information conforming to US Core Patient Profile |
| `track` | Yes | ACCESS Model track to check eligibility for (e.g., `MSK`) |
| `condition` | Optional | ICD-10 codes for patient's track-specific conditions |

**Patient Profile Requirements (US Core Patient Profile):**
- Patient identifier (required)
- Patient name (required)
- Gender (required)
- Date of birth (optional)

### 2.4 Eligibility Result Codes

| Result Code | Description |
|---|---|
| `eligible` | Patient is eligible for the ACCESS Model |
| `eligible-pending-diagnosis` | Patient is provisionally eligible, depending on diagnosis confirmation |
| `not-eligible-not-medicare` | Patient is not enrolled in Medicare |
| `not-eligible-services` | Patient is receiving services that prevent eligibility (e.g., hospice, ESRD) |
| `not-eligible-diagnoses` | Patient is not eligible based on submitted diagnosis codes |
| `not-eligible-control-group` | Patient is otherwise eligible but assigned to randomized control group for 12 months |
| `not-eligible-already-aligned` | Patient is already aligned to another participant in the same clinical track |
| `eligible-switch-participants` | Patient is eligible to switch participants |

### 2.5 KIMI Integration Requirements

- **Intake Engine** must call Eligibility API before initiating patient enrollment
- System must handle all result codes gracefully and present appropriate messaging
- `not-eligible-control-group` requires specific patient communication (patient is eligible but cannot enroll due to randomization)
- `eligible-pending-diagnosis` should trigger clinical verification workflow before proceeding to alignment

---

## 3. Alignment API

### 3.1 Purpose

Determines if a patient can be **aligned to an ACCESS Participant for a specific clinical track** and begin receiving care under the model. This is the formal enrollment step.

### 3.2 Operations

| Operation | Method | Purpose |
|---|---|---|
| `$align` | POST | Submit an alignment request |
| `$submission-status` | GET | Poll for status and receive response when complete |

### 3.3 Input Parameters

Includes all Eligibility API parameters plus:

| Parameter | Required | Description |
|---|---|---|
| `condition` | **Required** (not optional as in Eligibility) | ICD-10 codes for track-specific conditions |
| `isProviderReferral` | Optional | Indicates whether patient was referred by a physician |
| `switchConsentAttestation` | Conditional | Used when patient is switching participants after 3-month lock-in |

### 3.4 Alignment Result Codes

| Result Code | Description |
|---|---|
| `aligned` | Patient is eligible and aligned; participant can begin providing services |
| `aligned-switch-approved` | Patient switched and realigned to new participant after 3-month lock-in |
| `not-aligned-control-group` | Patient assigned to randomized control group for 12 months |
| `not-aligned-already-aligned` | Patient already aligned to another participant in the track |
| `not-aligned-not-medicare` | Patient not enrolled in Medicare Part B |
| `not-aligned-services` | Patient receiving preventing services (hospice, ESRD) |
| `not-aligned-diagnoses` | Patient does not have a qualifying diagnosis |

### 3.5 Best Practices

1. **Eligibility Pre-Check:** Always check eligibility via Eligibility API before submitting alignment requests
2. **Track Validation:** Verify correct Clinical Track code (MSK for KIMI)
3. **Diagnosis Validation:** Ensure all submitted ICD-10 codes are relevant to MSK track and clinically validated

### 3.6 Patient Switching (After 90-Day Lock-In)

- Patients may switch ACCESS Participants within the same clinical track **90 days after enrollment**
- Switch requests submitted before 3-month period result in `not-aligned-already-aligned`
- **Provider Switch Workflow:**
  1. Obtain patient consent to switch
  2. Use Eligibility API to verify patient is eligible to switch
  3. Submit alignment request with `switchConsentAttestation`
  4. If approved, receive `aligned-switch-approved` result code

### 3.7 Automatic Notification Subscriptions

Upon successful alignment, the system automatically creates FHIR subscriptions for:
- **Provider Lock-In Period Ending:** Notification before 3-month lock-in expires
- **Data Reporting Due:** Notifications before baseline, quarterly, and end-of-year submission deadlines
- **Unalignment:** Notification when patient is unaligned
- **Alignment Renewal Due:** Notifications when renewal is approaching

Notifications delivered to email address provided during API onboarding.

---

## 4. Unalignment API

### 4.1 Purpose

Enables participants to **manually unalign a patient from a specific clinical track** for approved reasons.

### 4.2 Operations

| Operation | Method | Purpose |
|---|---|---|
| `$unalign` | POST | Submit an unalignment request |
| `$submission-status` | GET | Poll for status and response |

### 4.3 Unalignment Result Codes

| Result Code | Description |
|---|---|
| `unaligned` | Request accepted; patient has been unaligned |
| `unalignment-pending` | Additional review needed to complete request |
| `patient-not-aligned` | Patient is not currently aligned to this participant in specified track |

### 4.4 Accepted Unalignment Reason Codes

| Reason Code | Description | Notes |
|---|---|---|
| `geographic-relocated` | Patient relocated outside geographic area where participant is licensed | — |
| `loss-of-contact` | Contact lost despite good faith efforts | Must document 3+ outreach attempts over 30+ days |
| `patient-initiated` | Patient no longer wants to participate | Only valid after initial 90-day lock-in period |
| `no-longer-clinically-eligible` | Patient's conditions changed; no longer eligible for clinical track | Must include relevant ICD-10 code and narrative description |

### 4.5 Automatic Subscription Cleanup

When a patient is unaligned:
1. System sends FHIR notification messages to participant informing of alignment termination
2. All other subscriptions created during original alignment are automatically cancelled
3. For `unalignment-pending` results, subscriptions remain active until finalized

### 4.6 KIMI Integration Requirements

- **Escalation Gateway** must trigger unalignment workflow when clinical exclusion criteria are newly identified
- System must document loss-of-contact attempts (3+ outreach over 30+ days) before submitting `loss-of-contact` unalignment
- Red Flag Scanner detecting new exclusion conditions must feed into unalignment pipeline with ICD-10 codes and narrative

---

## 5. Data Reporting API (DRAFT)

### 5.1 Purpose

Allows participants to **submit baseline OAP Measure data** at the start of care, at the end of each 12-month period, and at regular intervals throughout the care period.

### 5.2 Operations

| Operation | Method | Purpose |
|---|---|---|
| `$report-data` | POST | Submit a data reporting bundle for an aligned patient |
| `$submission-status` | GET | Poll for status and response |

### 5.3 Input Parameters

| Parameter | Required | Description |
|---|---|---|
| `participantID` | Yes | ACCESS ID for submitting participant |
| `patient` | Yes | Patient information (US Core Patient Profile) |
| `track` | Yes | ACCESS track patient is aligned to (e.g., `MSK`) |
| `dataBundle` | Yes | Document Bundle conforming to `ACCESSDataReportingBundle` profile containing data reporting composition and all referenced resources |

---

## 6. MSK Track OAP Measures and Reporting Requirements

### 6.1 MSK OAP Measures

The MSK track requires reporting on four outcome domains:

| OAP Measure | Instrument | Reporting Frequency | Clinical Validity Window |
|---|---|---|---|
| **Pain Intensity** | Numeric Rating Scale (NRS) or PROMIS NRS v1.0 - Pain Intensity 1a | Baseline, quarterly, end of period | 15 days |
| **Physical Function (PF)** | PROMIS PF Short Form 6b or v2.0 CAT | Baseline, quarterly, end of period | 15 days |
| **Pain Interference (PI)** | PROMIS PI Short Form 6a or v2.0 CAT | Baseline, quarterly, end of period | 15 days |
| **Patient Global Impression of Change (PGIC)** | PGIC | End of period only | 15 days |

### 6.2 Critical Compliance Rules

1. **Clinical Validity Window:** All MSK PROMs have a **15-day clinical validity window** — the maximum allowable time between collection date and submission date to CMS
2. **Early Success Reporting:** End of period measures may be submitted up to **180 days before the 1-year mark**
3. **Baseline Submission:** Must be submitted at start of care period (60-day deadline from enrollment)
4. **Quarterly Reporting:** Required at regular intervals throughout the 12-month period
5. **End of Period Reporting:** Final comprehensive assessment including PGIC

### 6.3 Site-Specific PROMs

For the MSK track, in addition to PROMIS PF and PI (which cover any/multi-site pain), **site-specific PROMs** are also required. These align with KIMI's existing PROM framework:
- Lower Back: ODI
- Neck: NDI
- Knee: KOOS JR
- Hip: HOOS JR
- Shoulder/Elbow/Wrist: QuickDASH
- Ankle/Foot: PROMIS PF + PI

### 6.4 KIMI PROM Collector Integration Requirements

The PROM Collector component must:
1. **Track clinical validity windows** — flag any PROM approaching the 15-day submission deadline
2. **Auto-trigger CMS data submission** within 15 days of PROM collection
3. **Support both NRS and PROMIS NRS v1.0** for pain intensity reporting
4. **Support PROMIS PF Short Form 6b AND v2.0 CAT** formats
5. **Support PROMIS PI Short Form 6a AND v2.0 CAT** formats
6. **Administer PGIC** at end of care period
7. **Generate ACCESSDataReportingBundle** conforming to required FHIR profile
8. **Calendar baseline, quarterly, and end-of-period submission deadlines** per patient
9. **Leverage early success reporting** — submit end of period measures up to 180 days early when scores are favorable

---

## 7. Payment Structure Context

### 7.1 Outcome-Aligned Payments (OAP)

- The ACCESS Model uses OAPs that emphasize **outcomes over activities**
- Payment is contingent on achieving **track-specific outcomes defined relative to patient baseline**
- For MSK track: Minimum improvement in pain intensity, pain interference, physical function, and PGIC
- Annual OAP cap: **$180 per beneficiary per year** for non-physician-delivered services

### 7.2 Implications for KIMI

- Every PROM score directly impacts payment — KIMI must optimize both clinical outcomes AND data capture compliance
- Missed baseline PROMs = no improvement denominator = no payment eligibility
- Missed 15-day submission windows = data not accepted by CMS
- The 180-day early success reporting window creates an opportunity to lock in favorable outcomes early

---

## 8. Technical Integration Architecture for KIMI

### 8.1 API Integration Points

```
KIMI System → ACCESS APIs

Intake Engine ──→ Eligibility API ($check-eligibility)
                  ↓ (if eligible)
Intake Engine ──→ Alignment API ($align)
                  ↓ (if aligned)
                  ← Automatic FHIR Notification Subscriptions

PROM Collector ─→ Data Reporting API ($report-data)
                  [Baseline, Quarterly, End of Period]

Escalation Gateway ─→ Unalignment API ($unalign)
                      [When clinical exclusion detected]
```

### 8.2 Required FHIR Profiles

| Profile | Usage |
|---|---|
| US Core Patient Profile | Patient information in all API requests |
| ACCESSDataReportingBundle | Data reporting composition with all referenced resources |
| FHIR Subscription | Automatic notifications for deadlines and events |

### 8.3 Onboarding Requirements

- Participant ID assigned via CMS Participant Portal
- Email address for notification delivery configured during API onboarding
- Cohort 1 applications due by April 1, 2026

---

## 9. Contact and Resources

- **CMS ACCESS Model Team:** ACCESSModelTeam@cms.hhs.gov
- **ACCESS Model Webpage:** CMS website (sign up for listserv for updates)
- **Implementation Guide:** CMS Digital Services GitHub
- **Payment Amounts and Performance Targets Paper:** Available on CMS website
- **Request for Applications (RFA):** Track-specific condition codes on page 16
