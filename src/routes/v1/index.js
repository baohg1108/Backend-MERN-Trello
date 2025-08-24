import express from "express";
import { StatusCode } from "http-status-codes";
import { boardRoutes } from "./boardRoutes";

const Router = express.Router();
Router.get("/status", (req, res) => {
  res.status(StatusCode.OK).json({
    message: "API v1 are ready use",
  });
});

// Board API
Router.use("/boards", boardRoutes);

export const APIs_V1 = Router;
