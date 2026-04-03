"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { PromCard } from "@/components/chat/message-types/PromCard";
import { ExerciseCard } from "@/components/chat/message-types/ExerciseCard";
import { SafetyAlert } from "@/components/chat/message-types/SafetyAlert";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  components?: UIComponent[];
  timestamp: string;
}

export interface UIComponent {
  type: "prom_card" | "exercise_card" | "progress_chart" | "safety_alert";
  data: Record<string, unknown>;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi there! I'm KIMI, your musculoskeletal care coach from RevelAi Health. I'm here to help you manage your pain and get stronger through evidence-based exercises, education, and support.\n\nBefore we get started, I'd love to learn a bit about you. Could you tell me what brings you here today? Where are you experiencing pain, and how long has it been going on?",
  timestamp: new Date().toISOString(),
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionType] = useState<string>("intake");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          sessionType,
        }),
      });

      if (!response.ok) throw new Error("Chat request failed");

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: data.message.content,
        components: data.message.components,
        timestamp: data.message.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error_${Date.now()}`,
          role: "assistant",
          content:
            "I'm sorry, I'm having a bit of trouble right now. If you're experiencing a medical emergency, please call 911. Otherwise, please try again in a moment.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderComponent = (component: UIComponent, index: number) => {
    switch (component.type) {
      case "prom_card":
        return (
          <PromCard
            key={`prom_${index}`}
            data={component.data}
            onSubmit={(responses) => {
              sendMessage(
                `[PROM_RESPONSE] ${JSON.stringify(responses)}`
              );
            }}
          />
        );
      case "exercise_card":
        return (
          <ExerciseCard key={`exercise_${index}`} data={component.data} />
        );
      case "safety_alert":
        return (
          <SafetyAlert key={`alert_${index}`} data={component.data} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
      {/* ── Message List ────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
      >
        {messages.map((message) => (
          <div key={message.id}>
            <ChatMessage message={message} />
            {message.components?.map((comp, i) => renderComponent(comp, i))}
          </div>
        ))}

        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ──────────────────────────────────────────────────── */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
