const Koa = require('koa')
const app = new Koa()  // 第一步:创建实例
const cors = require('koa-cors');
const views = require('koa-views')
const json = require('koa-json')
const koajwt = require('koa-jwt')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// const attendance = require('./routes/attendance')
// const teamRouter = require('./routes/team')
const users = require('./routes/users')
const task = require('./routes/task')

// error handler
onerror(app)

app.use(cors());

// middlewares 第二步:app.use()传入中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 中间件对token进行验证
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: err.message
      }
    } else {
      throw err;
    }
  })
});

const SECRET = 'secret'; // demo，可更换
app.use(koajwt({ secret: SECRET, passthrough: true }).unless({
  // 登录，注册接口不需要验证
  path: [/^\/user\/login/, /^\/user\/register/]
}));

// routes
// app.use(attendance.routes(), attendance.allowedMethods())
// app.use(teamRouter.routes(), teamRouter.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(task.routes(), task.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app


