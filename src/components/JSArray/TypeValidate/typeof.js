// 返回对应的基本类型
// console.log(typeof 1) // number
// console.log(typeof '1') // string
// console.log(typeof true) // boolean
// console.log(typeof undefined) // undefined
// console.log(typeof Symbol(1)) // symbol
// console.log(typeof {}) // object

// import { Uniform } from "three";

// console.log(typeof new Function()) // function
// console.log(typeof null) // object

// console.log(typeof []) // object
// console.log(typeof new Date()) // object
// console.log(typeof new RegExp()) // object
// console.log([] instanceof Object) // true
// console.log({} instanceof Array) // false
// function Person () {}
// console.log(typeof new Person()) // object
// console.log(new Person() instanceof Object) // true

// instanceof是用来检测一个实例是否属于某个类
// 可以检测原型链上所有类
// console.log([] instanceof Object) // true
// console.log(new Date() instanceof Object) // true
// function Person() {}
// console.log(new Person() instanceof Person) // true

// 基本类型值（number, string, boolean）转成包装类型才能进行检测
// console.log(1 instanceof Number) // false(转成包装类)
// console.log(new Number(1) instanceof Number) // true
// console.log('1' instanceof String) // false
// console.log(new String('1') instanceof String) // true
// console.log(true instanceof Boolean) // false
// console.log(new Boolean(true) instanceof Boolean) // true

// 没有包装类型的基本类型值（undefined, null, symbUol）无法检测
// console.log(undefined instanceof undefined)
// console.log(undefined instanceof Object)
// console.log(null instanceof Null); // false
// console.log(null instanceof Object) // false
// console.log(Symbol('1') instanceof Symbol) // false
// console.log(Symbol('1') instanceof Object) // false

// constructor构造函数
// 检测其构造函数
// console.log([].constructor === Array) // true
// console.log({}.constructor === Object) // true
// function Person () {}
// console.log(new Person().constructor === Person) // true

// 原型链不会干扰
// console.log([].constructor === Object) // false

// 检测Symbol,因为Symbol本身是一个函数（但是不支持new）
// console.log(Symbol('1').constructor === Symbol) // true

// Object.prototype.toString
// toString()是Object的原型方法，调用该方法，默认返回当前对象的[[Class]]。这是一个内部属性，
// 对于Object对象，直接调用toString()就能返回[object, Object].而对于其他对象，
// 则需要通过call /apply来调用才能返回正确的类型信息

// 可以检测其构造函数
console.log(Object.prototype.toString.call([])) // [object Array]
console.log(Object.prototype.toString.call({})) // [object Object]
function Person () {} // class
console.log(Object.prototype.toString.apply(new Person())) // [object Person]

// 可以检测所有基本类型
// console.log(Object.prototype.toString.apply(undefined))
// console.log(Object.prototype.toString.apply(null))
// console.log(Object.prototype.toString.apply(Symbol(1)))
