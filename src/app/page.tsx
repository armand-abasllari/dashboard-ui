// app/page.tsx
import SteamCard from "@/components/SteamCard";
import { getSteamSummary } from "@/lib/steam";

export const dynamic = "force-static";

export default async function Page() {
  const steam = await getSteamSummary();

  return (
    <main>
      {/* Keep whatever header/hero you already have above this if needed */}

      <section className="grid">
        {/* Trakt (paused) */}
        <div className="card">
          <div className="card-top">
            <h3 className="card-title">Trakt</h3>
            <span className="tag">Paused</span>
          </div>
          <p className="muted" style={{ marginTop: 10 }}>
            Trakt integration is temporarily paused (history/ratings endpoint inconsistency). Steam is live.
          </p>
        </div>

        {/* Steam (real data) */}
        <SteamCard data={steam} />

        {/* Status (placeholder, keep your existing content if you want) */}
        <div className="card">
          <div className="card-top">
            <h3 className="card-title">Status</h3>
            <span className="tag">Soon</span>
          </div>
          <p className="muted" style={{ marginTop: 10 }}>
            Add uptime checks / service status here when you feel like suffering again.
          </p>
        </div>
      </section>
    </main>
  );
}
