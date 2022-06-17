import { ApiMethods } from "../../types/enums";
import { Browser } from "../Classes/Browser/Browser";
import { Endpoint } from "../Classes/Server/Endpoint";
import { Router } from "../Classes/Server/Router";
import { Html2imgController } from "../controllers/Html2imgController";
import { TestController } from "../controllers/TestController";

export class MainRouter extends Router {
  constructor(private readonly _browser: Browser) {
    super("/");

    this.useEndpoints();
  }

  protected _endpoints: readonly Endpoint[] = [
    new Endpoint(ApiMethods.GET, "/test", [], new TestController()),

    new Endpoint(
      ApiMethods.POST,
      "/:returnImgType",
      [],
      new Html2imgController(this._browser)
    ),
  ];
}
