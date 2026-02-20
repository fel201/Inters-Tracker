import { useEffect, useRef } from "react";
import "./style/menuSegment.css";



async function endSession() {
  await cookieStore.delete("username");
  await cookieStore.delete("user_id");
  const request = await fetch("http://localhost:3000/api/session", {
    method: "DELETE",
    credentials: "include",
  });
}

export function UserOptions() {
  const logOutAnchorRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    if (logOutAnchorRef.current != null) {
      logOutAnchorRef.current.addEventListener("click", endSession);
    }
    return () => {
      if (logOutAnchorRef.current != null) {
        logOutAnchorRef.current.removeEventListener("click", endSession);
      }
    };
  }, []);
  return (
    <>
      <h6>Profile</h6>
      <h6 ref={logOutAnchorRef} id="log-out-href">
        Log Out
      </h6>
    </>
  );
}
