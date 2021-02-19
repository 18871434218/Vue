// let hello: string = 'Hello world';
// console.log(hello);
// import { Col } from "element-ui";
// let name1: string = 'num';
// let words: string = `${name1}`;
// let flag: boolean = true;
// 数组声明
// let arr: number[] = [1, 2];
// 或者使用数组泛型
// let arr1: Array<number> = [1, 2];
// 元组,元组类型用来表示已知元素数量和类型的数组，各元素的类型必不相同，对应位置的类型需要相同
// let x: [string, number];
// x = ['niii', 1];
// x = [1, '111'];
// 枚举   枚举类型用于定义数值集合
// enum Color { Red, Green, Blue };
// let c: Color = Color.Blue;
// console.log(c);  // 输出2
// void 标识方法返回值的类型,表示该方法没有返回值
// function hello1(): void {
//     alert("Hello Runood");
// }
// null 表示对象值缺失
// undefined 用于初始化变量为一个未定义的值
// never never是其他类型(null|undefined)的子类型,代表从不会出现的值
// console.log(typeof null); // 返回object
// const getValue = () => {
//     return 0;
// }
// enum List {
//     A = getValue(),
//     B = 2,
//     C
// }
// console.log(List.A);
// console.log(List.B);
// console.log(List.C);
// 声明变量的类型，但没有初始值, 变量值会设置为undefined
// var uname: string;
// 第一重点： 类型断言(Type Assertion) 
// 类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型
// TypeScrpt有以下几种作用域
// 全局作用域-全局变量定义在程序结构的外部，它可以在代码的任何位置使用
// 类型作用域-这个变量也可以称为 字段。类变量声明在一个类里头，但在类的方法外面。 该变量可以通过类的对象来访问。类变量也可以是静态的，静态的变量可以通过类名直接访问。
// 局部作用域-局部变量,局部变量只能在声明它的一个代码块中使用
// TypeScript for ... of 循环
// let someArray = [1, 'string', false];
// for (let entry of someArray) {
//     console.log(entry);
// }
// forEach在iteration中无法返回, 所以可以使用every 和 some来取代forEach
// let list = [4, 5, 6];
// list.forEach((val, idx, array) => {
//     console.log(val, idx, array);        // 4  0  array代表[4,5,6]
// })
// let list = [4, 5, 6];
// list.every((val, idx, array) => {
//     console.log(val, idx, array);  
//     return false;  // 代表迭代停止  Return false will quit the iteration
// })
// 可选参数和默认参数
// 在Typescipt函数中，如果我们定义了参数，则我们必须传入这些参数，除非这些参数设置为可选，可选参数使用问号标识？
// 注意：：：参数不能同时设置为可选和默认值
// 同理： 设置了默认值-----表示该参数是可选的
// function buildName(firstName: string = 'nishi', lastName?: string) {
//     if (lastName) 
//         return firstName + "" + lastName;
//     else 
//         return firstName;
// }
// let result1 = buildName('Bob');
// console.log(result1);
// let result2 = buildName('Bob', 'Adams');
// console.log(result2);
// function calculate_discount(price:number, rate:number = 0.5) {
//     var discount = price * rate;
//     console.log('计算结果:', discount);
// }
// calculate_discount(1000);
// calculate_discount(1000, 0.3);
// 一、重点 ： 剩余参数
//  不带参数匿名函数
// var msg = function() {
//     return "hello worrld";
// }
// console.log(msg());
// 二、重点： 匿名函数自调用   在函数后使用()即可
// (function () {
//     var x = 'hello!!';
//     console.log(x);
// })()
// 三、构造函数----高级用法
// TypeScript也支持使用Javascript内置的构造函数Function()来定义函数
// var myFunction = new Function("a", "b", "c", "return a * b * c");
// var x = myFunction(4, 3, 2);
// console.log(x);  // 4 * 3 * 2 = 24
// 递归函数----------即在函数内调用函数本身  业务常用(尝试用)
// 箭头函数    
// var num = new Number(10);
// console.log(num.valueOf());
// var str1 = new String("this is string one and again string");
// var index = str1.lastIndexOf("string");
// console.log('---', index);
// 四、重点——类定义、构造函数、类继承
// class Shape {
//     Area: number
//     constructor(a: number) {
//         this.Area = a;
//     }
// }
// class Circle extends Shape {
//     disp(): void {
//         console.log('圆的面积：'+ this.Area);
//     }
// }
// 注意：子类只能继承一个父类，TypeScript不支持继承多个类，但支持多重继承
// class Root {
//     str: string;
// }
// class Child extends Root {}
// class Leaf extends Child {}  // 多重继承，继承Child和Root类
// var obj = new Leaf();
// obj.str = "Hello";
// console.log(obj.str);
// 继承类的方法重写
// 类继承后，子类可以对父类的方法重新定义，其中super关键字是对父类的直接引用，该关键字可以引用父类的属性和方法
// class PrinterClass {
//     doPrint(): void {
//         console.log('父类的doPoint()方法');
//     }
// }
// class StringPrinter extends PrinterClass {
//     doPrint(): void {
//         super.doPrint();
//         console.log('子类的doPint()方法');
//     }
// }
// var objj = new StringPrinter();
// objj.doPrint();
// // static 关键字用于定义类的数据成员（属性和方法）为静态的，静态成员可以通过类名调用
// class StaticMen {
//     static num: number;
//     static disp(): void {
//         console.log('num值', StaticMen.num);
//     }
// }
// StaticMen.num = 12;  
// StaticMen.disp();
// instanceof 运算符用于判断对象是否指定的类型，如果返回true否则返回false;
// class Person {}
// var obj = new Person();
// var isPerson = obj instanceof Person;
// console.log();
// TypeScript,可以使用
// declare const myPoint: { x: number; y: number }
// let name1: string = `Gene`;
// let age: number = 37;
// let sentence: string = `Hello, my name is $ { name1 } .
// I'll be $ { age + 1 } years old next month. `;
// console.log(sentence);
// let x: [string, number];
// x = ['hello', 10];
// console.log(x[0].substr(1));
// x[3] = 'world';
// enum Color { Red = 4, Green = 2, Blue = 1 }
// // let c: Color = Color.Green; 
// // console.log(c);
// let colorName: string = Color[4];
// console.log(colorName);
// let notSure: any = 4;
// notSure.ifitExists();
// notSure.toFixed();
// let prettySure: Object = 4;
// prettySure.tofixed();
// function printLabel(labelledObj: { label: string}) {
//     console.log(labelledObj.label);
// }
// let myObj = { size: 10, label: "Size 10 Object" };
// printLabel(myObj);
// interface Point {
//     readonly x: number;
//     readonly y: number;
// }
// let a: number[] = [1, 2, 3, 4];
// let ro: ReadonlyArray<number> = a;
// console.log(ro[0]);
// a = ro as Array<number>;
// console.log(a);
// let b: "male" | "female";
//  b = "male"
// console.log(b);
// let s: string;
// s = b as string;
// function fn2(): never {
// }
// let d: (a: number, b: number) => number;
var value = null;
var a = value ? value : null;
console.log(a);
