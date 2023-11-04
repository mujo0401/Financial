import request from 'supertest';
import app from '../server'; // Updated path

describe('GET /api', () => {
  it('responds with "API is running"', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('API is running');
  });
});

describe('GET /upload', () => {
    it('responds with status 200', async () => {
      const response = await request(app).get('/upload');
      expect(response.statusCode).toBe(200);
    });
  });