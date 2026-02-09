import express from "express";
import jwt from "jsonwebtoken";
import { db } from "../../../db/database.ts";
import { ENV } from "../../env.ts";
const saltRounds = 12;
const app = express.Router();

app.get("/inters", async (req, res) => {
  const inters = await db.getInters();
  console.log("/INTERS GET REQUEST");
  res.status(200).json({ inters });
});

// caching with redis would be useful here
app.get("/inters/:puuid/comments", async (req, res) => {
  console.log("??????");
  const rows = await db.getComments(req.params.puuid);
  if (rows.length == 0)
    return res.status(404).json({ message: "No comments were found" });

  res.status(200).json(rows);
});

app.post("/inters/:puuid/comments", async (req, res) => {
  const inter_rows = await db.getInterByPuuid(req.params.puuid);
  console.log(req.cookies);
  try {
    const validToken = await jwt.verify(req.cookies.jwt, ENV.JWT_KEY);
    if (inter_rows.length == 0) {
      await db.addInter(req.params.puuid);
    }
    console.log(req.body.userId);
    const success = await db.addProfileComment(
      req.params.puuid,
      req.body.userId,
      req.body.comment,
    );
    if (!success) return res.status(422).json({ message: "Malformed request" });
    res.status(201).json({
      message: "Successful comment post",
    });
  } catch (err) {
    res.clearCookie("username").clearCookie("user_id").clearCookie("jwt");
    console.error(err);
    return res.status(401).json({ message: err });
  }
});
export default app;
