import { Router } from 'express';
import { register } from '../metrics.js';

export const metricsRouter = Router();

/**
 * GET /metrics
 * Exposes Prometheus exposition format metrics for scraping.
 */
metricsRouter.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.status(200).send(metrics);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
