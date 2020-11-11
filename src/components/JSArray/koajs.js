// app.listen（...）是以下方法的语法糖

// const http = require('http')
// const Koa = require('koa')
// const app = new Koa()
// http.createServer(app.callback()).listen(3000)


// 这意味着你可以将同一个应用程序同时作为HTTP和HTTPS或多个地址：
// const http = require('http')
// const https = require('https')
// const Koa = require('koa')
// const app = new Koa()
// http.createServer(app.callback()).listen(3000)
// https.createServer(app.callback()).listen(3001)


// app.use(function)
// 将给定的中间件方法添加到此应用程序。
// app.use()返回this,因此可以链式表达
// app.use(someMiddleware)
// app.use(someOtherMiddleware)
// app.listen(3000)

// 等同于
// app.use(someMiddleware)
//    .use(someOtherMiddleware)
//    .listen(3000)

// 错误处理
// app.on('error', err => {
//     log.error('server error', err)
// })

