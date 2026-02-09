import type { SummonerSpells } from "../../types/summoner_spells";

export async function summonerSpellsJson(): Promise<SummonerSpells> {
  const summoner_spells = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/summoner.json"
  );
  return await summoner_spells.json();
}