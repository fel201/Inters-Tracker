import { useEffect, useState } from "react";
import "./menuStyle.css";
import { accountV1ByPuuid } from "../../functions/riot_api/accountV1";
import { getInters } from "../../functions/server_api/getInters";
import type { Account } from "../../types/account_v1";
import { handleMenuButton} from "../../functions/handleMenuButton";
import { Loading } from "../Loading/Loading";

interface MenuProps {
  hamburguerButtonRef: {
    current: HTMLImageElement | null
  }
};

export function Menu({ hamburguerButtonRef }: MenuProps) {
  const [inters, setInters] = useState<Array<Account>>([]);
  const [menuClick, setMenuClick] = useState(false);
  useEffect(() => {
    const fetchInters = async () => {
      const request = await getInters();
      console.log(request);
      let players: Array<Account> = [];
      let accountObject: Account;

      for (let i = 0; i < request.inters.length; i++) {
        accountObject = await accountV1ByPuuid(request.inters[i].puuid, request.inters[i].region);
        players.push(accountObject);
      }
      setInters(players);
    };
    // just making sure it only loads the saved players when 
    // the user clicks on the menu, so as to avoid unnecessary 
    // api calling 
    if (menuClick) {
      fetchInters();
      console.log(menuClick);
    }
  }, [menuClick]);

  useEffect(() => {
    const displayInters = async () => {
      handleMenuButton();
      setMenuClick(true);
    };
    if (hamburguerButtonRef.current != null) {
      hamburguerButtonRef.current.addEventListener("click", displayInters);

    }
    return () => {
      hamburguerButtonRef.current?.removeEventListener("click", displayInters);
    };
  }, []);

  return (
    <div id="menu-wrapper">
      <div id="players-wrapper">
        <h2>Saved players:</h2>
        <br />
        {inters.length != 0 ? inters.map((inter) => {
          let href = "?gameName=" + inter.gameName + "&tag=" + inter.tagLine;
          return (
            <>
              
              <a href={href}>
                {inter.gameName}#{inter.tagLine}
              </a>
              <br />
            </>
          );
        }) : <Loading/>}
      </div>
     </div>
  );
}
