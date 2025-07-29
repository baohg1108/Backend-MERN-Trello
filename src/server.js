import express from "express";

const app = express();

const PORT = 3000;

app.get("/", function (req, res) {
  res.send("Hello world !");
});

app.listen(PORT, function (error) {
  if (error) console.log("Error when start server");
  else console.log(`Server running on port ${PORT}`);
});
