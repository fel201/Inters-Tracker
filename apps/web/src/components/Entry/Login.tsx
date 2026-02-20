import { useEffect, useRef } from 'react';
import './entryStyle.css';
import { handleLoginEvent } from '../../functions/server_api/entry/handleLoginEvent';
export function Login() {
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (formRef.current != null) {
            formRef.current.addEventListener("submit", handleLoginEvent);
        }
        return () => {
            formRef.current?.removeEventListener("submit", handleLoginEvent);
        }
    }, [])
    return (
        <div id="pre-form-wrapper">
            <form className="signing" ref={formRef} id="login-form">
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