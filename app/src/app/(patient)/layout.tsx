export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--revelai-bg)" }}>
      {/* ── Top Navigation Bar ─────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b px-4 py-3 flex items-center justify-between"
        style={{
          background: "var(--revelai-card)",
          borderColor: "var(--revelai-border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--revelai-purple), var(--revelai-purple-dark))",
            }}
          >
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold" style={{ color: "var(--revelai-text)" }}>
              KIMI
            </h1>
            <p className="text-xs" style={{ color: "var(--revelai-text-muted)" }}>
              MSK Care Coach
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--revelai-success)" }}
          />
          <span className="text-xs" style={{ color: "var(--revelai-text-muted)" }}>
            Online
          </span>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
