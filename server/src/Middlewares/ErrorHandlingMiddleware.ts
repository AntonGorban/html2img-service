import express from "express";

import { Server } from "../../types";
import { ApiError } from "../Classes/Error/ApiError";
import { Middleware } from "../Classes/Server/Middleware";

const errorHandlingMiddleware = (
  error: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (error instanceof ApiError) {
    return res
      .status(error.status)
      .json({ status: error.status, message: error.message })
      .end();
  }

  return res
    .status(500)
    .json({ status: 500, message: "Internal Server Error" })
    .end();
};

export class ErrorHandlingMiddleware extends Middleware {
  protected _controller: Server.ControllerType =
    errorHandlingMiddleware as unknown as Server.ControllerType;
}
