import { useEffect } from 'react';
import './entryStyle.css';
import { handleLoginEvent } from '../../functions/server_api/entry/handleLoginEvent';
export function Login() {
    useEffect(() => {
        const form = document.getElementById("login-form");
        if (form != null) {
            form.addEventListener("submit", handleLoginEvent);
        }
        return () => {
            form!.removeEventListener("submit", handleLoginEvent);
        }
    }, [])
    return (
        <div id="pre-form-wrapper">
            <form className="signing" id="login-form">
                <h2>Login</h2>
                <span>* Email</span>
                <input type="text" name="email"/>
                <span>* Password</span>
                <input type="text" name="password" />
                <input type="submit" value="Sign in"/>
            </form>
        </div>
    )
}