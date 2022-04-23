import ExpressCore from "express-serve-static-core";

import { ApiMethods } from "../../../types";
import { Server } from "../../types";
import { Controller } from "./Controller";
import { Middleware } from "./Middleware";

export class Endpoint<
  P extends Server.ParamsType,
  Q extends Server.QueryType,
  B extends Server.BodyType,
  R extends any
> {
  constructor(
    private readonly _method: ApiMethods,
    private readonly _route: string,
    private readonly _middlewares: ReadonlyArray<Middleware>,
    private readonly _controller: Controller<P, Q, B, R>
  ) {}

  public use(router: ExpressCore.Express) {
    router[this._method](
      this._route,
      ...this._middlewares.map((middleware) => middleware.controller),
      this._controller.controller
    );
  }
}
