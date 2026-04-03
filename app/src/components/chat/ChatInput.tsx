"use client";

import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className="sticky bottom-0 border-t px-4 py-3"
      style={{
        background: "var(--revelai-card)",
        borderColor: "var(--revelai-border)",
        boxShadow: "0 -4px 12px rgba(60, 48, 140, 0.05)",
      }}
    >
      <div className="max-w-3xl mx-auto flex items-end gap-3">
        <div
          className="flex-1 rounded-2xl border px-4 py-3 transition-all"
          style={{
            borderColor: "var(--revelai-border)",
            background: "var(--revelai-bg)",
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={disabled}
            rows={1}
            className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-gray-400"
            style={{
              color: "var(--revelai-text)",
              minHeight: "24px",
              maxHeight: "160px",
            }}
            aria-label="Message input"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSubmit}
          disabled={disabled || !input.trim()}
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all"
          style={{
            background:
              input.trim() && !disabled
                ? "linear-gradient(135deg, var(--revelai-purple), var(--revelai-purple-dark))"
                : "var(--revelai-border)",
            cursor: input.trim() && !disabled ? "pointer" : "not-allowed",
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
      </div>

      {/* Safety disclaimer */}
      <p
        className="text-center text-[10px] mt-2"
        style={{ color: "var(--revelai-text-muted)" }}
      >
        KIMI is a care coach, not a doctor. For emergencies, call 911.
      </p>
    </div>
  );
}
