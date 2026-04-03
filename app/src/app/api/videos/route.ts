/**
 * Exercise Video Search API Route
 *
 * Searches YouTube for physical therapy exercise demonstrations.
 * Falls back to constructing a search URL if no API key is configured.
 */

import { NextRequest, NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "";

interface VideoResult {
  id: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
  channelTitle: string;
}

export async function POST(request: NextRequest) {
  try {
    const { exerciseName, bodyRegion } = await request.json();

    if (!exerciseName) {
      return NextResponse.json(
        { error: "Missing 'exerciseName' parameter" },
        { status: 400 }
      );
    }

    const searchQuery = `physical therapy ${exerciseName} ${bodyRegion || ""} exercise demonstration`.trim();

    // Fallback: no API key — return a YouTube search URL
    if (!YOUTUBE_API_KEY) {
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
      return NextResponse.json({
        videos: [],
        searchUrl,
        fallback: true,
      });
    }

    // YouTube Data API search
    const params = new URLSearchParams({
      part: "snippet",
      q: searchQuery,
      type: "video",
      maxResults: "3",
      videoEmbeddable: "true",
      videoDuration: "short", // Under 4 minutes
      safeSearch: "strict",
      relevanceLanguage: "en",
      key: YOUTUBE_API_KEY,
    });

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params.toString()}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Videos API] YouTube error:", response.status, errorText);

      // Fall back to search URL on API failure
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
      return NextResponse.json({
        videos: [],
        searchUrl,
        fallback: true,
      });
    }

    const data = await response.json();

    const videos: VideoResult[] = (data.items || []).map(
      (item: {
        id: { videoId: string };
        snippet: {
          title: string;
          thumbnails: { medium: { url: string } };
          channelTitle: string;
        };
      }) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
        channelTitle: item.snippet.channelTitle,
      })
    );

    return NextResponse.json({
      videos,
      searchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
      fallback: false,
    });
  } catch (error) {
    console.error("[Videos API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error during video search" },
      { status: 500 }
    );
  }
}
