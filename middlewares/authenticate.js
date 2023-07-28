import jwt from "jsonwebtoken"

import { HttpError } from "../helpers/index.js";
import userModel from "../models/user.js";


const {JWT_SECRET} = process.env;
const {User} = userModel;

const authenticate = async (req, res, next) => {
const {authorization = ""} = req.headers;
const [bearer, token] = authorization.split(" ");
if (bearer !== "Bearer") {
next(HttpError(401));
}
try {
    const {id} = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
        next(HttpError(401));
    }
    req.user = user;
    next();
} catch {
    next(HttpError(401));
}
}

export default authenticate;