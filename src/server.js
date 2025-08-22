const express = require("express");

const app = express();
const hostname = "localhost";
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`Hello Bao`);
});

app.listen(PORT, hostname, () => {
  console.log(`Hi Bao. Server running at http://${hostname}:${PORT}`);
});
