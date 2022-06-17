import express from "express";

import { Server } from "../../types";
import { Middleware } from "../Classes/Server/Middleware";

export class StaticMiddleware extends Middleware {
  constructor(private readonly _path: string) {
    super();
  }

  protected _controller: Server.ControllerType = express.static(
    this._path
  ) as Server.ControllerType;
}
