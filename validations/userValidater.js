const Joi = require("joi");

const loginSchema = Joi.object({
  id: Joi.string().required().trim(),
  password: Joi.string().required().trim(),
});

const joinSchema = loginSchema.keys({
  nickname: Joi.string().required().trim(),
});

module.exports = {
  loginSchema,
  joinSchema,
};
