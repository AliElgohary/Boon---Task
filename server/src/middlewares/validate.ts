import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validate = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.details });
    }
    next();
  };
};