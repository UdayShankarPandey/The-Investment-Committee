import { Router } from 'express';

export const statusRouter = Router();

/**
 * GET /api/status
 * Service status endpoint providing non-sensitive metadata.
 */
statusRouter.get('/api/status', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'investment-committee-api',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});
