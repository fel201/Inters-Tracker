import "../App.css";
import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Profile } from "../components/Profile/Profile";
import { Matches } from "../components/Matches/Matches";
import { Comments } from "../components/Profile/Comments";
import { accountV1 } from "../functions/riot_api/accountV1";
import { leagueV4 } from "../functions/riot_api/leagueV4";
import { summonerV4 } from "../functions/riot_api/summonerV4";
import type { Account } from "../types/account_v1";
import type { rankedInfo } from "../types/league_v4";
import type { Summoner } from "../types/summoner_v4";
interface PlayerProfile {
  gameName: string;
  tag: string;
  region: string;
}
export interface Loader {
  profile: {
    account: Account;
    rankedInfo: rankedInfo;
    summonerInfo: Summoner;
    region: string;
  }
}
export const Route = createFileRoute("/profile")({
  component: ProfileLayOut,
  validateSearch: (search: Record<string, unknown>): PlayerProfile => {
    return {
      gameName: (search.gameName as string) ?? "",
      tag: (search.tag as string) ?? "",
      region: (search.region as string) ?? "",
    };
  },
  loaderDeps: ({ search }) => ({
    gameName: search.gameName,
    tag: search.tag,
    region: search.region
  }),
  loader: async ({ deps }): Promise<Loader | null> => {
    const account = await accountV1(deps.gameName, deps.tag, deps.region);
    if (!isValidAccount(account)) return null;
    const rankedInfo = await leagueV4(account.puuid, deps.region);
    const summonerInfo = await summonerV4(account.puuid, deps.region);
    const region = deps.region;
    return { account, rankedInfo, summonerInfo, region };
  },
});

function isValidAccount(account: Account): account is Account {
  return (account as Account).gameName !== undefined;
}
function ProfileLayOut() {
  const profileLoader = Route.useLoaderData();
  
  return (
    <>
      <Profile profile={profileLoader} />
      <Matches puuid={profileLoader.account.puuid} region={profileLoader.region} />
      <Comments puuid={profileLoader.account.puuid} />
    </>
  );
}
