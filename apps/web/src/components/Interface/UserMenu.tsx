import { useRef, useState } from "react";
import "./style/userMenu.css";
import pfp from "../../assets/user.png";
import { UserOptions } from "./UserOptions";
interface UserMenuProps {
  username: string;
}

function toggleUserOptions(
  userOptionsDisplay: string,
  setUserOptionsDisplay: React.Dispatch<React.SetStateAction<string>>,
) {
  console.log(userOptionsDisplay);
  if (userOptionsDisplay == "none") {
    setUserOptionsDisplay("flex");
  } 
  else {
    setUserOptionsDisplay("none");
  } 
}

export function UserMenu({ username }: UserMenuProps) {
  const [userOptionsDisplay, setUserOptionsDisplay] = useState("none");
  const userPfpRef = useRef<HTMLImageElement | null>(null);

  return (
    <div id="interface-user-menu">
      <h3 id="username">{username}</h3>
      <div id="pfp-wrapper">
        <img
          src={pfp}
          onClick={() =>
            toggleUserOptions(userOptionsDisplay, setUserOptionsDisplay)
          }
          ref={userPfpRef}
          id="user-pfp"
          alt="pfp"
        />
      </div>
      <div id="user-menu-options" style={{ display: userOptionsDisplay }}>
        <UserOptions />
      </div>
    </div>
  );
}
