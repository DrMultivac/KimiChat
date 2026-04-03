"use client";

export function TypingIndicator() {
  return (
    <div className="flex justify-start message-enter">
      <div className="flex gap-3 max-w-[85%]">
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, var(--revelai-purple), var(--revelai-purple-dark))",
          }}
        >
          <span className="text-white font-bold text-xs">K</span>
        </div>

        {/* Typing bubble */}
        <div
          className="rounded-2xl px-5 py-4 flex items-center gap-1.5"
          style={{
            background: "var(--revelai-card)",
            boxShadow: "var(--shadow-md)",
            borderBottomLeftRadius: "4px",
          }}
        >
          <div
            className="w-2 h-2 rounded-full typing-dot"
            style={{ background: "var(--revelai-purple-light)" }}
          />
          <div
            className="w-2 h-2 rounded-full typing-dot"
            style={{ background: "var(--revelai-purple-light)" }}
          />
          <div
            className="w-2 h-2 rounded-full typing-dot"
            style={{ background: "var(--revelai-purple-light)" }}
          />
        </div>
      </div>
    </div>
  );
}
