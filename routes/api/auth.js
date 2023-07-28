import express from "express";

import {
  validateBody,
  postRequestBodyIsEmpty, authenticate,
} from "../../middlewares/index.js";
import usersSchemas from "../../models/user.js";
import authController from "../../controllers/auth-controller.js";

const { userRegisterSchema, userLoginSchema } = usersSchemas;
const { register, login, logout, getCurrent } = authController;

const authRouter = express.Router();

authRouter.post(
  "/register",
  postRequestBodyIsEmpty,
  validateBody(userRegisterSchema),
  register
);

authRouter.post("/login", postRequestBodyIsEmpty,
validateBody(userLoginSchema),
login);

authRouter.post("/logout", authenticate, logout)

authRouter.get("/current", authenticate, getCurrent)

export default authRouter;
