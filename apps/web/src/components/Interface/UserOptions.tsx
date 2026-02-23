import { useEffect, useRef } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import "./style/menuSegment.css";
import { deleteUserCookies } from "../../functions/server_api/deleteUserCookies";






export function UserOptions() {
  const navigate = useNavigate();
  const router = useRouter();
  const logOutAnchorRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    const endSession = async () => {
      await deleteUserCookies();
      router.invalidate();
      navigate({to: '/login'});
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
