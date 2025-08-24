import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  // https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      "any.required": `"a" is a required field`,
      "string.empty": `"a" cannot be an empty field`,
      "string.min": `"a" should have a minimum length of {#limit}`,
      "string.max": `"a" should have a minimum length of {#limit}`,
      "string.trim": `"a" should be a type of 'text'`,
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });

  try {
    console.log(req.body);
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
    });
    // next();

    res.status(StatusCodes.CREATED).json({
      message: "API created new board",
    });
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message,
    });
  }
};

export const boardValidation = {
  createNew,
};
