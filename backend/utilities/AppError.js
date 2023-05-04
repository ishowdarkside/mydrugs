class AppError {
  constructor(statusCode, msg) {
    this.message = msg;
    this.isOperational = true;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
