import { ApiMethods } from "../../types/enums";
import { Browser } from "../Classes/Browser/Browser";
import { Endpoint } from "../Classes/Server/Endpoint";
import { Router } from "../Classes/Server/Router";
import { Validation } from "../Classes/Validation/Validation";
import { Html2imgController } from "../controllers/Html2imgController";

export class MainRouter extends Router {
  constructor(
    private readonly _browser: Browser,
    private readonly _validation: Validation
  ) {
    super("/");

    this.useEndpoints();
  }

  protected _endpoints: readonly Endpoint[] = [
    new Endpoint(
      ApiMethods.POST,
      "/:returnImgType",
      [],
      new Html2imgController(this._browser, this._validation)
    ),
  ];
}
