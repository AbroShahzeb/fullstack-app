import express from "express";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";

app.use(express.json());

app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/teachers", teacherRoutes);

app.get("/", (req, res) => {
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
