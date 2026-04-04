"use client";

import { useState, useCallback } from "react";
import { Sidebar, ChatSession } from "@/components/sidebar/Sidebar";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | undefined>();

  const handleSelectChat = useCallback((id: string) => {
    setActiveChatId(id);
    setSidebarOpen(false);
    // Future: load conversation from Supabase
  }, []);

  const handleNewChat = useCallback(() => {
    setSidebarOpen(false);
    // Future: reset chat state
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--revelai-bg)" }}>
      {/* ── Top Navigation Bar ─────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-30 border-b px-4 py-3 flex items-center justify-between"
        style={{
          background: "var(--revelai-card)",
          borderColor: "var(--revelai-border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Hamburger menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-gray-100"
            aria-label="Open menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--revelai-text)" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>

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

      {/* ── Sidebar ────────────────────────────────────────────────────── */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chatHistory={chatHistory}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        activeChatId={activeChatId}
      />

      {/* ── Main Content ───────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
