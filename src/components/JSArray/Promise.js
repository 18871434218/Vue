/* eslint-disable prefer-promise-reject-errors */
//     1、回调
//        回调是编写和处理JavaScript程序异步逻辑的最常用方式，无论是setTimeout还是ajax,都是以回调的方式把我们打算做的事情在某一时刻执行


// import axios from '../../library/axios'

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
// .then(function(msg) {
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

// var obj = {
//     a: 1,
//     fn: function() {},
//     c: {
//         d: 5
//     }
// };

// console.log(obj.hasOwnProperty('a'));     // true
// console.log(obj.hasOwnProperty('fn'));    // true
// console.log(obj.hasOwnProperty('c'));     // true

// 学习1    await后是一个promise对象，如果是resolve状态，值就是resolve参数。如果是reject状态，会将错误抛出

// resolve
// let p = await Promise.resolve(3)
// console.log(p)   // 3
// reject
// let p = await Promise.reject('error');
// console.log(p)       // 控制台报错

// let p = await 3
// console.log(p)  // 3

// 学习2 使用try catch捕获
// function fn () {
//     // eslint-disable-next-line prefer-promise-reject-errors
//     return Promise.reject('error')
// }

// async function asyncFn () {
//     try {
//         await fn()
//         console.log(1)
//     } catch (e) {
//         console.log(e) // error
//     }
// }

// asyncFn()

// 学习3 使用promise.catch捕获
// function fn () {
//     return Promise.reject('error111')
// }

// async function asyncFn () {
//     await fn().catch(e => console.log(e))
//     // do something
// }

// asyncFn()

// 学习4 使用场景 在业务开发中，我们可能会遇到比如说，你需要等待A接口请求完成后去执行某个操作，如果不使用
// await的话可以直接将操作插入的请求的then链中，对比两种写法
// 1 不使用await
// function http1 () {
//     axios.get('url')
//     .then(r => {
//         diIt()
//     })
//     .catch(e => {
//         console.log(e)
//     })
// }

// function doIt() {
//     // do something
// }

// 使用await
// function http2() {
//     return new Promise((resolve, reject) => {
//         axios.get('url')
//         .then(r => {
//             resolve('success')
//         })
//         .catch(e => {
//             reject('error')
//         })
//     })
// }

// function diIt() {
//     // do something
// }

// async function fn() {
//     let p = await http2()
//     if (p === 'success') {
//         diIt()
//     } else {
//         pass
//     }
// }

// fn()


// const taskgeneration = async (ctx, next) => {
//     const taskId = ctx.request.body.key;        // 任务Id
//     console.log('---Ta', taskId);
//     if (taskId == '') {
//         ctx.body = 'no received field';
//     } else {
//         ctx.body = 'received field';
//         let postkey = { key: taskId }
//         const taskData = await taskInformation(postkey);
//         console.log('data', taskData[0]);
        
//         let task = new TaskObj();
//         for (let mission of response) {
//             if (task.validate(mission)) {
//                 let oneMssion = task.parseInformation(taskData);       // 解析生成字段
//                 // 更新入库
//             }
//         }
//     }
// }


// var data = [
//     {name: "王尼玛", sex:1, age: 30},
//     {name: "王尼美", sex:0, age: 20},
//     {name: "王大锤", sex:1, age: 30}
// ];
// var str_json = JSON.stringify(data);
// console.log(str_json);


// JS中class的使用
// class Person {}
// console.log('--', typeof Person);  // function
// console.log(Person.prototype.constructor === Person);  // true


// 1、用法和使用构造函数一样，通过new来生成对象实例
// class Person {}
// let jon = new Person();
// console.log(jon)


// 2、每个类都必须要有一个constructor,如果没有显示声明，JS引擎会自动给它添加一个空的构造函数：
// class Person {}
// 等同于
// class Person {
//     constructor () {}
// }



// 3、属性和方法   定义于constructor内的属性和方法，即定义在this上，属于实例属性和方法，否则属于原型属性和方法
// class Person {
//     constructor (name) {
//         this.name = name;
//     }
    
//     say () {
//         console.log('hello');
//     }
// }

