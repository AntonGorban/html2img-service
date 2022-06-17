import { ImgType } from "../../../types";
import { ImageList } from "../Image/ImageList";

export class ScreenshotTask {
  constructor(
    public readonly data: {
      readonly html: string;
      readonly css?: string;
    },
    public readonly imgs: ImageList,
    public readonly opts: {
      readonly width?: number;
      readonly height?: number;
      readonly returnImgType: ImgType;
      readonly quality?: number;
      readonly omitBackground?: boolean;
    }
  ) {}
}
