// src/lib/trakt.ts

// =====================
// Types
// =====================
export type TraktHistoryMovie = {
  id: number;
  watched_at: string;
  action: "watch";
  type: "movie";
  movie: {
    title: string;
    year: number;
    ids: {
      trakt: number;
      imdb?: string;
      tmdb?: number;
      slug?: string;
    };
  };
};

// =====================
// Constants
// =====================
const TRAKT_API = "https://api.trakt.tv";

// =====================
// Helpers
// =====================
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

async function traktGet<T>(path: string): Promise<T> {
  const clientId = requireEnv("TRAKT_CLIENT_ID");

  const res = await fetch(`${TRAKT_API}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": clientId,
    },
    // Static export / build-time friendly
    cache: "force-cache",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Trakt API error ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

// =====================
// Public API
// =====================

// ✅ REAL recently watched movies (history = actual watch events)
export async function getRecentlyWatchedMovies(
  limit = 5
): Promise<TraktHistoryMovie[]> {
  const user = requireEnv("TRAKT_USERNAME");

  return await traktGet<TraktHistoryMovie[]>(
    `/users/${encodeURIComponent(user)}/history/movies?limit=${limit}`
  );
}
