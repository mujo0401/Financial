const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async () => {
  await mongoose.connect('your-mongodb-test-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test the signup path', () => {
  test('It should respond to a POST request', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password' };
    const response = await request(app)
      .post('/signup')
      .send(userData);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User created successfully');
  });

  test('It should handle validation errors', async () => {
    const userData = { username: '', email: 'test@example.com', password: 'password' };  // Missing username
    const response = await request(app)
      .post('/signup')
      .send(userData);
    expect(response.statusCode).toBe(400);
  });
});
