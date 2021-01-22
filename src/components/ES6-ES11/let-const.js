// for (let i = 0; i < 10; i++) {
//     console.log(i)
// }
// 打印  0 1 2 3 4 5 6 7 8 9

// var a = []
// for (var i = 0; i < 10; i++) {
//     console.log(i)
//     a[i] = function () {
//         console.log(i)
//     }
// }

// console.log('---', i)  // 10求解
// a[6]()

// console.log(foo)
// var foo = 2

// console.log(bar)
// let bar = 2

// 存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。
// var tmp = 123

// if (true) {
//     tmp = 'abc'
//     let tmp
// }

// function bar (x = y, y = 2) {
//     return [x, y]
// }
// bar()

// function bar1 (x = 2, y = x) {
//     return [x, y]
// }
// console.log(bar1())

// var x = x;

// let x = x;

// function f () { console.log('I am outside!') }

// (function () {
//     if (false) {
//         function f () { console.log(' I am inside ') }
//     }

//     f()
// }())

// const foo = {}
// foo.prop = 123
// console.log(foo.prop)

// foo = {}

// const foo = Object.freeze({})
// foo.prop = 123
// console.log(foo.prop)
// const flag = true
// if (flag) {
    // console.log(MAX)  存在暂时性死区，只能在声明的位置后面使用
//     const MAX = 5
//     console.log(MAX)
// }

// const  变量指向的内存地址所保存的数据不得改动
// 简单类型的数据（数值，字符串，布尔值），值就保存在变量指向的那个内存地址，因此等同于常量，
// 对于复合数据类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址）

// 1.对象冻结    使用Object.freeze()方法
// const foo = Object.freeze({})
// foo.prop = 123
// console.log(foo.prop)                   // 对象冻结了，此时输出为undefined
// console.log(foo)             输出为{}

// 2、对象属性彻底冻结
// var constantize = (obj) => {
//     Object.freeze(obj)
//     Object.keys(obj).forEach((key, i) => {
//         if (typeof obj[key] === 'object') {
//             constantize(obj[key])
//         }
//     })
// }

// console.log(constantize)

// ES6声明变量的六种方法
//  var、function、let、const、import、class
//
// window.a = 1               // 在浏览器中运行没问题，  现在是在node.js环境中运行浏览器的代码， 会报错，window没被定义
// console.log(a)

// a = 2
// console.log(window.a)

// var a = 1
// console.log(window.a)

// let b = 1
// console.log(window.b)

// 顶级对象在各种实现里面是不统一的，
// 浏览器里面-------顶级对象为window,但node和web worker没有window
// 浏览器和web worker里面，self也指向顶级对象，但是Node没有self
// Node里面，顶级对象是global,但其他环境都不支持。

// let a = 1
// console.log(global)
// console.log(this)

// var getGlobal = function () {
//     if (typeof self !== 'undefined') { return self }
//     if (typeof window !== 'undefined') { return window }
//     if (typeof global !== 'undefined') { return global }
//     throw new Error('unable to locate global object')
// }


// let [a, b, c] = [1, 2, 3]
// console.log(a);

// let [head, ...tail] = [1, 2 ,3 , 4];
// console.log(tail)  // tail打印2，3，4

// let [x, y, ...z] = ['a'];
// console.log(z);

// let [foo] = 1;  // iterable
// console.log(foo);

// function* fibs() {
//     let a = 0;
//     let b = 1;
//     while (true) {
//         yield a;
//         [a, b] = [ b, a+b ];
//     }
// }

// let [first, second, third, fourth, fifth, sixth] = fibs();
// console.log(fifth)

// let [x = 1] = [null]
// console.log(x)  // 此时为null,默认值不生效

// let [x=1] = [undefined]
// console.log(x) // 此时为1，默认值生效

// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象，由于undefined和null无法转为对象，


// includes() 返回布尔值，表示是否找到了参数字符串
// startWiths(): 返回布尔值，表示参数字符串是否在原字符串的头部
// endswith(): 返回布尔值，表示参数字符串是否在原字符串的尾部

// let s = 'Hello world!';
// console.log(s.startsWith('Hello'))
// console.log(s.endsWith('!'))
// console.log(s.includes('o'))


// repeat()方法返回一个新字符串，表示将原字符串重复n次


// console.log('x'.repeat(0));

// console.log('x'.padStart(5, 'ab'));

// async function firstAsync() {
//     return 27
// }


// Map映射  Set集合  弱集合WeakSet   弱映射WeakMap

// let set = new Set([1,2,3,3])
// console.log(set)
// console.log([...set])

// let map = new Map([
//     ['a', '1'],
//     ['b', '2']
// ])

// console.log(map)


// let m = new Map()
// let o = { p: 'Hello World' }

// m.set(o, 'content')
// console.log(m.get(o))

// console.log(m.has(o))
// console.log(m.delete(o))
// console.log(m.has(o))

// let set = new Set()
// let a = NaN
// let b = NaN
// let c = {}
// let d = {}
// set.add(a).add(b).add(c).add(d)
// console.log(set)
// console.log(set.size)

// let { firstName: name, lastName} = { firstName: "John", lastName: "Doe" }
// // console.log(name)
// console.log(lastName)
// console.log(firstName)
// let a = [2,3];
// console.log(a.splice(0, a.length));
// console.log(a);

// var map = new Map()
// console.log(map);
// let a = [1, 2, 3, 3, 4, 5, 5, 6, 7, 7];
// for (let i=0; i < a.length; i++) {
//     map.set(a[i], a[i]);
// }

// console.log(Array.from(map.values()));
// map.clear()
// console.log(map);

// const a = null;
// console.log(a);
