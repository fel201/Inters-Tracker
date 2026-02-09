import type { Player } from "../../types/player_stats";
interface SummonerProps {
  player_info: Player
}
export function SummonerSpells({player_info}: SummonerProps) {
  return (
    <div className="summoner-spells-wrapper">
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/spell/${player_info.firstSpell}.png`}
        alt="summoner-spell-1"
        className="summoner-spells"
      />
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/spell/${player_info.secondSpell}.png`}
        alt="summoner-spell-2"
        className="summoner-spells"
      />
    </div>
  );
}
