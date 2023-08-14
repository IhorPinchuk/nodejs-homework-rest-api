import { HttpError } from "../helpers/index.js";

const postVerifyEmailBodyIsEmpty = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, `Missing required field email`));
  }
  next();
};

export default postVerifyEmailBodyIsEmpty;
