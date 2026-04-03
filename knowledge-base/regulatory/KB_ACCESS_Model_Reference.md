# CMS ACCESS Model Reference for KIMI MSK Care Coach

**Document Version:** 1.0  
**Last Updated:** April 3, 2026  
**Classification:** Regulatory and Operational Reference  
**Authority:** CMS ACCESS RFA (02-12-2026) and Technical FAQs

---

## 1. Model Overview

### 1.1 What is ACCESS?

The Advancing Chronic Care with Effective, Scalable Solutions (ACCESS) Model is a 10-year national test of a new payment approach designed to expand access to technology-supported care for people with chronic conditions. ACCESS evaluates whether outcome-aligned payment methods can improve health outcomes, enhance patient choice, and reduce overall Medicare costs.

**Key Innovation:** Rather than paying for specific services (traditional fee-for-service), ACCESS provides recurring payments tied to **achieving measurable health outcomes**. This gives care teams flexibility to use technology, clinical tools, and care approaches that best support each patient's needs.

### 1.2 Model Timeline and Scope

- **Start Date:** July 5, 2026
- **Duration:** 10 years (through June 30, 2036)
- **Eligible Population:** Original Medicare beneficiaries with qualifying chronic conditions
- **Expansion Authority:** Per Section 1115A, CMS may expand or make permanent if model improves quality without increasing costs (or reduces costs without harming quality, certified by CMS Office of the Actuary)
- **Application Window:** Rolling basis, January 2026 through 2033, with multiple cohort entry points

### 1.3 Core Payment Innovation: Outcome-Aligned Payments (OAPs)

OAPs differ fundamentally from fee-for-service:

| Aspect | Traditional Fee-for-Service | ACCESS OAPs |
|--------|------------------------------|------------|
| **Payment Trigger** | Specific activities or procedures billed | Achieving measurable health outcomes |
| **Payment Frequency** | Per-service (typically monthly) | Recurring quarterly (after quarterly review) |
| **Flexibility** | Limited; payment tied to specific codes | Flexible; care team designs approach to achieve outcomes |
| **Accountability** | Activity-based | Results-based |
| **Beneficiary Cost-Sharing** | Standard Medicare cost-sharing applies | CMS may provide patient incentive safe harbor (organizations can waive cost-sharing) |

**KIMI's Role:** KIMI executes care delivery under a clinician-approved care protocol to help achieve OAP outcome targets for enrolled MSK patients.

---

## 2. MSK Track Overview

### 2.1 Qualifying Conditions

The MSK track addresses **chronic musculoskeletal pain** defined as:
- Pain lasting more than 3 months
- Affecting bones, joints, muscles, and connective tissues
- Examples: chronic low back pain, osteoarthritis, rheumatologic conditions (when manifesting as chronic MSK pain)

**Conditions NOT explicitly included** in ACCESS MSK track:
- Acute musculoskeletal injuries
- Post-surgical pain management (<3 months post-op)
- Specific cancer-related pain (may fall under Behavioral Health track if comorbid depression/anxiety)

### 2.2 MSK Track Outcome Measure and Payment

**Outcome-Aligned Payment Measure:**
- Minimum improvement in pain intensity, interference, and overall function assessed via a **validated Patient-Reported Outcome Measure (PROM)**

**Specific Outcome Targets:**
- Pain intensity reduction (typically NRS or similar 0-10 scale)
- Pain interference with function (typically interference subscale of validated PROM)
- Overall physical function improvement (typically PROMIS Physical Function or similar)

**Payment Structure:**
- Recurring quarterly payment to ACCESS participant
- Payment level depends on percentage of enrolled patients meeting outcome targets
- CMS sets minimum threshold (increases yearly with progression through model participation years)
- **No continuation period:** MSK track focused on resolving chronic pain during initial care period; does not include optional follow-on period (unlike eCKM, CKM, BH tracks which offer reduced-rate continuation)

**Co-Management Payment for PCPs/Referring Clinicians:**
- Approximately $30 per review of ACCESS care update (subject to geographic adjustment)
- Onboarding modifier: additional ~$10 for initial setup (first time billing for beneficiary)
- Limit: once every 4 months per beneficiary per track, up to ~$100/year
- **No beneficiary cost-sharing** for co-management code

### 2.3 Other ACCESS Tracks (For Context)

