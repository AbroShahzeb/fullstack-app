import express from "express";
const router = express.Router();

import {
  login,
  signup,
  getAllStudents,
} from "../controllers/authController.js";

router.post("/signup", signup);
router.post("/login", login);

router.get("/", getAllStudents);

export default router;
