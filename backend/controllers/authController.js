export const signup = (req, res, next) => {
  res.json({
    status: "success",
    message: "Signed up successfully",
    data: {
      students: req.body,
    },
  });
};

export const login = (req, res, next) => {
  res.json({
    status: "success",
    message: "Logged in successfully",
  });
};
