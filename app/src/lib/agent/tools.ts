/**
 * KIMI Agent Tools — Claude Function Calling Definitions
 *
 * Each tool maps to one of the 12 KIMI system components.
 * Tools are defined as Anthropic tool schemas and implemented
 * as handler functions that interact with Supabase + CMS APIs.
 */

import type { Tool } from "@anthropic-ai/sdk/resources/messages";

// ── Tool Definitions (Claude function calling schema) ────────────────────────

export const KIMI_TOOLS: Tool[] = [
  // ── SAFETY (non-bypassable) ────────────────────────────────────────────────
  {
    name: "screen_red_flags",
    description:
      "MANDATORY: Screen the patient's latest message for red flag symptoms requiring clinical escalation. Must be called on EVERY patient message before generating a response. Returns 'clear' or an escalation tier with specific red flags detected.",
    input_schema: {
      type: "object" as const,
      properties: {
        patient_message: {
          type: "string",
          description: "The patient's most recent message text",
        },
        body_region: {
          type: "string",
          description: "Patient's primary body region",
          enum: [
            "lower_back", "neck", "knee", "hip",
            "shoulder", "elbow", "wrist_hand", "ankle_foot",
          ],
        },
        recent_symptoms: {
          type: "string",
          description: "Summary of symptoms reported in recent sessions",
        },
      },
      required: ["patient_message", "body_region"],
    },
  },
  {
    name: "escalate_to_clinician",
    description:
      "Immediately escalate a patient to a human clinician. Used when red flags are detected or when clinical judgment beyond KIMI's scope is needed.",
    input_schema: {
      type: "object" as const,
      properties: {
        patient_id: { type: "string" },
        escalation_tier: {
          type: "string",
          enum: ["1_emergency", "2_urgent", "3_semi_urgent", "4_monitoring"],
        },
        red_flags: {
          type: "array",
          items: { type: "string" },
          description: "List of specific red flag symptoms detected",
        },
        clinical_context: {
          type: "string",
          description: "Brief summary of the clinical situation",
        },
      },
      required: ["patient_id", "escalation_tier", "red_flags", "clinical_context"],
    },
  },

  // ── PROM COLLECTION ────────────────────────────────────────────────────────
  {
    name: "collect_prom",
    description:
      "Initiate collection of a validated PROM instrument. Returns the instrument items to display to the patient as a structured form. For Tier 1 (CMS-mandated) PROMs, this must be followed by submit_to_cms after scoring.",
    input_schema: {
      type: "object" as const,
      properties: {
        patient_id: { type: "string" },
        instrument: {
          type: "string",
          enum: [
            "NRS", "PROMIS_PF_6B", "PROMIS_PF_CAT",
            "PROMIS_PI_6A", "PROMIS_PI_CAT", "PGIC",
            "ODI", "NDI", "KOOS_JR", "HOOS_JR", "QUICK_DASH",
          ],
        },
        tier: {
          type: "string",
          enum: ["1_cms_mandated", "2_clinical"],
        },
        collection_type: {
          type: "string",
          enum: ["baseline", "quarterly_q1", "quarterly_q2", "quarterly_q3", "end_of_period", "weekly", "daily"],
        },
      },
      required: ["patient_id", "instrument", "tier", "collection_type"],
    },
  },
  {
    name: "score_prom",
    description:
      "Score a completed PROM instrument. Takes item responses and returns raw score, T-score, and clinical interpretation.",
    input_schema: {
      type: "object" as const,
      properties: {
        instrument: { type: "string" },
        item_responses: {
          type: "object",
          description: "Map of item IDs to response values",
        },
      },
      required: ["instrument", "item_responses"],
    },
  },

  // ── CMS API INTEGRATION ────────────────────────────────────────────────────
  {
    name: "submit_to_cms",
    description:
      "Submit scored PROM data to CMS via the Data Reporting API. Constructs a FHIR ACCESSDataReportingBundle and submits it. MUST be called after every Tier 1 PROM collection.",
    input_schema: {
      type: "object" as const,
      properties: {
        patient_id: { type: "string" },
        prom_response_ids: {
          type: "array",
          items: { type: "string" },
          description: "IDs of the PROM responses to include in the submission",
        },
      },
      required: ["patient_id", "prom_response_ids"],
    },
  },
  {
    name: "check_eligibility",
    description:
      "Check a patient's eligibility for the CMS ACCESS Model MSK Track via the Eligibility API.",
    input_schema: {
      type: "object" as const,
      properties: {
        patient_name: { type: "string" },
        date_of_birth: { type: "string", description: "YYYY-MM-DD format" },
        medicare_id: { type: "string" },
      },
      required: ["patient_name", "date_of_birth", "medicare_id"],
    },
  },
  {
    name: "align_patient",
    description:
      "Formally align (enroll) a patient into the ACCESS Model MSK Track via the Alignment API.",
    input_schema: {
      type: "object" as const,
      properties: {
        patient_id: { type: "string" },
        condition_codes: {
          type: "array",
          items: { type: "string" },
          description: "ICD-10 codes for the patient's MSK conditions",
        },
        body_region: { type: "string" },
      },
      required: ["patient_id", "condition_codes", "body_region"],
    },
  },

  // ── CLINICAL ENGINE ────────────────────────────────────────────────────────
  {
    name: "classify_pain_phenotype",
    description:
      "Classify a patient's pain phenotype based on symptoms, history, and screening scores. Returns nociceptive, neuropathic, nociplastic, or mixed.",
    input_schema: {
      type: "object" as const,
      properties: {
        patient_id: { type: "string" },
        symptoms: {
          type: "array",
          items: { type: "string" },
          description: "List of reported symptoms",
        },
        pain_distribution: { type: "string" },
        screening_scores: {
          type: "object",
          description: "CSI, DN4, or other screening tool scores",
        },
      },
      required: ["patient_id", "symptoms"],
    },
  },
  {
    name: "get_exercise_prescription",
    description:
      "Get appropriate exercises for a patient based on their body region, rehabilitation phase, pain phenotype, and current pain level.",
    input_schema: {
      type: "object" as const,
      properties: {
        body_region: { type: "string" },
        phase: { type: "number", enum: [1, 2, 3, 4] },
        pain_phenotype: { type: "string" },
        current_pain_level: {
          type: "number",
          description: "NRS 0-10",
        },
      },
      required: ["body_region", "phase"],
    },
  },
  {
    name: "update_care_plan",
    description:
      "Update a patient's care plan — advance or regress phase, modify exercise prescription, add/remove education modules.",
    input_schema: {
      type: "object" as const,
      properties: {
        patient_id: { type: "string" },
        action: {
          type: "string",
          enum: ["advance_phase", "regress_phase", "modify_exercises", "add_education", "add_cbt_module"],
        },
        details: { type: "string" },
      },
      required: ["patient_id", "action"],
    },
  },
  {
    name: "check_phase_progression",
    description:
      "Evaluate whether a patient's PROMIS scores meet the threshold for advancing to the next rehabilitation phase.",
    input_schema: {
      type: "object" as const,
      properties: {
        patient_id: { type: "string" },
      },
      required: ["patient_id"],
    },
  },

  // ── KNOWLEDGE RETRIEVAL ────────────────────────────────────────────────────
  {
    name: "retrieve_knowledge",
    description:
      "Retrieve additional clinical knowledge from the knowledge base. Use this when you need information not currently in your context — e.g., a specific education module, exercise library for a different body region, or regulatory details.",
    input_schema: {
      type: "object" as const,
      properties: {
        file_id: {
          type: "string",
          description:
            "The knowledge base file ID to retrieve. Available IDs: exercise-by-phenotype, biopsychosocial, patient-ed-older-adults, decision-aids, education-joint-oa, education-spine, cbt-modules, nutrition-sleep, access-api, access-model-ref, access-payment, duke-joint-health, spine-health",
        },
      },
      required: ["file_id"],
    },
  },
];

