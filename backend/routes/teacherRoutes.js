import express from "express";
const router = express.Router();

import {
  registerTeacher,
  loginTeacher,
  deleteTeacher,
  updateTeacher,
} from "../controllers/teacherControllers.js";

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.delete("/delete/:id", deleteTeacher);
router.put("/update/:id", updateTeacher);

export default router;
