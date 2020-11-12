import { Context, Next } from 'koa';

// Replace this function with what is necessary to complete the mission! 🚀
export default async function topFatCharacters(
  ctx: Context,
  next: Next
): Promise<void> {
  ctx.status = 501;
  ctx.body = JSON.stringify(
    'This method is not implemented yet, but when it is, it will be awesome 😎'
  );

  // Lets not forget to call the next middleware
  await next();
}
