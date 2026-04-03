"use client";

import { useState } from "react";

interface PromItem {
  id: string;
  text: string;
  type: "slider" | "likert";
  min?: number;
  max?: number;
  options?: string[];
}

interface PromCardProps {
  data: Record<string, unknown>;
  onSubmit: (responses: Record<string, number | string>) => void;
}

export function PromCard({ data, onSubmit }: PromCardProps) {
  const instrument = data.instrument as {
    name: string;
    items: PromItem[];
  };
  const tier = data.tier as string;
  const [responses, setResponses] = useState<Record<string, number | string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);

  const items = instrument?.items || [];
  const allAnswered = items.every((item) => responses[item.id] !== undefined);

  const handleResponse = (itemId: string, value: number | string) => {
    setResponses((prev) => ({ ...prev, [itemId]: value }));
    // Auto-advance to next question after a short delay
    if (currentItem < items.length - 1) {
      setTimeout(() => setCurrentItem((prev) => prev + 1), 300);
    }
  };

  const handleSubmit = () => {
    if (allAnswered) {
      setSubmitted(true);
      onSubmit(responses);
    }
  };

  if (!instrument) return null;

  return (
    <div
      className="card-enter rounded-2xl p-5 mx-11 my-2"
      style={{
        background: "var(--revelai-card)",
        boxShadow: "var(--shadow-lg)",
        border: `2px solid ${tier === "1_cms_mandated" ? "var(--revelai-yellow)" : "var(--revelai-border)"}`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3
            className="text-sm font-semibold"
            style={{ color: "var(--revelai-text)" }}
          >
            {instrument.name}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "var(--revelai-text-muted)" }}>
            {items.length} question{items.length !== 1 ? "s" : ""} &middot;{" "}
            {tier === "1_cms_mandated" ? "CMS Required" : "Clinical"}
          </p>
        </div>
        {tier === "1_cms_mandated" && (
          <span
            className="text-[10px] font-semibold px-2 py-1 rounded-full"
            style={{
              background: "var(--revelai-yellow)",
              color: "var(--revelai-purple-dark)",
            }}
          >
            PAYMENT-CRITICAL
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div
        className="h-1 rounded-full mb-4"
        style={{ background: "var(--revelai-border)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            background: "linear-gradient(90deg, var(--revelai-purple), var(--revelai-yellow))",
            width: `${(Object.keys(responses).length / items.length) * 100}%`,
          }}
        />
      </div>

      {submitted ? (
        <div className="text-center py-4">
          <div
            className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3"
            style={{ background: "var(--revelai-success)", opacity: 0.9 }}
          >
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="3">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--revelai-text)" }}>
            Responses recorded
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--revelai-text-muted)" }}>
            {tier === "1_cms_mandated" ? "Submitting to CMS..." : "Saved to your record"}
          </p>
        </div>
      ) : (
        <>
          {/* Current Question */}
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`mb-4 transition-all duration-300 ${
                index === currentItem
                  ? "opacity-100"
                  : index < currentItem
                    ? "opacity-50 scale-95"
                    : "opacity-30 scale-95"
              }`}
              style={{
                display: Math.abs(index - currentItem) > 1 ? "none" : "block",
              }}
            >
              <p
                className="text-sm mb-3 leading-relaxed"
                style={{ color: "var(--revelai-text)" }}
              >
                <span
                  className="inline-block w-5 h-5 rounded-full text-xs text-center leading-5 mr-2"
                  style={{
                    background:
                      responses[item.id] !== undefined
                        ? "var(--revelai-success)"
                        : "var(--revelai-purple-light)",
                    color: "white",
                  }}
                >
                  {index + 1}
                </span>
                {item.text}
              </p>

              {/* Slider input (for NRS) */}
              {item.type === "slider" && (
                <div className="px-2">
                  <input
                    type="range"
                    min={item.min || 0}
                    max={item.max || 10}
                    value={(responses[item.id] as number) ?? 5}
                    onChange={(e) =>
                      handleResponse(item.id, parseInt(e.target.value))
                    }
                    className="w-full accent-purple-700"
                    style={{ accentColor: "var(--revelai-purple)" }}
                    aria-label={item.text}
                  />
                  <div className="flex justify-between text-[10px] mt-1"
                    style={{ color: "var(--revelai-text-muted)" }}>
                    <span>No pain ({item.min || 0})</span>
                    <span className="font-semibold text-sm"
                      style={{ color: "var(--revelai-purple)" }}>
                      {responses[item.id] ?? "—"}
                    </span>
                    <span>Worst ({item.max || 10})</span>
                  </div>
                </div>
              )}

              {/* Likert options */}
              {item.type === "likert" && (
                <div className="space-y-1.5">
                  {item.options?.map((option, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleResponse(item.id, optIdx)}
                      className="w-full text-left text-sm px-3 py-2 rounded-xl transition-all"
                      style={{
                        background:
                          responses[item.id] === optIdx
                            ? "var(--revelai-purple)"
                            : "var(--revelai-bg)",
                        color:
                          responses[item.id] === optIdx
                            ? "white"
                            : "var(--revelai-text)",
                        border: `1px solid ${
                          responses[item.id] === optIdx
                            ? "var(--revelai-purple)"
                            : "var(--revelai-border)"
                        }`,
                      }}
                      aria-label={`${option} for question ${index + 1}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Navigation + Submit */}
          <div className="flex items-center justify-between mt-4 pt-3"
            style={{ borderTop: `1px solid var(--revelai-border)` }}>
            <div className="flex gap-1">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentItem(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background:
                      responses[items[i].id] !== undefined
                        ? "var(--revelai-success)"
                        : i === currentItem
                          ? "var(--revelai-purple)"
                          : "var(--revelai-border)",
                  }}
                  aria-label={`Go to question ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: allAnswered
                  ? "linear-gradient(135deg, var(--revelai-purple), var(--revelai-purple-dark))"
                  : "var(--revelai-border)",
                color: allAnswered ? "white" : "var(--revelai-text-muted)",
                cursor: allAnswered ? "pointer" : "not-allowed",
              }}
            >
              Submit Responses
            </button>
          </div>
        </>
      )}
    </div>
  );
}
