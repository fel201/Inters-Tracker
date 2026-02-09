import type { Player } from "../../types/player_stats";
import type { Runes } from "../../types/runes";
export function definePerks(
  perks: Runes,
  player_info: Player,
  primaryRuneUrl: string | undefined,
  secondRuneUrl: string | undefined,
) {
  let summonersFound = 0;
  for (let i = 0; i < perks.length; i++) {
    if (perks[i].id == player_info.primaryRuneTreeId) {
      for (let j = 0; j < perks[i].slots[0].runes.length; j++) {
        if (perks[i].slots[0].runes[j].id == player_info.primaryRuneId) {
          primaryRuneUrl = perks[i].slots[0].runes[j].icon;
          summonersFound++;
          break;
        }
      }
    }
    else if (perks[i].id == player_info.secondRuneTreeId) {
      secondRuneUrl = perks[i].icon;
      summonersFound++;
    }

    if (summonersFound == 2) break;
  }
  return { primaryRuneUrl, secondRuneUrl };
}
