import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { paymentRouter } from "./routes/payment.route.js";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extendend: true }));
app.set("view engine", "ejs");
app.set("view", "/src/views");
app.use("/",paymentRouter)


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
