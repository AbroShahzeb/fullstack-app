import AppError from "../utils/appError.js";

const handleInvalidJWTError = () =>
  new AppError("Invalid token. Login with correct token", 401);

const handleExpiredJWTError = () =>
  new AppError("Token has expired. Please login again", 401);

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateRecordDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplidate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values.map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);

    res.statusCode(500).json({
      status: "error",
      message: "Something wrong happened",
    });
  }
};

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "developement") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (error.code === 11000) error = handleDuplicateRecordDB(err);
    if (
      error._message === "Student validation failed" ||
      error._message === "Teacher validation failed" ||
      error._message === "Quiz validation failed"
    ) {
      error = handleValidationError(err);
    }

    if (error.name === "JsonWebTokenError") error = handleInvalidJWTError;
    if (error.name === "TokenExpiredError") error = handleExpiredJWTError();
    if (error.name === "CastError") error = handleCastError(err);

    sendProdError(error, res);
  }
};

export default globalErrorHandler;
