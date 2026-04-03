"use client";

import { useState, useCallback } from "react";

interface Exercise {
  name: string;
  description: string;
  sets: number;
  reps: number;
  phase: number;
  pain_limit: number;
  body_region?: string;
}

interface VideoResult {
  id: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
  channelTitle: string;
}

interface VideoSearchResponse {
  videos: VideoResult[];
  searchUrl: string;
  fallback: boolean;
}

interface ExerciseCardProps {
  data: Record<string, unknown>;
}

export function ExerciseCard({ data }: ExerciseCardProps) {
  const exercises = (data.exercises as Exercise[]) || [];
  const painMonitoring = data.pain_monitoring as Record<string, string>;
  const bodyRegion = (data.body_region as string) || "";
  const [activeExercise, setActiveExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(
    new Set()
  );
  const [painRating, setPainRating] = useState<number | null>(null);

  // Video state per exercise
  const [videoData, setVideoData] = useState<Record<number, VideoSearchResponse>>({});
  const [videoLoading, setVideoLoading] = useState<Set<number>>(new Set());
  const [expandedVideo, setExpandedVideo] = useState<number | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<Record<number, string>>({});

  const markComplete = (index: number) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const fetchVideos = useCallback(
    async (exerciseIndex: number) => {
      const exercise = exercises[exerciseIndex];
      if (!exercise) return;

      // Already loaded
      if (videoData[exerciseIndex]) {
        setExpandedVideo(
          expandedVideo === exerciseIndex ? null : exerciseIndex
        );
        return;
      }

      setVideoLoading((prev) => {
        const next = new Set(prev);
        next.add(exerciseIndex);
        return next;
      });

      try {
        const response = await fetch("/api/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            exerciseName: exercise.name,
            bodyRegion: exercise.body_region || bodyRegion,
          }),
        });

        if (!response.ok) throw new Error("Video search failed");

        const result: VideoSearchResponse = await response.json();
        setVideoData((prev) => ({ ...prev, [exerciseIndex]: result }));
        setExpandedVideo(exerciseIndex);

        // Auto-select first video
        if (result.videos.length > 0) {
          setSelectedVideoId((prev) => ({
            ...prev,
            [exerciseIndex]: result.videos[0].id,
          }));
        }
      } catch (error) {
        console.error("[ExerciseCard] Video fetch error:", error);
      } finally {
        setVideoLoading((prev) => {
          const next = new Set(prev);
          next.delete(exerciseIndex);
          return next;
        });
      }
    },
    [exercises, bodyRegion, videoData, expandedVideo]
  );

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
      {exercises.map((exercise, index) => {
        const isActive = activeExercise === index;
        const isVideoExpanded = expandedVideo === index;
        const exerciseVideos = videoData[index];
        const isVideoLoading = videoLoading.has(index);
        const currentVideoId = selectedVideoId[index];

        return (
          <div
            key={index}
            className={`rounded-xl p-4 mb-2 transition-all cursor-pointer ${
              isActive ? "" : "opacity-70"
            }`}
            style={{
              background:
                completedExercises.has(index)
                  ? "rgba(16, 185, 129, 0.08)"
                  : isActive
                    ? "var(--revelai-bg)"
                    : "transparent",
              border: `1px solid ${
                completedExercises.has(index)
                  ? "var(--revelai-success)"
                  : isActive
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
              <div className="flex items-center gap-2">
                {/* Watch Demo button */}
                {isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchVideos(index);
                    }}
                    disabled={isVideoLoading}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all"
                    style={{
                      background: isVideoExpanded
                        ? "var(--revelai-purple-light)"
                        : "var(--revelai-bg)",
                      color: isVideoExpanded ? "white" : "var(--revelai-purple)",
                      border: isVideoExpanded
                        ? "none"
                        : "1px solid var(--revelai-purple-light)",
                      opacity: isVideoLoading ? 0.6 : 1,
                    }}
                    aria-label={`Watch demonstration video for ${exercise.name}`}
                  >
                    {isVideoLoading ? (
                      <div
                        className="w-3 h-3 border-2 border-current border-t-transparent rounded-full"
                        style={{ animation: "spin 0.8s linear infinite" }}
                      />
                    ) : (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                    {isVideoExpanded ? "Hide" : "Watch Demo"}
                  </button>
                )}

                {!completedExercises.has(index) && isActive && (
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
            </div>

            {isActive && (
              <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--revelai-text-muted)" }}>
                {exercise.description}
              </p>
            )}

            {/* ── Video Section ──────────────────────────────────────── */}
            {isActive && isVideoExpanded && exerciseVideos && (
              <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                {/* Fallback: no API key — show search link */}
                {exerciseVideos.fallback && exerciseVideos.videos.length === 0 && (
                  <a
                    href={exerciseVideos.searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                    style={{
                      background: "var(--revelai-bg)",
                      color: "var(--revelai-purple)",
                      border: "1px solid var(--revelai-border)",
                    }}
                    aria-label={`Search YouTube for ${exercise.name} demonstration`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    Search YouTube for demo video
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-auto"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}

                {/* API results: video thumbnails + embed */}
                {exerciseVideos.videos.length > 0 && (
                  <div className="space-y-3">
                    {/* Video player */}
                    {currentVideoId && (
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{
                          border: "1px solid var(--revelai-border)",
                          aspectRatio: "16/9",
                        }}
                      >
                        <iframe
                          src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&modestbranding=1`}
                          title={`Exercise demonstration for ${exercise.name}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                          style={{ border: "none" }}
                        />
                      </div>
                    )}

                    {/* Thumbnail selector (if multiple) */}
                    {exerciseVideos.videos.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {exerciseVideos.videos.map((video) => (
                          <button
                            key={video.id}
                            onClick={() =>
                              setSelectedVideoId((prev) => ({
                                ...prev,
                                [index]: video.id,
                              }))
                            }
                            className="flex-shrink-0 rounded-lg overflow-hidden transition-all"
                            style={{
                              width: 120,
                              border:
                                currentVideoId === video.id
                                  ? "2px solid var(--revelai-purple)"
                                  : "2px solid var(--revelai-border)",
                              opacity: currentVideoId === video.id ? 1 : 0.7,
                            }}
                            aria-label={`Play: ${video.title}`}
                          >
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full"
                              style={{ aspectRatio: "16/9", objectFit: "cover" }}
                            />
                            <p
                              className="text-[10px] px-1.5 py-1 truncate"
                              style={{ color: "var(--revelai-text-muted)" }}
                            >
                              {video.title}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Channel attribution */}
                    {currentVideoId && (
                      <p
                        className="text-[10px]"
                        style={{ color: "var(--revelai-text-muted)" }}
                      >
                        {exerciseVideos.videos.find((v) => v.id === currentVideoId)
                          ?.channelTitle || ""}
                        {" · "}
                        <a
                          href={exerciseVideos.searchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "var(--revelai-purple)" }}
                        >
                          See more on YouTube
                        </a>
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

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
