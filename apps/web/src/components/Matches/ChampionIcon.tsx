export function ChampionIcon({champion}) {
  return (
    <div className="champion-wrapper">
      <img
        className="champion-icon"
        src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/champion/${champion}.png`}
        alt="Champion Icon"
      />
    </div>
  );
}
