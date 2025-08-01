import express, { json } from "express";
import { StatusCodes } from "http-status-codes";

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "Note: GET" });
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: "Note POST" });
  });

export const boardRoutes = Router;
