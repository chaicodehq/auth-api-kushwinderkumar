/**
 * Global error handler middleware
 */
export function errorHandler(error, req, res, next) {
  // Mongoose validation errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: { message: error.message } });
  }

  // Mongoose duplicate key errors
  if (error.code === 11000) {
    return res.status(409).json({ error: { message: 'Email already exists' } });
  }

  // All other errors
  return res.status(500).json({ error: { message: error.message } });
}
