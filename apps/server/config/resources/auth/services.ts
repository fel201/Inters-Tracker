import express from "express";
import bcrypt from "bcrypt";
import { UserQuery } from "../../../db/database.ts";
import jwt from "jsonwebtoken";
import { ENV } from "../../env.ts";
const saltRounds = 12;

interface UserDB {
  username: string;
  email: string;
  id: number;
}

interface LogInSuccessState {
  success: true;
  message: string;
  data: {
    userName: string;
    userId: number;
    accessToken: string;
    refreshToken: string;
  };
}

interface LogInFailedState {
  success: false;
  message: string;
}

type LogInState = LogInFailedState | LogInSuccessState;


export class AuthService extends UserQuery {
  userDb: UserQuery;
  constructor() {
    super();
    this.userDb = new UserQuery();
  }

  public async logIn(
    email: string,
    password: string,
  ): Promise<LogInState> {
    const errObject: LogInFailedState = {
      success: false,
      message: "Incorrect credentials",
    };
    const user = await this.userDb.getByEmail(email);
    if (user.length == 0) return errObject;

    const isValidPassword = await bcrypt.compare(password, user[0].password);

    if (!isValidPassword) return errObject;

    const accessToken = createToken(user, false);
    const refreshToken = createToken(user, true);

    return {
      success: true,
      message: "Successfully logged in",
      data: {
        userName: user[0].username,
        userId: user[0].id,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }
  public async register(username: string, email: string, password: string) {
    // check if the username already exists in the database
    const user = await this.userDb.getByUsername(username);
    if (user.length != 0) {
      return false;
    }
      
    const hash_password = await bcrypt.hash(password, saltRounds);
    await this.userDb.add(username, email, hash_password);
    return true;
  }

}

function createToken(user: Array<UserDB>, isRefreshToken: boolean) {
  let expiration_time: number = 900;
  if (isRefreshToken) expiration_time = 10 * 10 * 9 * 8 * 7 * 12;

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
