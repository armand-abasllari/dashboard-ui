export default function Home() {
  return (
    <main className="container">
      <h1 className="h1">My Dashboard</h1>
      <p className="sub">Live stats powered by Trakt + Steam (more coming).</p>

      <section className="grid">
        <div className="card">
          <h2 className="card-title">
            <span aria-hidden>🎬</span> Trakt
          </h2>
          <p className="card-text">Coming next: recently watched + ratings.</p>
        </div>

        <div className="card">
          <h2 className="card-title">
            <span aria-hidden>🎮</span> Steam
          </h2>
          <p className="card-text">Coming next: top played + completion stats.</p>
        </div>

        <div className="card">
          <h2 className="card-title">
            <span aria-hidden>⚙️</span> Status{" "}
            <span className="badge">Cloudflare Pages ✅</span>
          </h2>

          <ul className="list">
            <li>Frontend: Cloudflare Pages ✅</li>
            <li>APIs: not connected yet</li>
            <li>Next: create /api endpoints</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
