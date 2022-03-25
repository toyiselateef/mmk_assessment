import Joi from "joi";

const inbound = Joi.object().keys({
  from: Joi.string().min(6).max(16).required().messages({
    "string.base": `from is invalid`,
    "string.empty": `from is missing`,
    "string.min": `from is invalid`,
    "any.required": `from is invalid`,
  }),
  to: Joi.string().min(6).max(16).required().messages({
    "string.base": `to is invalid`,
    "string.empty": `to is missing`,
    "string.min": `to is invalid`,
    "any.required": `to is invalid`,
  }),
  text: Joi.string().min(1).max(120).required().messages({
    "string.base": `text is invalid`,
    "string.empty": `text is missing`,
    "string.min": `text is invalid`,
    "any.required": `text is invalid`,
  }),
});

export default inbound;
