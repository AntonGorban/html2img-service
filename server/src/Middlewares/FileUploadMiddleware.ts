import fileUpload from "express-fileupload";

import { Server } from "../../types";
import { Middleware } from "../Classes/Server/Middleware";

export class FileUploadMiddleware extends Middleware {
  constructor(private readonly _config: fileUpload.Options) {
    super();
  }

  protected _controller: Server.ControllerType<
    Server.ParamsType,
    Server.QueryType,
    Server.BodyType,
    any
  > = fileUpload(this._config) as Server.ControllerType<
    Server.ParamsType,
    Server.QueryType,
    Server.BodyType,
    any
  >;
}
