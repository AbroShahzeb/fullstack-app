import catchAsync from "../utils/catchAsync.js";
import Quiz from "../models/quizModel.js";
import Question from "../models/questionModel.js";

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
  const quizzes = await Quiz.find({ createdBy: req.user.id });
  res.status(200).json({
    status: "success",
    data: {
      quiz: quizzes,
    },
  });
});
