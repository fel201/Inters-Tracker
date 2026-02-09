import type { Account } from "../../types/account_v1";


export async function accountV1(name: string, tag: string): Promise<Account> {
  const account_v1 = await fetch(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}`,
    
    {
      headers: {
        "X-Riot-Token": import.meta.env.VITE_RIOT_TOKEN,
      },
    }
  );
  return await account_v1.json();
}
export async function accountV1ByPuuid(puuid: string): Promise<Account> {
  const request = await fetch(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`,
    {
      headers: {
        "X-Riot-Token": import.meta.env.VITE_RIOT_TOKEN,
      }
    }
  );
  return await request.json();
}