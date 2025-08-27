import { WHITELIST_DOMAINS } from "~/utils/constants";
import { env } from "~/configs/environmentConfig";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiErrorUtil";

// Cấu hình CORS Option trong dự án thực tế
export const corsOptions = {
  // cho phép postman call API trên môi trường dev
  origin: function (origin, callback) {
    if (!origin && env.BUILD_MODE === "dev") {
      return callback(null, true);
    }

    // Kiểm tra dem origin có phải là domain được chấp nhận hay không
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }

    // Nếu domain không được chấp nhận thì trả về lỗi
    return callback(
      new ApiError(
        StatusCodes.FORBIDDEN,
        `${origin} not allowed by our CORS Policy.`
      )
    );
  },

  optionsSuccessStatus: 200,

  credentials: true,
};
