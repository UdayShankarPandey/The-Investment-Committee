import client from 'prom-client';
import type { Request, Response, NextFunction } from 'express';

// Create a dedicated Prometheus registry
export const register = new client.Registry();

// Enable default Node.js and process metrics
client.collectDefaultMetrics({
  register,
  prefix: 'node_',
});

// Custom HTTP request duration histogram with standardized latency buckets
export const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'] as const,
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  registers: [register],
});

// Custom HTTP requests total counter
export const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests processed',
  labelNames: ['method', 'route', 'status_code'] as const,
  registers: [register],
});

/**
 * Express middleware to record Prometheus request metrics.
 * Normalizes route labels to prevent unbounded cardinality.
 */
export function metricsMiddleware(req: Request, res: Response, next: NextFunction): void {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const durationInSeconds = diff[0] + diff[1] / 1e9;

    let route = 'unmatched';
    if (req.route && req.route.path) {
      route = `${req.baseUrl || ''}${req.route.path}`;
    } else if (res.statusCode === 404) {
      route = 'not_found';
    }

    const labels = {
      method: req.method,
      route,
      status_code: res.statusCode.toString(),
    };

    httpRequestsTotal.inc(labels);
    httpRequestDurationSeconds.observe(labels, durationInSeconds);
  });

  next();
}
