import Student from "../models/studentModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const filterBody = (body, ...allowedFields) => {
  const obj = {};
  Object.keys(body).forEach((field) => {
    if (allowedFields.includes(field)) obj[field] = body[field];
  });
  return obj;
};

export const getMe = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      student: {
        name: req.student.name,
        email: req.student.email,
        photo: req.student.photo,
      },
    },
  });
};
export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("You can't use this route to change password", 400)
    );
  }

  const filteredBody = filterBody(req.body, "name", "email");

  const student = await Student.findByIdAndUpdate(
    req.student._id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.student._id);

  student.active = false;
  await student.save({ validateBeforeSave: false });
});
