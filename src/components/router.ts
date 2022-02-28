import { Application } from "express";
import AuthRouter from "./Auth/auth.router";
import UserRouter from "./User/user.router";

export const mountRouter = (app: Application) => {
  app.use("/auth", AuthRouter);
  app.use("/user", UserRouter);
  app.use((req, res, next) => {
    res.status(404).json("Is not found");
  });
};
