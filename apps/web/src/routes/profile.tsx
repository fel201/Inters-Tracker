import "../App.css";
import { createFileRoute } from "@tanstack/react-router";
import { ProfileNotFound } from "../components/Profile/ProfileNotFound";
import * as React from "react";
import { Profile } from "../components/Profile/Profile";
import { Matches } from "../components/Matches/Matches";
import { Comments } from "../components/Profile/Comments";
import { accountV1 } from "../functions/riot_api/accountV1";
import { leagueV4 } from "../functions/riot_api/leagueV4";
import { summonerV4 } from "../functions/riot_api/summonerV4";
import type { Account } from "../types/account_v1";
import type { RankedData } from "../types/league_v4";
import type { Summoner } from "../types/summoner_v4";
interface PlayerProfile {
  gameName: string;
  tag: string;
}
interface Loader {
  account: Account;
  rankedData: RankedData;
  summonerParsed: Summoner;
}
export const Route = createFileRoute("/profile")({
  component: ProfileLayOut,
  validateSearch: (search: Record<string, unknown>): PlayerProfile => {
    return {
      gameName: (search.gameName as string) ?? "",
      tag: (search.tag as string) ?? "",
    };
  },
  loaderDeps: ({ search }) => ({
    gameName: search.gameName,
    tag: search.tag,
  }),
  loader: async ({ deps }): Promise<Loader | null> => {
    const account = await accountV1(deps.gameName, deps.tag);
    if (!isValidAccount(account)) return null;
    const rankedData = await leagueV4(account.puuid);
    const summonerParsed = await summonerV4(account.puuid);
    return { account, rankedData, summonerParsed };
  },
});

function isValidAccount(account: Account): account is Account {
  return (account as Account).gameName !== undefined;
}
function ProfileLayOut() {
  const profile_loader = Route.useLoaderData();

  return (
    <React.Fragment>
      <div id="profile-wrapper">
        {profile_loader == null ? (
          <ProfileNotFound />
        ) : (
          <Profile
            account={profile_loader.account}
            rankedInfo={profile_loader.rankedData}
            summonerInfo={profile_loader.summonerParsed}
          />
        )}
      </div>
      <div id="match-history-container">
        {profile_loader == null ? (
          ""
        ) : (
          <Matches puuid={profile_loader.account.puuid} />
        )}
      </div>
      <div id="comments-wrapper">
        {profile_loader == null ? (
          ""
        ) : (
          <Comments puuid={profile_loader.account.puuid} />
        )}
      </div>
    </React.Fragment>
  );
}
