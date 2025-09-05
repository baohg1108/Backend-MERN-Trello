import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiErrorUtil";
import { BOARD_TYPE } from "~/utils/constants";

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
    type: Joi.string().valid(BOARD_TYPE.PRIVATE, BOARD_TYPE.PUBLIC).required(),
  });

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const boardValidation = {
  createNew,
};
