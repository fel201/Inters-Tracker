import type { RankedData } from "../../types/league_v4";
import './style/profileStyle.css';
import type { Loader } from "../../routes/profile";
function isNotUnranked(rankedInfo: RankedData): rankedInfo is RankedData  {
  return (rankedInfo as RankedData).rank !== undefined;
}

export function Profile({ profile }: Loader) {
  if (profile == undefined) {
    return (
      <div id="profile-wrapper">
        "PROFILE NOT FOUND"
      </div>
    )
  }
  
  let gamename_tag: string | null = null;
  let rank: string | null = null; 
  let lp: number | null = null;
  let url: string | null = null;

  
  gamename_tag = profile.account.gameName + "#" + profile.account.tagLine;
  
  if (isNotUnranked(profile.rankedInfo[0])) {
    rank = profile.rankedInfo[0].tier + " " + profile.rankedInfo[0].rank;
    lp = profile.rankedInfo[0].leaguePoints;
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




