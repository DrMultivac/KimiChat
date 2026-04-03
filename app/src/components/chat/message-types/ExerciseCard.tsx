"use client";

import { useState } from "react";

interface Exercise {
  name: string;
  description: string;
  sets: number;
  reps: number;
  phase: number;
  pain_limit: number;
}

interface ExerciseCardProps {
  data: Record<string, unknown>;
}

export function ExerciseCard({ data }: ExerciseCardProps) {
  const exercises = (data.exercises as Exercise[]) || [];
  const painMonitoring = data.pain_monitoring as Record<string, string>;
  const [activeExercise, setActiveExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(
    new Set()
  );
  const [painRating, setPainRating] = useState<number | null>(null);

  const markComplete = (index: number) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  return (
    <div
      className="card-enter rounded-2xl p-5 mx-11 my-2"
      style={{
        background: "var(--revelai-card)",
        boxShadow: "var(--shadow-lg)",
        border: "2px solid var(--revelai-purple-light)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "var(--revelai-purple)", opacity: 0.9 }}
        >
          <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2">
            <path d="M4 8h8M8 4v8" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <h3
            className="text-sm font-semibold"
            style={{ color: "var(--revelai-text)" }}
          >
            Today&apos;s Exercises
          </h3>
          <p
            className="text-xs"
            style={{ color: "var(--revelai-text-muted)" }}
          >
            {completedExercises.size}/{exercises.length} completed
          </p>
        </div>
      </div>

      {/* Pain monitoring legend */}
      {painMonitoring && (
        <div
          className="rounded-xl p-3 mb-4 text-xs space-y-1"
          style={{ background: "var(--revelai-bg)" }}
        >
          <p className="font-medium mb-1" style={{ color: "var(--revelai-text)" }}>
            Pain Monitoring Guide:
          </p>
          <p>
            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: "var(--revelai-success)" }} />
            <span style={{ color: "var(--revelai-text-muted)" }}>Safe: {painMonitoring.safe}</span>
          </p>
          <p>
            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: "var(--revelai-warning)" }} />
            <span style={{ color: "var(--revelai-text-muted)" }}>Modify: {painMonitoring.acceptable}</span>
          </p>
          <p>
            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: "var(--revelai-danger)" }} />
            <span style={{ color: "var(--revelai-text-muted)" }}>Stop: {painMonitoring.stop}</span>
          </p>
        </div>
      )}

      {/* Exercise list */}
      {exercises.map((exercise, index) => (
        <div
          key={index}
          className={`rounded-xl p-4 mb-2 transition-all cursor-pointer ${
            activeExercise === index ? "" : "opacity-70"
          }`}
          style={{
            background:
              completedExercises.has(index)
                ? "rgba(16, 185, 129, 0.08)"
                : activeExercise === index
                  ? "var(--revelai-bg)"
                  : "transparent",
            border: `1px solid ${
              completedExercises.has(index)
                ? "var(--revelai-success)"
                : activeExercise === index
                  ? "var(--revelai-border)"
                  : "transparent"
            }`,
          }}
          onClick={() => setActiveExercise(index)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--revelai-text)" }}>
                {completedExercises.has(index) && "✓ "}
                {exercise.name}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--revelai-text-muted)" }}>
                {exercise.sets} sets × {exercise.reps} reps &middot; Pain limit: {exercise.pain_limit}/10
              </p>
            </div>
            {!completedExercises.has(index) && activeExercise === index && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markComplete(index);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  background: "var(--revelai-purple)",
                  color: "white",
                }}
              >
                Done
              </button>
            )}
          </div>

          {activeExercise === index && (
            <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--revelai-text-muted)" }}>
              {exercise.description}
            </p>
          )}
        </div>
      ))}

      {/* Pain after exercise */}
      {completedExercises.size === exercises.length && exercises.length > 0 && (
        <div className="mt-4 pt-3" style={{ borderTop: `1px solid var(--revelai-border)` }}>
          <p className="text-sm mb-2" style={{ color: "var(--revelai-text)" }}>
            How does your pain feel after exercising?
          </p>
          <input
            type="range"
            min={0}
            max={10}
            value={painRating ?? 5}
            onChange={(e) => setPainRating(parseInt(e.target.value))}
            className="w-full"
            style={{ accentColor: "var(--revelai-purple)" }}
            aria-label="Pain rating after exercise"
          />
          <div className="flex justify-between text-[10px]" style={{ color: "var(--revelai-text-muted)" }}>
            <span>No pain (0)</span>
            <span className="font-semibold text-sm" style={{ color: "var(--revelai-purple)" }}>
              {painRating ?? "—"}
            </span>
            <span>Worst (10)</span>
          </div>
        </div>
      )}
    </div>
  );
}
