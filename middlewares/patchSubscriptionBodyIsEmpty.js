import { HttpError } from "../helpers/index.js";

const patchSubscriptionBodyIsEmpty = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, `Missing field subscription`));
  }
  next();
};

export default patchSubscriptionBodyIsEmpty;
