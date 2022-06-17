import path from "path";
import { v4 as uuidv4 } from "uuid";

import { paths, PORT } from "../other/config";
import { ApiError } from "./Error/ApiError";

export class ImageUtils {
  private static readonly imgMimetypeToExtension = (mimetype: string) => {
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

  public static readonly generateName = (mimetype: string) => {
    return `${uuidv4()}.${ImageUtils.imgMimetypeToExtension(mimetype)}`;
  };

  public static readonly generatePath = (name: string) => {
    return path.resolve(paths.static.img, name);
  };

  public static readonly generateUri = (name: string) => {
    return `http://localhost:${PORT}/img/${name}`;
  };
}
