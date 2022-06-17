import lo from "lodash";
import Puppeteer from "puppeteer";

import { BrowserError } from "../Error/BrowserError";
import { BrowserUtils } from "./BrowserUtils";
import { ScreenshotTask } from "./ScreenshotTask";

export class Browser {
  protected _browser: Puppeteer.Browser | undefined;
  protected _page: Puppeteer.Page | undefined;

  constructor() {
    this._launchBrowser().then(this._createPage);
  }

  private readonly _launchBrowser = async () => {
    this._browser = await Puppeteer.launch();
  };

  private readonly _createPage = async () => {
    if (!this._browser) throw new BrowserError("browser is not running");

    this._page = await this._browser.newPage();
  };

  private readonly calcNativeHeight = async (height: number) => {
    if (!this._page) throw new BrowserError("page not created");

    const rootElement = await this._page.$(`#${BrowserUtils.htmlRootId}`);
    return (
      rootElement
        ?.boxModel()
        .then(
          (box) =>
            lo.max([
              ...(box?.margin.map(({ y }) => y) || []),
              box?.height || height,
            ]) || height
        ) || height
    );
  };

  public readonly screenshot = async (task: ScreenshotTask) => {
    if (!this._page) throw new BrowserError("page not created");
    try {
      const viewport = BrowserUtils.generateViewport({
        width: task.opts.width,
        height: task.opts.height,
      });

      await this._page.setViewport(viewport);

      await this._page.setContent(BrowserUtils.generateContent(task.data));

      const width = task.opts.width || viewport.width;
      const height =
        task.opts.height ||
        (await this.calcNativeHeight(task.opts.height || viewport.height));

      return this._page.screenshot({
        type: task.opts.returnImgType,
        clip: { x: 0, y: 0, width, height },
        encoding: "binary",
        omitBackground: false,
        quality:
          task.opts.returnImgType !== "png"
            ? task.opts.quality || 100
            : undefined,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) throw new BrowserError(error.message);
      throw new BrowserError("что-то пошло не так");
    }
  };
}
