import Express from "express";

import { Server } from "../../types";
import { Endpoint } from "./Endpoint";

export class Router {
  private readonly _router: Server.ExpressRouterType;

  constructor(
    private readonly _route: string,
    private readonly _endpoints: ReadonlyArray<Endpoint>
  ) {
    this._router = Express();

    this._router.use(this._route);

    this._endpoints.forEach((endpoint) => endpoint.use(this._router));
  }

  get router() {
    return this._router;
  }
}
