import { getNearestCluster } from "./getNearestCluster";
// it's necessary to declare the corresponding cluster of the region
// the searched account is being located at in matchV5 

export async function last20MatchesV5(puuid: string, region: string) {
  const cluster = getNearestCluster(region);
  const URL = `https://${cluster}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`;
  const match_v5 = await fetch(URL, {
    headers: {
      "X-Riot-Token": import.meta.env.VITE_RIOT_TOKEN,
    },
  });
  const response = await match_v5.json();
  return response;
}
export async function getMatchInformationV5(matchId: string, region: string) {
  const cluster = getNearestCluster(region);
  const URL = `https://${cluster}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
  const match_info = await fetch(URL, {
    headers: {
      "X-Riot-Token": import.meta.env.VITE_RIOT_TOKEN,
    },
  });
  return await match_info.json();
}
