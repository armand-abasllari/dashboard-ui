// src/app/page.tsx
import DashboardCard from "@/components/DashboardCard";
import { getSteamSummary } from "@/lib/steam";

export const dynamic = "force-static";

export default async function Page() {
  const steam = await getSteamSummary();

  const steamText = steam.error
    ? steam.error
    : `Total hours: ${steam.totalHours} hrs • Games owned: ${steam.totalGames}

Top played:
${steam.topGames.map((g) => `• ${g.name} — ${g.hours} hrs`).join("\n")}`;

  return (
    <main>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        <DashboardCard
          title="Trakt"
          description="Trakt integration is temporarily paused (history/ratings endpoint inconsistency). Steam is live."
        />

        <DashboardCard title="Steam" description={steamText} />

        <DashboardCard
          title="Status"
          description="Add uptime checks / service status here when you feel like suffering again."
        />
      </section>
    </main>
  );
}
