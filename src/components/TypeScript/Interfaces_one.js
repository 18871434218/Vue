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
// function toBoolean(something) {
//     return something;
// }
// toBoolean(1);

// interface Animal {
//     name: string;
// }

// interface Cat {
//     name: String;
//     run(): void;
// }

// const animal: Animal = {
//   name: 'tom'
// }

// let tom = animal as Cat;




