
interface RunesProps {
  primaryRuneUrl: string | undefined, 
  secondRuneUrl: string | undefined
}

export function RunesDisplay({ primaryRuneUrl, secondRuneUrl }: RunesProps) {
  return (
    <div className="runes-wrapper">
      <img
        className="primaryRunes"
        src={"https://ddragon.leagueoflegends.com/cdn/img/" + primaryRuneUrl}
        alt="fafafa"
      />
      <img
        className="secondaryRunes"
        src={"https://ddragon.leagueoflegends.com/cdn/img/" + secondRuneUrl}
        alt="fafafa"
      />
    </div>
  );
}
