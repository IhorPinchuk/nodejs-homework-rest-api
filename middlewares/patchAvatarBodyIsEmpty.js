import { HttpError } from "../helpers/index.js";

const patchAvatarBodyIsEmpty = (req, res, next) => {
  if (!req.file) {
    next(HttpError(400, `Missing field avatar`));
  }
  next();
};

export default patchAvatarBodyIsEmpty;
