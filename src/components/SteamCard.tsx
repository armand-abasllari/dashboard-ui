// components/SteamCard.tsx
import type { SteamSummary } from "@/lib/steam";

function formatHours(h: number) {
  // avoid trailing .0 if integer
  return Number.isInteger(h) ? `${h}` : `${h}`;
}

export default function SteamCard({ data }: { data: SteamSummary }) {
  return (
    <div className="card">
      <div className="card-top">
        <h3 className="card-title">Steam</h3>
        <span className="tag">Live</span>
      </div>

      {data.error ? (
        <p className="muted" style={{ marginTop: 10 }}>
          {data.error}
        </p>
      ) : (
        <>
          <div style={{ marginTop: 10 }}>
            <div className="muted">Total hours</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>
              {formatHours(data.totalHours)} <span className="muted">hrs</span>
            </div>

            <div className="muted" style={{ marginTop: 6 }}>
              Owned games: {data.totalGames}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div className="muted" style={{ marginBottom: 8 }}>
              Top played
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {data.topGames.map((g) => (
                <a
                  key={g.appid}
                  href={g.storeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="row-link"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "64px 1fr auto",
                    gap: 10,
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={g.headerImg}
                    alt={g.name}
                    loading="lazy"
                    style={{
                      width: 64,
                      height: 32,
                      objectFit: "cover",
                      borderRadius: 6,
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onError={(e) => {
                      // if header image missing, hide it instead of ugly broken icon
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />

                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {g.name}
                    </div>
                    <div className="muted" style={{ fontSize: 12 }}>
                      AppID: {g.appid}
                    </div>
                  </div>

                  <div style={{ fontWeight: 700 }}>
                    {formatHours(g.hours)} <span className="muted">hrs</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="muted" style={{ marginTop: 12, fontSize: 12 }}>
              Updated at build time: {new Date(data.lastUpdatedISO).toLocaleString()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
