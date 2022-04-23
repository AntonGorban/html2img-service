import Express from "express";
import ExpressCore from "express-serve-static-core";

import { Endpoint } from "./Endpoint";

export class Router {
  private readonly _router: ExpressCore.Express;

  constructor(
    private readonly _route: string,
    private readonly _endpoints: ReadonlyArray<Endpoint<any, any, any, any>>
  ) {
    this._router = Express();

    this._router.use(this._route);

    this._endpoints.forEach((endpoint) => endpoint.use(this._router));
  }

  get router() {
    return this._router;
  }
}
