import express from 'express';
import cors from 'cors';
import { healthRouter } from './routes/health.js';
import { statusRouter } from './routes/status.js';
import { metricsRouter } from './routes/metrics.js';
import { metricsMiddleware } from './metrics.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

export const app = express();

// Security: Disable x-powered-by banner
app.disable('x-powered-by');

// CORS configuration: Conservative policy for local and containerized clients
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ['GET', 'HEAD', 'OPTIONS'],
  }),
);

// JSON body parsing
app.use(express.json());

// Operational request logger for container stdout (docker logs / kubectl logs)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    if (process.env.NODE_ENV !== 'test') {
      const duration = Date.now() - start;
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`,
      );
    }
  });
  next();
});

// Prometheus metrics recording middleware
app.use(metricsMiddleware);

// API route registrations
app.use(healthRouter);
app.use(statusRouter);
app.use(metricsRouter);

// 404 handler for unknown paths
app.use(notFoundHandler);

// Global centralized error handling middleware
app.use(errorHandler);
