import { Context } from 'koa';
import axios from 'axios';

export default async function topFatCharacters(ctx: Context): Promise<void> {
  const data: any[] = [];
  const href = 'https://swapi.dev/api/people';
  let response = await axios.get(href);

  response.data.results.forEach((result: any) => {
    data.push(result);
  });

  while (response.data['next'] !== null) {
    response = await axios.get(response.data['next']);
    if (response.status === 200) {
      response.data.results.forEach((result: any) => {
        data.push(result);
      });
    } else {
      ctx.throw(400, 'The API request was not successful');
    }
  }

  ctx.body = data;
}
