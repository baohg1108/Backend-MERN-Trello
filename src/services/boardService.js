import { slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";

const createNew = async (reqBody) => {
  try {
    // xử lý dữ liệu optional
    const newBoard = { ...reqBody, slug: slugify(reqBody.title) };

    // gọi tới Models xử lý Database
    const createdBoard = await boardModel.createNew(newBoard);
    console.log(createdBoard);

    // Lấy bản ghi khi được gọi
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    console.log(getNewBoard);

    return getNewBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardService = { createNew };
