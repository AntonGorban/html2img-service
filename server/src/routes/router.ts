import { ApiMethods } from "../../types/enums";
import { Endpoint } from "../Classes/Endpoint";
import { Router } from "../Classes/Router";
import { TestController } from "../controllers/TestController";

export const mainRouter = new Router("/", [
  new Endpoint(ApiMethods.GET, "/", [], new TestController()),
]);

