// import bluebird from "bluebird";
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
// import nodeHtmlToImage from "node-html-to-image";

import { createUser, listUsers, removeUser, retrieveUser, updateUser } from "./controllers/user.controller";
import { MONGODB_URI } from "./util/secrets";
import { check } from "./util/validators";

const app = express();

const mongoUrl = MONGODB_URI;
// mongoose.Promise = bluebird;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
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

// app.get("/", (req, res) => {
//   nodeHtmlToImage({
//     html: "<html><body>Hello World!</body></html>",
//     output: "./image.png",
//     puppeteerArgs: { args: ["--no-sandbox", "--disable-setuid-sandbox"] }
//   })
//     .then(() => {
//       res.send("👋🌎!");
//     })
//     .catch(error => {
//       console.error(error);
//       res.send("👋🌎!");
//     });
// });

app
  .route("/users")
  .get(listUsers)
  .post(body(["gender", "name", "phone"]).notEmpty(), check, createUser);

app
  .route("/users/:id")
  .get(retrieveUser)
  .post(body(["gender", "name", "phone"]).notEmpty(), check, updateUser)
  .delete(removeUser);

export default app;
