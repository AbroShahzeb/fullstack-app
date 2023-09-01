require("dotenv").config();

const mongoose = require("mongoose");

async function connectDB() {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected!");
  return connection;
}

let db = connectDB();
console.log(db);

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