// ── Tool Handler Dispatch ────────────────────────────────────────────────────

export type ToolResult = {
  success: boolean;
  data?: unknown;
  error?: string;
};

/**
 * Execute a tool call. In production, each handler will interact with
 * Supabase for data persistence and the FHIR client for CMS APIs.
 * For the foundation scaffold, handlers return structured mock responses
 * that demonstrate the data flow.
 */
export async function executeToolCall(
  toolName: string,
  toolInput: Record<string, unknown>
): Promise<ToolResult> {
  switch (toolName) {
    case "screen_red_flags":
      return handleScreenRedFlags(toolInput);
    case "escalate_to_clinician":
      return handleEscalation(toolInput);
    case "collect_prom":
      return handleCollectPROM(toolInput);
    case "score_prom":
      return handleScorePROM(toolInput);
    case "submit_to_cms":
      return handleSubmitToCMS(toolInput);
    case "check_eligibility":
      return handleCheckEligibility(toolInput);
    case "align_patient":
      return handleAlignPatient(toolInput);
    case "classify_pain_phenotype":
      return handleClassifyPain(toolInput);
    case "get_exercise_prescription":
      return handleGetExercises(toolInput);
    case "update_care_plan":
      return handleUpdateCarePlan(toolInput);
    case "check_phase_progression":
      return handleCheckPhase(toolInput);
    case "retrieve_knowledge":
      return handleRetrieveKnowledge(toolInput);
    default:
      return { success: false, error: `Unknown tool: ${toolName}` };
  }
}

