import Koa from 'koa';
import Router from '@koa/router';
import Cors from '@koa/cors';
// import json from 'koa-json';
//import logger from 'koa-logger';
import topFatCharacters from './top-fat-characters/top-fat-characters';
import { config } from './config';

const app = new Koa();
const router = new Router();

app.use(
  Cors({
    origin: '*',
  })
);
// app.use(json());
router.get('/top-fat-characters', topFatCharacters);
app.use(router.routes()).use(router.allowedMethods());
//app.use(logger())
//app.use(async ctx => (ctx.body = { msg: 'test'}))

// This is where the magic happens ✨
console.log(`The server is running at port ${config.port}`);
const server = (module.exports = app.listen(config.port));
export default server;

// async function responseTime(ctx, next) {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   ctx.set('X-Response-Time', ms + 'ms');
// }

// async function logger(ctx, next) {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   if ('test' != process.env.NODE_ENV) {
//     console.log('%s %s - %s', ctx.method, ctx.url, ms);
//   }
// }

// const all = compose([
//   responseTime,
//   logger,
//   respond
// ]);
