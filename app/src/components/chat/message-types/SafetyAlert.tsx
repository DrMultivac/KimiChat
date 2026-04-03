"use client";

interface SafetyAlertProps {
  data: Record<string, unknown>;
}

export function SafetyAlert({ data }: SafetyAlertProps) {
  const tier = data.tier as string;
  const redFlags = data.red_flags as string[];
  const instruction = data.instruction as string;

  const tierConfig: Record<string, { label: string; color: string; bg: string; icon: string }> = {
    "1_emergency": {
      label: "EMERGENCY",
      color: "#DC2626",
      bg: "rgba(220, 38, 38, 0.08)",
      icon: "🚨",
    },
    "2_urgent": {
      label: "URGENT",
      color: "#EA580C",
      bg: "rgba(234, 88, 12, 0.08)",
      icon: "⚠️",
    },
    "3_semi_urgent": {
      label: "ATTENTION NEEDED",
      color: "#D97706",
      bg: "rgba(217, 119, 6, 0.08)",
      icon: "⚡",
    },
    "4_monitoring": {
      label: "MONITORING",
      color: "#2563EB",
      bg: "rgba(37, 99, 235, 0.08)",
      icon: "👁️",
    },
  };

  const config = tierConfig[tier] || tierConfig["2_urgent"];

  return (
    <div
      className="card-enter rounded-2xl p-5 mx-11 my-2"
      style={{
        background: config.bg,
        border: `2px solid ${config.color}`,
        boxShadow: `0 4px 12px ${config.color}20`,
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{config.icon}</span>
        <span
          className="text-xs font-bold tracking-wider"
          style={{ color: config.color }}
        >
          {config.label}
        </span>
      </div>

      {redFlags && redFlags.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium mb-1" style={{ color: config.color }}>
            Symptoms detected:
          </p>
          <ul className="space-y-1">
            {redFlags.map((flag, i) => (
              <li
                key={i}
                className="text-sm flex items-center gap-2"
                style={{ color: "var(--revelai-text)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: config.color }}
                />
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {instruction && (
        <p
          className="text-sm font-medium leading-relaxed"
          style={{ color: "var(--revelai-text)" }}
        >
          {instruction}
        </p>
      )}

      {tier === "1_emergency" && (
        <a
          href="tel:911"
          className="mt-4 block w-full text-center py-3 rounded-xl text-sm font-bold"
          style={{
            background: config.color,
            color: "white",
          }}
        >
          Call 911 Now
        </a>
      )}
    </div>
  );
}
