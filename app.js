import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extendend: true }));
app.set("view engine", "ejs");
app.set("view", "/src/views");

const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port:${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection FAILED!!", err);
  });
