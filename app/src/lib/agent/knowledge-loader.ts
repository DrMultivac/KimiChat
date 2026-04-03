/**
 * KIMI Knowledge Base Loader
 *
 * Structured tiered prompt injection — NOT vector RAG.
 * Clinical safety requires deterministic retrieval; we never risk
 * returning the wrong red-flag protocol from a cosine-similarity search.
 *
 * Tier structure:
 *   P0 (always loaded)  — Agent spec, safety guardrails, red flag triage
 *   P1 (session-loaded)  — Loaded by session type (intake, coaching, PROM, education)
 *   P2 (on-demand)       — Fetched via retrieve_knowledge tool when agent needs it
 */

import fs from "fs";
import path from "path";

// ── Knowledge base root (relative to the monorepo root) ──────────────────────
const KB_ROOT = path.resolve(process.cwd(), "..", "knowledge-base");

// ── File manifest with tier + metadata ───────────────────────────────────────
export interface KBFile {
  id: string;
  tier: "P0" | "P1" | "P2";
  category: string;
  path: string; // relative to KB_ROOT
  sessionTypes: string[]; // which session types trigger P1 loading
  bodyRegions?: string[]; // optional body-region filter
  description: string;
}

export const KB_MANIFEST: KBFile[] = [
  // ── P0: Always loaded (safety-critical) ────────────────────────────────────
  {
    id: "agent-spec",
    tier: "P0",
    category: "agent-spec",
    path: "agent-spec/KB_00_Agent_Specification.md",
    sessionTypes: ["*"],
    description: "Master behavioral contract — identity, scope, capabilities, refusal patterns",
  },
  {
    id: "red-flag-triage",
    tier: "P0",
    category: "safety",
    path: "safety/Clinical_Reference_Red_Flag_Triage_Algorithm.md",
    sessionTypes: ["*"],
    description: "4-tier red flag escalation algorithm by body region",
  },
  {
    id: "clinical-guardrails",
    tier: "P0",
    category: "safety",
    path: "safety/KB_Clinical_Guardrails_Safety.md",
    sessionTypes: ["*"],
    description: "Safety boundaries, scope limits, escalation rules",
  },

  // ── P1: Session-type loaded ────────────────────────────────────────────────
  {
    id: "intake-architecture",
    tier: "P1",
    category: "clinical-engine",
    path: "clinical-engine/KB_Intake_Architecture.md",
    sessionTypes: ["intake"],
    description: "11-step intake conversation flow",
  },
  {
    id: "intake-conditions",
    tier: "P1",
    category: "clinical-engine",
    path: "clinical-engine/KB_Intake_Condition_Protocols.md",
    sessionTypes: ["intake"],
    description: "Condition-specific intake questions per body region",
  },
  {
    id: "pain-phenotyping",
    tier: "P1",
    category: "clinical-engine",
    path: "clinical-engine/KB_Intake_Pain_Phenotyping.md",
    sessionTypes: ["intake", "reassessment"],
    description: "Nociceptive / neuropathic / nociplastic classification",
  },
  {
    id: "prom-survey-mapping",
    tier: "P1",
    category: "clinical-engine",
    path: "clinical-engine/KB_Intake_PROM_Survey_Mapping.md",
    sessionTypes: ["intake", "prom_collection"],
    description: "Which PROMs to administer based on condition",
  },
  {
    id: "prom-instruments",
    tier: "P1",
    category: "outcomes",
    path: "outcomes/KB_PROM_Instruments.md",
    sessionTypes: ["prom_collection", "intake"],
    description: "All PROM instruments, scoring, two-tier collection strategy",
  },
  {
    id: "care-plan-construction",
    tier: "P1",
    category: "clinical-engine",
    path: "clinical-engine/KB_Intake_Care_Plan_Construction.md",
    sessionTypes: ["intake", "reassessment"],
    description: "Rules for generating individualized care plans",
  },
  {
    id: "conversation-scripts",
    tier: "P1",
    category: "conversation",
    path: "conversation/KB_Conversation_Scripts.md",
    sessionTypes: ["daily_checkin", "exercise_coaching", "education"],
    description: "10 session-type conversation templates",
  },
  {
    id: "cbt-communication",
    tier: "P1",
    category: "conversation",
    path: "conversation/Clinical_Reference_CBT_Communication_Protocol.md",
    sessionTypes: ["daily_checkin", "exercise_coaching", "cbt_session"],
    description: "CBT-informed communication techniques",
  },
  {
    id: "coaching-cadence",
    tier: "P1",
    category: "clinical-engine",
    path: "clinical-engine/Clinical_Reference_Coaching_Cadence_Protocol.md",
    sessionTypes: ["daily_checkin", "exercise_coaching"],
    description: "When and how to check in with patients",
  },
  {
    id: "exercise-knee-hip",
    tier: "P1",
    category: "exercise-library",
    path: "exercise-library/KB_Exercise_Library_Knee_Hip.md",
    sessionTypes: ["exercise_coaching"],
    bodyRegions: ["knee", "hip"],
    description: "Knee and hip exercise protocols by phase",
  },
  {
    id: "exercise-spine",
    tier: "P1",
    category: "exercise-library",
    path: "exercise-library/KB_Exercise_Library_Spine.md",
    sessionTypes: ["exercise_coaching"],
    bodyRegions: ["lower_back", "neck"],
    description: "Lumbar and cervical exercise protocols",
  },
  {
    id: "exercise-upper",
    tier: "P1",
    category: "exercise-library",
    path: "exercise-library/KB_Exercise_Library_Upper_Extremity.md",
    sessionTypes: ["exercise_coaching"],
    bodyRegions: ["shoulder", "elbow", "wrist_hand"],
    description: "Shoulder, elbow, wrist/hand protocols",
  },
  {
    id: "flare-management",
    tier: "P1",
    category: "exercise-library",
    path: "exercise-library/KB_Flare_Management_Falls_Prevention.md",
    sessionTypes: ["exercise_coaching", "daily_checkin"],
    description: "Flare response and falls prevention",
  },

  // ── P2: On-demand (loaded via retrieve_knowledge tool) ─────────────────────
  {
    id: "exercise-by-phenotype",
    tier: "P2",
    category: "clinical-engine",
    path: "clinical-engine/Clinical_Reference_Exercise_by_Pain_Phenotype.md",
    sessionTypes: [],
    description: "Exercise selection rules by pain phenotype",
  },
  {
    id: "biopsychosocial",
    tier: "P2",
    category: "clinical-engine",
    path: "clinical-engine/Clinical_Reference_Biopsychosocial_Model.md",
    sessionTypes: [],
    description: "Psychosocial screening and integration",
  },
  {
    id: "patient-ed-older-adults",
    tier: "P2",
    category: "clinical-engine",
    path: "clinical-engine/Clinical_Reference_Patient_Education_Older_Adults.md",
    sessionTypes: [],
    description: "Age-appropriate education adaptations",
  },
  {
    id: "decision-aids",
    tier: "P2",
    category: "clinical-engine",
    path: "clinical-engine/KB_Decision_Aids_Shared_Decision_Making.md",
    sessionTypes: [],
    description: "AHRQ SHARE approach for shared decision-making",
  },
  {
    id: "education-joint-oa",
    tier: "P2",
    category: "education",
    path: "education/KB_Patient_Education_Joint_OA.md",
    sessionTypes: [],
    description: "Osteoarthritis education content",
  },
  {
    id: "education-spine",
    tier: "P2",
    category: "education",
    path: "education/KB_Patient_Education_Spine.md",
    sessionTypes: [],
    description: "Spine condition education content",
  },
  {
    id: "cbt-modules",
    tier: "P2",
    category: "education",
    path: "education/KB_CBT_Pain_Psychology_Modules.md",
    sessionTypes: [],
    description: "7 CBT-based pain coping modules",
  },
  {
    id: "nutrition-sleep",
    tier: "P2",
    category: "education",
    path: "education/KB_Nutrition_Sleep_Lifestyle.md",
    sessionTypes: [],
    description: "Lifestyle modification guidance",
  },
  {
    id: "access-api",
    tier: "P2",
    category: "regulatory",
    path: "regulatory/KB_ACCESS_API_Implementation.md",
    sessionTypes: [],
    description: "CMS ACCESS API specs — 4 FHIR APIs",
  },
  {
    id: "access-model-ref",
    tier: "P2",
    category: "regulatory",
    path: "regulatory/KB_ACCESS_Model_Reference.md",
    sessionTypes: [],
    description: "ACCESS Model overview and eligibility",
  },
  {
    id: "access-payment",
    tier: "P2",
    category: "regulatory",
    path: "regulatory/KB_ACCESS_MSK_Payment_Performance.md",
    sessionTypes: [],
    description: "OAP payment structure and performance targets",
  },
  {
    id: "duke-joint-health",
    tier: "P2",
    category: "programs",
    path: "programs/KB_Duke_Joint_Health_Program.md",
    sessionTypes: [],
    description: "Duke University joint health protocol",
  },
  {
    id: "spine-health",
    tier: "P2",
    category: "programs",
    path: "programs/KB_Spine_Health_Program.md",
    sessionTypes: [],
    description: "Spine health program protocol",
  },
];

