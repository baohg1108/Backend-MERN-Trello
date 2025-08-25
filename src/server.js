import express from "express";
import exitHook from "async-exit-hook";
import "dotenv/config";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/configs/mongodbConfig";
import { env } from "~/configs/environmentConfig";
import { APIs_V1 } from "./routes/v1";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";

const START_SERVER = () => {
  const app = express();
  const APP_HOST = env.APP_HOST;
  const APP_PORT = env.APP_PORT || 3000;

  app.use(express.json());

  // use APIs_V1
  app.use("/v1", APIs_V1);

  // handling error concentrate
  app.use(errorHandlingMiddleware);

  app.listen(APP_PORT, APP_HOST, () => {
    console.log(
      `3. Hi ${env.AUTHOR}. Server running at http://${APP_HOST}:${APP_PORT}/`
    );
  });

  // Thực hiện cleanup khi dừng server
  exitHook(() => {
    console.log("4. Disconnecting to MongoDB Atlas");
    CLOSE_DB();
    console.log("5. Disconnected to MongoDB Atlas");
  });
};

// IIFE
// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(async () => {
  try {
    console.log("1. Connecting to MongoDB Atlas");
    await CONNECT_DB();
    console.log("2. Connected to MongoDB Atlas");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
