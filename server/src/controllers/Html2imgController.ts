import { JSONSchemaType } from "ajv";

import { ImgType, Server } from "../../types";
import { Browser } from "../Classes/Browser/Browser";
import { ScreenshotTask } from "../Classes/Browser/ScreenshotTask";
import { ImageList } from "../Classes/ImageList";
import { Controller } from "../Classes/Server/Controller";
import { Validation } from "../Classes/Validation/Validation";

export class Html2imgController extends Controller<
  Params,
  Query,
  Body,
  Response
> {
  constructor(
    private readonly _browser: Browser,
    private readonly _validation: Validation
  ) {
    super();
  }

  _controller: ControllerType = async (req, res, next) => {
    try {
      const { returnImgType } = this._paramsValidator.validate(req.params);
      const opts = this._queryValidator.validate(req.query);
      const data = this._bodyValidator.validate(req.body);

      const imgs = new ImageList(req.files || {});

      const screenshotTask = new ScreenshotTask(data, imgs, {
        ...opts,
        returnImgType,
      });
      const returnImg = await this._browser.screenshot(screenshotTask);

      // * side effect
      imgs.removeImgs();

      return res.end(returnImg);
    } catch (error) {
      return next(error);
    }
  };

  private readonly _paramsValidator = this._validation.generateValidator(
    paramsVS,
    "params"
  );

  private readonly _queryValidator = this._validation.generateValidator(
    queryVS,
    "query"
  );

  private readonly _bodyValidator = this._validation.generateValidator(
    bodyVS,
    "body"
  );
}

/* ------------------------------- Validation ------------------------------- */

const paramsVS: JSONSchemaType<Params> = {
  type: "object",

  properties: {
    returnImgType: { type: "string", enum: ["png", "jpeg", "webp"] },
  },

  required: ["returnImgType"],
};

const queryVS: JSONSchemaType<Query> = {
  type: "object",

  properties: {
    width: { type: "integer", nullable: true, default: 1024 },
    height: { type: "integer", nullable: true },
    quality: { type: "integer", nullable: true, minimum: 1, maximum: 100 },
    omitBackground: { type: "boolean", nullable: true },
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
  readonly returnImgType: ImgType;
}

interface Query {
  readonly width?: number;
  readonly height?: number;
  readonly quality?: number;
  readonly omitBackground?: boolean;
}

interface Body {
  readonly html: string;
  readonly css?: string;
}

interface Response {}

type ControllerType = Server.ControllerType<Params, Query, Body, Response>;

/* --------------------------------- / Types -------------------------------- */
