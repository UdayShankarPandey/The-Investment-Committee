import type { Request, Response, NextFunction } from 'express';

/**
 * 404 Not Found handler for unmatched routes.
 * Returns consistent JSON response without leaking system details.
 */
export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ error: 'Not Found' });
}

/**
 * Global error handler middleware.
 * Prevents process crashes on unhandled errors and ensures no stack traces
 * or internal path details are exposed in API responses.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (process.env.NODE_ENV !== 'test') {
    console.error(`[ERROR] Unhandled error:`, err.message);
  }

  res.status(500).json({ error: 'Internal Server Error' });
}
