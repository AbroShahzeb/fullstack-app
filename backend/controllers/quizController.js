import catchAsync from "../utils/catchAsync.js";

export const createQuiz = (req, res, next) => {
  //   console.log(req.body);
  res.status(200).json({
    status: "success",
    message: "Quiz create successfully",
  });
};
