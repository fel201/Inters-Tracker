import app from "../index.ts";
import express from "express";
import intersRoute from "./resources/inters/service.ts";
import usersRoute from "./resources/users/services.ts";
export function routes(app: express.Application) {
  app.use("/api", intersRoute);
  app.use("/api", usersRoute);
};
