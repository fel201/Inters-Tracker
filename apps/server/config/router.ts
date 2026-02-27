import app from "../index.ts";
import express from "express";
import intersRoute from "./resources/inters/router.ts";
import usersRoute from "./resources/auth/router.ts";
export function routes(app: express.Application) {
  app.use("/api", intersRoute);
  app.use("/api", usersRoute);
};
