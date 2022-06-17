import lo from "lodash";
import Puppeteer from "puppeteer";

import { BrowserError } from "../Error/BrowserError";
import { BrowserUtils } from "./BrowserUtils";
import { ScreenshotTask } from "./ScreenshotTask";

export class Browser {
  protected _browser: Puppeteer.Browser | undefined;

  constructor() {
    this._launchBrowser();
  }

  private readonly _launchBrowser = async () => {
    this._browser = await Puppeteer.launch();
    console.log("Browser opened");
  };

  public readonly closeBrowser = () =>
    new Promise((resolve) => {
      if (!!this._browser) this._browser.close().then(() => resolve(true));
      else resolve(true);
    });

  // TODO: сделать единую страницу, с работай с ней по очереди
  private readonly _createPage = () => {
    if (!this._browser) throw new BrowserError("browser is not running");

    return this._browser.newPage();
  };

  private readonly calcNativeHeight = async (
    page: Puppeteer.Page,
    height: number
  ) =>
    page
      .$(`#${BrowserUtils.htmlRootId}`)
      .then(
        (rootElement) =>
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

  public readonly screenshot = async (task: ScreenshotTask) => {
    try {
      const page = await this._createPage();

      const viewport = BrowserUtils.generateViewport({
        width: task.opts.width,
        height: task.opts.height,
      });

      await page.setViewport(viewport);

      await page.setContent(BrowserUtils.generateContent(task.data));

      const width = task.opts.width || viewport.width;
      const height =
        task.opts.height ||
        (await this.calcNativeHeight(
          page,
          task.opts.height || viewport.height
        ));

      const screenshot = await page.screenshot({
        type: task.opts.returnImgType,
        clip: { x: 0, y: 0, width, height },
        encoding: "binary",
        omitBackground: false,
        quality:
          task.opts.returnImgType !== "png"
            ? task.opts.quality || 100
            : undefined,
      });

      await page.close();
      return screenshot;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) throw new BrowserError(error.message);
      throw new BrowserError("что-то пошло не так");
    }
  };
}
