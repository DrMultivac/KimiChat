"use client";

import { useState } from "react";

export interface ChatSession {
  id: string;
  title: string;
  type: string;
  date: string;
  preview: string;
}

export interface Resource {
  id: string;
  title: string;
  category: "exercise" | "education" | "prom" | "safety";
  icon: string;
  description: string;
}

const DEFAULT_RESOURCES: Resource[] = [
  { id: "r1", title: "My Exercise Plan", category: "exercise", icon: "💪", description: "View your current exercises and watch demos" },
  { id: "r2", title: "Pain Tracker", category: "prom", icon: "📊", description: "See your pain and function scores over time" },
  { id: "r3", title: "Education Library", category: "education", icon: "📚", description: "Learn about managing chronic pain" },
  { id: "r4", title: "CBT Coping Tools", category: "education", icon: "🧠", description: "Pain psychology and coping strategies" },
  { id: "r5", title: "Flare Management", category: "safety", icon: "🔥", description: "What to do when pain flares up" },
  { id: "r6", title: "When to Get Help", category: "safety", icon: "🏥", description: "Red flags and when to call your provider" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistory: ChatSession[];
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  activeChatId?: string;
}

export function Sidebar({
  isOpen,
  onClose,
  chatHistory,
  onSelectChat,
  onNewChat,
  activeChatId,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"chats" | "resources">("chats");

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <div
        className="fixed top-0 left-0 z-50 h-full w-80 flex flex-col transition-transform duration-300 ease-out"
        style={{
          background: "var(--revelai-card)",
          borderRight: "1px solid var(--revelai-border)",
          boxShadow: isOpen ? "var(--shadow-float)" : "none",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-4 flex items-center justify-between border-b"
          style={{ borderColor: "var(--revelai-border)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, var(--revelai-purple), var(--revelai-purple-dark))",
              }}
            >
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <span className="text-sm font-semibold" style={{ color: "var(--revelai-text)" }}>
              KIMI
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--revelai-text-muted)" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b" style={{ borderColor: "var(--revelai-border)" }}>
          <button
            onClick={() => setActiveTab("chats")}
            className="flex-1 py-2.5 text-xs font-medium transition-colors"
            style={{
              color: activeTab === "chats" ? "var(--revelai-purple)" : "var(--revelai-text-muted)",
              borderBottom: activeTab === "chats" ? "2px solid var(--revelai-purple)" : "2px solid transparent",
            }}
          >
            Chat History
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className="flex-1 py-2.5 text-xs font-medium transition-colors"
            style={{
              color: activeTab === "resources" ? "var(--revelai-purple)" : "var(--revelai-text-muted)",
              borderBottom: activeTab === "resources" ? "2px solid var(--revelai-purple)" : "2px solid transparent",
            }}
          >
            Resources
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "chats" ? (
            <div className="p-3 space-y-1">
              {/* New chat button */}
              <button
                onClick={onNewChat}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ color: "var(--revelai-purple)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                New conversation
              </button>

              {/* Chat list */}
              {chatHistory.length > 0 ? (
                <div className="mt-2 space-y-0.5">
                  {chatHistory.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => onSelectChat(chat.id)}
                      className="w-full text-left px-3 py-2.5 rounded-xl transition-colors hover:bg-gray-50"
                      style={{
                        background: activeChatId === chat.id ? "var(--revelai-bg)" : "transparent",
                        borderLeft: activeChatId === chat.id ? "3px solid var(--revelai-purple)" : "3px solid transparent",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--revelai-text)" }}>
                          {chat.title}
                        </p>
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 ml-2"
                          style={{
                            background: "var(--revelai-bg)",
                            color: "var(--revelai-text-muted)",
                          }}
                        >
                          {chat.type}
                        </span>
                      </div>
                      <p
                        className="text-xs truncate mt-0.5"
                        style={{ color: "var(--revelai-text-muted)" }}
                      >
                        {chat.preview}
                      </p>
                      <p
                        className="text-[10px] mt-1"
                        style={{ color: "var(--revelai-text-muted)", opacity: 0.6 }}
                      >
                        {chat.date}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm" style={{ color: "var(--revelai-text-muted)" }}>
                    No previous conversations
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--revelai-text-muted)", opacity: 0.6 }}>
                    Your chat history will appear here
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {DEFAULT_RESOURCES.map((resource) => (
                <button
                  key={resource.id}
                  className="w-full text-left px-3 py-3 rounded-xl transition-all hover:bg-gray-50 hover:scale-[1.01]"
                  style={{
                    background: "var(--revelai-bg)",
                    border: "1px solid var(--revelai-border)",
                  }}
                  onClick={() => {
                    // Resources will trigger specific chat interactions
                    onClose();
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{resource.icon}</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--revelai-text)" }}>
                        {resource.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--revelai-text-muted)" }}>
                        {resource.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-3 border-t"
          style={{ borderColor: "var(--revelai-border)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
              style={{
                background: "var(--revelai-bg)",
                color: "var(--revelai-purple)",
                border: "1px solid var(--revelai-border)",
              }}
            >
              P
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: "var(--revelai-text)" }}>
                Patient
              </p>
              <p className="text-[10px]" style={{ color: "var(--revelai-text-muted)" }}>
                RevelAi Health
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
