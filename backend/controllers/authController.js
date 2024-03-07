import Student from "../models/studentModel.js";
import catchAsync from "../utils/catchAsync.js";

export const signup = catchAsync(async (req, res, next) => {
  const student = await Student.create(req.body);

  res.json({
    status: "success",
    data: {
      student,
    },
  });
});

export const login = (req, res, next) => {
  res.json({
    status: "success",
    message: "Logged in successfully",
  });
};
