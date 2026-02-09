import { AuthenticationButtons } from "./AuthenticationButtons";
import logo from "../../assets/logo.png";
import "./style/interfaceStyle.css";
import { useEffect, useState } from "react";
import { UserMenu } from "./UserMenu";
import { MenuSegment } from "./MenuSegment";


export function Interface() {
  const [interfaceMenu, setInterfaceMenu] = useState(<AuthenticationButtons />);
  
  useEffect(() => {
    cookieStore.get("username").then((cookie) => {
      console.log("cookiestore")
      if (!cookie?.value) return;
      setInterfaceMenu(<UserMenu username={cookie.value} />);
    });
  }, []);

  return (
    <div id="inner-interface-elements">
      <a href="/">
        <img src={logo} alt="Logo" id="logo" />
      </a>
      <div id="interface-elements">
        <div id="interface-menu">
          {interfaceMenu}
          <MenuSegment />
        </div>
      </div>
    </div>
  );
}
