import express from "express";
import { AuthService } from "./services.ts";


const authService = new AuthService();
export async function deleteSession(
  req: express.Request,
  res: express.Response,
) {
  console.log("/session DELETE REQUEST");
  res
    .clearCookie("jwt", { httpOnly: true, sameSite: "lax" })
    .clearCookie("refresh_token", { httpOnly: true, sameSite: "lax" })
    .clearCookie("username", { sameSite: "lax" })
    .clearCookie("user_id", { sameSite: "lax" });
  res.status(200).json({
    message: "Session terminated successfully",
  });
}

export async function createSession(
  req: express.Request,
  res: express.Response,
) {
  console.log("/session POST REQUEST");
  try {
    if (!req.body.email.includes("@")) {
      res.status(400).json({ message: "Error: malformed email body" });
    }
    if (req.body.password.length < 6) {
      res.status(400).json({
        message: "Error: password has to be longer than 6 characters",
      });
    }

    const userObject = await authService.logIn(
      req.body.email,
      req.body.password,
    );
    if (!userObject.success) {
      throw new Error("Error: " + userObject.message);
    }

    res
      .status(201)
      .cookie("jwt", userObject.data.accessToken, {
        httpOnly: true,
        sameSite: "lax",
      })
      .cookie("refresh_token", userObject.data.refreshToken, {
        httpOnly: true,
        sameSite: "lax",
      })
      .cookie("username", userObject.data.userName, { sameSite: "lax" })
      .cookie("user_id", userObject.data.userId, { sameSite: "lax" })
      .json({
        message: "Successfully logged in!",
      });
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function registerUser(
  req: express.Request,
  res: express.Response,
) {
  try {
    console.log("/USERS POST REQUEST");
    if (!req.body.email.includes("@")) {
      return res.status(400).json({ message: "malformed email" });
    }
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ message: "password should be longer than 6 characters" });
    }
    // check if the username already exists in the database
    const success = authService.register(
      req.body.username,
      req.body.email,
      req.body.password,
    );
    if (!success) {
      throw new Error("error: ...");
    }
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
