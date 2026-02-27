import express from "express";
import jwt from "jsonwebtoken";
import { ProfileQuery } from "../../../db/database.ts";
import { ENV } from "../../env.ts";
import { commentPostService } from "./services.ts";
const saltRounds = 12;
const app = express.Router();
const profileQuery = new ProfileQuery();
export async function getInters(req: express.Request, res: express.Response) {
  console.log("/INTERS GET REQUEST");
  const inters = await profileQuery.getAll();
  if (inters.length == 0) {
    return res.status(404).json({ message: "no profiles saved" });
  }
  res.status(200).json({ inters });
}

// caching with redis would be useful here
export async function getProfileComments(req: express.Request, res: express.Response) {
  const rows = await profileQuery.getComments(req.params.puuid);
  if (rows.length == 0)
    return res.status(404).json({ message: "No comments were found" });

  res.status(200).json(rows);
}

export async function addProfileComment(req: express.Request, res: express.Response) {
  try {
    const commentResult = await commentPostService(
      req.body.comment,
      req.params.puuid,
      req.cookies.jwt,
      req.body.userId,
    );
    if (!commentResult.expiredToken) {
      return new Error("Error: " + commentResult.message);
    }

    res.status(201).json({
      message: commentResult.message,
    });
  }
  catch (err) {
    res
      .clearCookie("username", { sameSite: "lax" })
      .clearCookie("user_id", { sameSite: "lax" })
      .clearCookie("jwt", { httpOnly: true, sameSite: "lax" });
    console.error(err);
    return res.status(401).json({ message: err });
  }
}
export default app;
