// event.js 文件
// var events = require('events');
// var emitter = new events.EventEmitter();
// emitter.on('someEvent', function(arg1, arg2) {
//     console.log('listener1', arg1, arg2);
// });

// emitter.on('someEvent', function(arg1, arg2) {    // 绑定
//     console.log('listenr2', arg1, arg2);
// });

// emitter.emit('someEvent', 'arg1参数', 'arg2参数');  // 触发

// let count = emitter.listenerCount('someEvent');
// console.log(count);  // 2

// var http = require("http");
// var url = require("url");

// function start() {
//     function onRequest(request, response) {
//         var pathname = url.parse(request.url).pathname;
//         console.log("Request for " + pathname + " received");
//         response.writeHead(200, {"Content-Type": "text/plain"});
//         response.write("Hello World");
//         response.end();
//     }

//     http.createServer(onRequest).listen(8888);
//     console.log("Server has started");
// }

// exports.start = start;

// var http = require("http");
// var url = require("url");

// function start() {
//   function onRequest(request, response) {
//     var pathname = url.parse(request.url).pathname;
//     console.log("Request for " + pathname + " received.");
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write("Hello World");
//     response.end();
//   }

//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.");
// }

// exports.start = start;

// console.log(__filename);  // F:\LearnVue\src\components\JSArray\nodeT.js  返回当前执行脚本的文件名
// console.log(__dirname);  // F:\LearnVue\src\components\JSArray         返回当前执行脚本所在的目录

// function printHello() {
//     console.log("Hello, world");
// }

// // 两秒后执行以上函数  只执行一次函数
// var t = setTimeout(printHello, 2000);
// 清除定时器
//  clearTimeout(t);

// function printHello() {
//     console.log("Hello, World");
// }

// var t = setInterval(printHello, 2000);     //  setInterval()方法会不停地调用函数，直到clearInterval()被调用或窗口被关闭
// clearInterval(t);     // 清除定时器

// util核心库
// const util = require('util');

// async function fn() {
//     return 'hello world';
// }

// const callbackFunction = util.callbackify(fn);

// callbackFunction((err, ret) => {
//     if (err) throw err;
//     console.log(ret);
// })

// var util = require('util');

// let a = util.isDate(new Date())   // true
// console.log(a)

// let b = util.isDate(Date());     // without 'new' return a string     false
// console.log(b)

// let c = util.isDate({});
// console.log(c)

// console.log(global.__dirname)

// utf-8 编码
// const jmjcutf8 = Buffer.from('简明教程', 'utf-8')
// console.log(jmjcutf8)

// utf-8解码
// const jmjc = jmjcutf8.toString()
// console.log(jmjc)

// buffer还用作缓存区, 用于数据的缓存
// var buf = Buffer.alloc(10)
// buf.write('...')

// console.log(buf)
// console.log(buf.toString())

// Sream的理念是边读边取，以流的形式读取文件

// var fs = require('fs')
// var rs = fs.createReadStream('filename', 'utf-8')  // 得到的rs是一个输出流句柄，通过事件触发得到它到状态

// // 数据开始读取
// // data事件可能会读取多次，每次读取一块数据

// rs.on('data', function (chunk) {
//     console.log('DATA: ')
//     console.log(chunk)
// })

// // 读完触发
// rs.on('end', )

// {
//     "boxId": "boxid2",
//     "taskId": "09808",  
//     "stepIndex": 0,
//     "content": [
//         {
//             "roadMap": "roadMap1",
//             "nodesIndex": -1,
//             "roadNodes": [
//                 {
//                     "node": 1,
//                     "todo": { "action": 1, "target": 1, "direction": 1, "endLevel": 0 },
//                     "goods": { "type": 0, "weight": 10 }
//                 },
//                 {
//                     "node": 2,
//                     "todo": { "action": 2, "target": 1, "direction": 1, "endLevel": 0 },
//                     "goods": { "type": 0, "weight": 10 }
//                 }
//             ],
//             "repeat":1
//         },
//         {
//             "roadMap": "roadMap1",
//             "nodesIndex": -1,
//             "roadNodes": [
//                 {
//                     "node": 3,
//                     "todo": { "action": 1, "target": 1, "direction": 1, "endLevel": 0 },
//                     "goods": { "type": 0, "weight": 10 }
//                 },
//                 {
//                     "node": 4,
//                     "todo": { "action": 2, "target": 1, "direction": 1, "endLevel": 0 },
//                     "goods": { "type": 0, "weight": 10 }
//                 }
//             ],
//             "repeat": 1
//         }
//     ]
// }

//  不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数
// Promise
// .then(result => {})
// .catch(error => {})
// .finally(() => {})

// var a = 10
// function foo () {
//     console.log(this.a)
// }
// foo()

// console.log(2e3)
// typeof '单引号'
