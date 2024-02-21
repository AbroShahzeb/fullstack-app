import express from "express";
const router = express.Router();

import {
  getQuizzes,
  createQuiz,
  deleteQuiz,
} from "../controllers/quizControllers.js";

router.get("/:teacherId", getQuizzes);
router.post("/create-quiz", createQuiz);
router.delete("/delete-quiz/:quizId", deleteQuiz);

export default router;
