import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/quizzes", quizRoutes);

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

app.all("*", (req, res, next) => {
  next(new AppError("Page not found", 404));
});

app.use(globalErrorHandler);

export default app;
