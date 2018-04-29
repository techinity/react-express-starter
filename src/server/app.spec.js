import request from 'supertest';
import app from './app';

describe('express app configuration', () => {
  describe('errors', () => {
    it('should return a 404 response if the path does not exist', async () => {
      const response = await request(app).get('/does-not-exist');
      expect(response.statusCode).toBe(404);
    });
  });
});

