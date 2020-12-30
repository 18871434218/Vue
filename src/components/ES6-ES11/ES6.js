
// {
//     let a = 10
//     var b = 1
//     console.log(a)
// }


// console.log(a)
// console.losg(b)

// async function firstAsync() {
//     return Promise.resolve(27)
// }

// firstAsync().then(val => {
//     console.log(val)
// })

// console.log(firstAsync() instanceof Promise)

// async function firstAsync() {
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('now it is done')
//         }, 1000)
//     })

//     promise.then(val => {
//         console.log(val)
//     })

//     console.log(2)
//     return 3
// }


// firstAsync().then(val => {
//     console.log(val)
// })


// 输出为 2 3 now it is done



// async function firstAsync() {
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('now it is done')
//         }, 1000)
//     })

//     let result = await promise;
//     console.log(result);

//     console.log(2)
//     return 3
// }

// firstAsync().then(val => {
//     console.log(val)
// })

// console.log(await 40)
// console.log(await Promise.resolve(40))

// function firstAsync() {
//     return new Promise((resolve, reject) => {
//         const a = 0;
//         if (a) {
//             resolve(1)
//         } else {
//             reject(2)
//         }
//     })
// }

// async function hello () {
//     const res = await firstAsync().catch(err => {
//         console.log('err')
//         console.log(err)
//     })
// }

// if (res) {

// }

// hello()


// let p = new Promise((resolve, reject) => {
//     resolve('success');
//     console.log('after resolve');
//     reject('error');
// });

// p.then(result => {
//     console.log(result);
// })

// p.catch(result => {
//     console.log(result);
// })

// let p = new Promise((resolve, reject) => {
//     let random = Math.random();
//     if (random > 0.4) {
//         resolve('random > 0.4');
//     } else {
//         reject('randow <= 0.4');
//     }
// });

// p.then(result => {
//     console.log('resolve', result);
// }, result => {
//     console.log('reject', result);
// });


// Promise.all([...])传入空数组，它会立即完成，但Promise.race([...])会挂住，且永远不会决议
//

// var p1 = Promise.resolve(42);
// var p2 = Promise.resolve('Hello World');
// var p3 = Promise.reject('Oops');

// 返回第一个快的异步函数
// Promise.race([p1, p2, p3])
// .then(function(msg){
//     console.log(msg);
// });

// Promise.all([p1, p2, p3])
// .catch(function(err) {
//     console.error(err);
// });
// // 返回数组[42, 'Hello World']
// Promise.all([p1, p2])
// .then(function(msgs) {
//     console.log(msgs)
// })

// var p1 = new Promise(function(resolve, reject){
//     reject("Oops");
// });

// p1.catch(result => {
//     console.log(result);
// })

// var p2 = Promise.reject("Oops");
// p2.catch(result => {
//     console.log(result);
// })

// p.then(fulfilled)
// p.then(fulfilled, rejected);
// p.catch(null, reject)
// 
// 


// [1] 分裂值，即把问题分解为两个或更多Promise的信号
// function getB(a) {
//     return new Promise(resolve => {
//         return resolve(a + 1);
//     });
// }

// function foo(a) {
//     return [ Promise.resolve(a), getB(a)];
// }

// Promise.all(foo(1))
// .then(function (msg){
//     console.log(msg[0], msg[1]);
// })


// [2]展开/传递参数，使用apply、或者es6的解构，来把单一值解构
// var p = new Promise(resolve => {
//     return resolve([1, 2])
// })

// 使用apply
// p.then(Function.prototype.apply(function(a, b){
//     console.log(a, b);
// })

// 使用解构
// p.then(function([a, b]){
//     console.log(a, b)
// })

