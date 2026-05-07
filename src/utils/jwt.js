import jwt from 'jsonwebtoken';

/**
 * Signs a JWT token with the given payload
 * @param {Object} payload - Data to encode in the token
 * @returns {string} - Signed JWT token
 */
export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  });
}

/**
 * Verifies and decodes a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 * @throws {JsonWebTokenError} - If token is invalid
 * @throws {TokenExpiredError} - If token is expired
 */
export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
