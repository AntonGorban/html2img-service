import express from "express";

import { Middleware } from "./Middleware";
import { Router } from "./Router";

export class App {
  private readonly _app: express.Application;
  private readonly _port: number;

  constructor(
    port: number,
    middlewares: ReadonlyArray<Middleware>,
    routers: ReadonlyArray<Router>
  ) {
    this._app = express();
    this._port = port;

    this.useMiddlewares(middlewares);
    this.useRouters(routers);
  }

  private useMiddlewares(middlewares: ReadonlyArray<Middleware>) {
    middlewares.forEach((middleware) => this._app.use(middleware.controller));
  }

  private useRouters(routers: ReadonlyArray<Router>) {
    routers.forEach((router) => this._app.use(router.route, router.router));
  }

  public start() {
    try {
      this._app.listen(this._port, () => {
        console.log(`Server started on port ${this._port}`);
      });
    } catch (error) {
      console.error("Server does not start", error);
    }
  }
}
