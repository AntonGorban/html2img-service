import Puppeteer from "puppeteer";
import { ImageList } from "../ImageList";

export class BrowserUtils {
  static readonly generateViewport: GenerateViewport = ({ width, height }) => ({
    width: width || 1024,
    height: height || 768,
    isMobile: false,
    hasTouch: false,
    isLandscape: true,
    deviceScaleFactor: 1,
  });

  static readonly htmlRootId = "Puppeteer-root";

  static readonly insertImgIntoHTML = (html: string, imgs: ImageList) => {
    let outputHtml = html;

    imgs.imgs.forEach(({ name, img }) => {
      outputHtml = outputHtml.replace(new RegExp(name, "g"), img.uri);
    });

    return outputHtml;
  };

  static readonly generateContent: GenerateContent = ({ html, css, imgs }) => `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
		<style>
			html, body, div#${this.htmlRootId} {
				margin: 0;
				padding: 0;
			}
			div#${this.htmlRootId}::after {
				content: "";
				clear: both;
				display: table;
			}
		</style>
		${!!css ? `<style>${css}</style>` : ""}
	</head>
	<body>
		<div id="${this.htmlRootId}">
			${BrowserUtils.insertImgIntoHTML(html, imgs)}
		</div>
	</body>
	</html>
`;
}

/* ---------------------------------- Types --------------------------------- */

interface GenerateViewport {
  (opts: { width?: number; height?: number }): Puppeteer.Viewport;
}

interface GenerateContent {
  (opts: { html: string; imgs: ImageList; css?: string }): string;
}

/* --------------------------------- / Types -------------------------------- */
