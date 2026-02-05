export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 20px",
        background:
          "radial-gradient(circle at top left, #132235, #050914 70%)",
        color: "#e5e7eb",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, margin: 0 }}>My Dashboard</h1>
          <p style={{ marginTop: 8, color: "#9ca3af" }}>
            Live stats powered by Trakt + Steam (more coming).
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 18,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 16 }}>🎬 Trakt</h2>
            <p style={{ marginTop: 10, color: "#9ca3af" }}>
              Coming next: recently watched + ratings.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 18,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 16 }}>🎮 Steam</h2>
            <p style={{ marginTop: 10, color: "#9ca3af" }}>
              Coming next: top played + completion stats.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 18,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 16 }}>⚙️ Status</h2>
            <ul style={{ marginTop: 10, color: "#9ca3af", paddingLeft: 18 }}>
              <li>Frontend: Cloudflare Pages ✅</li>
              <li>APIs: not connected yet</li>
              <li>Next: create /api endpoints</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
