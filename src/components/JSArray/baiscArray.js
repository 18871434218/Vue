//      1 数组实例的创建
// var arr = []
// var arr = new Array()  // 创建一个空数组
// var arr = new Array(5)  // 创建一个length为5的数组[undefined, undefined, undefined, undefined, undefined]

// var arr = new Array(1,2,3,4,5)   // 创建数组并赋值[1,2,3,4,5]

// var arr = Array.of(7);        // 创建数组并赋值[7]

// var arr = Array.of(1,2,3);    // 创建数组并赋值[1,2,3]


//  2  检测数组  判断一个对象是不是数组
// var arr = []
// var a1 = '2'
// console.log(a1 instanceof Array);  // false
// if(arr instanceof Array){}  // 方法一  true
// if(Object.prototype.toString.call(arr) == '[object Array]'){}   // 方法二  [object  Object]
// if(Array.isArray(arr)){} // 方法三  []
// console.log(Array.isArray(arr))   // [object Number]
// if(arr.constructor == Array){} // 方法四



//   2、数组方法
// Array.from(arrayLike, mapFn, thisArg)     该方法从一个类似数组或可迭代对象创建一个新的数组实例。参数arrayLike是想要转换成真实数组的类数组对象或可遍历对象
//  mapFn是可选参数，如果指定了该参数，则最后生成的数组会经过该函数的加工处理后再返回。thisArg是可选参数，为执行mapFn函数时this的值
// 任何有length属性的对象都可以通过Array.from方法转为数组

// let arrayLike = {
//     0:'a',
//     1:'b',
//     2:'c',
//     length: 3
// }

// let arrayLike2 = {length: 3}
// let str = 'abcd'

// let newArray = Array.from(arrayLike);   // ['a','b','c']
// console.log(newArray);
// console.log(Object.values(arrayLike));  // ['a','b','c',3]
// console.log(Object.keys(arrayLike));    // ['0', '1','2','length']

// let newArray2 = Array.from(arrayLike, (v) => v+'1');   //['a1','b1','c1']
// console.log(newArray2);
// let newArray3 = Array.from(arrayLike2);
// console.log(newArray3);
// let newArray4 = Array.from(str)            // ['a','b','c','d'] 
// console.log(newArray4)

//  Array.of(item...)            用于创建数组实例，用于替代Array()或new Array()
// let ar1 = Array.of(7);
// let ar2 = Array.of(1,2,3);   // [1,2,3]
// console.log(ar2)

// let ar3 = new Array(7);    // [undefined,undefined,undefined,undefined,undefined,undefined,undefined]
// let ar4 = new Array(1,2,3)   
// console.log(ar3);



//    3、 数组实例方法   
//   1.转换方法
// var arr = [1,2,3,4,5]
// let arrt = arr.join('|');   // 1|2|3|4|5
// console.log(arrt);
// let arrt2 = arr.join('');    //12345
// console.log(arrt2);


// 2、栈方法
// arr.push(item...)
// 将一个或多个新元素添加到数组结尾，并返回数组新长度
// let arr1 = [1,2,3];
// let arr2 = [1, 4]
// console.log(arr1.push(arr2));    
// console.log(arr1);        // [1,2,3,[1,4]]  添加素组就把数组作为一个对象

// arr.pop()
// 移除最后一个元素并返回该元素值
// console.log(arr1.pop()); 

// let ResponseRecord = null;
// console.log(ResponseRecord == null ? '暂无数组': ResponseRecord);

// 2 队列方法     arr.unshift(item...)   将一个或多个新元素添加到数组开始，数组中的元素自动后移，返回数组新长度
// let arr1 = [1,2,3];
// console.log(arr1.unshift(1));    // 返回长度1
// console.log(arr1);               // 返回[1,1,2,3]

//  arr.shift()  移除最前一个元素并返回该元素值，数组中元素自动前移。如果这个数组是空的，它会返回undefined. shift通常比pop慢的多
// console.log(arr1.shift());

// 3 重排序方法    arr.reverse()  反转数组的顺序            arr.sort(comparefn)   给数组排序，默认升序     sort默认会将数组内容视为字符串来排序，所以对数字排序默认的排序规则会错的离谱
// 一般我们给sort带入个比较函数来替代原来的默认的比较方法，比较方法接受两个参数，如果两个参数相等则返回0，如果第一个参数应该排在前面则返回一个负数，如果第二个参数应该排在前面则返回一个正数：
// console.log(arr1.reverse());
// let arr4 = [3,1,7,4];
// arr4.sort(function(a, b) {
//     return a - b
// })
// console.log(arr4)

