import express from "express";
const router = express.Router();

import {
  finishLiveQuiz,
  goToNextQuestion,
  joinLiveQuiz,
  leaveLiveQuiz,
  startLiveQuiz,
} from "../controllers/quizController.js";

router.post("/:id/next-question", goToNextQuestion);

router.post("/:id/join-live-quiz", joinLiveQuiz);

router.post("/:id/start-live-quiz", startLiveQuiz);

router.post("/:id/finish-live-quiz", finishLiveQuiz);

router.post("/:id/leave-live-quiz", leaveLiveQuiz);
export default router;
