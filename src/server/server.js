const Koa = require('koa')

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';

app.use(async(ctx,next)=>{
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  }catch (e) {
    console.log(e)
    ctx.status = 500
    if (isDev){
      ctx.body = e.message;
    } else{
      ctx.body = 'please try again later'
    }
  }
})
