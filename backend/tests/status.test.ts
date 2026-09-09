import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('GET /api/status', () => {
  it('should return HTTP 200 with JSON metadata including service, status, and version', async () => {
    const response = await request(app).get('/api/status');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toEqual({
      status: 'ok',
      service: 'investment-committee-api',
      version: '1.0.0',
      environment: expect.any(String),
    });
  });
});
