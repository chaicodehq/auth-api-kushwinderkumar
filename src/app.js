import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/notFound.middleware.js';

/**
 * Create and configure the Express application
 */
export function createApp() {
  const app = express();

  // Parse JSON bodies
  app.use(express.json());

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({ ok: true });
  });

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);

  // 404 handler
  app.use(notFound);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
}
