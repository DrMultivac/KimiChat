"use client";

import { FormattedText } from "@/components/ui/FormattedText";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function ChatMessage({ message }: { message: Message }) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`message-enter flex ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      <div className={`flex gap-3 max-w-[85%] ${isAssistant ? "flex-row" : "flex-row-reverse"}`}>
        {/* Avatar */}
        {isAssistant && (
          <div
            className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mt-1"
            style={{
              background: "linear-gradient(135deg, var(--revelai-purple), var(--revelai-purple-dark))",
            }}
          >
            <span className="text-white font-bold text-xs">K</span>
          </div>
        )}

        {/* Message Bubble */}
        <div
          className="rounded-2xl px-4 py-3"
          style={{
            background: isAssistant ? "var(--revelai-card)" : "var(--revelai-purple)",
            color: isAssistant ? "var(--revelai-text)" : "#FFFFFF",
            boxShadow: "var(--shadow-md)",
            borderBottomLeftRadius: isAssistant ? "4px" : "16px",
            borderBottomRightRadius: isAssistant ? "16px" : "4px",
          }}
        >
          {isAssistant ? (
            <FormattedText
              text={message.content}
              className={isAssistant ? "opacity-[0.92]" : "opacity-[0.95]"}
            />
          ) : (
            /* User messages: render as plain paragraphs */
            message.content.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed ${i > 0 ? "mt-3" : ""}`}
                style={{ opacity: 0.95 }}
              >
                {paragraph.split("\n").map((line, j) => (
                  <span key={j}>
                    {j > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            ))
          )}

          {/* Timestamp */}
          <p
            className="text-[10px] mt-2 text-right"
            style={{
              opacity: 0.5,
              color: isAssistant ? "var(--revelai-text-muted)" : "#FFFFFF",
            }}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
