import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    console.log(req.files);
    console.log(req.cookies);
    console.log(req.jwtDecode);

    res.status(StatusCodes.CREATED).json({
      message: "POST from Controller",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message,
    });
  }
};

export const boardController = {
  createNew,
};
