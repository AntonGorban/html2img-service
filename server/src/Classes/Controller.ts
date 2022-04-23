import { Server } from "../../types";

export abstract class Controller<
  P extends Server.ParamsType,
  Q extends Server.QueryType,
  B extends Server.BodyType,
  R extends any
> {
  protected abstract readonly _controller: Server.ControllerType<P, Q, B, R>;

  get controller() {
    return this._controller;
  }
}
