/**
 * Exercise Video Search API Route
 *
 * Searches for physical therapy exercise demonstration videos.
 * Strategy:
 *   1. If YOUTUBE_API_KEY is set, uses YouTube Data API
 *   2. Otherwise, uses a curated mapping of common exercises to known good video IDs
 *   3. Always includes a YouTube search URL as fallback
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

// ── Curated exercise video database ─────────────────────────────────────────
// Reliable, evidence-based PT exercise videos from trusted channels
// These are used when no YouTube API key is configured
const CURATED_VIDEOS: Record<string, VideoResult[]> = {
  // Lower back
  "gentle range of motion": [
    { id: "XdfI2VkGvdQ", title: "Lower Back Stretches for Pain Relief", thumbnail: "https://i.ytimg.com/vi/XdfI2VkGvdQ/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/XdfI2VkGvdQ", channelTitle: "Bob & Brad" },
    { id: "4BOTvaRaDjI", title: "Lumbar Range of Motion Exercises", thumbnail: "https://i.ytimg.com/vi/4BOTvaRaDjI/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/4BOTvaRaDjI", channelTitle: "AskDoctorJo" },
  ],
  "cat cow": [
    { id: "kqnua4rHVVA", title: "Cat-Cow Stretch for Back Pain", thumbnail: "https://i.ytimg.com/vi/kqnua4rHVVA/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/kqnua4rHVVA", channelTitle: "Yoga With Adriene" },
  ],
  "bird dog": [
    { id: "wiFNA-KLay4", title: "Bird Dog Exercise - Proper Form", thumbnail: "https://i.ytimg.com/vi/wiFNA-KLay4/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/wiFNA-KLay4", channelTitle: "Bob & Brad" },
  ],
  "bridge": [
    { id: "SfS2TBaBaKQ", title: "Glute Bridge Exercise for Back Pain", thumbnail: "https://i.ytimg.com/vi/SfS2TBaBaKQ/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/SfS2TBaBaKQ", channelTitle: "AskDoctorJo" },
  ],
  "pelvic tilt": [
    { id: "MlbBHJlMjqU", title: "Pelvic Tilt Exercise for Low Back Pain", thumbnail: "https://i.ytimg.com/vi/MlbBHJlMjqU/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/MlbBHJlMjqU", channelTitle: "AskDoctorJo" },
  ],
  "lumbar flexion": [
    { id: "hK4EU8GMTDY", title: "Lumbar Flexion Exercises for Back Pain", thumbnail: "https://i.ytimg.com/vi/hK4EU8GMTDY/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/hK4EU8GMTDY", channelTitle: "Bob & Brad" },
  ],
  // Knee
  "quad set": [
    { id: "VQYMa_KQHLE", title: "Quad Sets - Knee Strengthening Exercise", thumbnail: "https://i.ytimg.com/vi/VQYMa_KQHLE/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/VQYMa_KQHLE", channelTitle: "AskDoctorJo" },
  ],
  "straight leg raise": [
    { id: "yljDHkhhng0", title: "Straight Leg Raise Exercise", thumbnail: "https://i.ytimg.com/vi/yljDHkhhng0/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/yljDHkhhng0", channelTitle: "AskDoctorJo" },
  ],
  "knee extension": [
    { id: "TmNZS56URRI", title: "Seated Knee Extension Exercise", thumbnail: "https://i.ytimg.com/vi/TmNZS56URRI/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/TmNZS56URRI", channelTitle: "Bob & Brad" },
  ],
  // Hip
  "clamshell": [
    { id: "poM1-xwGmhA", title: "Clamshell Exercise for Hip Strengthening", thumbnail: "https://i.ytimg.com/vi/poM1-xwGmhA/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/poM1-xwGmhA", channelTitle: "AskDoctorJo" },
  ],
  "hip flexor stretch": [
    { id: "YQmpO9VT2X4", title: "Hip Flexor Stretch - Physical Therapy", thumbnail: "https://i.ytimg.com/vi/YQmpO9VT2X4/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/YQmpO9VT2X4", channelTitle: "Bob & Brad" },
  ],
  // Shoulder
  "pendulum": [
    { id: "E4xMfOgYh30", title: "Pendulum Exercise for Shoulder Pain", thumbnail: "https://i.ytimg.com/vi/E4xMfOgYh30/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/E4xMfOgYh30", channelTitle: "AskDoctorJo" },
  ],
  "wall slide": [
    { id: "FJG6jxIzJHY", title: "Wall Slide Exercise for Shoulder Mobility", thumbnail: "https://i.ytimg.com/vi/FJG6jxIzJHY/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/FJG6jxIzJHY", channelTitle: "Bob & Brad" },
  ],
  // Neck
  "chin tuck": [
    { id: "wQylqaCl8Zo", title: "Chin Tuck Exercise for Neck Pain", thumbnail: "https://i.ytimg.com/vi/wQylqaCl8Zo/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/wQylqaCl8Zo", channelTitle: "Bob & Brad" },
  ],
  "neck stretch": [
    { id: "xNjxDBYjfNs", title: "Neck Stretches for Pain Relief", thumbnail: "https://i.ytimg.com/vi/xNjxDBYjfNs/mqdefault.jpg", embedUrl: "https://www.youtube.com/embed/xNjxDBYjfNs", channelTitle: "AskDoctorJo" },
  ],
};

function findCuratedVideos(exerciseName: string): VideoResult[] {
  const name = exerciseName.toLowerCase();

  // Exact match
  if (CURATED_VIDEOS[name]) return CURATED_VIDEOS[name];

  // Partial match — find the best matching key
  const matches = Object.entries(CURATED_VIDEOS)
    .filter(([key]) => name.includes(key) || key.includes(name))
    .flatMap(([, videos]) => videos);

  if (matches.length > 0) return matches.slice(0, 3);

  // Keyword match — check if any keywords overlap
  const nameWords = name.split(/\s+/);
  const keywordMatches = Object.entries(CURATED_VIDEOS)
    .filter(([key]) => {
      const keyWords = key.split(/\s+/);
      return nameWords.some((w) => keyWords.includes(w) && w.length > 3);
    })
    .flatMap(([, videos]) => videos);

  return keywordMatches.slice(0, 3);
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
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

    // ── Try YouTube Data API first ──────────────────────────────────────
    if (YOUTUBE_API_KEY) {
      try {
        const params = new URLSearchParams({
          part: "snippet",
          q: searchQuery,
          type: "video",
          maxResults: "3",
          videoEmbeddable: "true",
          videoDuration: "short",
          safeSearch: "strict",
          relevanceLanguage: "en",
          key: YOUTUBE_API_KEY,
        });

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?${params.toString()}`
        );

        if (response.ok) {
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

          if (videos.length > 0) {
            return NextResponse.json({ videos, searchUrl, fallback: false });
          }
        }
      } catch (e) {
        console.error("[Videos API] YouTube API error:", e);
      }
    }

    // ── Fallback: curated video database ────────────────────────────────
    const curated = findCuratedVideos(exerciseName);

    if (curated.length > 0) {
      return NextResponse.json({
        videos: curated,
        searchUrl,
        fallback: false,
      });
    }

    // ── Last resort: return search URL only ─────────────────────────────
    return NextResponse.json({
      videos: [],
      searchUrl,
      fallback: true,
    });
  } catch (error) {
    console.error("[Videos API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error during video search" },
      { status: 500 }
    );
  }
}