| Track | Qualifying Conditions | Outcome Measure |
|-------|----------------------|-----------------|
| **eCKM** (Early Cardio-Kidney-Metabolic) | Hypertension, dyslipidemia, obesity/overweight with central obesity marker, prediabetes | Control or min. improvement in BP, lipids, weight, HbA1c |
| **CKM** (Cardio-Kidney-Metabolic) | Diabetes, CKD (stages 3a, 3b), ASCVD | Control or min. improvement in BP, lipids, weight, HbA1c; eGFR/UACR submission (if CKD + diabetes) |
| **BH** (Behavioral Health) | Depression, anxiety | Min. improvement in PHQ-9 (depression) or GAD-7 (anxiety) and WHO-DAS 2.0 12-item function |

---

## 3. Participant Eligibility and Requirements

### 3.1 Who Can Participate?

**Organizational Requirements:**
- Medicare Part B–enrolled provider or supplier (excluding DME and laboratory suppliers)
- Active Taxpayer Identification Number (TIN)
- Compliance with applicable state licensure requirements
- HIPAA compliance (covered entity designation and safeguards)
- FDA compliance for any digital tools or connected devices used
- **Mandatory:** Designate a physician Clinical Director responsible for clinical quality and regulatory compliance

**Designated Physician Clinical Director:**
- Licensed physician with clinical oversight authority
- Responsible for ensuring quality of care and regulatory compliance
- Cannot be delegated; must be actively involved in program governance

### 3.2 Application Process

- **Online portal:** CMS will accept applications through dedicated online portal beginning January 2026
- **Rolling admissions:** Applications accepted through early 2033 with multiple cohort start dates
- **First cohort deadline:** March 20, 2026 (for July 5, 2026 start)
- **Medicare enrollment prerequisite:** Organization must be enrolled in Medicare Part B BEFORE ACCESS application can be approved
- **Application materials:** Posted on ACCESS Model webpage with cohort-specific deadlines and requirements

### 3.3 Medicare Enrollment (Prerequisite)

Organizations not already Medicare-enrolled must:

1. Obtain National Provider Identifier (NPI) via NPPES
2. Complete Medicare enrollment application (online via PECOS)
3. Have MAC review and approve enrollment
4. Designate individual practitioners and reassign their billing to organization
5. **Timeline consideration:** Begin enrollment early to avoid delays in ACCESS approval

**Ongoing Compliance:**
- All physicians and non-physician practitioners delivering care must be individually Medicare-enrolled
- Reassign billing rights to ACCESS participant organization
- Maintain current PECOS information (report ownership changes within 30 days; other updates within 90 days)

---

## 4. Beneficiary Eligibility, Alignment, and Enrollment

### 4.1 Who Can Enroll in ACCESS MSK?

- **Original Medicare beneficiaries** only (not Medicare Advantage)
- With a qualifying chronic MSK pain condition (≥3 months duration)
- May enroll directly with an ACCESS participant or via referral from PCP or other clinician
- **Referral is optional** — direct enrollment permitted
- May enroll in multiple tracks with same or different organizations

### 4.2 Beneficiary Alignment Process

Per the End-to-End Flow (Figure 1 in ACCESS RFA):

1. **Confirm beneficiary eligibility** (Eligibility API) — ACCESS participant validates Original Medicare status and qualifying condition
2. **Align beneficiary** (Alignment API) — Formal enrollment in the program
3. **Receive claims data** (optional, BCDA API) — Claims sent to support care coordination
4. **Submit OAP Measures data** (Reporting API, recurring) — Patient-reported outcome data submitted quarterly
5. **Submit G-code claims** (monthly to MAC) — Co-management claims billed
6. **Receive payments** (quarterly from Innovation Payment Contractor)

**Beneficiary Cost-Sharing:**
- CMS offers "patient incentive safe harbor" under 42 CFR § 1001.952(ii)(2)
- Organizations may elect to forego collection of beneficiary cost-sharing for OAPs as an engagement incentive
- **If organization collects cost-sharing:** Must clearly disclose expected amount before enrollment
- **Policy must be uniform** across all beneficiaries
- **Co-management payment:** Zero beneficiary cost-sharing (automatic)

### 4.3 Beneficiary Protections and Transparency

