import express from "express";
const router = express.Router();

import Student from "../models/studentModel.js";

import {
  login,
  signup,
  // getAllStudents,
  changePassword,
  protect,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { getMe, updateMe, deleteMe } from "../controllers/userController.js";

router.post("/signup", signup(Student));
router.post("/login", login(Student));
router.post("/forgot-password", forgotPassword(Student, "student"));
router.post("/reset-password/:token", resetPassword(Student));

router.post("/change-password", protect, changePassword(Student));

router.get("/me", protect(Student), getMe);
router.patch("/update-me", protect(Student), updateMe(Student));
router.delete("/delete-me", protect(Student), deleteMe(Student));

export default router;
