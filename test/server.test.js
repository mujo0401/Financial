import request from 'supertest';
import app from '../server'; // Updated path

// Mock a connectToFinanceDB function or import it if it's implemented elsewhere
const connectToFinanceDB = () => {
  // Simulate a DB connection
  return new Promise((resolve) => {
    console.log('Connecting to FinanceDB...');
    setTimeout(() => {
      console.log('Connected to FinanceDB');
      resolve();
    }, 1000); // simulate a 1 second connection time
  });
};

beforeAll(async () => {
  await connectToFinanceDB();
});

describe('GET /api', () => {
  it('responds with "API is running"', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('API is running');
  });
});

describe('GET /api/upload', () => {
  it('responds with status 200', async () => {
    const response = await request(app).get('/api/upload');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/dashboard', () => {
  it('responds with status 200', async () => {
    const response = await request(app).get('/api/dashboard');
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /api/upload', () => {
  it('should handle the upload', async () => {
    const response = await request(app)
      .post('/api/upload')
      .attach('file', Buffer.from('test file content'), 'test.txt'); // Mock file upload

    expect(response.statusCode).not.toBe(404);
    // Add other assertions here based on what you expect the response to include
  });

  it('should return 404 when route is not defined', async () => {
    const response = await request(app).post('/api/undefinedRoute');
    expect(response.statusCode).toBe(404);
  });
});