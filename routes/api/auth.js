import express from "express";

import {
  validateBody,
  postRequestBodyIsEmpty,
  authenticate,
  patchSubscriptionBodyIsEmpty,
  upload,
  patchAvatarBodyIsEmpty,
  isValidId,
  postVerifyEmailBodyIsEmpty,
} from "../../middlewares/index.js";
import usersSchemas from "../../models/user.js";
import authController from "../../controllers/auth-controller.js";

const {
  userRegisterSchema,
  userLoginSchema,
  updateSubscriptionSchema,
  userEmailSchema,
} = usersSchemas;
const {
  register,
  verify,
  resendVerifyEmail,
  login,
  logout,
  getCurrent,
  updateSubscriptionUser,
  updateAvatar,
} = authController;

const authRouter = express.Router();
const authVerifyRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  postRequestBodyIsEmpty,
  validateBody(userRegisterSchema),
  register
);

authVerifyRouter.get("/verify/:verificationToken", verify);

authVerifyRouter.post(
  "/verify",
  postVerifyEmailBodyIsEmpty,
  validateBody(userEmailSchema),
  resendVerifyEmail
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

export default { authRouter, authVerifyRouter };
