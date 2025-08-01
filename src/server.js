import express from "express";
import exitHook from "async-exit-hook";
import "dotenv/config";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "./config/mongodb";
import { env } from "~/config/environment";

//router
import { APIs_V1 } from "~/routes/v1/";

const START_SERVER = () => {
  const app = express();

  //router
  app.use("/v1", APIs_V1);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hey My name is ${env.AUTHOR}`);
  });
};

exitHook(() => {
  console.log("4. Server is shutting down !");
  CLOSE_DB();
  console.log("5. Disconnected from MongoDB Cloud Atlas");
});
//IIFE
(async () => {
  try {
    console.log("1. Connecting to MongoDB Cloud Atlas");
    await CONNECT_DB();
    console.log("2. Connect MongoDB Cloud Atlas Success!");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
