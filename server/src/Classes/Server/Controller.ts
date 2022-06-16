import { Server } from "../../../types";

export abstract class Controller<
  P = Server.ParamsType,
  Q = Server.QueryType,
  B = Server.BodyType,
  R = any
> {
  protected abstract readonly _controller: Server.ControllerType<P, Q, B, R>;

  get controller() {
    return this._controller;
  }
}
