import express from "express";
const router = express.Router();

import { goToNextQuestion } from "../controllers/quizController.js";

router.post("/:id/next-question", goToNextQuestion);

export default router;
