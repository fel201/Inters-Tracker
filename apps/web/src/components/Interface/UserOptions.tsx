import { useEffect, useRef } from "react";
import { useRouter } from "@tanstack/react-router";
import "./style/menuSegment.css";






export function UserOptions() {
  const router = useRouter();
  const logOutAnchorRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    const endSession = async () => {
      await cookieStore.delete("username");
      await cookieStore.delete("user_id");
      await fetch("http://localhost:3000/api/session", {
        method: "DELETE",
        credentials: "include",
      });
      router.invalidate();
    }
    
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
