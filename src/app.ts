import express from "express";
import nodeHtmlToImage from "node-html-to-image";

const app = express();
const port = 3000;

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

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
