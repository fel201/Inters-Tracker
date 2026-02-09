export async function last20MatchesV5(puuid: string) {
  const match_v5 = await fetch(
    `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`,
    {
      headers: {
        "X-Riot-Token": import.meta.env.VITE_RIOT_TOKEN,
      },
    }
  );
  return await match_v5.json();
}
export async function getMatchInformationV5(matchId: string) {
  const match_info = await fetch(
    `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    {
      headers: {
        "X-Riot-Token": import.meta.env.VITE_RIOT_TOKEN,
      },
    }
  );
  return await match_info.json();
}