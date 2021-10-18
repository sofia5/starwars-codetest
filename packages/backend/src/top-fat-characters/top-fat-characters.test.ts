import server from '../server';
import request from 'supertest';

afterEach((complete) => {
  server.close();
  complete();
});

describe('top-fat-characters', () => {
  it('should return data', async () => {
    const response = await request(server).get('/top-fat-characters');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
  });
});
