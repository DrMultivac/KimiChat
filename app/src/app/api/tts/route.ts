/**
 * ElevenLabs Text-to-Speech API Route
 *
 * Accepts text and returns streaming audio from ElevenLabs.
 * Voice: Serena (RGb96Dcl0k5eVje8EBch)
 */

import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || "";
const VOICE_ID = "RGb96Dcl0k5eVje8EBch"; // Serena

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'text' parameter" },
        { status: 400 }
      );
    }

    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 503 }
      );
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[TTS API] ElevenLabs error:", response.status, errorText);
      return NextResponse.json(
        { error: "Text-to-speech generation failed" },
        { status: response.status }
      );
    }

    // Stream the audio back to the client
    const headers = new Headers({
      "Content-Type": "audio/mpeg",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    });

    return new NextResponse(response.body, { status: 200, headers });
  } catch (error) {
    console.error("[TTS API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error during TTS" },
      { status: 500 }
    );
  }
}
