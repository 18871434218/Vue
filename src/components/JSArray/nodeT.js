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

var util = require('util');

let a = util.isDate(new Date())
console.log(a)

let b = util.isDate(Date());
console.log(b)

let c = util.isDate({});
console.log(c)