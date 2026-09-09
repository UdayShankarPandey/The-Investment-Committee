import { app } from './app.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`Investment Committee API listening on ${HOST}:${PORT}`);
});

/**
 * Graceful process shutdown handler for Docker / Kubernetes container lifecycle.
 */
function handleShutdown(signal: string): void {
  console.log(`Received ${signal}. Initiating graceful shutdown...`);
  server.close((err) => {
    if (err) {
      console.error('Error during server close:', err);
      process.exit(1);
    }
    console.log('Server connections closed successfully.');
    process.exit(0);
  });

  // Failsafe timeout to prevent hanging processes
  setTimeout(() => {
    console.error('Forced shutdown: active connections timed out.');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
