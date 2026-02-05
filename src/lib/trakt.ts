// src/lib/trakt.ts
export type TraktWatchedMovie = {
  plays: number;
  last_watched_at: string;
  movie: {
    title: string;
    year: number;
    ids: { trakt: number; imdb?: string; tmdb?: number; slug?: string };
  };
};

const TRAKT_API = "https://api.trakt.tv";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

async function traktGet<T>(path: string): Promise<T> {
  const clientId = requireEnv("TRAKT_CLIENT_ID");

  const res = await fetch(`${TRAKT_API}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": clientId,
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Trakt API error ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

// ✅ Most recently watched movies (public-friendly)
export async function getRecentlyWatchedMovies(limit = 5): Promise<TraktWatchedMovie[]> {
  const user = requireEnv("TRAKT_USERNAME");

  // returns array with movie + plays + last_watched_at
  const data = await traktGet<TraktWatchedMovie[]>(
    `/users/${encodeURIComponent(user)}/watched/movies?extended=full`
  );

  // Sort newest first, then take top N
  data.sort(
    (a, b) => new Date(b.last_watched_at).getTime() - new Date(a.last_watched_at).getTime()
  );

  return data.slice(0, limit);
}
