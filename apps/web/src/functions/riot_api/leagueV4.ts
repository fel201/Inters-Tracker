import type { RankedData } from "../../types/league_v4";
export async function leagueV4(puuid: string, region: string): Promise<RankedData>  {
  const league_v4 = await fetch(
    `https://${region}1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    {
      method: "GET",
      headers: {
        "X-Riot-Token": import.meta.env.VITE_RIOT_TOKEN,
      },
    }
  );
  return await league_v4.json();
};