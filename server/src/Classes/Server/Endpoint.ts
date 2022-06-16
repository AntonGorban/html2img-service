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
    private readonly _middlewares: ReadonlyArray<Middleware>,
    private readonly _controller: Controller<P, Q, B, R>
  ) {}

  public use(router: Server.ExpressRouterType) {
    router[this._method](
      this._route,
      ...this._middlewares.map((middleware) => middleware.controller),
      this._controller.controller
    );
  }
}
