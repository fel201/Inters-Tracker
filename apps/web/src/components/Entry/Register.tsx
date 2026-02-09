import { useEffect } from "react";
import "./entryStyle.css";
import { registerUser } from "../../functions/server_api/entry/registerUser";
export function Register() {
  useEffect(() => {
    const form = document.getElementById("register-form");
    if (form != null) {
      form.addEventListener("submit", registerUser);
    }
    return () => {
      form!.removeEventListener("submit", registerUser);
    }
  }, []);
  return (
    <div id="pre-form-wrapper">
      <form className="signing" id="register-form">
        <h2>Register</h2>
        <span>* Username</span>
        <input type="text" name="username" />
        <span>* Email</span>
        <input type="text" name="email" />
        <span>* Password</span>
        <input type="text" name="password" />
        <span>* Confirm Password</span>
        <input type="text" name="confirm_password" />
        <input type="submit" value={"Register"} />
      </form>
    </div>
  );
}
