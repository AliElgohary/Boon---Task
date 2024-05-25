import Joi from "joi";

export const addUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(10).max(120).required(),
  phoneNumber: Joi.string()
    .pattern(/^01[0125][0-9]{8}$/)
    .required(),
});
