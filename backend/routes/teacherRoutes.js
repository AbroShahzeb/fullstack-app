import express from "express";
const router = express.Router();

import Teacher from "../models/teacherModel.js";
import {
  login,
  signup,
  changePassword,
  protect,
  forgotPassword,
  resetPassword,
  restrictTo,
} from "../controllers/authController.js";

import { getMe, updateMe, deleteMe } from "../controllers/userController.js";

import {
  createQuiz,
  getMyQuizzes,
  deleteQuiz,
} from "../controllers/quizController.js";

router.post(
  "/create-quiz",
  protect(Teacher),
  restrictTo("teacher"),
  createQuiz
);
router.get(
  "/my-quizzes",
  protect(Teacher),
  restrictTo("teacher"),
  getMyQuizzes
);
router.post("/signup", signup(Teacher));
router.post("/login", login(Teacher));
router.post("/forgot-password", forgotPassword(Teacher, "teacher"));
router.post("/reset-password/:token", resetPassword(Teacher));

router.delete(
  "/quizzes/:id",
  protect(Teacher),

  deleteQuiz
);

router.post("/change-password", protect, changePassword(Teacher));

router.get("/me", protect, getMe);
router.patch("/update-me", protect, updateMe(Teacher));
router.delete("/delete-me", protect, deleteMe(Teacher));

export default router;
