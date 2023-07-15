const Koa = require('koa')
const Router = require('koa-router');
const json = require('koa-json')

const app = new Koa();
const router = new Router()

app.use(json())

router.get('/',async(ctx)=>{
    ctx.body = {message:'Hello,world33'}
})

app.use(router.routes())

app.listen(4388,()=>{
    console.log('服务开启啦')
})