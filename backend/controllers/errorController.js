const errorMiddleware = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    const status = err.status === "fail" ? 400 : 500;
    res.status(status).json({
      error: err,
      errorName: err.name,
      errorMessage: err.message,
    });
  } else if (process.env.NODE_ENV === "production") {
    const status = err.statusCode || 500;
    if (err.isOperational) {
      return res.status(status).json({
        message: err.message,
      });
    }
    if (err.code === 11000) {
      res.status(400).json({
        status: "fail",
        message: "Email already in use!",
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  }
};

module.exports = errorMiddleware;
