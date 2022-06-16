import { JSONSchemaType } from "ajv";

import { Server } from "../../types";
import { Controller } from "../Classes/Server/Controller";
import { validation } from "../Classes/Validation/Validation";

export class Html2imgController extends Controller<
  Params,
  Query,
  Body,
  Response
> {
  _controller: ControllerType = async (req, res, next) => {
    try {
      const params = this._paramsValidator.validate(req.params);
      const query = this._queryValidator.validate(req.query);
      const body = this._bodyValidator.validate(req.body);

      return res.json({
        params,
        query,
        body,
      });
    } catch (error) {
      return next(error);
    }
  };

  private readonly _paramsValidator = validation.generateValidator(
    paramsVS,
    "params"
  );

  private readonly _queryValidator = validation.generateValidator(
    queryVS,
    "query"
  );

  private readonly _bodyValidator = validation.generateValidator(
    bodyVS,
    "body"
  );
}

/* ------------------------------- Validation ------------------------------- */

const paramsVS: JSONSchemaType<Params> = {
  type: "object",

  properties: {
    returnImgType: { type: "string" },
  },

  required: ["returnImgType"],
};

const queryVS: JSONSchemaType<Query> = {
  type: "object",

  properties: {
    width: { type: "integer", nullable: true, default: 1024 },
    height: { type: "integer", nullable: true },
  },
};

const bodyVS: JSONSchemaType<Body> = {
  type: "object",

  properties: {
    html: { type: "string" },
    css: { type: "string", nullable: true },
  },

  required: ["html"],
};

/* ------------------------------ / Validation ------------------------------ */

/* ---------------------------------- Types --------------------------------- */

interface Params {
  readonly returnImgType: string;
}

interface Query {
  readonly width?: number;
  readonly height?: number;
}

interface Body {
  readonly html: string;
  readonly css?: string;
}

interface Response {}

type ControllerType = Server.ControllerType<Params, Query, Body, Response>;

/* --------------------------------- / Types -------------------------------- */
