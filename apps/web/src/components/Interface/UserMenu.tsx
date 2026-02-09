import * as React from "react";
import "./style/userMenu.css";
import pfp from "../../assets/user.png";
import { useEffect } from "react";

interface UserMenuProps {
  username: string
};

function toggleUserMenu() {
  const userMenu = document.getElementById("menu-segment");
  if (userMenu) {
    if (userMenu.style.display == 'none') {
      userMenu.style.display = 'flex';
    }
    else {
      userMenu.style.display = 'none';
    }
  }
}



export function UserMenu({ username }: UserMenuProps) {
    useEffect(() => {
      console.log("user-pfp")
      const pfp = document.getElementById("user-pfp");
      
      if (pfp != null) {
        console.log("WAT");
        pfp.addEventListener("click", toggleUserMenu)
      }
    }, [])
  return (
    <React.Fragment>
      <h3 id="username">{username}</h3>
      <div id="pfp-wrapper">
        <img src={pfp} id="user-pfp" alt="" />
      </div>
    </React.Fragment>
  );
}
