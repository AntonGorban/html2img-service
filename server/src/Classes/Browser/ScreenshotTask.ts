import { ImgType } from "../../../types";

export class ScreenshotTask {
  constructor(
    public readonly data: {
      readonly html: string;
      readonly css?: string;
    },
    public readonly opts: {
      readonly width?: number;
      readonly height?: number;
      readonly returnImgType: ImgType;
      readonly quality?: number;
    }
  ) {}
}
