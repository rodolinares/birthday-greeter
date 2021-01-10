// import bluebird from "bluebird";
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import mongoose from "mongoose";
import nodeHtmlToImage from "node-html-to-image";

import { MONGODB_URI } from "./util/secrets";

const app = express();

const mongoUrl = MONGODB_URI;
// mongoose.Promise = bluebird;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connection success.");
  })
  .catch(error => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);
    // process.exit();
  });

app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  nodeHtmlToImage({
    html: "<html><body>Hello World!</body></html>",
    output: "./image.png",
    puppeteerArgs: { args: ["--no-sandbox", "--disable-setuid-sandbox"] }
  })
    .then(() => {
      res.send("👋🌎!");
    })
    .catch(error => {
      console.error(error);
      res.send("👋🌎!");
    });
});

export default app;
