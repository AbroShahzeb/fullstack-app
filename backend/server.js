import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import cookieParser from "cookie-parser";

import path from "path";
import connectDB from "./utils/db.js";
import AuthRoutes from "./routes/AuthRoutes.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    allowedHeaders: ["Content-Type", "Authoriztion"],
    methods: ["GET", "POST", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

connectDB();

app.use("/user", AuthRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
