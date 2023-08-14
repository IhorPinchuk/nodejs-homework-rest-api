import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";
import { nanoid } from "nanoid";

import {
  HttpError,
  ctrlWrapper,
  sendEmail,
  createVerifyEmail,
} from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const { User } = userModel;

const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  let avatarURL = "";
  const verificationToken = nanoid();

  if (!req.file) {
    avatarURL = gravatar.url(email);
  } else {
    const { path: oldPath, filename } = req.file;
    const jimpReadAvatar = await Jimp.read(oldPath);
    const resizeAvatar = await jimpReadAvatar.resize(250, 250);
    await resizeAvatar.write(oldPath);
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    avatarURL = path.join("avatars", filename);
  }

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = createVerifyEmail({ email, verificationToken });

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: " ",
  });

  res.json({
    message: "Verification successful",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = createVerifyEmail({
    email,
    verificationToken: user.verificationToken,
  });

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "User not verify");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const updateSubscriptionUser = async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateAvatar = async (req, res) => {
  const { _id, avatarURL } = req.user;
  const previousAvatarPath = path.resolve("public", avatarURL);
  try {
    await fs.unlink(previousAvatarPath);
  } catch {}

  const { path: oldPath, filename } = req.file;
  const jimpReadAvatar = await Jimp.read(oldPath);
  const resizeAvatar = await jimpReadAvatar.resize(250, 250);
  await resizeAvatar.write(oldPath);

  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const newAvatarURL = path.join("avatars", filename);

  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL: newAvatarURL },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ avatarURL: result.avatarURL });
};

export default {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
  updateAvatar: ctrlWrapper(updateAvatar),
};
