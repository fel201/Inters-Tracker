export async function runesReforgedJson() {
  const request = await fetch('https://ddragon.leagueoflegends.com/cdn/16.1.1/data/en_US/runesReforged.json');
  return await request.json();
}