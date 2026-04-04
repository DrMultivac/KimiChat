"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseTextToSpeechOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

/**
 * TTS hook with chunked audio queue for real-time streaming voice.
 *
 * - `speak(text)` — legacy: sends full text to TTS, plays it all at once
 * - `speakChunked(sentence)` — adds a sentence to the audio queue
 * - `stopSpeaking()` — immediately stops audio, clears the queue
 * - `flushQueue()` — signals no more chunks are coming (plays remaining)
 * - `getAnalyser()` — returns the Web Audio AnalyserNode for orb animation
 */
export function useTextToSpeech({
  onStart,
  onEnd,
  onError,
}: UseTextToSpeechOptions = {}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Queue of audio blobs waiting to be played
  const queueRef = useRef<Blob[]>([]);
  const isPlayingRef = useRef(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const stoppedRef = useRef(false);
  // Track whether we have signalled onStart for this speaking session
  const sessionStartedRef = useRef(false);
  // Track whether the queue has been flushed (no more chunks coming)
  const flushedRef = useRef(false);

  // ── Audio context / analyser setup (lazy, singleton) ──────────────────
  const ensureAudioContext = useCallback(async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    if (!analyserRef.current) {
      analyserRef.current = ctx.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;
    }
    if (!gainNodeRef.current) {
      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.connect(analyserRef.current);
      analyserRef.current.connect(ctx.destination);
    }
    return { ctx, analyser: analyserRef.current, gain: gainNodeRef.current };
  }, []);

  const getAnalyser = useCallback(() => analyserRef.current, []);

  // ── Play next item from queue ─────────────────────────────────────────
  const playNext = useCallback(async () => {
    if (stoppedRef.current) {
      isPlayingRef.current = false;
      return;
    }

    const blob = queueRef.current.shift();
    if (!blob) {
      isPlayingRef.current = false;
      // If flushed and queue empty, the speaking session is over
      if (flushedRef.current) {
        setIsSpeaking(false);
        sessionStartedRef.current = false;
        flushedRef.current = false;
        onEnd?.();
      }
      return;
    }

    isPlayingRef.current = true;

    try {
      const { ctx, gain } = await ensureAudioContext();

      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;

      // Disconnect previous source if exists
      if (currentSourceRef.current) {
        try { currentSourceRef.current.disconnect(); } catch { /* ok */ }
      }

      const source = ctx.createMediaElementSource(audio);
      source.connect(gain);
      currentSourceRef.current = source;

      // Signal start of speaking session (only once per session)
      if (!sessionStartedRef.current) {
        sessionStartedRef.current = true;
        setIsSpeaking(true);
        setIsLoading(false);
        onStart?.();
      }

      await new Promise<void>((resolve, reject) => {
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          currentAudioRef.current = null;
          resolve();
        };
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          currentAudioRef.current = null;
          reject(new Error("Audio playback failed"));
        };
        audio.play().catch(reject);
      });

      // Play the next chunk
      playNext();
    } catch (error) {
      const message = error instanceof Error ? error.message : "TTS playback failed";
      console.error("[TTS] Queue playback error:", message);
      onError?.(message);
      // Try to continue with next chunk
      playNext();
    }
  }, [ensureAudioContext, onStart, onEnd, onError]);

  // ── Public: enqueue a sentence for TTS ────────────────────────────────
  const speakChunked = useCallback(
    async (sentence: string) => {
      if (!sentence.trim()) return;
      stoppedRef.current = false;

      // Show loading on first chunk
      if (!sessionStartedRef.current && queueRef.current.length === 0 && !isPlayingRef.current) {
        setIsLoading(true);
      }

      try {
        const response = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: sentence }),
        });

        if (!response.ok) {
          throw new Error(`TTS request failed: ${response.status}`);
        }

        if (stoppedRef.current) return; // Interrupted while fetching

        const audioBlob = await response.blob();
        if (stoppedRef.current) return;

        queueRef.current.push(audioBlob);

        // Start playing if not already
        if (!isPlayingRef.current) {
          playNext();
        }
      } catch (error) {
        if (stoppedRef.current) return;
        const message = error instanceof Error ? error.message : "TTS failed";
        console.error("[TTS] speakChunked error:", message);
        onError?.(message);
      }
    },
    [playNext, onError]
  );

  // ── Public: signal that no more chunks are coming ─────────────────────
  const flushQueue = useCallback(() => {
    flushedRef.current = true;
    // If nothing is playing and queue is empty, end now
    if (!isPlayingRef.current && queueRef.current.length === 0) {
      setIsSpeaking(false);
      setIsLoading(false);
      sessionStartedRef.current = false;
      flushedRef.current = false;
      onEnd?.();
    }
  }, [onEnd]);

  // ── Public: stop everything immediately ───────────────────────────────
  const stopSpeaking = useCallback(() => {
    stoppedRef.current = true;
    flushedRef.current = false;
    queueRef.current = [];

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      try { URL.revokeObjectURL(currentAudioRef.current.src); } catch { /* ok */ }
      currentAudioRef.current = null;
    }
    if (currentSourceRef.current) {
      try { currentSourceRef.current.disconnect(); } catch { /* ok */ }
      currentSourceRef.current = null;
    }

    isPlayingRef.current = false;
    sessionStartedRef.current = false;
    setIsSpeaking(false);
    setIsLoading(false);
  }, []);

  // ── Legacy: full-text speak (still used by text chat) ─────────────────
  const speak = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      stopSpeaking();
      stoppedRef.current = false;
      flushedRef.current = true; // Only one chunk coming
      setIsLoading(true);

      try {
        const response = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) throw new Error(`TTS request failed: ${response.status}`);
        if (stoppedRef.current) return;

        const audioBlob = await response.blob();
        if (stoppedRef.current) return;

        queueRef.current.push(audioBlob);
        playNext();
      } catch (error) {
        setIsLoading(false);
        setIsSpeaking(false);
        const message = error instanceof Error ? error.message : "TTS failed";
        console.error("[TTS] Error:", message);
        onError?.(message);
      }
    },
    [stopSpeaking, playNext, onError]
  );

  // ── Cleanup on unmount ────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      stoppedRef.current = true;
      queueRef.current = [];
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        try { URL.revokeObjectURL(currentAudioRef.current.src); } catch { /* ok */ }
      }
      if (currentSourceRef.current) {
        try { currentSourceRef.current.disconnect(); } catch { /* ok */ }
      }
    };
  }, []);

  return {
    speak,
    speakChunked,
    flushQueue,
    stop: stopSpeaking,
    stopSpeaking,
    isSpeaking,
    isLoading,
    getAnalyser,
  };
}
