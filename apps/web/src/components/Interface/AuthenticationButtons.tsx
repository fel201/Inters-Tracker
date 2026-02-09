import "./style/interfaceStyle.css";
import * as React from "react";
export function AuthenticationButtons() {
  return (
    <React.Fragment>
      <a href="/login">
        <button>Login</button>
      </a>
      <a href="/register">
        <button>Register</button>
      </a>
    </React.Fragment>
  );
}
