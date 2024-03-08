import express from "express";
const router = express.Router();

import {
  login,
  signup,
  getAllStudents,
  changePassword,
  protect,
} from "../controllers/authController.js";

router.post("/signup", signup);
router.post("/login", login);

router.post("/change-password", protect, changePassword);

router.get("/", getAllStudents);

export default router;
