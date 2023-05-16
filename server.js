const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
  req.send("Hello world!");
});

app.listen(port, function () {
  console.log("Servidor en linea en puerto " + port);
});
