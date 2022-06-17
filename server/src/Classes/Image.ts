import { UploadedFile } from "express-fileupload";
import fse from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { paths, PORT } from "../other/config";

export class Image {
  private readonly _name: string;
  private readonly _path: string;

  constructor(
    imgMimetypeToExtension: (mimetype: string) => string,
    private readonly _file: UploadedFile
  ) {
    this._name = `${uuidv4()}.${imgMimetypeToExtension(this._file.mimetype)}`;

    this._path = path.resolve(paths.static.img, this._name);
  }

  public readonly move = () => {
    return this._file.mv(this._path);
  };

  public readonly removeTmp = () => {
    return fse.remove(this._file.tempFilePath);
  };

  public readonly remove = () => {
    return fse.remove(this._path);
  };

  get uri() {
    return `http://localhost:${PORT}/img/${this._name}`;
  }
}