// ── Handler Implementations ──────────────────────────────────────────────────
// These are the foundation scaffolds. Each will be connected to Supabase
// and the FHIR client in subsequent implementation phases.

import { loadByID } from "./knowledge-loader";

async function handleScreenRedFlags(
  input: Record<string, unknown>
): Promise<ToolResult> {
  const message = (input.patient_message as string || "").toLowerCase();

  // P0 red flag keywords — these are always checked, non-bypassable
  const emergencyFlags = [
    "chest pain", "can't breathe", "difficulty breathing", "numbness in both legs",
    "loss of bladder", "loss of bowel", "can't control urine", "can't control bowel",
    "saddle numbness", "worst headache", "sudden weakness both",
  ];
  const urgentFlags = [
    "fever", "night sweats", "unexplained weight loss", "can't bear weight",
    "progressive weakness", "numbness spreading", "vision changes",
    "swelling and redness", "hot to touch", "severe pain waking",
  ];

  const detectedEmergency = emergencyFlags.filter((f) => message.includes(f));
  const detectedUrgent = urgentFlags.filter((f) => message.includes(f));

  if (detectedEmergency.length > 0) {
    return {
      success: true,
      data: {
        status: "ESCALATE",
        tier: "1_emergency",
        red_flags: detectedEmergency,
        instruction: "STOP all coaching. Tell patient to call 911 or go to the nearest ER immediately.",
      },
    };
  }
  if (detectedUrgent.length > 0) {
    return {
      success: true,
      data: {
        status: "ESCALATE",
        tier: "2_urgent",
        red_flags: detectedUrgent,
        instruction: "Pause coaching. Advise patient to contact their healthcare provider within 24 hours. Notify assigned clinician.",
      },
    };
  }

  return {
    success: true,
    data: {
      status: "CLEAR",
      message: "No red flags detected. Proceed with normal coaching.",
    },
  };
}

async function handleEscalation(
  input: Record<string, unknown>
): Promise<ToolResult> {
  // TODO: Write escalation to Supabase, notify clinician via realtime
  return {
    success: true,
    data: {
      escalation_id: `esc_${Date.now()}`,
      tier: input.escalation_tier,
      status: "created",
      clinician_notified: true,
      message: "Escalation recorded. Clinician has been notified.",
    },
  };
}

