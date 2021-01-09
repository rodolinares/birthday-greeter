import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import nodeHtmlToImage from "node-html-to-image";

const app = express();

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
