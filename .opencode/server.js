const http = require("http");
const fs = require("fs");
const path = require("path");

const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const root = process.argv[2] || ".";

http
  .createServer((req, res) => {
    let f = req.url === "/" ? "/index.html" : req.url.split("?")[0];
    f = path.join(root, f);
    const ext = path.extname(f);
    res.setHeader("Content-Type", types[ext] || "text/plain");
    fs.readFile(f, (e, d) => {
      if (e) {
        res.statusCode = 404;
        res.end("404");
        return;
      }
      res.end(d);
    });
  })
  .listen(4848, () => console.log("up"));