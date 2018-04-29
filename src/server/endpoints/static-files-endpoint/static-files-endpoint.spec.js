import express from 'express';
import request from 'supertest';
import staticFilesEndpoint from './static-files-endpoint';

describe('static-files-endpoint files endpoint', () => {
  it('should make static-files-endpoint assets available', async () => {
    const app = express();
    app.use(staticFilesEndpoint);

    const response = await request(app).get('/id.txt');
    expect(response.statusCode).toBe(200);
  });
});
