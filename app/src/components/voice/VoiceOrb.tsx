"use client";

import { useRef, useEffect, useCallback } from "react";

export type OrbState = "idle" | "listening" | "thinking" | "speaking";

interface VoiceOrbProps {
  state: OrbState;
  onTap: () => void;
  getAnalyser?: () => AnalyserNode | null;
  disabled?: boolean;
}

/**
 * Animated voice orb with four states:
 * - idle: gentle breathing/pulsing
 * - listening: expanded with sound wave ripples
 * - thinking: slow rotation with sparkle particles
 * - speaking: rhythmic pulsing driven by audio analyser
 */
export function VoiceOrb({ state, onTap, getAnalyser, disabled }: VoiceOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    hue: number;
  }

  const createParticle = useCallback(
    (cx: number, cy: number, radius: number): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const dist = radius * (0.8 + Math.random() * 0.4);
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8 - 0.3,
        life: 0,
        maxLife: 60 + Math.random() * 60,
        size: 1.5 + Math.random() * 2.5,
        hue: 250 + Math.random() * 30, // Purple hues
      };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI support
    const dpr = window.devicePixelRatio || 1;
    const size = 280;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const baseRadius = 80;
    let lastTime = performance.now();

    const draw = (now: number) => {
      const dt = (now - lastTime) / 16.67; // Normalize to ~60fps
      lastTime = now;
      timeRef.current += dt * 0.02;
      const t = timeRef.current;

      ctx.clearRect(0, 0, size, size);

      // Get audio level for speaking state
      let audioLevel = 0;
      if (state === "speaking" && getAnalyser) {
        const analyser = getAnalyser();
        if (analyser) {
          const data = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(data);
          const sum = data.reduce((a, b) => a + b, 0);
          audioLevel = sum / data.length / 255;
        }
      }

      // Calculate dynamic radius
      let radius = baseRadius;
      let glowIntensity = 0.3;
      let innerPulse = 0;

      switch (state) {
        case "idle":
          radius = baseRadius + Math.sin(t * 1.5) * 4;
          glowIntensity = 0.2 + Math.sin(t * 1.5) * 0.1;
          break;
        case "listening":
          radius = baseRadius + 8 + Math.sin(t * 3) * 3;
          glowIntensity = 0.5 + Math.sin(t * 2) * 0.15;
          break;
        case "thinking":
          radius = baseRadius + Math.sin(t * 2) * 3;
          glowIntensity = 0.35 + Math.sin(t * 3) * 0.1;
          break;
        case "speaking":
          radius = baseRadius + audioLevel * 25 + Math.sin(t * 4) * 2;
          glowIntensity = 0.4 + audioLevel * 0.4;
          innerPulse = audioLevel;
          break;
      }

      // ── Outer glow layers ──────────────────────────────────────────
      for (let i = 3; i >= 0; i--) {
        const glowRadius = radius + 20 + i * 15;
        const alpha = glowIntensity * (0.04 - i * 0.008);
        const gradient = ctx.createRadialGradient(
          cx, cy, radius * 0.5,
          cx, cy, glowRadius
        );
        gradient.addColorStop(0, `rgba(91, 79, 176, ${alpha})`);
        gradient.addColorStop(0.6, `rgba(60, 48, 140, ${alpha * 0.5})`);
        gradient.addColorStop(1, "rgba(60, 48, 140, 0)");
        ctx.beginPath();
        ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // ── Listening: wave ripples emanating outward ──────────────────
      if (state === "listening") {
        for (let w = 0; w < 3; w++) {
          const wavePhase = (t * 2 + w * 2.1) % 6.28;
          const waveRadius = radius + 10 + (wavePhase / 6.28) * 50;
          const waveAlpha = Math.max(0, 0.25 - (wavePhase / 6.28) * 0.25);
          ctx.beginPath();
          ctx.arc(cx, cy, waveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(91, 79, 176, ${waveAlpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // ── Main orb body ─────────────────────────────────────────────
      const orbGradient = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.25,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      orbGradient.addColorStop(0, "#7B6FD0");
      orbGradient.addColorStop(0.3, "#5B4FB0");
      orbGradient.addColorStop(0.7, "#3C308C");
      orbGradient.addColorStop(1, "#1D196B");

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = orbGradient;
      ctx.fill();

      // ── Inner light effect ────────────────────────────────────────
      const innerAlpha = 0.15 + innerPulse * 0.3 + Math.sin(t * 2) * 0.05;
      const innerGradient = ctx.createRadialGradient(
        cx + Math.cos(t) * 10,
        cy + Math.sin(t * 0.7) * 10,
        0,
        cx,
        cy,
        radius * 0.8
      );
      innerGradient.addColorStop(0, `rgba(254, 188, 17, ${innerAlpha})`);
      innerGradient.addColorStop(0.5, `rgba(254, 216, 92, ${innerAlpha * 0.3})`);
      innerGradient.addColorStop(1, "rgba(254, 188, 17, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = innerGradient;
      ctx.fill();

      // ── Speaking: ripple rings inside the orb ─────────────────────
      if (state === "speaking" && audioLevel > 0.05) {
        for (let r = 0; r < 3; r++) {
          const ripplePhase = (t * 4 + r * 2) % 6.28;
          const rippleR = (ripplePhase / 6.28) * radius * 0.8;
          const rippleAlpha = Math.max(0, audioLevel * 0.4 * (1 - ripplePhase / 6.28));
          ctx.beginPath();
          ctx.arc(cx, cy, rippleR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(254, 216, 92, ${rippleAlpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // ── Specular highlight ────────────────────────────────────────
      const specGradient = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.35,
        0,
        cx - radius * 0.2,
        cy - radius * 0.25,
        radius * 0.5
      );
      specGradient.addColorStop(0, "rgba(255, 255, 255, 0.18)");
      specGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.05)");
      specGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = specGradient;
      ctx.fill();

      // ── Thinking: sparkle particles ───────────────────────────────
      if (state === "thinking") {
        // Spawn new particles
        if (Math.random() < 0.3 * dt) {
          particlesRef.current.push(createParticle(cx, cy, radius));
        }

        // Draw rotating ring
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 0.5);
        ctx.strokeStyle = "rgba(254, 188, 17, 0.2)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.arc(0, 0, radius + 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // ── Draw and update particles ─────────────────────────────────
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life += dt;
        if (p.life > p.maxLife) return false;

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.2
          ? lifeRatio / 0.2
          : 1 - (lifeRatio - 0.2) / 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - lifeRatio * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 60%, 75%, ${alpha * 0.8})`;
        ctx.fill();

        // Sparkle cross
        if (p.size > 2.5) {
          const sLen = p.size * 1.5 * alpha;
          ctx.strokeStyle = `hsla(${p.hue}, 50%, 85%, ${alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - sLen, p.y);
          ctx.lineTo(p.x + sLen, p.y);
          ctx.moveTo(p.x, p.y - sLen);
          ctx.lineTo(p.x, p.y + sLen);
          ctx.stroke();
        }

        return true;
      });

      // Clear particles when leaving thinking state
      if (state !== "thinking" && particlesRef.current.length === 0) {
        // Already clean
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [state, getAnalyser, createParticle]);

  const stateLabel: Record<OrbState, string> = {
    idle: "Tap to speak",
    listening: "Listening...",
    thinking: "Thinking...",
    speaking: "Speaking...",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={onTap}
        disabled={disabled || state === "thinking" || state === "speaking"}
        className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 rounded-full transition-transform active:scale-95"
        style={{
          focusVisibleRingColor: "var(--revelai-purple)",
        } as React.CSSProperties}
        aria-label={
          state === "idle"
            ? "Start voice input"
            : state === "listening"
              ? "Stop listening"
              : stateLabel[state]
        }
        role="switch"
        aria-checked={state === "listening"}
      >
        <canvas
          ref={canvasRef}
          className="cursor-pointer"
          style={{ width: 280, height: 280 }}
        />

        {/* Central icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {state === "idle" && (
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          )}
          {state === "listening" && (
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-white rounded-full"
                  style={{
                    animation: `voiceBar 0.8s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                    height: 16 + Math.random() * 8,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
          )}
          {state === "thinking" && (
            <div
              className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full"
              style={{ animation: "spin 1s linear infinite" }}
            />
          )}
        </div>
      </button>

      {/* State label */}
      <p
        className="text-sm font-medium tracking-wide"
        style={{ color: "var(--revelai-text-muted)" }}
        aria-live="polite"
      >
        {stateLabel[state]}
      </p>
    </div>
  );
}
