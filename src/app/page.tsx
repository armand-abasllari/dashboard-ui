// src/app/page.tsx
import DashboardCard from "@/components/DashboardCard";
import { getSteamSummary } from "@/lib/steam";

export const dynamic = "force-static";

export default async function Page() {
  const steam = await getSteamSummary();

  return (
    <main>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {/* Trakt (paused) */}
        <DashboardCard
          title="Trakt"
          description="Trakt integration is temporarily paused (history/ratings endpoint inconsistency). Steam is live."
        />

        {/* Steam (real) */}
        <DashboardCard title="Steam">
          {steam.error ? (
            <p style={{ margin: 0, color: "#9ca3af" }}>{steam.error}</p>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  color: "#9ca3af",
                  fontSize: 14,
                }}
              >
                <span>
                  <strong style={{ color: "#e5e7eb" }}>{steam.totalHours}</strong>{" "}
                  hrs total
                </span>
                <span>•</span>
                <span>
                  <strong style={{ color: "#e5e7eb" }}>{steam.totalGames}</strong>{" "}
                  games owned
                </span>
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ color: "#9ca3af", fontSize: 13, marginBottom: 8 }}>
                  Top played
                </div>

                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {steam.topGames.map((g) => (
                    <li key={g.appid} style={{ marginBottom: 6 }}>
                      <a
                        href={g.storeUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#e5e7eb",
                          textDecoration: "none",
                        }}
                      >
                        {g.name}
                      </a>{" "}
                      <span style={{ color: "#9ca3af" }}>— {g.hours} hrs</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 10, color: "#9ca3af", fontSize: 12 }}>
                  Updated at build time
                </div>
              </div>
            </>
          )}
        </DashboardCard>

        {/* Status */}
        <DashboardCard
          title="Status"
          description="Add uptime checks / service status here when you feel like suffering again."
        />
      </section>
    </main>
  );
}
