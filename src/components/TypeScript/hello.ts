function sayHello(person: string) {
    return 'Hello:' + person;
}

let user = 'Tom';
console.log(sayHello(user));

let myFavoriter: string | number;


// 访问联合类型的属性或方法
// 
function getLength(something: string|Array<string>):number {
    return something.length;
}

// 访问string和number的共有属性是没问题的
function getString(something:string|number):string {
    return something.toString();
}

let myFavoriterNumber: string | number;
myFavoriterNumber = 'seven';
console.log(myFavoriterNumber.length); // 5
myFavoriter = 7;
console.log(myFavoriterNumber.length); // 编译时报错

// 接口定义对象的类型----------------------
