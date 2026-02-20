// Hello!This is the 200th OP.GG copy that does the same as any other similar project. But what (probably) distinguishes this project from others is that it's my own and you can comment on other people's league profile :D
import "./homeStyle.css";
import submitAsset from "../../assets/magnifier.png";
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
export function Home() {
  let formRef = useRef<HTMLFormElement>(null);
  let regionSelectRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function handleSearchButton(e: SubmitEvent) {
      e.preventDefault();
      console.log(e);
      const gameName_tag = (
        e.target as HTMLFormElement
      ).gameName_tag.value.split("#");
      let region: string = "";
      console.log(regionSelectRef);
      if (regionSelectRef.current != null) {
        let index = regionSelectRef.current.selectedIndex;
        region = regionSelectRef.current.options[index].text;
      }
      navigate({
        to: "/profile",
        search: {
          gameName: gameName_tag[0],
          tag: parseInt(gameName_tag[1]),
          region: region,
        },
      });
    }

    if (formRef.current != null) {
      formRef.current.addEventListener("submit", handleSearchButton);
    }

    return () => {
      if (formRef.current != null) {
        formRef.current.removeEventListener("submit", handleSearchButton);
      }
    };
  }, []);

  return (
    <div id="home-wrapper">
      <p>
        Now in Inters Tracker you can view profiles and interact with them, just
        create an account and you will be able to comment on any profile!
      </p>
      <form id="profile-search-form" autoComplete="off" ref={formRef}>
        <select
          id="region-choice"
          ref={regionSelectRef}
          className="region-select"
          name="region"
        >
          <option value="">BR</option>
          <option value="">EUW</option>
          <option value="">NA</option>
        </select>
        <input
          id="profile-search"
          type="text"
          name="gameName_tag"
          placeholder="gameName#Tag"
        />
        <input type="image" id="search-icon" src={submitAsset} />
      </form>
    </div>
  );
}
