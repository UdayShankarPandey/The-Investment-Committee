import { Router } from 'express';

export const healthRouter = Router();

/**
 * GET /health
 * Primary liveness/readiness probe endpoint for Kubernetes / orchestration.
 */
healthRouter.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});
