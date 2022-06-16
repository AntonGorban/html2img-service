require("dotenv").config();
import fse from "fs-extra";

import { App } from "./src/Classes/App";
import { FileUploadMiddleware } from "./src/Middlewares/FileUploadMiddleware";
import { paths } from "./src/other/config";
import { mainRouter } from "./src/routes/router";

fse.ensureDir(paths.tmp);

const PORT = Number(process.env.PORT) || 5000;

const app = new App(
  PORT,
  [
    new FileUploadMiddleware({
      limits: { fileSize: 20971520 },
      useTempFiles: true,
      tempFileDir: paths.tmp,
    }),
  ],
  [mainRouter]
);

app.start();
