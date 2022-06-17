import Express from "express";

import { Server } from "../../../types";
import { Endpoint } from "./Endpoint";

export abstract class Router {
  private readonly _router: Server.ExpressRouterType;
  private readonly _route: string;

  protected abstract readonly _endpoints: ReadonlyArray<Endpoint>;

  constructor(route: string) {
    this._route = route;
    this._router = Express();
  }

  protected useEndpoints() {
    this._endpoints.forEach((endpoint) => endpoint.use(this._router));
  }

  get route() {
    return this._route;
  }

  get router() {
    return this._router;
  }
}
