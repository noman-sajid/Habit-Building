const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
  // Set default status and message
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Log full error in dev
  if (process.env.NODE_ENV === "development") {
    console.error("🔴 Full Error:", err);
  }

  // Handle invalid MongoDB ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle duplicate key (email, etc.)
  if (err.code === 11000) {
    const message = `Duplicate field: ${Object.keys(err.keyValue).join(", ")}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("Invalid token, please log in again", 401);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("Token expired, please log in again", 401);
  }

  // Send response
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
