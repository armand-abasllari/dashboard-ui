// src/lib/trakt.ts
export type TraktRatedMovie = {
  rated_at: string;
  rating: number; // 1..10
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
    // Build-time fetch should be cached for static export.
    cache: "force-cache",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Trakt API error ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

export async function getTopRatedMovies(limit = 5): Promise<TraktRatedMovie[]> {
  const user = requireEnv("TRAKT_USERNAME");

  // Public user ratings endpoint (works when profile is public).
  // Sort by "highest" so we get your top rated first.
  const data = await traktGet<TraktRatedMovie[]>(
    `/users/${encodeURIComponent(user)}/ratings/movies?sort=highest`
  );

  return data.slice(0, limit);
}

export function summarizeRatings(items: TraktRatedMovie[]) {
  const count = items.length;
  const avg =
    count === 0 ? 0 : items.reduce((s, x) => s + x.rating, 0) / count;

  return {
    count,
    avg: Number(avg.toFixed(2)),
  };
}