- **Public Directory:** CMS maintains public directory of ACCESS participants, conditions treated, risk-adjusted outcomes
- **Informed Choice:** Patients and PCPs can identify and compare participating organizations
- **Quality Monitoring:** CMS monitors performance; may disenroll participants failing to meet quality, safety, or outcome standards
- **Control Group:** Small share of applicants randomly assigned to control group for evaluation; control group maintains access to all regular Medicare services and usual providers

---

## 5. Care Delivery and Outcome-Focused Services

### 5.1 Emphasis on Outcomes, Not Activities

ACCESS emphasizes **accountability for outcomes rather than specific activities**, allowing flexibility in care delivery approach. This differs fundamentally from activity-based reimbursement.

**Guiding Principle:** If the patient achieves the outcome (e.g., pain improvement, functional gain), the organization is paid — regardless of which specific services or modalities were used.

### 5.2 Exemplar Services Permitted

Services that may be provided by ACCESS participants include but are not limited to:

- **Clinical:** Clinician consultations, medication prescription/management
- **Behavioral:** Therapy, behavioral health counseling, lifestyle support (nutrition, exercise, smoking cessation)
- **Technology-Enabled:** Remote monitoring, connected devices, mobile applications, software-enabled tools
- **Education & Coordination:** Patient education, care coordination
- **Diagnostic Support:** Ordering and interpretation of lab/diagnostic tests
- **Device Management:** Deployment and oversight of FDA-cleared, authorized, or approved software devices

**Delivery Modalities:**
- In-person
- Virtual/telehealth
- Asynchronous (messaging, automated tools)
- Other technology-enabled modalities (when legally and clinically appropriate)

### 5.3 Care Delivery Requirements

Beyond general Medicare participation requirements, ACCESS participants must:

1. **Enroll as Medicare provider/supplier** with physician Clinical Director
2. **Comply with all applicable regulations:** Licensure, HIPAA, FDA (where applicable)
3. **Establish care plans** aligned with patient goals and outcome targets
4. **Monitor and report outcomes** via CMS-specified APIs (FHIR-based)
5. **Coordinate with primary care** — send electronic updates at initiation, completion, clinical milestones
6. **Escalate concerns appropriately** — clinical concerns flagged to referring providers and clinical team

---

## 6. Performance Measurement and Payment Determination

### 6.1 How Is Performance Measured?

**Guideline-Informed Outcome Targets:**
- Each track includes condition-specific measures defined in consultation with clinical experts
- For MSK: pain intensity, pain interference, and overall function via validated PROM
- Targets are **guideline-based** (consistent with professional society recommendations)
- **Control** means meeting guideline-directed targets; **minimum improvement** means clinically meaningful progress toward targets

### 6.2 Payment Calculation

**CMS Determines Payment Based On:**
- **Overall proportion** of enrolled patients in the organization who achieve outcome targets
- **Minimum threshold** set by CMS (increases with each participation year, balancing accountability with accessibility)
- **Organization's performance** compared to threshold

**Example:** If CMS sets threshold at 60% of patients achieving outcomes, and the organization achieves 65%, payment is made. If organization achieves 55%, payment is reduced or not made (depending on specific formula).

### 6.3 Multi-Track Discount

Organizations participating in multiple tracks receive:
- **Administrative discount** applied to total payment when beneficiary enrolled in multiple tracks with same participant
- Reflects operational efficiencies of integrated care delivery

### 6.4 No Waivers of Cost-Sharing

- Organizations **cannot** require beneficiaries to waive Medicare cost-sharing as condition of enrollment
- Organizations **may optionally** waive cost-sharing as engagement incentive (via patient incentive safe harbor)
- If cost-sharing collected, must be disclosed clearly before enrollment

---

## 7. Care Coordination with Primary Care and Referring Clinicians

### 7.1 PCP and Referring Clinician Role

PCPs and referring clinicians are **central partners** in ACCESS:

- Can refer patients to ACCESS participants (identified via CMS directory)
- Receive electronic care updates from ACCESS participant at key moments
- Can bill co-management payment for documented review and coordination
- **Remain actively involved** in ongoing patient management
- Integrate ACCESS care into their patient's overall care plan

### 7.2 Electronic Care Coordination Requirements

ACCESS participants **must** electronically share care updates via:
- **Health Information Exchange (HIE)** or
- **CMS Aligned Networks** (similar trusted network)

