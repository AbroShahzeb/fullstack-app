import asyncHandler from "express-async-handler";
import quizModel from "../models/quizModel.js";
import questionModel from "../models/questionModel.js";

// @desc Get quizzes
// @method GET /api/quiz/:teacherId
// @access PRIVATE
export const getQuizzes = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;
  const quizzes = await quizModel
    .find({ createdBy: teacherId })
    .populate("questions")
    .populate("createdBy");

  if (quizzes.length > 0) {
    res.json(quizzes);
  } else {
    res.json({
      message: "You have not created any quizzes yet, created one now!",
    });
  }
});

// @desc Create quiz
// @method POST /api/quiz/create-quiz
// @access PRIVATE
export const createQuiz = asyncHandler(async (req, res) => {
  const { title, description, teacherId, questions } = req.body;

  const quiz = await quizModel.create({
    title,
    description,
    createdBy: teacherId,
    questions: [],
  });

  const createdQuestions = await Promise.all(
    questions.map(async (question) => {
      const newQuestion = await questionModel.create({
        question: question.question,
        options: question.options,
        correctOption: question.correctOption,
        timeToAnswer: question.timeToAnswer,
        quizId: quiz.id,
      });
      return newQuestion; // Return the created question
    })
  );

  quiz.questions = createdQuestions.map((question) => question._id);
  quiz.save();

  res.json("Quiz created");
});

// @desc Delete quiz
// @method DELETE /api/quiz/delete-quiz/:quizId
// @access PRIVATE
export const deleteQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await quizModel.findByIdAndDelete(quizId);
    res.json({ message: `Quiz: ${quiz.title} deleted successfully` });
  } catch (err) {
    console.log(err);
    throw new Error("Quiz couldn't be deleted");
  }
});
