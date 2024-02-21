import express from "express";
const router = express.Router();

import {
  registerStudent,
  loginStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/studentControllers.js";

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.delete("/delete/:id", deleteStudent);
router.put("/update/:id", updateStudent);

export default router;
