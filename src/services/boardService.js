import { slugify } from "~/utils/formatters";

const createNew = async (reqBody) => {
  try {
    // xử lý dữ liệu optinal
    const newBoard = { ...reqBody, slug: slugify(reqBody.title) };
    return newBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = { createNew };
