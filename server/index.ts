require("dotenv").config();
import fse from "fs-extra";

import { Browser } from "./src/Classes/Browser/Browser";
import { App } from "./src/Classes/Server/App";
import { Validation } from "./src/Classes/Validation/Validation";
import { ErrorHandlingMiddleware } from "./src/Middlewares/ErrorHandlingMiddleware";
import { FileUploadMiddleware } from "./src/Middlewares/FileUploadMiddleware";
import { paths } from "./src/other/config";
import { MainRouter } from "./src/routes/router";

fse.ensureDir(paths.tmp);

const PORT = Number(process.env.PORT) || 5000;

const browser = new Browser();
const validation = new Validation();

const app = new App(
  PORT,
  [
    new FileUploadMiddleware({
      limits: { fileSize: 20971520 },
      useTempFiles: true,
      tempFileDir: paths.tmp,
    }),
  ],
  [new MainRouter(browser, validation)],
  [new ErrorHandlingMiddleware(validation)]
);

app.start();

/* ---------------------------- On Exit Handling ---------------------------- */

let wasCleanedUp = false;

const runBeforeExiting = (callback: Function) =>
  ["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "uncaughtException"].forEach(
    (exitSignal) => {
      process.on(exitSignal, async () => {
        if (!wasCleanedUp) {
          await callback();
          wasCleanedUp = true;
        }
        process.exit();
      });
    }
  );

runBeforeExiting(() =>
  browser
    .closeBrowser()
    ?.then(() => console.log("Browser closed"))
    .then(() => console.log("App closed"))
);

/* --------------------------- / On Exit Handling --------------------------- */
