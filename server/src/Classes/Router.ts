import Express from "express";

import { Server } from "../../types";
import { Endpoint } from "./Endpoint";

export class Router {
  private readonly _router: Server.ExpressRouterType;
  private readonly _route: string;

  constructor(route: string, endpoints: ReadonlyArray<Endpoint>) {
    this._route = route;
    this._router = Express();

    this.useEndpoints(endpoints);
  }

  private useEndpoints(endpoints: ReadonlyArray<Endpoint>) {
    endpoints.forEach((endpoint) => endpoint.use(this._router));
  }

  get route() {
    return this._route;
  }

  get router() {
    return this._router;
  }
}
