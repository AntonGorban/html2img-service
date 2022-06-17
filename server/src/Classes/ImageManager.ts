import { FileArray } from "express-fileupload";
import lo from "lodash";

import { ApiError } from "./Error/ApiError";
import { Image } from "./Image";

export class ImageManager {
  public readonly imgMimetypeToExtension = (mimetype: string) => {
    switch (mimetype) {
      case "image/pjpeg":
      case "image/jpeg":
        return "jpg";

      case "image/png":
        return "png";

      case "image/webp":
        return "webp";

      default:
        throw ApiError.badRequest("unsupported image format");
    }
  };

  public readonly prepareImgs = (
    files: FileArray
  ): ReadonlyArray<{ name: string; img: Image }> => {
    return Object.entries(files).map(([key, file]) => {
      const image = new Image(
        this.imgMimetypeToExtension,
        lo.flatten([file])[0]
      );

      // * side effect
      image.move().then(image.removeTmp);

      return { name: key, img: image };
    });
  };

  public readonly removeImgs = (imgs: ReadonlyArray<Image>) => {
    return Promise.all(imgs.map((image) => image.remove()));
  };
}
