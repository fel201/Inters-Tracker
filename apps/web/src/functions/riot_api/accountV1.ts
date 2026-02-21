import type { Account } from "../../types/account_v1";
import { getNearestCluster } from "./getNearestCluster";
export async function accountV1(name: string, tag: string, region: string): Promise<Account> {
  const cluster = getNearestCluster(region);
  const URL = `https://${cluster}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}`;
  const account_v1 = await fetch(URL, {
    headers: {
      "X-Riot-Token": import.meta.env.VITE_RIOT_TOKEN,
    },
  });
  return await account_v1.json();
}
export async function accountV1ByPuuid(puuid: string, region: string): Promise<Account> {
  const cluster = getNearestCluster(region);
  const URL = `https://${cluster}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`;
  const request = await fetch(URL, {
    headers: {
      "X-Riot-Token": import.meta.env.VITE_RIOT_TOKEN,
    },
  });
  return await request.json();
}
