import express from "express";
const router = express.Router();

import {
  login,
  signup,
  getAllStudents,
  changePassword,
  protect,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { getMe, updateMe, deleteMe } from "../controllers/studentController.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/change-password", protect, changePassword);

router.get("/me", protect, getMe);
router.patch("/update-me", protect, updateMe);
router.delete("/delete-me", protect, deleteMe);

router.get("/", getAllStudents);

export default router;
