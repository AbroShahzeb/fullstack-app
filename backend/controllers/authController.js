import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { sendMail } from "../utils/email.js";
import crypto from "crypto";

const signToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    maxAge: 90 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
  });
  return token;
};

export const signup = (Model) =>
  catchAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body;

    const JWTCookie = req.cookies.jwt;
    console.log(JWTCookie);

    const newDocument = await Model.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    const token = signToken(newDocument._id, res);

    res.cookie("jwt", token, {
      maxAge: 90 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });
    res.status(201).json({
      status: "success",
      token,
    });
  });

export const login = (Model) =>
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and Password is required", 400));
    }

    const document = await Model.findOne({ email }).select("+password");

    if (
      !document ||
      !(await document.arePasswordsEqual(password, document.password))
    ) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = signToken(document._id, res);

    res.json({
      status: "success",
      token,
    });
  });

export const protect = (Model) =>
  catchAsync(async (req, res, next) => {
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

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await Model.findById(decoded.id).select("+role");
    if (!currentUser) {
      return next(new AppError("User belonging to token does not exit"));
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError("Password was recently changed. Login again"));
    }

    req.user = currentUser;
    next();
  });

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

// export const getAllStudents = catchAsync(async (req, res, next) => {
//   const students = await Student.find().select("-__v");

//   res.status(200).json({
//     status: "success",
//     data: {
//       students,
//     },
//   });
// });

export const changePassword = (Model) =>
  catchAsync(async (req, res, next) => {
    const { currentPassword, newPassword, newPasswordConfirm } = req.body;

    // Match the current password
    const user = await Model.findById(req.user._id).select("+password");

    if (!user) {
      return next(
        new AppError("You are not logged in. Login to change password", 401)
      );
    }

    if (!(await user.arePasswordsEqual(currentPassword, user.password))) {
      return next(new AppError("Your current password is wrong", 400));
    }

    user.password = newPassword;
    user.passwordConfirm = newPasswordConfirm;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  });

export const forgotPassword = (Model, modelName) =>
  catchAsync(async (req, res, next) => {
    const { email } = req.body;

    const user = await Model.findOne({ email });

    if (!user) return next(new AppError("No user with this email exits", 400));

    const token = user.createResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/${modelName}/reset-password/${token}`;

    const message = `You requested for password reset. Go to this link for resetting password: ${resetUrl} If you didn't request for this then simply ignore this email.`;

    try {
      await sendMail({
        email,
        subject: "Reset your password (Valid for 10 minutes only)",
        message,
      });

      res.status(200).json({
        status: "success",
        message: "Check your email for resetting password",
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiresIn = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError("An error occured while sending email. Try again later")
      );
    }
  });

export const resetPassword = (Model) =>
  catchAsync(async (req, res, next) => {
    const { password, passwordConfirm } = req.body;

    const resetToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await Model.findOne({
      resetPasswordToken: resetToken,
      resetPasswordTokenExpiresIn: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("No such user exists or token expired"));
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresIn = undefined;
    await user.save();

    const token = signToken(user._id, res);
    res.status(200).json({
      message: "success",
      token,
    });
  });
