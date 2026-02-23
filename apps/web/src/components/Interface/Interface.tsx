import { AuthenticationButtons } from "./AuthenticationButtons";
import logo from "../../assets/logo.png";
import "./style/interfaceStyle.css";
import { type ReactElement, useEffect, useState } from "react";
import { UserMenu } from "./UserMenu";



interface InterfaceProps {
  usernameCookie: CookieListItem | null
};

export function Interface({usernameCookie}: InterfaceProps) {
  const [interfaceUserMenu, setinterfaceUserMenu] = useState<ReactElement | null>(null);
  
  useEffect(() => {
    if (usernameCookie?.value != undefined) {
      setinterfaceUserMenu(<UserMenu username={usernameCookie.value}/>);
    }
    else {
      setinterfaceUserMenu(<AuthenticationButtons />);
    }
  }, [usernameCookie]);
  return (
    <div id="interface-wrapper" >
      <div id="inner-interface-elements">
        <a href="/">
          <img src={logo}></img>
        </a>
        <div id="interface-elements">
          {interfaceUserMenu}
        </div>
      </div>
    </div>
  );
}
