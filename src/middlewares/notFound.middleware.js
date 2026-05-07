/**
 * Handle 404 errors for unmatched routes
 */
export function notFound(req, res) {
  res.status(404).json({ error: { message: 'Route not found' } });
}