**Timing of Care Updates:**
- **At care initiation** — baseline assessment, initial care plan
- **At care completion** — final assessment, outcomes achieved, recommendations
- **At defined clinical milestones** — significant changes in status, transitions in care phase

**Content of Updates:**
- Patient baseline and current status
- Identified MSK condition and qualifying criteria
- Exercise and behavioral plan summary
- Patient goals and progress
- PROM results
- Escalation alerts (if applicable)
- Recommendations for ongoing management

### 7.3 Co-Management Payment for PCPs/Referring Clinicians

**Payment Details:**
- **Standard amount:** ~$30 per service (subject to geographic adjustment and standard Medicare payment adjustments)
- **Onboarding supplement:** ~$10 additional for first billing with beneficiary (with CMS-specified modifier)
- **Frequency cap:** Once every 4 months per beneficiary per track
- **Annual cap:** Up to ~$100 per year per beneficiary
- **No cost-sharing:** Beneficiary has zero cost-sharing for this service
- **No advance consent required** from beneficiary

**Billing Requirements:**
- Clinician must **review the ACCESS Care Update** from participant
- **Document in EHR:** Brief written note with assessment and care-coordination action
- **Care-coordination actions include:** Medication change/reconciliation, updated problem list, monitoring instruction, referral

**G-Code and Modifier:** CMS will specify ACCESS Co-Management G-code, modifier, and detailed billing guidance in 2026

---

## 8. Data Reporting and Regulatory Compliance

### 8.1 Required Data Reporting

ACCESS participants must report required measures to CMS using:
- **Standards-based APIs** (CMS-hosted)
- **FHIR-based Reporting API** for outcome measures and monitoring data
- **G-code claims** (monthly to MAC for co-management billing)

**Specific Data Elements:**

| Data Type | Timing | Method |
|-----------|--------|--------|
| Beneficiary eligibility confirmation | Upon enrollment | Eligibility API |
| Baseline PROMs (pain, interference, function) | Within 10 days of enrollment | Reporting API (FHIR) |
| Quarterly OAP Measures data | Recurring (quarterly minimum) | Reporting API |
| Care plan and updates | At initiation, completion, milestones | HIE or CMS Aligned Network |
| Monthly G-code claims | Monthly | MAC claims submission |
| Final outcomes and completion summary | Within 30 days of care completion | Reporting API |

**Validation and Monitoring:**
- CMS monitors performance and quality metrics
- May conduct program integrity reviews
- May require audit trails for escalation events
- May disenroll participants for quality or compliance failures

### 8.2 Regulatory Compliance

**General Requirements:**
- Comply with all applicable federal and state licensure requirements
- Maintain HIPAA compliance (covered entity safeguards)
- Comply with FDA requirements for digital tools/devices or be subject to FDA enforcement discretion
- Maintain Medicare enrollment and comply with Medicare Conditions of Participation

**HIPAA-Specific (Covered Entity Safeguards):**
- Administrative safeguards: Workforce security, information access management, security awareness/training
- Technical safeguards: Access controls, encryption, audit controls
- Physical safeguards: Facility access, workstation security
- Breach notification: If PHI is compromised, must notify affected individuals and HHS
- Business Associate Agreements: Required for any vendors handling PHI

**Compliance Demonstration:**
- CMS will conduct program integrity audits
- Participants must cooperate with evaluation activities
- Participants must maintain records demonstrating compliance
- Adverse events must be reported (mechanism TBD in implementation guide)

---

## 9. FDA Considerations for Digital Tools and Devices

### 9.1 What Is Subject to FDA Oversight?

Software and hardware tools used in ACCESS **may** be devices regulated by FDA if they are:
- Intended for diagnosis, cure, mitigation, treatment, or prevention of disease OR
- Intended to affect body structure or function

**Examples of FDA-regulated devices:**
- Mobile applications with clinical decision support
- Wearable devices (smartwatches, fitness trackers measuring clinical parameters)
- Remote monitoring equipment (blood pressure cuffs, weight scales, pulse oximeters)
- Connected clinical devices
- Certain software (mobile medical apps, software as a medical device)

**NOT regulated as devices:**
- General wellness products (fitness trackers for general health, meditation apps)
- Administrative tools (data storage, scheduling, administrative support)
- EHR systems
- Purely informational apps without clinical intent

### 9.2 FDA Compliance Responsibility

