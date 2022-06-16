import { Server } from "../../../types";
import { Controller } from "./Controller";

export abstract class Middleware extends Controller<
  Server.ParamsType,
  Server.QueryType,
  Server.BodyType,
  any
> {}
