/**
 * FHIR R4 Client for CMS ACCESS Model APIs
 *
 * Implements the four CMS APIs documented in KB_ACCESS_API_Implementation.md:
 *   1. Eligibility API ($check-eligibility)
 *   2. Alignment API ($align)
 *   3. Unalignment API ($unalign)
 *   4. Data Reporting API ($report-data)
 *
 * All APIs use the same async pattern: POST to submit → poll $submission-status.
 *
 * Reference: knowledge-base/regulatory/KB_ACCESS_API_Implementation.md
 */

interface FHIRClientConfig {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
}

interface SubmissionResult {
  submissionId: string;
  status: "pending" | "accepted" | "rejected" | "error";
  data?: unknown;
  errorMessage?: string;
}

export class FHIRClient {
  private config: FHIRClientConfig;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(config?: Partial<FHIRClientConfig>) {
    this.config = {
      baseUrl: config?.baseUrl || process.env.CMS_API_BASE_URL || "",
      clientId: config?.clientId || process.env.CMS_CLIENT_ID || "",
      clientSecret: config?.clientSecret || process.env.CMS_CLIENT_SECRET || "",
    };
  }

  // ── Authentication ─────────────────────────────────────────────────────────

  private async authenticate(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    // CMS OAuth2 token exchange
    // Implementation will follow CMS Implementation Guide on Digital Services GitHub
    const response = await fetch(`${this.config.baseUrl}/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error(`CMS auth failed: ${response.status}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    return this.accessToken!;
  }

  // ── Shared: Async POST + Poll Pattern ──────────────────────────────────────

  private async submitAndPoll(
    operation: string,
    bundle: unknown,
    maxPolls: number = 10,
    pollIntervalMs: number = 2000
  ): Promise<SubmissionResult> {
    const token = await this.authenticate();

    // POST the operation
    const submitResponse = await fetch(
      `${this.config.baseUrl}/${operation}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/fhir+json",
          Accept: "application/fhir+json",
        },
        body: JSON.stringify(bundle),
      }
    );

    if (!submitResponse.ok) {
      return {
        submissionId: "",
        status: "error",
        errorMessage: `Submit failed: ${submitResponse.status} ${await submitResponse.text()}`,
      };
    }

    const submitData = await submitResponse.json();
    const submissionId = submitData.id || submitData.submissionId;

    // Poll for result
    for (let i = 0; i < maxPolls; i++) {
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));

      const statusResponse = await fetch(
        `${this.config.baseUrl}/$submission-status?id=${submissionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/fhir+json",
          },
        }
      );

      if (!statusResponse.ok) continue;

      const statusData = await statusResponse.json();
      const status = statusData.status?.toLowerCase();

      if (status === "accepted" || status === "complete") {
        return { submissionId, status: "accepted", data: statusData };
      }
      if (status === "rejected" || status === "failed") {
        return {
          submissionId,
          status: "rejected",
          data: statusData,
          errorMessage: statusData.message || "Submission rejected",
        };
      }
      // Still pending — continue polling
    }

    return {
      submissionId,
      status: "pending",
      errorMessage: "Max poll attempts reached. Will retry via background job.",
    };
  }

  // ── 1. Eligibility API ─────────────────────────────────────────────────────

  async checkEligibility(patient: {
    name: string;
    dateOfBirth: string;
    medicareId: string;
  }): Promise<SubmissionResult> {
    const bundle = {
      resourceType: "Parameters",
      parameter: [
        {
          name: "patientIdentifier",
          valueString: patient.medicareId,
        },
        {
          name: "patientName",
          valueString: patient.name,
        },
        {
          name: "patientBirthDate",
          valueDate: patient.dateOfBirth,
        },
      ],
    };

    return this.submitAndPoll("$check-eligibility", bundle);
  }

  // ── 2. Alignment API ──────────────────────────────────────────────────────

  async alignPatient(patient: {
    id: string;
    medicareId: string;
    conditionCodes: string[];
    bodyRegion: string;
  }): Promise<SubmissionResult> {
    const bundle = {
      resourceType: "Bundle",
      type: "transaction",
      entry: [
        {
          resource: {
            resourceType: "Patient",
            identifier: [
              {
                system: "http://hl7.org/fhir/sid/us-medicare",
                value: patient.medicareId,
              },
            ],
          },
        },
        ...patient.conditionCodes.map((code) => ({
          resource: {
            resourceType: "Condition",
            code: {
              coding: [
                {
                  system: "http://hl7.org/fhir/sid/icd-10-cm",
                  code: code,
                },
              ],
            },
          },
        })),
      ],
    };

    return this.submitAndPoll("$align", bundle);
  }

  // ── 3. Unalignment API ────────────────────────────────────────────────────

  async unalignPatient(patient: {
    id: string;
    participantId: string;
    reason: string;
  }): Promise<SubmissionResult> {
    const bundle = {
      resourceType: "Parameters",
      parameter: [
        {
          name: "participantId",
          valueString: patient.participantId,
        },
        {
          name: "reason",
          valueString: patient.reason,
        },
      ],
    };

    return this.submitAndPoll("$unalign", bundle);
  }

  // ── 4. Data Reporting API ─────────────────────────────────────────────────

  async reportData(patient: {
    id: string;
    participantId: string;
    promData: {
      instrument: string;
      rawScore: number;
      tScore: number;
      collectedAt: string;
      collectionType: string;
      itemResponses: Record<string, unknown>;
    }[];
  }): Promise<SubmissionResult> {
    // Construct ACCESSDataReportingBundle per CMS FHIR Profile
    const bundle = {
      resourceType: "Bundle",
      type: "transaction",
      meta: {
        profile: [
          "http://cms.gov/fhir/access/StructureDefinition/ACCESSDataReportingBundle",
        ],
      },
      entry: patient.promData.map((prom) => ({
        resource: {
          resourceType: "Observation",
          status: "final",
          category: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/observation-category",
                  code: "survey",
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: "http://loinc.org",
                code: this.getLoincCode(prom.instrument),
              },
            ],
            text: prom.instrument,
          },
          subject: {
            reference: `Patient/${patient.participantId}`,
          },
          effectiveDateTime: prom.collectedAt,
          valueQuantity: {
            value: prom.tScore,
            unit: "T-score",
            system: "http://unitsofmeasure.org",
          },
        },
      })),
    };

    return this.submitAndPoll("$report-data", bundle);
  }

  // ── LOINC Code Mapping ────────────────────────────────────────────────────

  private getLoincCode(instrument: string): string {
    const loincMap: Record<string, string> = {
      NRS: "72514-3",
      PROMIS_PF_6B: "61570-5",
      PROMIS_PF_CAT: "61570-5",
      PROMIS_PI_6A: "61758-6",
      PROMIS_PI_CAT: "61758-6",
      PGIC: "77865-0",
      ODI: "71933-6",
      NDI: "72099-4",
    };
    return loincMap[instrument] || "unknown";
  }
}

// Singleton instance
export const fhirClient = new FHIRClient();