**ACCESS participants are responsible for ensuring:**
- Medical devices used in the model are **legally marketed** with intended use matching model use
- Devices are appropriately cleared, approved, 510(k)-exempt, or otherwise compliant
- Exceptions: Devices subject to FDA enforcement discretion (e.g., under TEMPO pilot)

**Types of FDA Authorization:**
- **Premarket Clearance (510(k)):** Most devices; lower risk; "substantial equivalence" to existing devices
- **Premarket Approval (PMA):** Higher-risk devices; requires demonstration of safety and effectiveness
- **510(k)-Exempt:** Some device types do not require premarket authorization
- **De Novo:** New device types creating new regulatory category

### 9.3 FDA TEMPO Pilot (Technology-Enabled Meaningful Patient Outcomes)

**What is TEMPO?**
- FDA initiative for manufacturers of certain digital health devices
- Allows devices to be used in ACCESS **without prior FDA premarket authorization**
- FDA exercises enforcement discretion for qualifying devices
- Generates real-world performance data to support future FDA submissions

**Key Features:**
- **Manufacturer applies directly to FDA** (separate from ACCESS application)
- **Risk mitigation plan:** Manufacturer proposes data collection, monitoring, reporting plan
- **FDA oversight:** FDA monitors device use and real-world performance
- **Patient consent requirement:** Enhanced consent required, informing patient that device is in FDA pilot
- **Data sharing with FDA:** Agreed-upon data collected and shared with FDA

**TEMPO Participation:**
- **Optional** for ACCESS participants
- Particularly valuable for organizations developing novel digital health devices
- Enables clinical use while collecting real-world evidence
- May support future FDA marketing submissions

**For KIMI Specifically:** If KIMI qualifies for TEMPO (pending FDA/manufacturer discussion), KIMI could be used in ACCESS under enforcement discretion with enhanced patient consent and FDA data monitoring.

### 9.4 CDS (Clinical Decision Support) Exemption Analysis

Some of KIMI's functions may qualify for CDS exemption from FDA device regulation if they:
1. Do not acquire, process, or analyze medical images/signals
2. Are intended for displaying, analyzing, or printing medical information
3. Are intended for supporting healthcare professional decision-making (not autonomous decisions)
4. Enable healthcare professionals to independently review the basis for recommendations

**KIMI's Positioning:** KIMI functions primarily as **patient-facing coaching tool** executing clinician-approved care protocols (not autonomous clinical decision-making), which may support CDS exemption.

---

## 10. FAQs and Common Questions

### 10.1 Payment and Revenue Questions

**Q: How does ACCESS payment work for multi-track organizations?**
A: Organizations receive full payment for each track, but a discount is applied to total payment when a beneficiary is enrolled in multiple tracks with the same organization. This reflects operational efficiencies.

**Q: Will beneficiaries have to pay cost-sharing?**
A: CMS offers a "patient incentive safe harbor" allowing organizations to waive OAP cost-sharing as an engagement incentive. If an organization collects cost-sharing, it must be uniform across all beneficiaries and clearly disclosed before enrollment. Co-management payments have zero beneficiary cost-sharing.

**Q: How do payments compare to current FFS payments?**
A: That depends on the organization's performance. If the organization achieves outcome targets for a high percentage of patients, ACCESS payments may exceed FFS. If outcomes are not achieved, payments may be lower. The model rewards results.

### 10.2 Participation and Application Questions

**Q: Can we start in July 2026 if we apply now?**
A: Only if your application is received by March 20, 2026 (first cohort deadline). Rolling admissions continue through 2033 with multiple subsequent cohort start dates.

**Q: Do we need to be enrolled in Medicare before applying for ACCESS?**
A: Yes. Medicare Part B enrollment must be **complete** before your ACCESS application can be approved. Start the enrollment process as early as possible.

**Q: Can our organization participate in just the MSK track?**
A: Yes. Organizations can participate in one or multiple tracks.

**Q: What if we want to add tracks after launch?**
A: Contact CMS. Additional track participation opportunities may be available depending on implementation timelines.

### 10.3 Clinical and Care Delivery Questions

**Q: Does ACCESS restrict which services we can provide?**
A: No. ACCESS emphasizes flexibility in care delivery. You can use any combination of in-person, virtual, remote monitoring, and technology-enabled services as long as they're clinically appropriate and legally permitted. The only requirement is achieving outcome targets.

