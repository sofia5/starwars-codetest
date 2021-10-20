import app from '../server';
import request from 'supertest';

describe('top-fat-characters', () => {
  it('should return data', async () => {
    const response = await request(app.callback()).get('/top-fat-characters');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
  });
});
