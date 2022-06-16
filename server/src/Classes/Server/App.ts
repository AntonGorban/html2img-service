import express from "express";

import { Middleware } from "./Middleware";
import { Router } from "./Router";

export class App {
  private readonly _app: express.Application;
  private readonly _port: number;

  constructor(
    port: number,
    beforeMiddlewares: ReadonlyArray<Middleware>,
    routers: ReadonlyArray<Router>,
    afterMiddlewares?: ReadonlyArray<Middleware>
  ) {
    this._app = express();
    this._app.use(express.json());
    this._port = port;

    this.useMiddlewares(beforeMiddlewares);
    this.useRouters(routers);
    !!afterMiddlewares && this.useMiddlewares(afterMiddlewares);
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