async function handleCollectPROM(
  input: Record<string, unknown>
): Promise<ToolResult> {
  const instrument = input.instrument as string;

  // Return the instrument structure for the UI to render as a form
  const instruments: Record<string, unknown> = {
    NRS: {
      name: "Numeric Pain Rating Scale",
      items: [
        { id: "nrs_current", text: "On a scale of 0 to 10, where 0 is no pain and 10 is the worst pain imaginable, how would you rate your pain RIGHT NOW?", type: "slider", min: 0, max: 10 },
        { id: "nrs_worst", text: "In the past 24 hours, what was the WORST your pain has been?", type: "slider", min: 0, max: 10 },
        { id: "nrs_best", text: "In the past 24 hours, what was the LEAST pain you had?", type: "slider", min: 0, max: 10 },
        { id: "nrs_average", text: "In the past 24 hours, what was your AVERAGE pain level?", type: "slider", min: 0, max: 10 },
      ],
    },
    PROMIS_PF_6B: {
      name: "PROMIS Physical Function Short Form 6b",
      items: [
        { id: "pf6b_1", text: "Are you able to do chores such as vacuuming or yard work?", type: "likert", options: ["Without any difficulty", "With a little difficulty", "With some difficulty", "With much difficulty", "Unable to do"] },
        { id: "pf6b_2", text: "Are you able to go up and down stairs at a normal pace?", type: "likert", options: ["Without any difficulty", "With a little difficulty", "With some difficulty", "With much difficulty", "Unable to do"] },
        { id: "pf6b_3", text: "Are you able to go for a walk of at least 15 minutes?", type: "likert", options: ["Without any difficulty", "With a little difficulty", "With some difficulty", "With much difficulty", "Unable to do"] },
        { id: "pf6b_4", text: "Are you able to run errands and shop?", type: "likert", options: ["Without any difficulty", "With a little difficulty", "With some difficulty", "With much difficulty", "Unable to do"] },
        { id: "pf6b_5", text: "Are you able to stand for one hour?", type: "likert", options: ["Without any difficulty", "With a little difficulty", "With some difficulty", "With much difficulty", "Unable to do"] },
        { id: "pf6b_6", text: "Are you able to do two hours of physical labor?", type: "likert", options: ["Without any difficulty", "With a little difficulty", "With some difficulty", "With much difficulty", "Unable to do"] },
      ],
    },
    PROMIS_PI_6A: {
      name: "PROMIS Pain Interference Short Form 6a",
      items: [
        { id: "pi6a_1", text: "How much did pain interfere with your day-to-day activities?", type: "likert", options: ["Not at all", "A little bit", "Somewhat", "Quite a bit", "Very much"] },
        { id: "pi6a_2", text: "How much did pain interfere with work around the home?", type: "likert", options: ["Not at all", "A little bit", "Somewhat", "Quite a bit", "Very much"] },
        { id: "pi6a_3", text: "How much did pain interfere with your ability to participate in social activities?", type: "likert", options: ["Not at all", "A little bit", "Somewhat", "Quite a bit", "Very much"] },
        { id: "pi6a_4", text: "How much did pain interfere with your household chores?", type: "likert", options: ["Not at all", "A little bit", "Somewhat", "Quite a bit", "Very much"] },
        { id: "pi6a_5", text: "How much did pain interfere with the things you usually do for fun?", type: "likert", options: ["Not at all", "A little bit", "Somewhat", "Quite a bit", "Very much"] },
        { id: "pi6a_6", text: "How much did pain interfere with your enjoyment of life?", type: "likert", options: ["Not at all", "A little bit", "Somewhat", "Quite a bit", "Very much"] },
      ],
    },
    PGIC: {
      name: "Patient Global Impression of Change",
      items: [
        { id: "pgic_1", text: "Since beginning treatment, how would you describe the change (if any) in your condition?", type: "likert", options: ["Very much improved", "Much improved", "Minimally improved", "No change", "Minimally worse", "Much worse", "Very much worse"] },
      ],
    },
  };

  return {
    success: true,
    data: {
      instrument: instruments[instrument] || { name: instrument, items: [] },
      tier: input.tier,
      collection_type: input.collection_type,
      render_as: "prom_card",
    },
  };
}

