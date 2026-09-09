import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import { app } from '../src/app.js';
import { errorHandler } from '../src/middleware/errorHandler.js';

describe('Error Handling Middleware', () => {
  it('should return HTTP 404 with standard JSON response for unknown routes', async () => {
    const response = await request(app).get('/api/does-not-exist');

    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toEqual({
      error: 'Not Found',
    });
  });

  it('should return HTTP 500 with safe JSON and without leaking stack traces', async () => {
    const testApp = express();
    testApp.get('/simulate-error', () => {
      throw new Error('Internal system failure: /var/secrets/key.pem');
    });
    testApp.use(errorHandler);

    const response = await request(testApp).get('/simulate-error');

    expect(response.status).toBe(500);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toEqual({
      error: 'Internal Server Error',
    });
    expect(response.text).not.toContain('/var/secrets/key.pem');
  });
});
