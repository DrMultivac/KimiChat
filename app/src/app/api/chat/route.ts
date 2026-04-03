/**
 * KIMI Chat API Route
 *
 * Handles the core conversation loop:
 * 1. Build system prompt (P0 + P1 knowledge loaded based on session type)
 * 2. Call Claude with tools
 * 3. Execute any tool calls (red flag screening, PROM collection, etc.)
 * 4. Return the final response + any structured UI components (PROM cards, exercise cards)
 */

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt, type SessionType, type PatientContext } from "@/lib/agent/system-prompt";
import { KIMI_TOOLS, executeToolCall } from "@/lib/agent/tools";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  components?: UIComponent[];
  timestamp: string;
}

export interface UIComponent {
  type: "prom_card" | "exercise_card" | "progress_chart" | "safety_alert" | "body_diagram";
  data: unknown;
}

interface ChatRequest {
  messages: ChatMessage[];
  sessionType: SessionType;
  patient?: PatientContext;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { messages, sessionType, patient } = body;

    // ── 1. Build the system prompt with tiered KB loading ──────────────────
    const systemPrompt = buildSystemPrompt(sessionType, patient);

    // ── 2. Convert chat history to Claude message format ───────────────────
    const claudeMessages = messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    // ── 3. Call Claude with tool use ───────────────────────────────────────
    let response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      temperature: 0.3, // Per PRD specification
      system: systemPrompt,
      tools: KIMI_TOOLS,
      messages: claudeMessages,
    });

    // ── 4. Tool use loop — execute tools until Claude produces final text ──
    const uiComponents: UIComponent[] = [];
    const MAX_TOOL_ROUNDS = 5; // Safety limit on tool call depth
    let rounds = 0;

    while (response.stop_reason === "tool_use" && rounds < MAX_TOOL_ROUNDS) {
      rounds++;

      // Find all tool use blocks in the response
      const toolUseBlocks = response.content.filter(
        (block): block is Anthropic.Messages.ToolUseBlock => block.type === "tool_use"
      );

      // Execute each tool call
      const toolResults = await Promise.all(
        toolUseBlocks.map(async (toolUse) => {
          const result = await executeToolCall(
            toolUse.name,
            toolUse.input as Record<string, unknown>
          );

          // Collect UI components from tool results
          if (result.success && result.data) {
            const data = result.data as Record<string, unknown>;
            if (data.render_as) {
              uiComponents.push({
                type: data.render_as as UIComponent["type"],
                data: data,
              });
            }
            // Safety alerts always become UI components
            if (data.status === "ESCALATE") {
              uiComponents.push({
                type: "safety_alert",
                data: data,
              });
            }
          }

          return {
            type: "tool_result" as const,
            tool_use_id: toolUse.id,
            content: JSON.stringify(result),
          };
        })
      );

      // Continue the conversation with tool results
      response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        temperature: 0.3,
        system: systemPrompt,
        tools: KIMI_TOOLS,
        messages: [
          ...claudeMessages,
          { role: "assistant", content: response.content },
          { role: "user", content: toolResults },
        ],
      });
    }

    // ── 5. Extract the final text response ─────────────────────────────────
    const textBlocks = response.content.filter(
      (block): block is Anthropic.Messages.TextBlock => block.type === "text"
    );
    const responseText = textBlocks.map((b) => b.text).join("\n\n");

    return NextResponse.json({
      message: {
        role: "assistant",
        content: responseText,
        components: uiComponents.length > 0 ? uiComponents : undefined,
        timestamp: new Date().toISOString(),
      },
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
    });
  } catch (error) {
    console.error("[KIMI Chat API] Error:", error);
    return NextResponse.json(
      {
        error: "I'm having trouble right now. If you're experiencing a medical emergency, please call 911.",
        code: "CHAT_ERROR",
      },
      { status: 500 }
    );
  }
}
