require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Use the MongoDB URI from the environment variable

app.get("/", async (req, res) => {
  res.json({ message: "This is our homepage!" });
});

app.get("/user", (req, res) => {
  res.json({ message: "User page" });
});

app.listen(process.env.PORT || 3000);
