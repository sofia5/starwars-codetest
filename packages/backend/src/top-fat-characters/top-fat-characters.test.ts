import app from '../server';
import request from 'supertest';

describe('top-fat-characters', () => {
  it('should return data', async () => {
    const response = await request(app.callback()).get('/top-fat-characters');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
  });

  it('existing star wars character should be included in data', async () => {
    const response = await request(app.callback()).get('/top-fat-characters');
    const existingStarwarsCharacter = { name: 'Han Solo' };
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(existingStarwarsCharacter),
      ])
    );
  });
});