// ── Loading functions ────────────────────────────────────────────────────────

function loadFile(relativePath: string): string {
  const fullPath = path.join(KB_ROOT, relativePath);
  try {
    return fs.readFileSync(fullPath, "utf-8");
  } catch {
    console.error(`[KB] Failed to load: ${fullPath}`);
    return `[ERROR: Could not load ${relativePath}]`;
  }
}

/** Load all P0 (always-present) knowledge — safety-critical, loaded every turn */
export function loadP0Knowledge(): string {
  const p0Files = KB_MANIFEST.filter((f) => f.tier === "P0");
  const sections = p0Files.map(
    (f) =>
      `\n\n--- BEGIN ${f.id.toUpperCase()} (${f.description}) ---\n${loadFile(f.path)}\n--- END ${f.id.toUpperCase()} ---`
  );
  return sections.join("\n");
}

/** Load P1 knowledge for a specific session type and optional body region */
export function loadP1Knowledge(
  sessionType: string,
  bodyRegion?: string
): string {
  const p1Files = KB_MANIFEST.filter(
    (f) =>
      f.tier === "P1" &&
      f.sessionTypes.includes(sessionType) &&
      (!f.bodyRegions || !bodyRegion || f.bodyRegions.includes(bodyRegion))
  );
  const sections = p1Files.map(
    (f) =>
      `\n\n--- BEGIN ${f.id.toUpperCase()} (${f.description}) ---\n${loadFile(f.path)}\n--- END ${f.id.toUpperCase()} ---`
  );
  return sections.join("\n");
}

/** Load a specific KB file by ID — used by the retrieve_knowledge tool */
export function loadByID(fileId: string): string | null {
  const entry = KB_MANIFEST.find((f) => f.id === fileId);
  if (!entry) return null;
  return loadFile(entry.path);
}

/** List all available KB files (for the agent to know what it can retrieve) */
export function listAvailableKnowledge(): { id: string; description: string; tier: string }[] {
  return KB_MANIFEST.map((f) => ({
    id: f.id,
    description: f.description,
    tier: f.tier,
  }));
}