**Q: Do we have to use specific software or devices?**
A: No. You have flexibility to choose tools. CMS will maintain an optional "ACCESS Tools Directory" listing software and hardware vendors (voluntary participation, non-endorsing). You are not required to use any specific vendor.

**Q: What if a patient doesn't meet outcome targets?**
A: Payment will be reduced or not paid depending on the percentage of patients achieving targets. This incentivizes strong clinical outcomes focus and care coordination.

### 10.4 Compliance and Regulatory Questions

**Q: What FDA compliance is required?**
A: Ensure any digital tools or connected devices are legally marketed for their intended use in the model. They must be cleared, approved, 510(k)-exempt, or subject to FDA enforcement discretion (e.g., TEMPO pilot). General wellness products without clinical intent are typically not regulated.

**Q: Are there HIPAA requirements?**
A: Yes. Participants must be HIPAA covered entities with administrative, technical, and physical safeguards for PHI. Maintain Business Associate Agreements with any vendors handling PHI.

**Q: How does CMS monitor compliance?**
A: CMS will conduct program integrity reviews, may audit performance metrics, and require cooperation with evaluation activities. Participants must report adverse events and maintain compliance records.

**Q: Can we participate if we don't meet all requirements yet?**
A: No. All requirements (Medicare enrollment, licensure, HIPAA compliance, FDA compliance for applicable tools, physician Clinical Director designation) must be met before ACCESS application approval.

### 10.5 Interaction with Other Programs

**Q: How does ACCESS interact with ACOs and shared savings models?**
A: For 2026-2027, ACCESS OAPs will NOT impact ACO benchmark/performance calculations. Starting 2028, ACCESS expenditures will be included in ACO calculations. ACCESS is designed to complement (not replace) existing ACO arrangements.

**Q: Is ACCESS an Advanced APM (A-APM) for MIPS purposes?**
A: No. CMS does not expect ACCESS to qualify as an A-APM. MIPS reporting obligations are not anticipated.

**Q: Can Medicare Advantage plans participate?**
A: ACCESS is being tested in Original Medicare only. However, MA plans may independently adopt similar outcome-aligned payment arrangements with their contracted providers without a CMS waiver.

**Q: Can Medicaid plans implement ACCESS-like models?**
A: Yes, through the "In Lieu of Services and Settings" (ILOS) authority under 42 CFR § 438.3(e)(2) and 438.16. States have flexibility to determine if/how ACCESS-like models qualify as ILOS. States typically do not need a separate waiver.

---

## 11. Implementation Timeline and Key Dates

| Milestone | Timeline |
|-----------|----------|
| CMS Opens Application Portal | January 2026 |
| First Cohort Application Deadline | March 20, 2026 |
| First Cohort Model Launch | July 5, 2026 |
| TEMPO Pilot Application Opens (Pending) | 2026 (date TBD) |
| CMS Releases Implementation Guide | 2026 |
| CMS Releases G-Code and Billing Guidance | 2026 |
| Subsequent Cohort Deadlines | Rolling through 2033 |
| Model Evaluation Complete | June 30, 2036 |
| Potential Expansion/Permanence Decision | Post-evaluation |

---

## 12. Key References and Resources

**Primary Source Documents:**
- CMS ACCESS Model Request for Applications (RFA 02-12-2026)
- ACCESS Technical Frequently Asked Questions (CMS, updated 12/18/2025)
- KIMI MSK Agent Knowledge Base, Sections 10 (Care Coordination and Reporting)

**External Resources:**
- CMS Innovation Center Website: https://innovation.cms.gov/
- FDA Digital Health Center of Excellence: https://www.fda.gov/medical-devices/digital-health-center-excellence
- FDA TEMPO Pilot Information: (See FDA Digital Health site)
- HHS Office for Civil Rights HIPAA for Professionals: https://www.hhs.gov/hipaa/

**Supporting Materials (When Available):**
- ACCESS Application Portal and Materials (Q1 2026)
- Implementation Guide (Q2 2026)
- ACCESS Tools Directory (Post-launch)
- Public Directory of Participants and Outcomes (Post-launch)
- Billing Guidance and G-Codes (Q2 2026)

---

## Document Change History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | April 3, 2026 | Initial creation from ACCESS RFA 02-12-2026 and Technical FAQs |

---

**End of KB_ACCESS_Model_Reference.md**
