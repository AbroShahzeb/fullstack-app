import catchAsync from "../utils/catchAsync.js";
import Quiz from "../models/quizModel.js";
import Question from "../models/questionModel.js";
import AppError from "../utils/appError.js";

import { socket } from "../../server.js";

export const createQuiz = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    questions,
    createdBy,
    currentlyBeingTakenBy,
    joiningCode,
    difficultyLevel,
  } = req.body;

  // sending all requests at one using Promise.all
  const questionIds = await Promise.all(
    questions.map(async (currentQuestion) => {
      const { question, options, correctOption, timeToAnswer } =
        currentQuestion;
      const newQuestion = await Question.create({
        question,
        options,
        correctOption,
        timeToAnswer,
      });

      return newQuestion.id;
    })
  );

  const newQuiz = await Quiz.create({
    title,
    description,
    questions: questionIds,
    createdBy,
    currentlyBeingTakenBy,
    joiningCode,
    difficultyLevel,
  });

  res.status(200).json({
    status: "success",
    data: {
      quiz: newQuiz,
    },
  });
});

export const getMyQuizzes = catchAsync(async (req, res, next) => {
  const quizzes = await Quiz.find({ createdBy: req.user.id }).populate(
    "questions"
  );
  res.status(200).json({
    status: "success",
    data: {
      quiz: quizzes,
    },
  });
});

export const deleteQuiz = catchAsync(async (req, res, next) => {
  const quizId = req.params.id;

  const quiz = await Quiz.findOne({ createdBy: req.user.id, _id: quizId });
  if (!quiz) {
    return next(
      new AppError(
        "Quiz doesn't exist or you dont have permission to delete it"
      )
    );
  }

  await quiz.deleteOne();
  res.status(204).json({
    status: "success",
    message: "Quiz deleted successfully",
  });
});

export const goToNextQuestion = catchAsync(async (req, res, next) => {
  const currentQueIndex = req.body.queIndex;
  const quizId = req.params.id;
  const quiz = await Quiz.findById(quizId)
    .select("questions")
    .populate("questions");

  const nextQuestion = quiz.questions[currentQueIndex + 1];

  if (!nextQuestion) {
    return next(new AppError("You have reached the end of the quiz"));
  }

  socket.emit("next-question", nextQuestion);

  res.status(200).json({
    status: "success",
    nextQuestion: nextQuestion,
  });
});

export const joinLiveQuiz = catchAsync(async (req, res, next) => {
  const { studentId } = req.body;
  const quizId = req.params.id;

  const quiz = await Quiz.findById(quizId).select(
    "currentlyBeingTakenBy isLive"
  );

  if (!quiz.isLive) {
    return next(new AppError("Quiz is not live yet. You cannot join"));
  }

  let isStudentAlreadyJoined = false;
  quiz.currentlyBeingTakenBy.forEach((student) => {
    if (student._id.toString() === studentId) {
      isStudentAlreadyJoined = true;
      return;
    }
  });

  if (isStudentAlreadyJoined) {
    return next(
      new AppError("You are already joined to the quiz. You cannot join again")
    );
  }
  quiz.currentlyBeingTakenBy.push(studentId);
  await quiz.save();

  const currentStudents = await Quiz.findById(quizId)
    .select("currentlyBeingTakenBy")
    .populate({ path: "currentlyBeingTakenBy", select: "name photo" });

  res.status(200).json({
    status: "success",
    currentStudents: currentStudents.currentlyBeingTakenBy,
  });
});

export const startLiveQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  quiz.isLive = true;
  await quiz.save();

  res.status(200).json({
    status: "success",
    message: "Quiz is live",
  });
});

export const finishLiveQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  quiz.isLive = false;
  quiz.currentlyBeingTakenBy = [];
  await quiz.save();

  res.status(200).json({
    status: "success",
    message: "Quiz has finished",
  });
});

export const leaveLiveQuiz = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const quiz = await Quiz.findById(req.params.id);
  quiz.currentlyBeingTakenBy = quiz.currentlyBeingTakenBy.filter(
    (student) => student._id.toString() !== studentId
  );
  await quiz.save();

  res.status(200).json({
    status: "success",
    message: "Quiz left successfully",
  });
});
