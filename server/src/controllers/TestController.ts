import { JSONSchemaType } from "ajv";

import { Server } from "../../types";
import { ApiError } from "../Classes/Error/ApiError";
import { Controller } from "../Classes/Server/Controller";
import { Validation } from "../Classes/Validation/Validation";

export class TestController extends Controller<Params, Query, Body, Response> {
  constructor(private readonly _validation: Validation) {
    super();
  }

  _controller: ControllerType = async (req, res, next) => {
    try {
      const { test } = this._queryValidator.validate(req.query);

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

  private readonly _queryValidator =
    this._validation.generateValidator(queryVS);
}

/* ------------------------------- Validation ------------------------------- */

const queryVS: JSONSchemaType<Query> = {
  type: "object",

  properties: {
    test: { type: "string" },
  },

  required: ["test"],
};

/* ------------------------------ / Validation ------------------------------ */

/* ---------------------------------- Types --------------------------------- */

interface Params {}
interface Query {
  readonly test: string;
}
interface Body {}
interface Response {
  readonly status: number;
  readonly test: string;
}
type ControllerType = Server.ControllerType<Params, Query, Body, Response>;

/* --------------------------------- / Types -------------------------------- */
