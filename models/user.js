import { Schema, model } from "mongoose";
import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

import { handleMongooseError, validateAtUpdate } from "../helpers/index.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", validateAtUpdate);

userSchema.post("save", handleMongooseError);
userSchema.post("findOneAndUpdate", handleMongooseError);

const User = model("user", userSchema);

const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password field`,
  }),
  subscription: Joi.string(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password field`,
  }),
  token: Joi.string(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required().messages({
    "any.required": `missing required subscription field`,
  }),
});

export default {
  User,
  userRegisterSchema,
  userLoginSchema,
  updateSubscriptionSchema,
};
