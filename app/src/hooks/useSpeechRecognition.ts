"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseSpeechRecognitionOptions {
  onResult?: (transcript: string) => void;
  onFinalResult?: (transcript: string) => void;
  onInterimResult?: (interim: string) => void;
  onError?: (error: string) => void;
  lang?: string;
  /** When true, recognition restarts automatically after silence/end. */
  continuous?: boolean;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export function useSpeechRecognition({
  onResult,
  onFinalResult,
  onInterimResult,
  onError,
  lang = "en-US",
  continuous = false,
}: UseSpeechRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef("");
  /** When true, the hook will auto-restart recognition on end. */
  const keepAliveRef = useRef(continuous);
  /** Whether the session has been explicitly started by the user. */
  const sessionActiveRef = useRef(false);

  useEffect(() => {
    keepAliveRef.current = continuous;
  }, [continuous]);

  useEffect(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognitionAPI);
  }, []);

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const stopListening = useCallback(() => {
    clearSilenceTimer();
    sessionActiveRef.current = false;
    keepAliveRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, [clearSilenceTimer]);

  const startListening = useCallback(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      onError?.("Speech recognition is not supported in this browser.");
      return;
    }

    // Reset state
    setTranscript("");
    setInterimTranscript("");
    finalTranscriptRef.current = "";
    sessionActiveRef.current = true;

    // Abort any existing instance first (avoid overlapping)
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* ok */ }
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      clearSilenceTimer();

      let interim = "";
      let finalChunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalChunk += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      if (finalChunk) {
        finalTranscriptRef.current += finalChunk;
        setTranscript(finalTranscriptRef.current);
        onResult?.(finalTranscriptRef.current);
      }

      setInterimTranscript(interim);
      if (interim) {
        onInterimResult?.(interim);
      }

      // Auto-submit after 2 seconds of silence following speech
      if (finalTranscriptRef.current && !interim) {
        silenceTimerRef.current = setTimeout(() => {
          const finalText = finalTranscriptRef.current.trim();
          if (finalText) {
            onFinalResult?.(finalText);
          }
          // If keepAlive (continuous mode), reset for next utterance
          // but don't stop the recognition instance
          if (keepAliveRef.current && sessionActiveRef.current) {
            finalTranscriptRef.current = "";
            setTranscript("");
            setInterimTranscript("");
          } else {
            stopListening();
          }
        }, 2000);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error !== "no-speech" && event.error !== "aborted") {
        onError?.(event.error);
      }
      // On iOS Safari, recognition can stop unexpectedly.
      // If the session is still active and keepAlive, we restart below in onend.
    };

    recognition.onend = () => {
      // Auto-restart if continuous mode and session is still active
      if (keepAliveRef.current && sessionActiveRef.current) {
        // Small delay to avoid rapid restart loops on iOS
        setTimeout(() => {
          if (sessionActiveRef.current && keepAliveRef.current) {
            try {
              recognition.start();
            } catch {
              // If start fails, try creating a new instance
              setIsListening(false);
            }
          }
        }, 100);
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      onError?.("Failed to start speech recognition.");
    }
  }, [lang, onResult, onFinalResult, onInterimResult, onError, clearSilenceTimer, stopListening]);

  /** Start continuous listening (auto-restarts after each utterance). */
  const startContinuous = useCallback(() => {
    keepAliveRef.current = true;
    startListening();
  }, [startListening]);

  /** Reset the current transcript accumulator without stopping recognition. */
  const resetTranscript = useCallback(() => {
    finalTranscriptRef.current = "";
    setTranscript("");
    setInterimTranscript("");
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      const finalText = finalTranscriptRef.current.trim();
      if (finalText) {
        onFinalResult?.(finalText);
      }
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening, onFinalResult]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearSilenceTimer();
      sessionActiveRef.current = false;
      keepAliveRef.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [clearSilenceTimer]);

  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    startContinuous,
    stopListening,
    toggleListening,
    resetTranscript,
  };
}
