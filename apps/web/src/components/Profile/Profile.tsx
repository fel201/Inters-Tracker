import type { RankedData } from "../../types/league_v4";
import type { Summoner } from "../../types/summoner_v4";
import './style/profileStyle.css';
import type { Account } from "../../types/account_v1";

interface ProfileProps {
  account: Account,
  rankedInfo: RankedData,
  summonerInfo: Summoner
};
function isNotUnranked(rankedInfo: RankedData): rankedInfo is RankedData  {
  return (rankedInfo as RankedData).rank !== undefined;
}

export function Profile({account, rankedInfo, summonerInfo}: ProfileProps) {
  
  
  let gamename_tag: string | null = null;
  let rank: string | null = null; 
  let lp: number | null = null;
  let url: string | null = null;

  
  gamename_tag = account.gameName + "#" + account.tagLine;
  if (isNotUnranked(rankedInfo)) {
    rank = rankedInfo.tier + " " + rankedInfo.rank;
    lp = rankedInfo.leaguePoints;
  }
  else {
    rank = "UNRANKED";
  } 
  url = `https://ddragon.leagueoflegends.com/cdn/16.1.1/img/profileicon/${summonerInfo.profileIconId}.png`;

  return (
    <div>
      
      {url != null ? <img id="summoner-icon" src={url} alt="Summoner Icon" /> : ""}
      {gamename_tag != null ? <h2>{gamename_tag}</h2> : "NO PROFILE DETECTED"}
      <br />
      <h3>
        {rank} <br /> {lp == undefined ? '' : lp + ' LP'} 
      </h3>
    </div>
  );
}




