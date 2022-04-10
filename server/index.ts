require("dotenv").config();
import express from "express";

const PORT = process.env.PORT || 5000;

const app = express();

(async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error("Server dont started", error);
  }
})();
