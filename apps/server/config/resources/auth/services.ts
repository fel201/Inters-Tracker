import express from "express";
import bcrypt from "bcrypt";
import { db } from "../../../db/database.ts";
import jwt from "jsonwebtoken";
import { ENV } from "../../env.ts";
interface UserDB {
  username: string;
  email: string;
  id: number
};

function createToken(user: Array<UserDB>, isRefresh: boolean) {
  let expiration_time: number = 900;
  if (isRefresh) expiration_time = 10*10*9*8*7*12;
  
  const token = jwt.sign(
    {
      sub: user[0].id,
      name: user[0].username,
    },
    ENV.JWT_KEY,
    { algorithm: "HS256", expiresIn: expiration_time },
  );
  return token;
}

const saltRounds = 12;
const app = express.Router();


app.delete("/session", async (req, res) => {
  console.log("/session DELETE REQUEST");
  res
    .clearCookie("jwt", { httpOnly: true, sameSite: 'lax' })
    .clearCookie("username", {sameSite: 'lax'})
    .clearCookie("user_id", {sameSite: 'lax'});
  res.status(200).json({
    message: "Session terminated successfully",
  });
});

app.post("/session", async (req, res) => {
  console.log("/session POST REQUEST");
  const rows = await db.getUserByEmail(req.body.email);
  console.log(rows);
  if (rows.length == 0) return res.sendStatus(401);

  const valid_password = await bcrypt.compare(
    req.body.password,
    rows[0].password,
  );
  if (!valid_password) return res.sendStatus(401);
  const access_token = createToken(rows, false);
  const refresh_token = createToken(rows, true);
  res
    .status(201)
    .cookie("jwt", access_token, { httpOnly: true, sameSite: 'lax'})
    .cookie("refresh_token", refresh_token, {httpOnly: true, sameSite: 'lax'})
    .cookie("username", rows[0].username, {sameSite: 'lax'})
    .cookie("user_id", rows[0].id, {sameSite: 'lax'})
    .json({
      message: "Authentication was successful!",
    });
});

app.post("/users", async (req, res) => {
  console.log("/USERS POST REQUEST");
  // check if the username already exists in the database
  const user = await db.getUserByUsername(req.body.username);
  if (user.length > 0)
    return res.status(403).json({ message: "This username already exists" });

  const hash_password = await bcrypt.hash(req.body.password, saltRounds);
  await db.addUser(req.body.username, req.body.email, hash_password);
  res.status(201).json({ message: "User registered successfully" });
});

export default app;
