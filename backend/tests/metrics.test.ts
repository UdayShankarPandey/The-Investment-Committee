import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('GET /metrics', () => {
  it('should return HTTP 200 with Prometheus exposition format text and metrics', async () => {
    // Perform a request so custom metrics are populated
    await request(app).get('/health');

    const response = await request(app).get('/metrics');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/text\/plain/);

    // Verify presence of custom HTTP metrics
    expect(response.text).toContain('# HELP http_requests_total');
    expect(response.text).toContain('# TYPE http_requests_total counter');
    expect(response.text).toContain('http_requests_total');

    expect(response.text).toContain('# HELP http_request_duration_seconds');
    expect(response.text).toContain('# TYPE http_request_duration_seconds histogram');
    expect(response.text).toContain('http_request_duration_seconds');

    // Verify presence of default Node.js/process metrics
    expect(response.text).toContain('node_');
  });
});
