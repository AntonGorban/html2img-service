import { Server } from "../../types";
import { ApiError } from "../Classes/Error/ApiError";
import { Controller } from "../Classes/Server/Controller";

export class TestController extends Controller<Params, Query, Body, Response> {
  _controller: ControllerType = async (req, res, next) => {
    try {
      const { test } = req.query;

      return next(ApiError.notFound());
      return res
        .status(202)
        .json({
          status: 202,
          test: String(test),
        })
        .end();
    } catch (error) {
      return next(error);
    }
  };
}

/* ---------------------------------- Types --------------------------------- */

interface Params {}
interface Query {
  readonly test?: string;
}
interface Body {}
interface Response {
  readonly status: number;
  readonly test: string;
}
type ControllerType = Server.ControllerType<Params, Query, Body, Response>;

/* --------------------------------- / Types -------------------------------- */
