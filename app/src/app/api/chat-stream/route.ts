/**
 * KIMI Streaming Chat API Route (SSE)
 *
 * Streams Claude's response as sentence-sized chunks via Server-Sent Events
 * so the client can pipe each sentence to TTS immediately.
 *
 * Flow:
 *   1. Run tool loop (including mandatory red-flag screening) NON-streaming
 *   2. Once tools are resolved, stream the final text response
 *   3. Buffer streaming tokens, emit complete sentences to the client
 *   4. Final event sends the full assembled text
 */

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import {
  buildSystemPrompt,
  type SessionType,
  type PatientContext,
} from "@/lib/agent/system-prompt";
import { KIMI_TOOLS, executeToolCall } from "@/lib/agent/tools";
import type { UIComponent } from "@/app/api/chat/route";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// ── Sentence boundary detection ────────────────────────────────────────────
const SENTENCE_RE = /(?<=[.!?])\s+|(?<=\n\n)/;

function extractSentences(buffer: string): { sentences: string[]; remainder: string } {
  const sentences: string[] = [];
  let rest = buffer;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const match = rest.match(SENTENCE_RE);
    if (!match || match.index === undefined) break;

    const end = match.index + match[0].length;
    const sentence = rest.slice(0, end).trim();
    if (sentence) sentences.push(sentence);
    rest = rest.slice(end);
  }

  return { sentences, remainder: rest };
}

// ── SSE helpers ────────────────────────────────────────────────────────────
function sseEvent(data: Record<string, unknown>): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

// ── Main handler ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();

  try {
    const body = await request.json();
    const {
      messages,
      sessionType,
      patient,
    }: {
      messages: { role: "user" | "assistant"; content: string }[];
      sessionType: SessionType;
      patient?: PatientContext;
    } = body;

    const systemPrompt = buildSystemPrompt(sessionType, patient);

    const claudeMessages: Anthropic.Messages.MessageParam[] = messages.map(
      (m) => ({
        role: m.role,
        content: m.content,
      })
    );

    // ── Phase 1: Tool loop (non-streaming) ────────────────────────────────
    // Safety screening (red flags) MUST complete before we stream any text.
    let toolMessages: Anthropic.Messages.MessageParam[] = [...claudeMessages];
    const uiComponents: UIComponent[] = [];

    let preResponse = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      temperature: 0.3,
      system: systemPrompt,
      tools: KIMI_TOOLS,
      messages: toolMessages,
    });

    const MAX_TOOL_ROUNDS = 5;
    let rounds = 0;

    while (preResponse.stop_reason === "tool_use" && rounds < MAX_TOOL_ROUNDS) {
      rounds++;

      const toolUseBlocks = preResponse.content.filter(
        (b): b is Anthropic.Messages.ToolUseBlock => b.type === "tool_use"
      );

      const toolResults = await Promise.all(
        toolUseBlocks.map(async (toolUse) => {
          const result = await executeToolCall(
            toolUse.name,
            toolUse.input as Record<string, unknown>
          );

          if (result.success && result.data) {
            const data = result.data as Record<string, unknown>;
            if (data.render_as) {
              uiComponents.push({
                type: data.render_as as UIComponent["type"],
                data,
              });
            }
            if (data.status === "ESCALATE") {
              uiComponents.push({ type: "safety_alert", data });
            }
          }

          return {
            type: "tool_result" as const,
            tool_use_id: toolUse.id,
            content: JSON.stringify(result),
          };
        })
      );

      toolMessages = [
        ...toolMessages,
        { role: "assistant", content: preResponse.content },
        { role: "user", content: toolResults },
      ];

      preResponse = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        temperature: 0.3,
        system: systemPrompt,
        tools: KIMI_TOOLS,
        messages: toolMessages,
      });
    }

    // If the pre-response already ended with text (no more tools), we still
    // want to stream it. Check if stop_reason is "end_turn".
    // If the tool loop produced a final text response, we need to stream
    // a new request that continues from the tool context.
    // However, if there were NO tool calls at all in the first response
    // (stop_reason was "end_turn" from the start), we re-issue as a stream.

    // Build the final messages array that includes all tool context
    const finalMessages = toolMessages;

    // If we went through tool rounds, the last preResponse content was the
    // final assistant turn. We need to re-issue a streaming call.
    // If tool rounds > 0, the final response already has the text we want.
    // We can either extract it or re-stream. For true streaming UX, we
    // re-stream from the accumulated tool context.

    // Optimization: if preResponse already has text blocks and stop_reason
    // is "end_turn", just emit those as chunks rather than re-calling.
    const existingText = preResponse.content
      .filter((b): b is Anthropic.Messages.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n\n");

    if (existingText && rounds > 0) {
      // Tool loop already produced final text -- emit it as chunks
      const stream = new ReadableStream({
        start(controller) {
          // Emit UI components first
          if (uiComponents.length > 0) {
            controller.enqueue(
              encoder.encode(
                sseEvent({ type: "components", components: uiComponents })
              )
            );
          }

          const { sentences, remainder } = extractSentences(existingText);
          for (const s of sentences) {
            controller.enqueue(
              encoder.encode(sseEvent({ type: "chunk", text: s }))
            );
          }
          if (remainder.trim()) {
            controller.enqueue(
              encoder.encode(
                sseEvent({ type: "chunk", text: remainder.trim() })
              )
            );
          }
          controller.enqueue(
            encoder.encode(
              sseEvent({ type: "done", fullText: existingText })
            )
          );
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // ── Phase 2: Stream the final text response ───────────────────────────
    const streamResponse = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      temperature: 0.3,
      system: systemPrompt,
      messages: finalMessages,
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Emit UI components collected during tool phase
          if (uiComponents.length > 0) {
            controller.enqueue(
              encoder.encode(
                sseEvent({ type: "components", components: uiComponents })
              )
            );
          }

          let buffer = "";
          let fullText = "";

          const stream = await streamResponse;

          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const text = event.delta.text;
              buffer += text;
              fullText += text;

              // Extract complete sentences from buffer
              const { sentences, remainder } = extractSentences(buffer);
              for (const sentence of sentences) {
                controller.enqueue(
                  encoder.encode(sseEvent({ type: "chunk", text: sentence }))
                );
              }
              buffer = remainder;
            }
          }

          // Flush remaining buffer
          if (buffer.trim()) {
            controller.enqueue(
              encoder.encode(sseEvent({ type: "chunk", text: buffer.trim() }))
            );
          }

          // Send the final done event
          controller.enqueue(
            encoder.encode(sseEvent({ type: "done", fullText }))
          );

          controller.close();
        } catch (err) {
          console.error("[chat-stream] Streaming error:", err);
          controller.enqueue(
            encoder.encode(
              sseEvent({
                type: "error",
                message:
                  "I'm having trouble right now. If you're experiencing a medical emergency, please call 911.",
              })
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[chat-stream] Error:", error);
    const errStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            sseEvent({
              type: "error",
              message:
                "I'm having trouble right now. If you're experiencing a medical emergency, please call 911.",
            })
          )
        );
        controller.close();
      },
    });

    return new Response(errStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }
}