// 操作方法
// arr.concat(item...)    该方法产生一份 arr 的潜复制，并将多个数组（也可以是字符串，或者是数组和字符串的混合）附加在其后连接为一个数组，返回连接好的新的数组。

// arr.slice(start, end)  该方法对数组中的一段做浅复制，首先复制数组 arr[start] 至 arr[end] 的部分，注意不包括 end 对应的元素，如果省略 end 将复制 start 之后的所有元素（或者理解成 end 的默认值为 arr.length）。字符串也有个同名方法 string.slice。

// arr.splice(start, deleteCount, item…)  该方法从 arr 中移除一个或多个元素，并将新的 item 插入至移除元素的开始位置， 参数 start 是移除元素的开始位置，deleteCount 是要移除的元素的个数，item 是要被插入的元素。它返回一个包含被移除元素的数组。

// arr.copyWithin(target, start, end)
// 该方法复制数组的一部分到同一数组中的另一个位置（会覆盖原成员），并返回修改后的数组。使用这个方法，会修改当前数组。参数 target 为开始替换数据的位置，若 target 大于等于 arr.length，将会不发生拷贝。start 是可选参数，为开始读取数据的位置，默认为0。end 是可选参数，为停止读取数据的位置，默认为 arr.length。

// 位置方法
// arr.indexOf(searchElement, start) 
// 该方法返回要查找的项在数组中的位置，如果没找到返回-1，接受两个参数，searchElement是要查找的项，start是查找起始位置的索引，默认是0
// arr.lastIndexOf(searchElement, start)
// 从start位置开始向前查找，start默认值为arr.length - 1

// console.log([1,2,3].includes(2));    // true
// console.log([1,2,3].includes(4));     // false
// console.log([1,2,NaN].includes(NaN));  // true

// 没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值
// if (arr.indexOf(el) !== -1) {
//     // ...
// } 

// 4 迭代方法
//   arr.every(callback, this.Arg)   // 对数组中的每一项运行给定函数，如果该函数对每一项都返回true,则返回true
//   arr.some(callback, thisArg)
//   arr.filter(callback, this.Arg)   // 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组
//   arr.forEach(callback)       // for循环迭代数组一样
//   arr.map(callback)           // 对数组中的每一项运行给定函数，返回每次函数调用组成的数组
//   arr.find(callback, thisArg)    // 该方法对数组所有成员依次执行callback函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined

// console.log([1,4,-5,10].find((v, i, arr) => v < 0));   // find方法的回调函数可以接受三个参数，依次为当前的值，当前的位置和原数组



// 4   arr.entries()     arr.keys()     arr.values()    这三个方法都返回一个新的Array Iterator对象，可以用for.. of循环进行遍历，
//  区别是keys()是对键名的遍历    values()是对键值的遍历，    entries是对键值对的遍历
// for (let index of ['a','b'].keys()) { console.log(index); }      // 0, 1
// for (let ele of ['a','b'].values())  { console.log(ele); }    // 'a','b'
// for (let [index, elem] of ['a','b'].entries()) { console.log(index, elem);}    // 0 'a'   1'b' 

// var arr = ["a","b"]
// var iterator = arr.entries();
// console.log(iterator);    // Array Iterator {}
// console.log(iterator.next().value);  

// 练习操作
// 1、多个一维数组合并
// var arr1 = [1,2]
// var arr2 = [3,4]
// var arr3 = arr1.concat(arr2);   // 合并
// console.log(arr3);

// 2、for循环和Array.prototype.push() 
// function flation(arr1, arr2) {
//     for (var i = 0; i < arr2.length; i++) {
//         arr1.push(arr2[i])
//     }
//     return arr1
// }

// function flation(arr, result) {
//     if (!result) {
//         result = []
//     }
//     for (var i = 0; i < arr.length; i++) {
//         if(arr[i].constructor == Array) {
//             flation(arr[i], result)
//         } else {
//             result.push(arr[i])
//         }
//     }
//     return result
// }

// console.log(flation([[1,2], [3,4,5],[6,7,8,9], [11,12,[12,13,[14]]], 10, 11]))

// 双重循环去重
// function unique(arr) {
//     var result = [arr[0]]
//     for (var i = 1; i < arr.length; i++) {
//         var repeat = false;
//         for (var j = 0; j < result.length; j++) {
//             if (arr[i] == result[j]) {
//                 repeat = true
//                 break;
//             }
//         }
//         if (!repeat) {
//             result.push(arr[i])
//         }
//     }
//     return result
// }

