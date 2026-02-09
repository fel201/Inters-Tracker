// Hello!This is the 200th OP.GG copy that does the same as any other similar project. But what (probably) distinguishes this project from others is that it's my own and you can comment on other people's league profile :D
import "./homeStyle.css";
import submitAsset from "../../assets/magnifier.png";
import { useEffect } from "react";
import { handleSearchButton } from "../../functions/handleSearchButton";
export function Home() {
  useEffect(() => {
    const form = document.getElementById("profile-search-form");
    if (form != null) {
      form.addEventListener("submit", handleSearchButton);
      cookieStore.get("username").then(username => console.log(username));
    }
    return () => {
      form?.removeEventListener("submit", handleSearchButton);
    }
  }, []);
  return (
    <div id="home-wrapper">
      <p>
        Hello! This is the 200th OP.GG copy that does the same as any other
        similar project. But what (probably) distinguishes this project from
        others is that it's my own and you can comment on other people's league
        profile :D{" "}
      </p>
      <form id="profile-search-form" autoComplete="off">
        <input id="profile-search" type="text" name="gameName_tag" placeholder="gameName#Tag" />
        <input type="image" id="search-icon" src={submitAsset} />
      </form>
    </div>
  );
}