async function handleScorePROM(
  input: Record<string, unknown>
): Promise<ToolResult> {
  // TODO: Implement actual scoring algorithms per instrument
  return {
    success: true,
    data: {
      instrument: input.instrument,
      raw_score: 0,
      t_score: 50,
      percentile: 50,
      interpretation: "Score calculated. Connect scoring engine for production values.",
      response_id: `prom_${Date.now()}`,
    },
  };
}

async function handleSubmitToCMS(
  input: Record<string, unknown>
): Promise<ToolResult> {
  // TODO: Construct FHIR bundle and call Data Reporting API
  return {
    success: true,
    data: {
      submission_id: `cms_${Date.now()}`,
      status: "pending",
      message: "FHIR bundle constructed. CMS Data Reporting API submission queued.",
      deadline: "Submit within 15 days of collection date.",
    },
  };
}

async function handleCheckEligibility(
  input: Record<string, unknown>
): Promise<ToolResult> {
  // TODO: Call CMS Eligibility API
  return {
    success: true,
    data: {
      eligible: true,
      status: "pending_verification",
      message: "Eligibility check submitted. Polling for result.",
    },
  };
}

async function handleAlignPatient(
  input: Record<string, unknown>
): Promise<ToolResult> {
  // TODO: Call CMS Alignment API
  return {
    success: true,
    data: {
      alignment_id: `align_${Date.now()}`,
      status: "pending",
      message: "Alignment request submitted to CMS.",
    },
  };
}

async function handleClassifyPain(
  input: Record<string, unknown>
): Promise<ToolResult> {
  // TODO: Implement phenotyping logic from KB
  return {
    success: true,
    data: {
      phenotype: "nociceptive",
      confidence: 0.75,
      reasoning: "Based on reported symptoms. Full phenotyping requires CSI/DN4 screening scores.",
      recommended_screening: ["CSI", "DN4"],
    },
  };
}

async function handleGetExercises(
  input: Record<string, unknown>
): Promise<ToolResult> {
  // TODO: Query exercise library based on region/phase/phenotype
  return {
    success: true,
    data: {
      exercises: [
        {
          name: "Gentle Range of Motion",
          description: "Slowly move through comfortable range. Stop if pain exceeds 3/10.",
          sets: 2,
          reps: 10,
          phase: input.phase,
          pain_limit: 3,
        },
      ],
      render_as: "exercise_card",
      pain_monitoring: {
        safe: "0-2/10",
        acceptable: "3-4/10 (reduce range or resistance)",
        stop: "5+/10 (stop exercise, use flare protocol)",
      },
    },
  };
}

async function handleUpdateCarePlan(
  input: Record<string, unknown>
): Promise<ToolResult> {
  return {
    success: true,
    data: {
      care_plan_id: `cp_${Date.now()}`,
      action: input.action,
      status: "updated",
    },
  };
}

async function handleCheckPhase(
  input: Record<string, unknown>
): Promise<ToolResult> {
  // TODO: Evaluate PROMIS thresholds from Supabase
  return {
    success: true,
    data: {
      current_phase: 1,
      meets_progression_criteria: false,
      promis_pf_t_score: 33,
      promis_pi_t_score: 62,
      required_pf_for_advancement: 36,
      required_pi_for_advancement: 59,
      recommendation: "Continue Phase 1. Patient needs ~3 point PF improvement and ~3 point PI reduction.",
    },
  };
}

async function handleRetrieveKnowledge(
  input: Record<string, unknown>
): Promise<ToolResult> {
  const fileId = input.file_id as string;
  const content = loadByID(fileId);
  if (!content) {
    return {
      success: false,
      error: `Knowledge file not found: ${fileId}. Available: exercise-by-phenotype, biopsychosocial, patient-ed-older-adults, decision-aids, education-joint-oa, education-spine, cbt-modules, nutrition-sleep, access-api, access-model-ref, access-payment, duke-joint-health, spine-health`,
    };
  }
  return { success: true, data: { file_id: fileId, content } };
}