// console.log(unique([1, 2, 3, 4, 3, 2, 'a', 'b', 'a']));

// 方法二  去重
// function unique(arr) {
//     var result = [arr[0]]
//     arr.forEach(function(v) {
//         if (result.indexOf(v) == -1) {       // 这里indexof()也可替换为es7的includes()
//             result.push(v);
//         }
//     })
//     return result
// }

// function unique(arr) {
//     var result = [arr[0]]
//     arr.forEach(function(v) {
//         if (!result.includes(v)) {       // 这里indexof()也可替换为es7的includes()
//             result.push(v);
//         }
//     })
//     return result
// }

// console.log(unique([1, 2, 3, 4, 3, 2,'a','b','a']));

// 5 排序遍历去重
// function unique(arr) {
//     arr.sort();
//     var result = []
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i] !== result[result.length - 1]) {
//             result.push(arr[i])
//         }
//     }
//     return result
// }

// console.log(unique([1, 2, 3, 4, 3, 2,'a','b','a']));



//   ES6之前有5种简单数据类型： Undefined、Null、Boolean、Number和String、复杂数据类型Object,
//   ES6引入了一种新的原始数据类型Symbol,也是基本数据类型
//   基本类型的变量是存放在栈内存（Stack）里的     栈内存中包含变量的标识符和变量的值        
//   引用类型的值失败保存在堆内存（Heap）中的对象（Object）,javascript不能直接操作对象的内存空间（堆空间）

//   栈内存中保存了变量标识符和指向堆内存中该对象的指针
//   堆内存中保存了对象的内容


//   3 检测变量类型  typeof,toString,instanceof
// var a = []
// console.log(Object.prototype.toString.call(a))  // [object Array]

// console.log(Object.prototype.toString.call(undefined))  // [object Undefined] 
// console.log(Object.prototype.toString.call(null))   // [object Null]


//  常用的本地对象      Object   Function   Boolean   Symbol   Array   Number   Data  String 
//   RegExp   Map   Set  WeakMap   WeakSet   Promise   Generator  Reflect  Proxy  Error


//   内置对象 由ECMAScript实现提供的，独立于宿主环境的所有对象，在ECMAScript程序开始执行时出现         Global   Math


// 宿主对象       所有非本地对象都是宿主对象，即由ECAMScript实现的宿主环境提供的对象
// .BOM对象       window  location   navigator   screen   history
// .DOM对象       Document     Body    Event    Form   Image   事件对象event

// 创建对象    使用Object构造函数创建

//  var obj = new Object()          //  对象实例的创建
//  obj.key = 'value'               //  使用构造函数创建一个空对象，并赋值 

//  var obj = {                   // 字面量表示法创建
//      key1: 'value1',
//      key2: 'value2'
//  }
//  console.log(obj);
// 总结   字面量表示与Object构造函数创建法唯一的区别的是，在字面量表示法里你可以给对象添加多个 键/值 对，但是在构造形式中你必须逐个添加属性


// ES6标准
// var age = 20
// var sex = "sexy"

// var a = {
//     name: 'jack',
//     // 简洁表示法，等同于age:age
//     age,
//     // 简洁表示法，等同于sayName:function() {}
//     sayName() {},
    
//     // 属性名表达式，等同于lover: 'rose'
//     ['lo' + 'ver']: 'rose',

//     //  属性名表达式，等同于sexy: 'male'
//     [sex]: 'male'
    
// }



//   工厂模式    即用函数来封装创建对象的细节。多次调用该函数来创建多个相似对象
// function createPerson(name, age) {
//     var o = {}
//     o.name = name
//     o.age = age
//     o.sayName = function() { console.log(this) }
//     return o
// }

// var a = createPerson('a', 20)      //  { name:'a',age:20,sayName:[function]}
// var b = createPerson('b', 22)      // { name:'b',age:22, sayName:[function]}


//   构造函数模式
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
//     this.sayName = function() { alert(this.age) }
// }

// var a = new Person('a', 20)         //  Person {name:'a', age: 20, sayName:[Function]}
// var b = new Person('b', 22)

// console.log(a instanceof Person)  // true

//  构造函数与其他函数唯一的区别就在于调用他们的方式不一样，任何函数只要通过new操作符来调用，那它就可以作为构造函数



// function Person() {}

// Person.prototype = {
//     name: 'h',
//     sayName: function() {
//         console.log(this.name)
//     }
// }

// var a = new Person()
// console.log(a.sayName())    // h


// class Foo {
//     constructor(name) {
//         this.name = name
//     }

//     sayName() {
//         console.log(this.name)
//     }
// }

// var a = new Foo('a')
// console.log(a.sayName())



//   Object.assign(target,...source)      该方法用于对象的合并，将源对象(source)的所有可枚举属性，复制到目标对象（target）
// Object.assign 方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
// Object.assign 会跳过那些值为 null 或 undefined 的源对象


// Object.is(value1, value2)          该方法用于来确定两个值是否是相同的值
// 两个值都是 undefined
// 两个值都是 null
// 两个值都是 true 或者都是 false
// 两个值是由相同个数的字符按照相同的顺序组成的字符串
// 两个值指向同一个对象
// 两个值都是数字并且
// 都是正零 +0
// 都是负零 -0
// 都是 NaN
// 都是除零和 NaN 外的其它同一个数字

// console.log(Object.is(0,0));


//    函数模块
//    1 函数声明与函数表达式
// var foo = function() {}

// // 2、函数表达式
// (function(){})

// // 3、函数表达式                                           
// setTimeout(function timer(){...}, 2000)

// // 4、函数声明
// function() {...}


//  上面代码中三个函数表达式(头两个是命名函数表达式，第三个是匿名函数表达式)，一个函数声明
//  函数表达式与函数声明的区别：



// 箭头函数    箭头函数是ES6中新增的特性，箭头函数是使用箭头（=>）定义函数的新语法，但是它与传统的JavaScript函数有些许的不同，主要集中在以下几个方面

// const arr1 = [4,5,6,1,2,3]
// const result = arr1.sort((a, b) => a - b )
// console.log(result);


// function sum (n1, n2) {
//     return n1 + n2
// }
// console.log(sum.length)   // length属性表示函数希望接收的命名参数的个数


//  注意的是，length统计的是函数命名参数的数量，不定参数的加入不会影响length属性的值

// function sum (n1, n2, ...reset) {
//     return n1 + n2 + reset.reduce((prev, next) => prev + next)
// }
// console.log(sum.length)  //2

// function foo() {}
// console.log(foo.bind({}).name)   //  Function.bind()所创建的函数将会在函数的名称前加上“bound”


//  apply() call() 函数

// 三个典型的闭包函数
// function foo() {
//     var id = 'b'
//     console.log(id);
// }

// function bar() {
//     var id = 'a'
//     document.getElementById('my-btn').onclick = function handle() {
//         console.log(id);
//     }
// }

// foo()
// bar()


//  像在函数执行完毕后仍能保持对函数内部作用域的引用的行为，就是闭包
// function foo() {
//     var id = 'tumars'
//     return function bar() {
//         console.log(id);
//     }
// }

// var baz = foo()

// baz()   //  

// for (var i = 1; i <= 3; i++) {
//     console.log('i:'+i)
//     setTimeout(()=>console.log(i), i*1000)
// }

// for (var i = 1; i <= 3; i++) {
//     (function(j) {
//         setTimeout(()=>console.log(j), j*1000)
//     })(i)
// }

// for (var i = 1; i <= 3; i++){
//     let j = i;
//     setTimeout(()=>console.log(j), j*1000)
// }

// arr = [1,2,3]
// for (const item of arr){
//     console.log(item)
// }

// requestAnimationFrame   的出现就是为了代替setTimeout去制作动画的，也尽可能不要使用setInterval,如果必须要用setInterval,也一定要加上clearInterval去清除，否则很容易出现一些不可预料的情况





// setTimeout(()=>{console.log("1")}, 3000);   
// console.log("2");

// setTimeout(()=>{console.log("1")}, 3000);
// sleep(100000);                // 这个函数需要好久才能执行完毕

// const p = new Promise(function(resolve, reject){
//     console.log('promise1');
//     resolve()
//     console.log('promise1 end')
// }).then(function () {
//     console.log('promise2')
// })

// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise(function(resolve, reject){
//     setTimeout(resolve, 100, 'foo');
// });

// Promise.all([promise1, promise2, promise3]).then(function(values){
//     console.log(values);
// });

// const promise1 = Promise.resolve(3)
// const promise2 = 42
// const promise3 = new Promise( function (resolve, reject){
//     setTimeout( resolve, 100, 'foo');
// });

// function myAll(promiseList) {
//     return new Promise((resolve, reject) => {
//         let count = 0;
//         const promiseCount = promiseList.length;
//         const resultList = Array(promiseCount);
//         promiseList.forEach((promise, key) => {
//             Promise.resolve(promise).then((data) => {
//                 count += 1;
//                 resultList[key] = data;

//                 if (count == promiseCount) {
//                     resolve(resultList);
//                 }
//             }, (reason) => {
//                 return reject(reason)
//             });
//         });
//     });
// }

// myAll([promise1, promise2, promise3]).then( function (values){
//     console.log(values);
// }, function (err){
//     console.log(err);
// });
// 本质上Promise.all的原理就是将传入的数组全部执行，并且将所有传入的Promise的resolve结果保存在一个与之传入顺序对应的数组当中，并每次有Promise触发resolve检查是否已经是最后一个，当检查到最后一个时候，触发resolve将返回结果数组返回。


// const promise1 = new Promise(function(resolve, reject){
//     setTimeout(resolve, 500, 'one');
// });

// const promise2 = new Promise(function(resolve, reject){
//     setTimeout(resolve, 100, 'two');
// });

// Promise.race([promise1, promise2]).then(function(value){
//     console.log(value);
// })

// const promise1 = new Promise(function(resolve, reject){
//     setTimeout(resolve, 500, 'one');
// });

// const promise2 = new Promise(function(resolve, reject){
//     setTimeout(resolve, 100, 'two');
// });

// function myRace(promiseList) {
//     return new Promise((resolve, reject) => {
//         promiseList.forEach(promise => {
//             promise.then(resolve, reject);
//         })
//     });
// }

// myRace([promise1, promise2]).then(function(values){
//     console.log(values);
// }, function(err){
//     console.log(err);
// });


// const p = new Promise((resolve, reject) => {
//     console.log('starting...');

//     setTimeout(() => {
//         resolve('success');
//     }, 1000);
// });

// p.then((data) => {
//     console.log(`%c resolve: ${data}`, 'color: green')
// })
//   .catch((err) => {
//       console.log(`%c catch: ${err}`, `color: red`)
//   })
//   .finally(()=>{
//       console.info('finally: completed');
//   })


// Promise.prototype.finally = function(callback) {
//     const constructor = this.constructor;
//     return this.then(
//         (data) => {
//             return constructor.resolve(callback()).then((data) => {
//                 return data;
//             })
//         },
//         (err) => {
//             return constructor.resolve(callback()).then(() => {
//                 throw err
//             })
//         }
//     )
// }


// 迭代生成器
// const makeIterator = arr => {
//     let nextIndex = 0;
//     return {
//         next: () => {
//             nextIndex < arr.length
//             ? { value: arr[nextIndex++], done: false }
//             : { value: undefined, done: true },
//         };
//     };
// const it = makeIterator(['Hello', 'world']);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

// 迭代生成器
// const makeIterator = (arr) => {
//     let nextIndex = 0;
//     return {
//       next: () =>
//         nextIndex < arr.length
//           ? { value: arr[nextIndex++], done: false }
//           : { value: undefined, done: true },
//     };
//   };
//   const it = makeIterator(['Hello', 'world']);
//   console.log(it.next()); // { value: "Hello", done: false }
//   console.log(it.next()); // { value: "world", done: false }
//   console.log(it.next()); // {value: undefined, done: true }

// const array = [1, 2];
// console.log(array[Symbol.iterator])
// for (let item of array) {
//     console.log(item);
// }

// const set = new Set([1, 2]);
// console.log(set[Symbol.iterator])
// for (let item of set) {
//     console.log(item);
// }

// 报错
// const map = new Map({a:1, b: 2});
// console.log(map[Symbol.iterator])
// for (let item of map) {
//     console.log(item);
// }

// 报错
// const object = { a:1, b: 2};
// console.log(object[Symbol.iterator])
// for (let item of object) {
//     console.log(item)
// }


// console.log(window.location.hostname)
// console.log(Window.Location);

// console.log(Math.random().toString())
// console.log(parseInt("11", 16))         // parseInt()函数可解析一个字符串，从位置0开始查看每个字符，直到找到第一个非有效的字符为止，最后并返回一个整数
// console.log(parseFloat("112345red"))     // 112345

// Number()函数的强制类型转换与parseInt()和parseFloat()方法的处理方式相似，只是它转换的是整个值，而不是部分值

// console.log(Number("1.2.3"))     // NaN
// console.log("1.2")

// const s = "234";
// console.log(+s);

//  string转Object
// let jsonString = '{"name":"树酱"}';
// console.log(JSON.parse(jsonString.toString()));

// String转Object(Array数组类型)
// var s = "tree";
// s1 = s.split('');
// console.log(s1)

// console.log(0.1 + 0.2 == 0.3);  // false

// const a = 0.1 + 0.2, b = 0.3;
// function numbersequal(a, b) {
//     return Math.abs(a-b) < Number.EPSILON;
// }
// console.log(numbersequal(a,b));
// console.log(Number.EPSILON)

// const number = new Number(10);
// let a = number.toString();    // ‘10’
// let b = number.toString(2);   // 二进制：1010  
// console.log(a);
// console.log(b);

// 在数字后面加了空字符串，这个数值就变成了string类型
// const s = 234;
// console.log(s +'');

// number类型转Boolean,除了0数值和NaN对应的是false,其他数值都对应true
// console.log(new Boolean(0))         // false
// console.log(new Boolean(111))       // true

// undefined          // false
// null               // false
// false              // false
// 0                  // false
// NaN                // false  

// console.log(new Boolean(NaN))

// 内置对象   宿主对象

// nulll数据类型也是object
// console.log(typeof null)

// const obj = new Object();
// obj.toString();
// console.log(obj.toString());

// const toString = Object.prototype.toString;
// toString.call(new Date);
// toString.call(new String);  
// toString.call(Math);
// toString.call(undefined);
// toString.call(null);
// console.log(Object.prototype.toString.call(Date()))            // 作为函数
// console.log(Object.prototype.toString.call(new Date()))        // 作为对象



// Object转为String
// const obj = {
//     id: 'tree',
//     name: '树酱',
// }
// console.log(obj);                                  // 对象   { id: 'tree', name: '树酱' }
// const objToString = JSON.stringify(obj)            //  字符  {"id":"tree","name":"树酱"}
// console.log(objToString);

// Object对象转Object数组
// let obj = {
//     name: 'tree',
//     zhName: '树酱'
// }
// let arr = Object.keys(obj);             // ['name', 'zhName']
// console.log(arr)
// let arr1 = Object.values(obj);          // ['tree', '树酱']
// console.log(arr1)
// let arr2 = Object.entries(obj);         // [[ 'name', 'tree' ], [ 'zhName', '树酱' ]]
// console.log(arr2)

// const date = new Date();   
// console.log(date);

// console.log(Number(date))         
// console.log(date.getTime())   

// const a = [1,2,3,4]
// const b = a.join("-");
// console.log(b);

//  Undefined和Null
//  两者都是javaScript语言用来表示“无”的值，且两者有共同点也有不同点。
//  
// console.log(typeof null)
// console.log(Number(null))  
// console.log(Number(undefined))   

// const fun = (a = 1, b) => {
//     console.log(a + b)
// }

// fun(2);                   // NaN   等价于：2 + undefined
 
// fun(null, 2);             // 2  等价于：Number(null) + 2 

// fun(undefined, 2);        // 3  等价于：1 + 2 = 3 
// undefined无法转为数字,第一个调用返回NaN.
// 第二个是null转为隐式转换为0所以是2 ，
// 第三个是如果传入的参数是undefined会以默认值为准，所以是3

// let s = Symbol('是我树酱');
// let s1 = Symbol('是我树酱');
// console.log(s === s1)s

// console.log(typeof Symbol('tree'))
// console.log(typeof String(Symbol('tree')));
// console.log(Symbol('tree').toString());

// console.log(Symbol('tree') + '树酱');   // 不能转换
// console.log(Symbol('tree') + 1);        // 不能转换
// console.log(Number(Symbol()));          // 不能转换

//  类型判断方法
// 在类型识别中，如果使用typeof来判断数据类型，只能区分基本类型，即
// number、string、undefined、boolean、object、function、symbol
// function getType(obj) {
//     return Object.prototype.toString.call(obj).slice(8, -1);
// }

// const a = 1;
// console.log(Object.prototype.toString(a));   // [object Object]
// console.log(Object.prototype.toString.call(a))   // [object Number]

// const a = [];
// a[3] = { "index": 3, "isFull": 0, "enterNode": 0, "leaveNode": 0 };
// console.log(a);
// console.log('111', a[0]);

// for (let name of a) {
//     if (name !== undefined) {
//         console.log(name);
//     }
// }




