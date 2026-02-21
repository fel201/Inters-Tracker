import { getMatchInformationV5 } from "./riot_api/matchV5";
import type { MatchV5 } from "../types/match_v5";
import type { Player } from "../types/player_stats";
import { summonerSpellsJson } from "./riot_api/summonerSpells";
import type { SummonerSpells } from "../types/summoner_spells";
export async function setPlayerStats(
  match_information: MatchV5[],
  matchesId: string[],
  puuid: string,
  player_stats: Array<Player>,
  region: string
) {
  
  for (let i = 0; i < 3; i++) {
    
    match_information[i] = await getMatchInformationV5(matchesId[i], region);
    for (let j = 0; j < 10; j++) {
      if (match_information[i].info.participants[j].puuid === puuid) {
        player_stats[i] = {
          champion: match_information[i].info.participants[j].championName,
          firstSpellKey: match_information[i].info.participants[j].summoner1Id.toString(),
          secondSpellKey: match_information[i].info.participants[j].summoner2Id.toString(),
          firstSpell: 'not defined yet',
          secondSpell: 'not defined yet',
          kills: match_information[i].info.participants[j].kills,
          deaths: match_information[i].info.participants[j].deaths,
          assists: match_information[i].info.participants[j].assists,
          win: match_information[i].info.participants[j].win,
          primaryRuneTreeId: match_information[i].info.participants[j].perks.styles[0].style,
          secondRuneTreeId: match_information[i].info.participants[j].perks.styles[1].style,
          primaryRuneId: match_information[i].info.participants[j].perks.styles[0].selections[0].perk,
          secondRuneId:  match_information[i].info.participants[j].perks.styles[1].selections[0].perk,
        };
        break;
      }
    }
  }
  const spells_parsed = await summonerSpellsJson();
  let key: string
  let value: SummonerSpells["data"]["SummonerSpell"];
  for ( [key, value] of Object.entries(spells_parsed.data)) {
    for (let i = 0; i < 3; i++) {
      if (player_stats[i].firstSpellKey == value.key) {
        player_stats[i].firstSpell = key;
      } else if (player_stats[i].secondSpellKey == value.key) {
        player_stats[i].secondSpell = key;
      }
    }
  }
}
