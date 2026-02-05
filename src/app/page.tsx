export default function Home() {
  return (
    <main className="container">
      <h1 className="section-title">My Dashboard</h1>
      <p className="section-subtitle">Live stats powered by Trakt + Steam (more coming).</p>

      <div className="grid dashboard-grid">
        <div className="card">
          <h3>🎬 Trakt</h3>
          <p>Coming next: recently watched + ratings.</p>
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
