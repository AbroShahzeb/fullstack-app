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
router.post("/forgot-password", forgotPassword(Student, "students"));
router.post("/reset-password/:token", resetPassword(Student));

router.post("/change-password", protect, changePassword(Student));

router.get("/me", protect, getMe);
router.patch("/update-me", protect, updateMe(Student));
router.delete("/delete-me", protect, deleteMe(Student));

// router.get("/", getAllStudents);

export default router;
