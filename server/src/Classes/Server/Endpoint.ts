import { Server } from "../../../types";
import { ApiMethods } from "../../../types/enums";
import { Controller } from "./Controller";
import { Middleware } from "./Middleware";

export class Endpoint<
  P = Server.ParamsType,
  Q = Server.QueryType,
  B = Server.BodyType,
  R = any
> {
  constructor(
    private readonly _method: ApiMethods,
    private readonly _route: string,
    private readonly _beforeMiddlewares: ReadonlyArray<Middleware>,
    private readonly _controller: Controller<P, Q, B, R>,
    private readonly _afterMiddlewares?: ReadonlyArray<Middleware>
  ) {}

  public use(router: Server.ExpressRouterType) {
    router[this._method](
      this._route,
      ...this._beforeMiddlewares.map((middleware) => middleware.controller),
      this._controller.controller,
      ...(!!this._afterMiddlewares
        ? this._afterMiddlewares.map((middleware) => middleware.controller)
        : [])
    );
  }
}