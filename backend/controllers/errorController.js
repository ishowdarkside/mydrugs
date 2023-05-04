const errorMiddleware = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    const status = err.status === "fail" ? 400 : 500;
    res.status(status).json({
      error: err,
    });
  }
};

module.exports = errorMiddleware;
