import { ApiMethods } from "../../types/enums";
import { Browser } from "../Classes/Browser/Browser";
import { Endpoint } from "../Classes/Server/Endpoint";
import { Router } from "../Classes/Server/Router";
import { Html2imgController } from "../controllers/Html2imgController";
import { TestController } from "../controllers/TestController";

export const mainRouter = new Router("/", [
  new Endpoint(ApiMethods.GET, "/test", [], new TestController()),

  new Endpoint(
    ApiMethods.POST,
    "/:returnImgType",
    [],
    new Html2imgController(new Browser())
  ),
]);
