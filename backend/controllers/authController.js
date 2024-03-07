import Student from "../models/studentModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const signToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token);
  return token;
};

export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const newStudent = await Student.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const token = signToken(newStudent._id, res);

  res.status(201).json({
    status: "success",
    token,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and Password is required", 400));
  }

  const student = await Student.findOne({ email }).select("+password");

  if (
    !student ||
    !(await student.arePasswordsEqual(password, student.password))
  ) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = signToken(student._id, res);

  res.json({
    status: "success",
    token,
  });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in, login to perform this task")
    );
  }

  const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentStudent = await Student.findById(decoded.id);

  if (!currentStudent) {
    return next(new AppError("Student belonging to token does not exit"));
  }

  if (currentStudent.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("Password was recently changed. Login again"));
  }

  req.student = currentStudent;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.student.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
