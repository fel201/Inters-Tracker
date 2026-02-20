import { AuthenticationButtons } from "./AuthenticationButtons";
import logo from "../../assets/logo.png";
import "./style/interfaceStyle.css";
import { useEffect, useState } from "react";
import { UserMenu } from "./UserMenu";


interface InterfaceProps {
  usernameCookie: CookieListItem | null
};

export function Interface({usernameCookie}: InterfaceProps) {
  const [interfaceUserMenu, setinterfaceUserMenu] = useState(<AuthenticationButtons />);
  
  useEffect(() => {
    if (usernameCookie?.value != undefined) {
      setinterfaceUserMenu(<UserMenu username={usernameCookie.value}/>);
    }
  }, []);
  return (
    <div id="inner-interface-elements">
      <a href="/">
        <img src={logo} alt="Logo" id="logo" />
      </a>
      <div id="interface-elements">
        {interfaceUserMenu}
      </div>
    </div>
  );
}
