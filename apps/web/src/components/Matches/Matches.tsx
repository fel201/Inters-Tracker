import type { Player } from "../../types/player_stats";
import type { MatchV5 } from "../../types/match_v5";
import { setPlayerStats } from "../../functions/setPlayerStats";
import { useState, useEffect} from "react";
import { last20MatchesV5 } from "../../functions/riot_api/matchV5";
import { runesReforgedJson } from "../../functions/riot_api/runesReforged";
import type { Runes } from "../../types/runes";
import './matchesStyle.css'
import { definePerks } from "./definePerks";
import { SummonerSpells } from "./SummonerSpells";
import { RunesDisplay } from "./RunesDisplay";
import { PlayerStats } from "./PlayerStats";
import { ChampionIcon } from "./ChampionIcon";


interface MatchesProps {
  puuid: string;
  region: string;
};
export function Matches({puuid, region}: MatchesProps) {
  const [matchesInfo, setMatchesInfo] = useState<Array<Player>>([]);
  const [perks, setPerks] = useState<Runes>([]);
  const [isValidPlayer, setisValidPlayer] = useState<Boolean>(false);
  useEffect(() => {

    const getMatchesStats = async () => {
      setisValidPlayer(true);
      const matchesId: Array<string> = await last20MatchesV5(puuid, region);
      let match_information: Array<MatchV5> = [];
      let player_stats: Array<Player> = [];

      await setPlayerStats(match_information, matchesId, puuid, player_stats, region);
      setMatchesInfo(player_stats);
      const perks: Runes = await runesReforgedJson();
      setPerks(perks);
    };
    getMatchesStats();
    return () => {

    }
  }, []);

  return (
    
    <div id="match-history-container">
      {matchesInfo.map((player_info) => {
        if (!isValidPlayer) return;
        let primaryRuneUrl: string | undefined = undefined;
        let secondRuneUrl: string | undefined = undefined;
        
         ({ primaryRuneUrl, secondRuneUrl } = definePerks(perks, player_info, primaryRuneUrl, secondRuneUrl));
        
        return (
          <div 
            className="match-wrapper"
            style={{
              backgroundColor: player_info.win ? "#005073" : "#751912",
            }}
          >
            <ChampionIcon champion={player_info.champion}/>
            <SummonerSpells player_info={player_info}/>
            <PlayerStats kills={player_info.kills} deaths={player_info.deaths} assists={player_info.assists}/>
            <RunesDisplay primaryRuneUrl={primaryRuneUrl} secondRuneUrl={secondRuneUrl}/>
            
          </div>
        );
      })}
            
    </div>
  );
}

