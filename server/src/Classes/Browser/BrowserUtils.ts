import Puppeteer from "puppeteer";

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

  static readonly generateContent: GenerateContent = ({ html, css, size }) => `
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
			div#${this.htmlRootId} {
				${!!size?.width ? `width: ${size?.width};` : ""}
				${!!size?.height ? `height: ${size?.height};` : ""}
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
			${html}
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
  (opts: {
    html: string;
    css?: string;
    size?: { width?: number; height?: number };
  }): string;
}

/* --------------------------------- / Types -------------------------------- */
