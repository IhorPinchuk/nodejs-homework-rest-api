import express from "express";

import {
  validateBody,
  postRequestBodyIsEmpty,
  authenticate,
  patchSubscriptionBodyIsEmpty,
  upload,
  patchAvatarBodyIsEmpty,
} from "../../middlewares/index.js";
import usersSchemas from "../../models/user.js";
import authController from "../../controllers/auth-controller.js";
import { isValidId } from "../../middlewares/index.js";

const { userRegisterSchema, userLoginSchema, updateSubscriptionSchema } =
  usersSchemas;
const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscriptionUser,
  updateAvatar,
} = authController;

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  postRequestBodyIsEmpty,
  validateBody(userRegisterSchema),
  register
);

authRouter.post(
  "/login",
  postRequestBodyIsEmpty,
  validateBody(userLoginSchema),
  login
);

authRouter.post("/logout", authenticate, logout);

authRouter.get("/current", authenticate, getCurrent);

authRouter.patch(
  "/:id/subscription",
  authenticate,
  patchSubscriptionBodyIsEmpty,
  isValidId,
  validateBody(updateSubscriptionSchema),
  updateSubscriptionUser
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  patchAvatarBodyIsEmpty,
  updateAvatar
);

export default authRouter;
