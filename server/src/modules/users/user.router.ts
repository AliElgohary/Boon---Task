import express from "express";
import { createUser, getUsers } from "./controllers/user.controller";
import { validate } from "../../middlewares/validate";
import { addUserSchema } from "./user.validation";
import { createPaymentSession } from "../../services/payment";

const userRouter = express.Router();

userRouter.get("/users", getUsers);

userRouter.post(
  "/users",
  validate(addUserSchema),
  createUser,
  createPaymentSession
);

export default userRouter;
