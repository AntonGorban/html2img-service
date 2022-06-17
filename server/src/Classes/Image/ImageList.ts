import { FileArray } from "express-fileupload";
import lo from "lodash";

import { Image } from "./Image";

export class ImageList {
  public readonly imgs: ReadonlyArray<{ name: string; img: Image }>;

  constructor(files: FileArray) {
    this.imgs = this._prepareImgs(files);
  }

  private readonly _prepareImgs = (
    files: FileArray
  ): ReadonlyArray<{ name: string; img: Image }> => {
    return Object.entries(files).map(([key, file]) => {
      const image = new Image(lo.flatten([file])[0]);

      // * side effect
      image.move().then(image.removeTmp);

      return { name: key, img: image };
    });
  };

  public readonly removeImgs = () => {
    return Promise.all(this.imgs.map(({ img }) => img.remove()));
  };
}
