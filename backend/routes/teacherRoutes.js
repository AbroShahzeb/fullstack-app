import express from "express";
const router = express.Router();

import Teacher from "../models/teacherModel.js";
import {
  login,
  signup,
  //   getAllStudents,
  changePassword,
  protect,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { getMe, updateMe, deleteMe } from "../controllers/userController.js";

router.post("/signup", signup(Teacher));
router.post("/login", login(Teacher));
router.post("/forgot-password", forgotPassword(Teacher, "teachers"));
router.post("/reset-password/:token", resetPassword(Teacher));

router.post("/change-password", protect, changePassword(Teacher));

router.get("/me", protect, getMe);
router.patch("/update-me", protect, updateMe(Teacher));
router.delete("/delete-me", protect, deleteMe(Teacher));

// router.get("/", getAllStudents);

export default router;
