import Koa from 'koa';
import Router from '@koa/router';
import Cors from '@koa/cors';

import logger from 'koa-logger';
import topFatCharacters from './top-fat-characters/top-fat-characters';
import { config } from './config';

const app = new Koa();
const router = new Router();

app.use(
  Cors({
    origin: '*',
  })
);

router.get('/404', (ctx) => ctx.throw(404));
router.get('/500', (ctx) => ctx.throw(500));

router.get('/top-fat-characters', topFatCharacters);
app.use(router.routes()).use(router.allowedMethods());
app.use(logger());

const server = app.listen(config.port, () => {
  console.log(`The server is running at port ${config.port}`);
});
export default server;
