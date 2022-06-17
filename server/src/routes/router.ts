import { ApiMethods } from "../../types/enums";
import { Browser } from "../Classes/Browser/Browser";
import { ImageManager } from "../Classes/ImageManager";
import { Endpoint } from "../Classes/Server/Endpoint";
import { Router } from "../Classes/Server/Router";
import { Validation } from "../Classes/Validation/Validation";
import { Html2imgController } from "../controllers/Html2imgController";
import { TestController } from "../controllers/TestController";

export class MainRouter extends Router {
  constructor(
    private readonly _browser: Browser,
    private readonly _validation: Validation,
    private readonly _imageManager: ImageManager
  ) {
    super("/");

    this.useEndpoints();
  }

  protected _endpoints: readonly Endpoint[] = [
    new Endpoint(
      ApiMethods.GET,
      "/test",
      [],
      new TestController(this._validation)
    ),

    new Endpoint(
      ApiMethods.POST,
      "/:returnImgType",
      [],
      new Html2imgController(
        this._browser,
        this._validation,
        this._imageManager
      )
    ),
  ];
}
