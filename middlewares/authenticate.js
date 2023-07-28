import jwt from "jsonwebtoken"

import { HttpError, ctrlWrapper } from "../helpers/index.js";

import userModel from "../models/user.js";


const {JWT_SECRET} = process.env;
const {User} = userModel;

const authenticate = async (req, res, next) => {
const {authorization = ""} = req.headers;
const [bearer, token] = authorization.split(" ");

if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
}
try {
    const {id} = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
        throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
} catch (error) {
    console.log(error)
    throw HttpError(401, "Not authorized");
}
}

export default ctrlWrapper(authenticate);