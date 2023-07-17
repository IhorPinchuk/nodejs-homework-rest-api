import { HttpError } from "../helpers/index.js";

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (Object.keys(value).length === 0) {
      throw HttpError(400, "Missing fields");
    }
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

export default validateBody;
