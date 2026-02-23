import { Link } from "@tanstack/react-router";
import "./style/interfaceStyle.css";

export function AuthenticationButtons() {
  return (
    <>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </>
  );
}