// let jon = new Person('red');     // Person { name: 'red' }
// console.log('class---', jon);  
// console.log('name---', jon.name);
// console.log(jon.hasOwnProperty("name"));  // true
// console.log(jon.hasOwnPrototype('name'));
// console.log(jon.hasOwnPrototype('say'));


// 3、静态方法
// 不需要通过实例对象，可以直接通过类来调用的方法，其中的this指向类本身
// class Person {
//     static doSay () {
//         this.say()
//     }
//     static say () {
//         console.log('hello')
//     }
// }
// Person.doSay()  // hello


// 4、 静态方法可以被子类继承
// class Sub extends Person {}
// Sub.doSay()  // hello


// 可以通过super对象访问
// class Sub extends Person {
//     static nice () {
//         return super.doSay()
//     }
// }

// Sub.nice()   // hello
// const ws = new WeakSet()
// ws.add(1)
// eslint-disable-next-line symbol-description
// ws.add(Symbol())

// const map = new Map([
//     ['name', '张三'],
//     ['title', 'Author']
// ])

// console.log(map.size)
// console.log(map.has('name'))
// console.log(map.get('name'))
// console.log(map.has('title'))
// console.log(map.get('title'))

// const items = [
//     ['name', '张三'],
//     ['title', 'Author']
// ]
// const map = new Map()

// items.forEach(
//     ([key, value]) => map.set(key, value)
// )

// console.log(map)
// const map = new Map()
// console.log(map
// .set(1, 'aaa')
// .set(1, 'bbb'))
// console.log(map.get(1))

// console.log(map[Symbol.iterator] === map.entries)

// let y = '12'
// console.log(y || 'World')
// function Point (x = 0, y = 0) {
//     this.x = x
//     this.y = y
// }

// const p = new Point()
// console.log(p)

// function foo (x, x, y) {
//     // ...
// }
// console.log(foo);

// function foo (x, x, y = 1) {
//     // ...
// }
// console.log(foo)

// var proxy = new Proxy({}, {
//     get: function (target, propKey) {
//         return 35
//     }
// })

// console.log(proxy.time)
// console.log(proxy.name)
// console.log(proxy.title)

// const promise = new Promise(function(resolve, reject){
//     if(){
//         resolve(value)
//     } else {
//         reject(error)
//     }
// })

// const p1 = new Promise(function (resolve, reject) {
//     setTimeout(() => reject(new Error('fail')), 3000)
// })

// const p2 = new Promise(function (resolve, reject) {
//     setTimeout(() => resolve(p1), 1000)
// })

// p2
// .then(result => console.log(result))
// .catch(error => console.log(error))

// 定义类
// class Point {
//     constructor (x, y) {
//         this.x = x
//         this.y = y
//     }

//     toString () {
//         return '(' + this.x + ',' + this.y + ')'
//     }
// }

// var point = new Point(2, 3)
// console.log(point.toString())

// console.log(point.hasOwnProperty('x'))
// point.hasOwnProperty('y')
// point.hasOwnProperty('toString')
// eslint-disable-next-line no-proto
// console.log(point.__proto__.hasOwnProperty('toString'))

// var p1 = new Point(2, 3)
// var p2 = new Point(3, 2)
// eslint-disable-next-line no-proto
// p1 和 p2都是Point的实例，它们的原型都是Point.prototype,所以__proto__属性是相等的
// 不推荐使用__proto__这个属性为类添加属性方法等
// console.log(p1.__proto__ === p2.__proto__)

// 在类的内部使用get和set关键字，对某个属性设置存值函数和取值函数
// class MyClass {
//     constructor () {
//          this.data = []
//     }

//     get prop () {
//         return 'getter'
//     }

//     set prop (value) {
//         console.log('setter:' + value)
//     }
// }

// let inst = new MyClass()
// inst.prop = 123
// console.log(inst.prop)


// add_line_disable: function() {
//     if (this.is_pose3d_data)
//     return true;
//     if (this.selected_roads == null || this.line_start == null || this.line_end == null)
//         return true;
//     if (this.line_start == this.line_end)
//         return true;
//     let line_exist = this.find_road_line({start: this.line_start + 1,end: this.line_end + 1}).exist;
// return line_exist ? true : false;
// },

// let a = [1, 2, 3]
// a.splice(0)
// console.log(a)
