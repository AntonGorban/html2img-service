require("dotenv").config();
import fse from "fs-extra";

import { App } from "./src/Classes/Server/App";
import { ErrorHandlingMiddleware } from "./src/Middlewares/ErrorHandlingMiddleware";
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
  [mainRouter],
  [new ErrorHandlingMiddleware()]
);

app.start();
