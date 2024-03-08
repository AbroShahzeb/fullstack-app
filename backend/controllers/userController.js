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
      user: {
        name: req.user.name,
        email: req.user.email,
        photo: req.user.photo,
      },
    },
  });
};
export const updateMe = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError("You can't use this route to change password", 400)
      );
    }

    const filteredBody = filterBody(req.body, "name", "email");

    const user = await Model.findByIdAndUpdate(req.user._id, filteredBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  });

export const deleteMe = (Model) =>
  catchAsync(async (req, res, next) => {
    const user = await Model.findById(req.user._id);

    user.active = false;
    await user.save({ validateBeforeSave: false });
  });
