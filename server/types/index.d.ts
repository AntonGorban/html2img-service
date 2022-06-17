import Express from "express";
import ExpressCore from "express-serve-static-core";

import { ObjectWithGivenValues } from "./utils";

export namespace Server {
  interface ParamsType extends ExpressCore.ParamsDictionary {
    readonly [key: string]: string | number;
  }

  interface QueryType extends ExpressCore.Query {
    readonly [key: string]: string | number | boolean;
  }

  interface BodyType {
    readonly [key: string]: any;
  }

  type ControllerType<P = ParamsType, Q = QueryType, B = BodyType, R = any> = (
    request: Express.Request<
      ObjectWithGivenValues<P, ParamsType[0] | undefined>,
      R,
      ObjectWithGivenValues<B, unknown>,
      ObjectWithGivenValues<Q, QueryType[0] | undefined>
    >,
    response: Express.Response<R>,
    next: Express.NextFunction
  ) => Promise<Express.Response<R> | ReturnType<Express.NextFunction>>;

  type ExpressRouterType = ExpressCore.Express;
}

export type ImgType = "png" | "jpeg" | "webp";
