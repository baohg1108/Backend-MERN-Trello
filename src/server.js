import express from "express";
import exitHook from "async-exit-hook";
import "dotenv/config";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "./config/mongodb";
import { env } from "~/config/environment";

const START_SERVER = () => {
  const app = express();

  const APP_HOST = "localhost";
  const port = 8017;

  app.get("/", async (req, res) => {
    console.log(await GET_DB().listCollections().toArray());

    res.end("Hello");
  });

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
