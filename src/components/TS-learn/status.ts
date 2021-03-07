// interface Bar {};
// const bar = Bar;

import { some } from "xe-utils/methods";


// const foo = 123;
// let bar: foo;


// 1 导出
// const someVar = 123;
// type someType = { type: string, result: string };
// console.log('11', someVar);
// const a: someType = { type: '12', result: '13'};
// console.log('12', a);
// export { someVar, someType }; 

// const someVar = 123
// export default (someVar);
// export default function someFunction() {}
// export default class someClass {}

// 动态导入表达式
// import('moment')
//  .then(moment => {
//      // 懒加载
//      const time = moment().format();
//      console.log(time);

//  })
//  .catch(err => {
//      console.log('Failed to load moment', err);
//  })

// 类型注解
// const num: number = 123;
// function identity(num: number): number {
//     return num;
// }

// 接口
// interface name {
//     first: string;
//     second: string;
// }
// 内联注解
// let name1: {
//     first: string;
//     second: string;
// }
// 特殊类型   any、null、undefined、void

// 泛型----类型安全
// let numArr = [1, 2];
// let reversedNums = numArr.reverse();


// 联合类型---接受字符串或单个字符串的函数
// function formatCommandline(command: string[] | string) {
//     let line = '';
//     if (typeof command === 'string') {
//         line = command.trim();
//     } else {
//         line = command.join(' ').trim(); 
//     }
// }


// 类型别名 type
// type StrOrNum = string | number;
// let sample: StrOrNum;
// sample = 123;
// sample = '123';

// 检查类型
// sample = true;


// @types支持全局和模块类型定义
// import * as $ from 'jquery';

// interface Process {
//     exitWithLogging(code?:number): void;
// }
// declare let process: Process;
// process.exitWithLogging = function() {
//     console.log('exiting');
//     process.exit.apply(process, arguments);
// }

function logName(something: { name: string}) {
    console.log(something.name);
}

const person = { name: 'matt', job: 'being awesome' };
const animal = { name: 'cow', diet: 'vegan, nut has milk of own specie'};
const rondow = { note: `I don't have a name property`};
logName(person);
logName(animal);
// logName(rondow);

