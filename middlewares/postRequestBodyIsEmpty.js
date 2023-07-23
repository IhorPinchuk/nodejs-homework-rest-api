import { HttpError } from "../helpers/index.js";

const postRequestBodyIsEmpty = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, `Missing fields`));
  }
  next();
};

export default postRequestBodyIsEmpty;
