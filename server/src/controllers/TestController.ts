import { Server } from "../../types";
import { Controller } from "../Classes/Server/Controller";

export class TestController extends Controller<Params, Query, Body, Response> {
  _controller: ControllerType = async (req, res) => {
    try {
      const { test } = req.query;

      return res
        .status(202)
        .json({
          status: 202,
          test: String(test),
        })
        .end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ test: "test", status: 500 });
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
