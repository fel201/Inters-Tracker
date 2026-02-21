export async function summonerV4(puuid: string, region: string) {
  const summoner_v4 = await fetch(
    `https://${region}1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    {
      headers: {
        "X-Riot-Token": import.meta.env.VITE_RIOT_TOKEN,
      },
    }
  );
  return await summoner_v4.json();
};