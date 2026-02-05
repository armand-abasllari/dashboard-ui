// src/lib/steam.ts
export type SteamTopGame = {
  appid: number;
  name: string;
  hours: number;
  storeUrl: string;
  headerImg: string;
};

export type SteamProfile = {
  personaName: string;
  profileUrl: string;
  avatarFull: string;
};

export type SteamSummary = {
  profile?: SteamProfile;
  totalHours: number;
  totalGames: number;
  topGames: SteamTopGame[];
  lastUpdatedISO: string;
  error?: string;
};

function toHours(minutes?: number): number {
  if (!minutes || minutes <= 0) return 0;
  return Math.round((minutes / 60) * 10) / 10; // 1 decimal
}

async function fetchSteamProfile(key: string, steamid: string): Promise<SteamProfile | undefined> {
  const url =
    "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?" +
    new URLSearchParams({
      key,
      steamids: steamid,
      format: "json",
    }).toString();

  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) return undefined;

  const data = (await res.json()) as any;
  const p = data?.response?.players?.[0];
  if (!p) return undefined;

  return {
    personaName: String(p.personaname ?? "Steam User"),
    profileUrl: String(p.profileurl ?? `https://steamcommunity.com/profiles/${steamid}/`),
    avatarFull: String(p.avatarfull ?? ""),
  };
}

export async function getSteamSummary(): Promise<SteamSummary> {
  const key = process.env.STEAM_API_KEY;
  const steamid = process.env.STEAM_ID64;
  const topN = Number(process.env.STEAM_TOP_N ?? "5") || 5;

  const base: SteamSummary = {
    totalHours: 0,
    totalGames: 0,
    topGames: [],
    lastUpdatedISO: new Date().toISOString(),
  };

  if (!key || !steamid) {
    return {
      ...base,
      error:
        "Missing STEAM_API_KEY or STEAM_ID64. Add them in Cloudflare Pages → Settings → Environment variables.",
    };
  }

  try {
    // Profile header info (name/avatar/link)
    const profile = await fetchSteamProfile(key, steamid);

    // Owned games list
    const gamesUrl =
      "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?" +
      new URLSearchParams({
        key,
        steamid,
        include_appinfo: "1",
        include_played_free_games: "1",
        format: "json",
      }).toString();

    const res = await fetch(gamesUrl, { cache: "force-cache" });

    if (!res.ok) {
      return { ...base, profile, error: `Steam API error: HTTP ${res.status}` };
    }

    const data = (await res.json()) as any;
    const games: any[] = data?.response?.games ?? [];

    if (!Array.isArray(games) || games.length === 0) {
      return {
        ...base,
        profile,
        error: "Steam returned no games. Check Steam privacy: Game details must be Public.",
      };
    }

    const totalMinutes = games.reduce(
      (sum, g) => sum + (typeof g.playtime_forever === "number" ? g.playtime_forever : 0),
      0
    );

    const sorted = [...games].sort(
      (a, b) => (b.playtime_forever ?? 0) - (a.playtime_forever ?? 0)
    );

    const topGames: SteamTopGame[] = sorted.slice(0, topN).map((g) => {
      const appid = Number(g.appid);
      const name = String(g.name ?? `App ${appid}`);
      const hours = toHours(g.playtime_forever);

      return {
        appid,
        name,
        hours,
        storeUrl: `https://store.steampowered.com/app/${appid}/`,
        headerImg: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
      };
    });

    return {
      profile,
      totalHours: toHours(totalMinutes),
      totalGames: games.length,
      topGames,
      lastUpdatedISO: new Date().toISOString(),
    };
  } catch (e: any) {
    return { ...base, error: `Steam fetch failed: ${e?.message ?? "unknown error"}` };
  }
}
