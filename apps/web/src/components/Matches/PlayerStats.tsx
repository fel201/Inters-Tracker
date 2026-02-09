import './matchesStyle.css'
interface PlayerProps {
  kills: number,
  deaths: number,
  assists: number
}
export function PlayerStats({ kills, deaths, assists }: PlayerProps) {
  const kda = ((kills + assists) / deaths).toFixed(2);
  return (
    <div className="score-wrapper">
      <p>
        {kills.toString()}/{deaths.toString()}/{assists.toString()}
      </p>
      <p>{kda + " KDA"}</p>
    </div>
  );
}
