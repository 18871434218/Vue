//     1、回调
//        回调是编写和处理JavaScript程序异步逻辑的最常用方式，无论是setTimeout还是ajax,都是以回调的方式把我们打算做的事情在某一时刻执行

// import { getDayOfMonth, getBaseURL } from "xe-utils/methods"

// require('http://my.data', function callback(res) {
//     console.log(res)
// })

// // 或者延时的回调
// setTimeout(function callback() {
//     console.log('hi')
// }, 1000)

// 函数callback即为回调函数，它作为参数传进请求函数，并将在合适的时候被调用执行


//    回调主要有以下两个问题
//      1.线性理解能力缺失，回调地狱
//        过深的嵌套，导致回调地狱，难以追踪回调的执行顺序
//      2.控制反转信任缺失，错误处理无法保证
//        回调函数的调用逻辑是在请求函数内部，我们无法保证回调一定会被正确调用。回调本身没有错误处理机制，
//        需要额外设计。可能出现的错误包括：回调返回错误结果、吞掉可能出现的错误与异常、回调没有执行、回调被多次执行、回调被同步执行等等


//  Promise的一般使用形式
//  可以通过构造器Promise()构造promise实例

// var p = new Promise(function(resolve, reject){
//     if(1 > 0) {
//         resolve()  // 通常用于完成
//     } else {
//         reject()   // 用于拒绝
//     }
// })

// var onFullfilled = function() {console.log("finish")}  // 用于处理完成
// var onRejected = function() {console.log("error")}   // 用于处理拒绝

// p.then(onFullfilled, onRejected)       //  



// Promise.all()
// var p1 = Promise.resolve(42);
// var p2 = Promise.resolve("Hello world");
// var p3 = Promise.reject("Oops");

// Promise.race([p1, p2, p3])
// .then( function(msg) {
//     console.log(msg);
// });

// Promise.all([p1, p2, p3])
// .catch(function(err){
//     console.error(err);
// });

// Promise.all([p1, p2])
// .then(function(msgs){
//     console.log(msgs);
// })

// var p1 = new Promise(function(resolve, reject){
//     reject("Oops");
// });

// var p2 = Promise.reject("Oops");

// function foo (a) {
//     var b = a + 1;
//     return new Promise(resolve => {
//         resolve([a, b])
//     })
// }

// foo(1).then(function(msg) {
//     console.log(msg[0], msg[1])
// })



//   async函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句，并且最终返回一个Promised对象
// 正常情况下，await 命令后面是一个 Promise 对象。
// 如果不是，会被转成一个立即 resolve 的 Promise 对象。await 命令后面的 Promise 对象如果变为 reject 状态，则 reject 的参数会被 catch 方法的回调函数接收到。

// async 函数的优点
// async 函数对 Generator 函数的改进，体现在以下四点。

// 1. 内置执行器。
// async 函数内置执行器（类似内部已实现我们刚刚的 run(..) 函数），省去了我们手动迭代生成器的麻烦；

// 2. 更好的语义。
// async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。

// 3. 更广的适用性。
// co模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

// 4. 返回值是 Promis**
// async 函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用 then 方法指定下一步的操作。



// async 函数的使用注意点
// 关于 async 函数的使用有三点需要注意一下：

// 1. 前面已经说过，await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try…catch 代码块中。
// 2. 多个 await 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
// 3. await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。


//  getFoo 与 getBar是两个互相独立、互不依赖的异步操作     无继发关系的异步操作应当同步触发
//  错误写法，会导致getBar 在getFoo完成后执行
// let foo = await getFoo();
// let bar = await getBar();

//  正确写法一
// let [foo, bar] = await Promise.all([getFoo(), getBar()])

// 正确写法二
// let fooPromise = getFoo();
// let barPromise = getBar();
// let foo = await fooPromise;
// let bar = await barPromise;

// async function f() {
//     for await (const x of createAsy) {}
// }

//  javascript四种函数形式： 普通函数、async函数、Generator函数和异步Generator函数
//  异步的基础   
// 任何时候，只要把一段代码包装成一个函数，并指定它在响应某个事件（定时器、鼠标点击、 Ajax 响应等）时执行，你就是在代码中创建了一个将来执行的块，也由此在这个程序中引入了异步机制。

//  多个异步之间可能存在以下三种关系
//  1.非交互
//  2.交互
//  3.协作

// 事件循环 (event loop)
// js 的运行环境都提供了一种机制来处理程序中多个块的执行，且执行每块时调用 JavaScript 引擎，这种机制被称为事件循环。

// 主线程从”任务队列”中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。

// JavaScript运行时概念模型

// 栈（Stack）：函数调用形成了一个栈帧。
// 堆（Heap）：对象被分配在一个堆中，一个用以表示一个内存中大的未被组织的区域。
// 队列（Queue）：一个JavaScript运行时包含了一个待处理的消息队列（又称“事件队列”）。每一个消息都与一个函数（称为“回调函数”）相关联。 当栈为空时，从队列中取出一个消息进行处理。这个处理过程包含了调用与这个消息相关联的函数（以及因而创建了一个初始堆栈帧）。当栈再次为空的时候，也就意味着这个消息处理结束，接着可以处理下一个消息了。这就是“事件循环”的过程。


// obj.hasOwnProperty('a')    // 判断是否有这个属性

var obj = {
    a: 1,
    fn: function() {},
    c: {
        d: 5
    }
};

console.log(obj.hasOwnProperty('a'));     // true
console.log(obj.hasOwnProperty('fn'));    // true
console.log(obj.hasOwnProperty('c'));     // true    