import type { RankedData } from "../../types/league_v4";
import './style/profileStyle.css';
import type { Account } from "../../types/account_v1";
import type { Summoner } from "../../types/summoner_v4";

export interface ProfileProps {
  profile: {
    account: Account;
    rankedData: Array<RankedData>;
    summonerInfo: Summoner;
    region: string;
  }
}



export function Profile({ profile }: ProfileProps) {
  console.log(profile);
  if (profile.summonerInfo == undefined || profile == null) {
    return (
      <div id="profile-wrapper">
        PROFILE NOT FOUND
      </div>
    )
  }
  
  let gamename_tag: string | null = null;
  let rank: string | null = null; 
  let lp: number | null = null;
  let url: string | null = null;

  
  gamename_tag = profile.account.gameName + "#" + profile.account.tagLine;
  
  if (profile.rankedData.length > 0) {
    rank = profile.rankedData[0].tier + " " + profile.rankedData[0].rank;
    lp = profile.rankedData[0].leaguePoints;
  }
  else {
    rank = "UNRANKED";
  } 
  url = `https://ddragon.leagueoflegends.com/cdn/16.1.1/img/profileicon/${profile.summonerInfo.profileIconId}.png`;
  

  return (
    <div id="profile-wrapper">
      
      {url != null ? <img id="summoner-icon" src={url} alt="Summoner Icon" /> : ""}
      {<h2>{gamename_tag}</h2>}
      <br />
      <h3>
        {rank} <br /> {lp == null ? '' : lp + ' LP'} 
      </h3>
    </div>
  );
}




