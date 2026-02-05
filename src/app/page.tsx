import { getTopRatedMovies, summarizeRatings } from "@/lib/trakt";

export default async function Home() {
  let topRated = [];
  let stats = { count: 0, avg: 0 };
  let traktError: string | null = null;

  try {
    topRated = await getTopRatedMovies(5);
    stats = summarizeRatings(topRated);
  } catch (e: any) {
    traktError = e?.message ?? "Trakt fetch failed";
  }

  return (
    <main className="container">
      <h1 className="section-title">My Dashboard </h1>
      <p className="section-subtitle">
        Live stats powered by Trakt + Steam (more coming).
      </p>

      <div className="grid dashboard-grid">
        <div className="card">
          <h3>🎬 Trakt</h3>

          {traktError ? (
            <p className="section-subtitle">Trakt error: {traktError}</p>
          ) : (
            <>
              <p>
                Top rated movies (showing {stats.count}) — Avg: {stats.avg}/10
              </p>

              {topRated.length > 0 ? (
                <ul style={{ margin: "8px 0 0", paddingLeft: "18px" }}>
                  {topRated.map((x: any) => (
                    <li key={x.movie.ids.trakt}>
                      {x.movie.title}{" "}
                      <span className="section-subtitle">({x.movie.year})</span>{" "}
                      — <strong>{x.rating}/10</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="section-subtitle">No ratings found yet.</p>
              )}
            </>
          )}

          <div className="tags">
            <span className="tag">Movies</span>
            <span className="tag">Ratings</span>
            <span className="tag">History</span>
          </div>
        </div>

        <div className="card">
          <h3>🎮 Steam</h3>
          <p>Coming next: top played + completion stats.</p>
          <div className="tags">
            <span className="tag">Top hours</span>
            <span className="tag">Achievements</span>
            <span className="tag">Completion</span>
          </div>
        </div>

        <div className="card">
          <h3>⚙️ Status</h3>
          <p>
            Frontend: Cloudflare Pages ✅ <br />
            APIs: not connected yet <br />
            Next: create /api endpoints
          </p>
          <div className="tags">
            <span className="tag">Cloudflare</span>
            <span className="tag">Next.js</span>
            <span className="tag">APIs</span>
          </div>
        </div>
      </div>
    </main>
  );
}
