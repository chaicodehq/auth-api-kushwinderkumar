import mongoose from 'mongoose';

/**
 * Connect to MongoDB
 * @param {string} uri - MongoDB connection URI
 * @returns {mongoose.Connection} - Mongoose connection
 */
export async function connectDB(uri) {
  if (!uri) {
    throw new Error('MongoDB URI is required');
  }
  await mongoose.connect(uri);
  return mongoose.connection;
}
