import { ApiMethods } from "../../types/enums";
import { Endpoint } from "../Classes/Server/Endpoint";
import { Router } from "../Classes/Server/Router";
import { TestController } from "../controllers/TestController";

export const mainRouter = new Router("/", [
  new Endpoint(ApiMethods.GET, "/", [], new TestController()),
]);

