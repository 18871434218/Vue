// interface Person {
//     name: string;
//     age?: number;   // 可选属性，表示该属性可以不存在
// }

// import { type } from "os";
// import { ShadowMaterial } from "three";

// let tom: Person = {
//     name: 'Tom',
//     age: 25
// }

// let ros: Person = {
//     name: 'Tom'
// }


// //   允许任意属性
// interface Person {
//     name: string;
//     age?:number;
//     [propName: string]: any;    // 任意属性
// }

// //  一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
// interface PersonGirl {
//     name: string;
//     age?: number;
//     [propName: string]: any;
// }


// // 类型+方括号来表示数组
// let finbona: number[] = [1,2,3,3];

// let fibonacci: Array<number> = [1, 1, 2, 3, 5];   // 数组泛型

// interface NumberArray {
//     [index: number]:number;
// }

// let finbnacci: NumberArray = [1,1,2,3,5]

// // 类数组
// function sum1() {
//     let args: number[] = arguments;
// }

// function sum() {
//     let args: {
//         [index: number]: number;
//         length: number;
//         callee: Function;
//     } = arguments;
// }

// function sum2() {
//     let args: IArguments = arguments;
// }

// // interface IArguments {
// //     [index: number]: any;
// //     l
// // }

// // 函数声明
// function sum3(x, y) {
//     return x + y;
// }

// let mySum = function (x, y) {
//     return x + y;
// }

// function sum4(x: number, y: number): number {
//     return x + y;
// }

// sum4(1,2);

// // 可选参数           注意：可选参数必须接在必须参数后面
// function buildName1(firstName: string, lastName?: string) {
//     if (lastName) {
//         return firstName + ' ' + lastName;
//     } else {
//         return firstName;
//     }
// }

// TypeScript会将添加了默认值的参数识别为可选参数
// function buildName(firstName: string, lastName: string = 'Cat') {
//     return firstName + ' ' + lastName;
// }

// let tomcat = buildName('Tom', 'Cat');
// let tom = buildName('Tom');


// function fg(firstName: string, lastName: string = 'Cat') {
//     return firstName + ' ' + lastName;
// }

// let tomcat11 = fg('Tom', 'Cat');
// let tom11 = fg(undefined, 'Tom');

// function reverse1(x: number | string): number | string {
//     if (typeof x === 'number') {
//         return Number(x.toString().split('').reverse().join(''));
//     } else if (typeof x === 'string') {
//         return x.split('').reverse().join('');
//     }
// }

// function reverse(x: number): number;
// function reverse(x: string): string;
// function reverse(x: number | string): number | string {
//     if (typeof x === 'number') {
//         return Number(x.toString().split('').reverse().join(''));
//     } else if (typeof x === 'string') {
//         return x.split('').reverse().join('');
//     }
// }


// 类型断言
// 语法            值 as 类型        或者                 <类型> 值
// function getCacheData(key: string): any {
//     return (window as any).cache[key];
// }

// interface Cat {
//     run(): void;
// }

// interface Fish {
//     swim(): void;
// }

// function testCat(cat: Cat) {
//     return (cat as any as Fish)
// }

// function toBoolean(something: any): boolean {
//     return something as boolean;
// }

// toBoolean(1);

// 类型断言  vs    泛型
// function getCacheData(key: string): any {
//     return (window as any).cache[key];
// }

// interface Cat {
//     name: string;
//     run(): void;
// }

// const tom = getCacheData('tom') as Cat;
// tom.run();

// // 第三种方式可以解决
// function getCacheData<T>(key: string): T {
//     return (window as any).cache[key]
// }

// interface Cat {
//     name: string;
//     run(): void;
// }

// const tom  = getCacheData<Cat>('tom');
// tom.run();

// declare var   // 声明全局变量
// declare function  // 全局方法
// declare class    // 声明全局类
// declare enum     // 声明全局枚举类型
// declare namespace   // 声明全局类型
// interface 和 type   // 声明全局类型
// export 导出变量
// export default   ES6默认导出
// export = commonjs 导出模块
// export as namespace UMD库声明全局变量
// declare global  扩展全局变量
// declare module  扩展模块



//  声明文件必需以 .d.ts  为后缀

// 存储器(getter & setter)
// 修饰符(Modifiers):修饰符是一些关键字

// class Cat extends Animals {
//     constructor(name) {
//         super(name);           // 调用父类的constructor(name)
//         console.log(this.name);
//     }

//     sayHi() {
//         return 'Meow, ' + super.sayHi();   // 调用父类的sayHi()
//     }
// }

// class Animal {
//     static isAnimal(a) {
//         return a instanceof Animal;
//     }
// }

// let a = new Animal('Jack');
// Animal.isAnimal(a);

// ES6中实例的属性只能通过构造函数中

// 一个类实现多个接口
// interface Alarm {
//     alert(): void;
// }

// interface Light {
//     lightOn(): void;
//     lightOff(): void;
// }

// class Car implements Alarm, Light {
//     alert() {
//         console.log('Car alert');
//     }

//     lightOn() {
//         console.log('Car light on');
//     }

//     lightOff() {
//         console.log('Car light off');
//     }
// }


// // 接口继承类
// class Point {
//     x: number;
//     y: number;
//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }
// }

// interface Point3d extends Point {
//     z: number;
// }

// let point3d: Point3d = { x: 1, y: 2, z: 3};





