import { UploadedFile } from "express-fileupload";
import fse from "fs-extra";

import { ImageUtils } from "./ImageUtils";

export class Image {
  private readonly _name: string;
  private readonly _path: string;

  constructor(private readonly _file: UploadedFile) {
    this._name = ImageUtils.generateName(this._file.mimetype);
    this._path = ImageUtils.generatePath(this._name);
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
    return ImageUtils.generateUri(this._name);
  }
}
