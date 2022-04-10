require("dotenv").config();
import express from "express";
import fileUpload from "express-fileupload";
import fse from "fs-extra";

import { paths } from "./src/other/config";

fse.ensureDir(paths.tmp);

const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  fileUpload({
    limits: { fileSize: 20971520 },
    useTempFiles: true,
    tempFileDir: paths.tmp,
  })
);

(async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error("Server dont started", error);
  }
})();
