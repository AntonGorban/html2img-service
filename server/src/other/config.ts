import path from "path";

export const rootPath = path.resolve(__dirname, "..", "..");

export const paths = {
  tmp: path.resolve(rootPath, "tmp"),
  static: {
    root: path.resolve(rootPath, "static"),
    img: path.resolve(rootPath, "static", "img"),
  },
};

export const PORT = Number(process.env.PORT) || 5000;
