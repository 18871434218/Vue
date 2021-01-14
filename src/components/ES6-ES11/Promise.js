// Promise是一个构造函数，可以使用new关键字生成一个promises实例来使用

// let promise = new Promise((resolve, reject) => {
//     // 做一些异步操作
//     setTimeout(()=>{
//         console.log('success')
//         resolve('promise is success')
//     }, 2000)
// })

// 一个简单的回调方式处理异步操作的结果，但是回调函数被外部的定时器包裹，没办法简单的拿到回调函数的返回值，这也是回调函数最大的缺陷

// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('error')
//         reject('promise is success')
//     }, 2000)
// })

// // promise.then(x => console.log(x))

// promise.catch(x => console.log(x))


// function *f() {
//     yield 1
//     yield 2
// }

// let a = f()
// console.log(a.next())
// console.log(a.next())
// console.log(a.next())
// console.log(a.next())

// for(let x of f()) {
//     console.log(x)
// }
// console.log(typeof null)
// console.log((typeof null === 'object'))
// function test(str, b) {
//     eval(str);

//     console.log(a, b);
// }

// var a = 1;
// test("var a = 3", 2);
// console.log(a);
// with通常被当作重复引用同一个对象中的多个属性的快捷方式
// {
//     function withObj(obj) {
//         with(obj) {
//             a = 2
//         }
//     }

//     let o1 = {
//         a: 1
//     }

//     let o2 = {
//         b: 1
//     }

//     withObj(o1);
//     console.log(o1.a);

//     withObj(o2);
//     console.log(o2.b);
//     console.log(a);
// }

// let ajax = function() {
//     console.log('promise, 执行');
//     return new Promise(function(resolve, reject){
//         setTimeout(function() {
//             resolve();
//         }, 1000);
//     })
// }

// ajax().then(function() {
//     console.log('promise, 执行ajax方法');
// })


// 执行两个Promise的效果
// let ajax = function() {
//     console.log('promise, 执行');
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             resolve()
//         }, 1000)
//     })
// }

// ajax()
// .then(function() {
//     return new Promise(function(resolve, reject){
//         setTimeout(function(){
//             resolve();
//         }, 1000)
//     })
// })
// .then(function(){
//     console.log('promise3, 执行3')
// })

// let ajax = function(num) {
//     console.log('执行4');
//     return new Promise(function(resolve, reject){
//         if (num > 5) {
//             resolve();
//         } else {
//             throw new Error('出错了')
//         }
//     });
// }
// ajax(6).then(function() {
//     console.log('log , 6')
// }).catch(function(err){
//     console.log('catch', err)
// });
// ajax(3).then(function(){
//     console.log('log, 3');
// }).catch(function(err){
//     console.log('catch , err')
// });



