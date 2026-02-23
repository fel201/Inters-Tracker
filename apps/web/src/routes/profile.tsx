import "../App.css";
import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "../components/Profile/Profile";
import { Matches } from "../components/Matches/Matches";
import { Comments } from "../components/Profile/Comments";
import { accountV1 } from "../functions/riot_api/accountV1";
import { leagueV4 } from "../functions/riot_api/leagueV4";
import { summonerV4 } from "../functions/riot_api/summonerV4";
import type { Account } from "../types/account_v1";
import type { RankedData } from "../types/league_v4";
import type { Summoner } from "../types/summoner_v4";

function accountExists(account: Account): account is Account {
  return (account as Account).gameName !== undefined;
}

interface PlayerQuery {
  gameName: string;
  tag: string;
  region: string;
}

interface ProfileFound {
  account: Account;
  rankedData: RankedData;
  summonerInfo: Summoner;
  region: string;
}

interface ProfileNotFound {
  status: string;
  accountExistsElsewhere: boolean;
}

export const Route = createFileRoute("/profile")({
  component: ProfileLayOut,
  validateSearch: (search: Record<string, unknown>): PlayerQuery => {
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
  loader: async ({ deps }): Promise<ProfileFound | ProfileNotFound> => {
    const errObject: ProfileNotFound = {
      status: "not_found",
      accountExistsElsewhere: false
    };

    const account = await accountV1(deps.gameName, deps.tag, deps.region);
    if (!accountExists(account)) {
      return errObject;
    };
    const summonerInfo = await summonerV4(account.puuid, deps.region);

    // if the code gets past the previous conditional but not this one,
    // that probably means the account exists, but it's in a different region
    if (summonerInfo.puuid == undefined) {
      errObject.accountExistsElsewhere = true;
      return errObject;
    };

    const rankedData = await leagueV4(account.puuid, deps.region);
    const region = deps.region;
    return { account, rankedData, summonerInfo, region };
  },
});


function ProfileLayOut() {
  const profileLoader = Route.useLoaderData();
  
  return (
    <>
      <Profile profile={profileLoader} />
      <Matches profile={profileLoader} />
      <Comments profile={profileLoader} />
    </>
  );
}
