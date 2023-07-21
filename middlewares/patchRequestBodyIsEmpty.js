import { HttpError } from "../helpers/index.js";

const patchRequestBodyIsEmpty = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, `Missing field favorite`));
  }
  next();
};

export default patchRequestBodyIsEmpty;
