import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/configs/mongodbConfig";

const START_SERVER = () => {
  const app = express();
  const hostname = "localhost";
  const port = 8017;

  app.get("/", async (req, res) => {
    console.log(await GET_DB().listCollections().toArray());
    res.end("<h1>Hello.<h1>");
  });

  app.listen(port, hostname, () => {
    console.log(`3. Server running at http://${hostname}:${port}/`);
  });

  // Thực hiện cleanup khi dừng server
  exitHook(() => {
    console.log("4. Disconnecting to MongoDB Atlas");
    return CLOSE_DB();
    // console.log("5. Disconnected to MongoDB Atlas");
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
