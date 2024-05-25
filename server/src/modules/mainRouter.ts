import express from "express";
import userRouter from "./users/user.router";

const mainRouter = express.Router();

mainRouter.use(userRouter);

export default mainRouter;
