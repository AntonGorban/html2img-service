import express from "express";

import { Middleware } from "./Middleware";
import { Router } from "./Router";

export class App {
  private readonly _app: express.Application;

  constructor(
    private readonly _port: number,
    private readonly _middlewares: ReadonlyArray<Middleware>,
    private readonly _routers: ReadonlyArray<Router>
  ) {
    this._app = express();

    this._middlewares.forEach((middleware) =>
      this._app.use(middleware.controller)
    );

    this._routers.forEach((router) => this._app.use(router.router));
  }

  public start() {
    try {
      this._app.listen(this._port, () => {
        console.log(`Server started on port ${this._port}`);
      });
    } catch (error) {
      console.error("Server dont started", error);
    }
  }
}
