import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/quizzes", quizRoutes);

app.get("/", (req, res) => {
  res.cookie("new cookie", "123", {
    maxAge: 60 * 1000,
    httpOnly: true,
    secure: false,
  });
  res.json({
    status: "success",
    message: "Hello from the server",
  });
});

app.all("*", (req, res, next) => {
  next(new AppError("Page not found", 404));
});

app.use(globalErrorHandler);

export default app;
