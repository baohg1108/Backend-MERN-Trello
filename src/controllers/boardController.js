import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiErrorUtil";

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);
    // console.log(req.query);
    // console.log(req.params);
    // console.log(req.files);
    // console.log(req.cookies);
    // console.log(req.jwtDecode);

    // throw new ApiError(StatusCodes.BAD_GATEWAY, "Test error when use ApiError");
    res.status(StatusCodes.CREATED).json({
      message: "POST from Controller",
    });
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
