// src/app/page.tsx
import DashboardCard from "@/components/DashboardCard";
import { getSteamSummary } from "@/lib/steam";

export const dynamic = "force-static";

export default async function Page() {
  const steam = await getSteamSummary();

  return (
    <main
      style={{
        minHeight: "calc(100vh - 80px)", // adjust if your header height differs
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 18px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 1200,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
          alignItems: "start",
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
                  gap: 10,
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

                <div style={{ display: "grid", gap: 10 }}>
                  {steam.topGames.map((g) => (
                    <a
                      key={g.appid}
                      href={g.storeUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "56px 1fr auto",
                        gap: 10,
                        alignItems: "center",
                        textDecoration: "none",
                        padding: 10,
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 28,
                          borderRadius: 8,
                          overflow: "hidden",
                          border: "1px solid rgba(255,255,255,0.08)",
                          background: "rgba(255,255,255,0.04)",
                        }}
                      >
                        <img
                          src={g.headerImg}
                          alt=""
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            color: "#e5e7eb",
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {g.name}
                        </div>
                        <div style={{ color: "#9ca3af", fontSize: 12 }}>
                          AppID: {g.appid}
                        </div>
                      </div>

                      <div style={{ color: "#e5e7eb", fontWeight: 700 }}>
                        {g.hours} <span style={{ color: "#9ca3af" }}>hrs</span>
                      </div>
                    </a>
                  ))}
                </div>

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
