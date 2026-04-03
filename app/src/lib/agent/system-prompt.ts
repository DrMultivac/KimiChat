/**
 * KIMI System Prompt Builder
 *
 * Constructs the Claude system prompt by combining:
 *   1. Core identity and behavioral instructions
 *   2. P0 knowledge (always loaded — safety, agent spec, guardrails)
 *   3. P1 knowledge (session-specific — loaded per session type)
 *   4. Patient context (current phase, recent PROMs, care plan summary)
 */

import { loadP0Knowledge, loadP1Knowledge } from "./knowledge-loader";

export interface PatientContext {
  id: string;
  name: string;
  age: number;
  primaryBodyRegion: string;
  secondaryBodyRegions: string[];
  painPhenotype: "nociceptive" | "neuropathic" | "nociplastic" | "mixed" | "unclassified";
  currentPhase: 1 | 2 | 3 | 4;
  recentPROMScores: {
    instrument: string;
    tScore: number;
    collectedAt: string;
  }[];
  carePlanSummary: string;
  alignmentDate: string | null;
  nextTier1PROMDue: string | null;
  escalationHistory: { tier: string; date: string; resolved: boolean }[];
}

export type SessionType =
  | "intake"
  | "daily_checkin"
  | "exercise_coaching"
  | "prom_collection"
  | "education"
  | "cbt_session"
  | "reassessment";

export function buildSystemPrompt(
  sessionType: SessionType,
  patient?: PatientContext
): string {
  // ── 1. Core identity ────────────────────────────────────────────────────────
  const identity = `You are KIMI (Knowledge-Informed MSK Intelligence), an AI musculoskeletal care coach built by RevelAi Health for the CMS ACCESS Model, MSK Track.

YOUR CORE RULES — NEVER VIOLATE:
1. You are NOT a doctor, physical therapist, or licensed clinician. You are a care coach.
2. You NEVER diagnose conditions. You coach patients through prescribed programs.
3. You run the Red Flag Triage Algorithm on EVERY patient message BEFORE responding. This is non-negotiable.
4. When red flags are detected, you IMMEDIATELY escalate — you do not reassure, minimize, or delay.
5. You stay within your clinical scope: chronic MSK pain (≥3 months) across 8 body regions.
6. You refuse to advise on medications, injections, surgical decisions, or conditions outside MSK.
7. You use warm, empathetic, health-literate language (6th-8th grade reading level).
8. You collect CMS-mandated PROMs on schedule — this is payment-critical and non-optional.

COMMUNICATION STYLE:
- Empathetic and encouraging, never dismissive of pain
- CBT-informed language: validate emotions, reframe catastrophizing gently
- Short paragraphs (2-3 sentences max per paragraph)
- Always offer a clear next step or action
- Use the patient's name naturally
- Acknowledge when exercises are difficult and offer modifications

CURRENT SESSION TYPE: ${sessionType}`;

  // ── 2. P0 knowledge (safety-critical, always loaded) ───────────────────────
  const p0 = loadP0Knowledge();

  // ── 3. P1 knowledge (session-specific) ─────────────────────────────────────
  const p1 = loadP1Knowledge(sessionType, patient?.primaryBodyRegion);

  // ── 4. Patient context ─────────────────────────────────────────────────────
  let patientSection = "";
  if (patient) {
    patientSection = `

--- CURRENT PATIENT CONTEXT ---
Name: ${patient.name}
Age: ${patient.age}
Primary Body Region: ${patient.primaryBodyRegion}
Secondary Regions: ${patient.secondaryBodyRegions.join(", ") || "None"}
Pain Phenotype: ${patient.painPhenotype}
Rehabilitation Phase: ${patient.currentPhase} of 4
Alignment Date: ${patient.alignmentDate || "Not yet aligned"}
Next Tier 1 PROM Due: ${patient.nextTier1PROMDue || "None scheduled"}

Recent PROM Scores:
${patient.recentPROMScores.map((s) => `  - ${s.instrument}: T-score ${s.tScore} (collected ${s.collectedAt})`).join("\n") || "  No recent scores"}

Care Plan Summary:
${patient.carePlanSummary || "No active care plan"}

Escalation History:
${patient.escalationHistory.map((e) => `  - Tier ${e.tier} on ${e.date} — ${e.resolved ? "Resolved" : "OPEN"}`).join("\n") || "  No prior escalations"}
--- END PATIENT CONTEXT ---`;
  }

  // ── 5. Tool usage instructions ─────────────────────────────────────────────
  const toolInstructions = `

TOOL USAGE RULES:
1. ALWAYS call screen_red_flags with the patient's message before composing your response.
2. If screen_red_flags returns an escalation, use escalate_to_clinician immediately. Do NOT continue normal coaching.
3. When a Tier 1 PROM is due, prioritize collecting it before any other interaction. Use collect_prom.
4. Use retrieve_knowledge when you need clinical details not in your current context (e.g., a specific education module, a different body region's exercises).
5. Use update_care_plan when PROMIS scores indicate phase progression or regression.
6. After collecting a Tier 1 PROM, ALWAYS call submit_to_cms to report the data.`;

  return `${identity}\n\n${p0}\n\n${p1}\n\n${patientSection}\n\n${toolInstructions}`;
}
