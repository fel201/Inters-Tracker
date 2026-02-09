import express from "express";
import bcrypt from "bcrypt";
import { db } from "../../../db/database.ts";
import jwt from "jsonwebtoken";
import { ENV } from "../../env.ts";
type Register = {
  username: string;
  email: string;
  password: string;
};
type Login = {
  email: string;
  password: string;
};

const saltRounds = 12;
const app = express.Router();

app.delete("/session", async (req, res) => {
  console.log("/session DELETE REQUEST");
  res
    .clearCookie("jwt", { httpOnly: true, sameSite: "none" })
    .clearCookie("username")
    .clearCookie("user_id");

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
  const token = jwt.sign(
    {
      sub: rows[0].id,
      name: rows[0].username,
      admin: false,
    },
    ENV.JWT_KEY,
    { algorithm: "HS256", expiresIn: 60 },
  );

  res
    .status(201)
    .cookie("jwt", token, { httpOnly: true })
    .cookie("username", rows[0].username)
    .cookie("user_id", rows[0].id)
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
