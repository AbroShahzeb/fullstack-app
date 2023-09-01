const express = require("express");
const app = express();
app.get("/", (req, res) => {
  console.log("Just got a request!");
  res.json({ message: "Homepage!" });
});

app.get("/user", (req, res) => {
  res.json({ message: "User page" });
});

app.listen(process.env.PORT || 3000);
