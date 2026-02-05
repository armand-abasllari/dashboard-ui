export default function Home() {
  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <h1 className="title">My Dashboard</h1>
          <p className="subtitle">Live stats powered by Trakt + Steam (more coming).</p>
        </header>

        <section className="grid">
          <article className="card">
            <h2 className="cardTitle">🎬 Trakt</h2>
            <p className="cardText">Coming next: recently watched + ratings.</p>
          </article>

          <article className="card">
            <h2 className="cardTitle">🎮 Steam</h2>
            <p className="cardText">Coming next: top played + completion stats.</p>
          </article>

          <article className="card">
            <h2 className="cardTitle">⚙️ Status</h2>
            <ul className="list">
              <li>Frontend: Cloudflare Pages ✅</li>
              <li>APIs: not connected yet</li>
              <li>Next: create <code>/api</code> endpoints</li>
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
