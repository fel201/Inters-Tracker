import { useEffect } from 'react'
import './style/menuSegment.css'

async function endSession() {
    await cookieStore.delete("username");
    await cookieStore.delete("user_id");
    const request = await fetch('https://localhost:3000/api/session', {
        method: "DELETE",
        credentials: "include"
    });
    console.log(request.status);
    window.location.reload();
};

export function MenuSegment() {
    useEffect(() => {
        const log_out = document.getElementById("log-out-href");
        if (log_out != null) {
            log_out.addEventListener("click", endSession);
        }
        return () => {
            log_out?.removeEventListener("click", endSession);
        }
    }, [])
    return (
        <div id="menu-segment" style={{display: 'none'}}>
            <h6>Profile</h6>
            <h6 id="log-out-href">Log Out</h6>   
        </div>
    )
}