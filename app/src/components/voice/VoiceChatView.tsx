"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { VoiceOrb, OrbState } from "./VoiceOrb";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { stripMarkdown } from "@/lib/format-text";
import { FormattedText } from "@/components/ui/FormattedText";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface VoiceChatViewProps {
  onSwitchToText: () => void;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi there! I'm KIMI, your musculoskeletal care coach. Tap the orb to start speaking, or type below.",
  timestamp: new Date().toISOString(),
};

export function VoiceChatView({ onSwitchToText }: VoiceChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [orbState, setOrbState] = useState<OrbState>("idle");
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [sessionType] = useState<string>("intake");
  const [voiceSessionActive, setVoiceSessionActive] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Scroll transcript to bottom
  const scrollTranscript = useCallback(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollTranscript();
  }, [messages, scrollTranscript]);

  // ── TTS hook ────────────────────────────────────────────────────────
  const tts = useTextToSpeech({
    onStart: () => setOrbState("speaking"),
    onEnd: () => {
      // After KIMI finishes speaking, go back to listening if voice session is active
      if (voiceSessionActive) {
        setOrbState("listening");
        stt.resetTranscript();
      } else {
        setOrbState("idle");
      }
    },
    onError: (err) => {
      console.error("[Voice] TTS error:", err);
      if (voiceSessionActive) {
        setOrbState("listening");
      } else {
        setOrbState("idle");
      }
    },
  });

  // ── Barge-in: interrupt KIMI ────────────────────────────────────────
  const handleBargeIn = useCallback(() => {
    // Stop TTS playback
    tts.stopSpeaking();
    // Abort any in-flight streaming request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsProcessing(false);
    setOrbState("listening");
  }, [tts]);

  // ── Send message via streaming SSE endpoint ─────────────────────────
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isProcessing) return;

      const userMessage: Message = {
        id: `user_${Date.now()}`,
        role: "user",
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsProcessing(true);
      setOrbState("thinking");

      // Create abort controller for this request
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const allMessages = [...messages, userMessage];

        const response = await fetch("/api/chat-stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: allMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            sessionType,
          }),
          signal: abortController.signal,
        });

        if (!response.ok) throw new Error("Chat stream request failed");

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let fullText = "";
        let sseBuffer = "";

        // Create a placeholder assistant message that we update as chunks arrive
        const assistantMsgId = `assistant_${Date.now()}`;
        setMessages((prev) => [
          ...prev,
          {
            id: assistantMsgId,
            role: "assistant",
            content: "",
            timestamp: new Date().toISOString(),
          },
        ]);

        // Read SSE stream
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          sseBuffer += decoder.decode(value, { stream: true });

          // Parse SSE events from buffer
          const lines = sseBuffer.split("\n");
          sseBuffer = "";

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.type === "chunk") {
                  fullText += (fullText ? " " : "") + data.text;

                  // Update the assistant message in real time
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMsgId
                        ? { ...m, content: fullText }
                        : m
                    )
                  );

                  // Send chunk to TTS (strip markdown for voice)
                  const cleanText = stripMarkdown(data.text);
                  if (cleanText.trim()) {
                    tts.speakChunked(cleanText);
                  }
                } else if (data.type === "done") {
                  // Final full text -- ensure message is complete
                  if (data.fullText) {
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === assistantMsgId
                          ? { ...m, content: data.fullText }
                          : m
                      )
                    );
                  }
                  tts.flushQueue();
                } else if (data.type === "error") {
                  throw new Error(data.message);
                }
                // "components" type: UI components from tool phase
                // (could be handled here for PROM cards, etc.)
              } catch (parseErr) {
                // If JSON parse fails, this line might be incomplete.
                // Put it back in the buffer for next iteration.
                if (i === lines.length - 1) {
                  sseBuffer = line;
                }
              }
            } else if (line === "") {
              // Empty line = SSE event separator, ignore
            } else {
              // Incomplete line, put back in buffer
              if (i === lines.length - 1) {
                sseBuffer = line;
              }
            }
          }
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          // Barge-in abort -- expected, not an error
          return;
        }
        console.error("[Voice] Chat stream error:", error);
        const errMsg: Message = {
          id: `error_${Date.now()}`,
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble right now. Please try again in a moment.",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, errMsg]);
        setOrbState(voiceSessionActive ? "listening" : "idle");
      } finally {
        setIsProcessing(false);
        abortControllerRef.current = null;
      }
    },
    [messages, isProcessing, sessionType, tts, voiceSessionActive]
  );

  // ── Speech recognition hook with barge-in ──────────────────────────
  const stt = useSpeechRecognition({
    onResult: () => {
      // Interim updates -- orb stays in listening state
    },
    onInterimResult: (interim) => {
      // If KIMI is speaking and user starts talking, barge in
      if (
        (orbState === "speaking" || isProcessing) &&
        interim.trim().length > 2
      ) {
        handleBargeIn();
      }
    },
    onFinalResult: (transcript) => {
      sendMessage(transcript);
    },
    onError: (err) => {
      console.error("[Voice] STT error:", err);
      if (!voiceSessionActive) {
        setOrbState("idle");
      }
    },
    continuous: true,
  });

  // ── Handle orb tap ──────────────────────────────────────────────────
  const handleOrbTap = useCallback(() => {
    if (orbState === "speaking") {
      // Barge-in: user taps while KIMI is speaking
      handleBargeIn();
      stt.resetTranscript();
      return;
    }

    if (orbState === "idle" && !voiceSessionActive) {
      // First tap: start voice session with continuous listening
      setVoiceSessionActive(true);
      stt.startContinuous();
      setOrbState("listening");
    } else if (orbState === "listening") {
      // Tap while listening: submit what we have or go idle
      const currentText = stt.transcript.trim();
      if (currentText) {
        sendMessage(currentText);
        stt.resetTranscript();
      } else {
        // Stop the voice session
        stt.stopListening();
        setVoiceSessionActive(false);
        setOrbState("idle");
      }
    } else if (orbState === "idle" && voiceSessionActive) {
      // Resume listening in an active session
      stt.startContinuous();
      setOrbState("listening");
    }
  }, [orbState, voiceSessionActive, stt, sendMessage, handleBargeIn]);

  // ── Sync STT listening state with orb ───────────────────────────────
  useEffect(() => {
    if (
      !stt.isListening &&
      orbState === "listening" &&
      !isProcessing
    ) {
      // STT ended unexpectedly -- restart if session is active
      if (voiceSessionActive) {
        stt.startContinuous();
      } else {
        setOrbState("idle");
      }
    }
  }, [stt.isListening, orbState, isProcessing, voiceSessionActive, stt]);

  // ── Handle text input submit ────────────────────────────────────────
  const handleTextSubmit = () => {
    if (textInput.trim()) {
      sendMessage(textInput);
      setTextInput("");
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
      {/* ── Orb Area ─────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center pt-8 pb-4 px-4">
        <VoiceOrb
          state={orbState}
          onTap={handleOrbTap}
          getAnalyser={tts.getAnalyser}
          disabled={orbState === "thinking"}
        />

        {/* Real-time transcript while listening */}
        {(stt.isListening || stt.transcript || stt.interimTranscript) && (
          <div
            className="mt-2 max-w-sm text-center px-4 py-2 rounded-xl text-sm"
            style={{
              background: "var(--revelai-card)",
              color: "var(--revelai-text)",
              border: "1px solid var(--revelai-border)",
              minHeight: 32,
            }}
            aria-live="polite"
            aria-label="Speech transcript"
          >
            {stt.transcript}
            {stt.interimTranscript && (
              <span style={{ color: "var(--revelai-text-muted)" }}>
                {stt.transcript ? " " : ""}
                {stt.interimTranscript}
              </span>
            )}
            {stt.isListening && !stt.transcript && !stt.interimTranscript && (
              <span style={{ color: "var(--revelai-text-muted)" }}>
                Listening...
              </span>
            )}
          </div>
        )}

        {/* STT not supported warning */}
        {!stt.isSupported && (
          <p
            className="mt-2 text-xs text-center px-4"
            style={{ color: "var(--revelai-warning)" }}
          >
            Voice input is not supported in this browser. Please use the text input below.
          </p>
        )}
      </div>

      {/* ── Conversation Transcript ──────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-4 pb-2"
        style={{ maxHeight: "35vh" }}
      >
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                style={{
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, var(--revelai-purple), var(--revelai-purple-dark))"
                      : "var(--revelai-card)",
                  color: msg.role === "user" ? "white" : "var(--revelai-text)",
                  border:
                    msg.role === "assistant"
                      ? "1px solid var(--revelai-border)"
                      : "none",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {msg.role === "assistant" ? (
                  <FormattedText text={msg.content} />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>
      </div>

      {/* ── Bottom Controls ──────────────────────────────────────────── */}
      <div
        className="sticky bottom-0 border-t px-4 py-3"
        style={{
          background: "var(--revelai-card)",
          borderColor: "var(--revelai-border)",
          boxShadow: "0 -4px 12px rgba(60, 48, 140, 0.05)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Text input fallback */}
          <div className="flex items-center gap-3">
            <div
              className="flex-1 rounded-2xl border px-4 py-2.5"
              style={{
                borderColor: "var(--revelai-border)",
                background: "var(--revelai-bg)",
              }}
            >
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleTextSubmit();
                  }
                }}
                placeholder="Type a message..."
                disabled={isProcessing}
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                style={{ color: "var(--revelai-text)" }}
                aria-label="Text message input"
              />
            </div>

            {/* Send button */}
            <button
              onClick={handleTextSubmit}
              disabled={isProcessing || !textInput.trim()}
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{
                background:
                  textInput.trim() && !isProcessing
                    ? "linear-gradient(135deg, var(--revelai-purple), var(--revelai-purple-dark))"
                    : "var(--revelai-border)",
                cursor: textInput.trim() && !isProcessing ? "pointer" : "not-allowed",
              }}
              aria-label="Send message"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>

            {/* Switch to text chat mode */}
            <button
              onClick={onSwitchToText}
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: "var(--revelai-bg)",
                border: "1px solid var(--revelai-border)",
              }}
              aria-label="Switch to text chat mode"
              title="Switch to text chat"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--revelai-purple)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>

          {/* Safety disclaimer */}
          <p
            className="text-center text-[10px] mt-2"
            style={{ color: "var(--revelai-text-muted)" }}
          >
            KIMI is a care coach, not a doctor. For emergencies, call 911.
          </p>
        </div>
      </div>
    </div>
  );
}
