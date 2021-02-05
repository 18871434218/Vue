// 集合Set
// WeakSet
// 集合Map
// WeakMap
// Map与Array横向对比增、查、改、删
// Set与Arrayz增、查、改、删对比
// Map、Set、Object三者增、查、改、删对比

// set 类似数组，但集合中所所有元素都是唯一，没有重复
// add： 添加元素
// delete: 删除一个元素
// clear: 清空所有元素
// has: 查看集合中是否包含指定元素
// size: 相当于数组中的length


// let list = new Set();
// list.add(5);
// list.add(7);
// console.log('size', list.size);  // 2


// let arr = ['add', 'delete', 'clear', 'has'];
// let list = new Set(arr);
// list.add('add1');
// console.log('has', list.has('add')); // has true
// console.log('delete', list.delete('add'), list);
// list.clear();
// console.log('list', list);  // list Set{}

// 数组去重

// let list = new Set();
// list.add(1);
// list.add(2);
// list.add(2);
// console.log('list', list); // list Set {1,2}

// // 数字2与字符串2严格意义上是不相等的
// let arr = [1,2,3,1,'2'];
// let list2 = new Set(arr);
// console.log('unique', list2);

// // 以数组的形式输出
// console.log([...list2]);


// 集合遍历
// let arr = ['add', 'delete', 'clear', 'has'];
// let list = new Set(arr);

// for (let key of list.keys()) {
//     console.log('keys', key);
// }
// // keys add keys delete 5 keys clear  keys has

// for (let value of list.values()) {
//     console.log('value', value);
// }

// for (let [key, value] of list.entries()) {
//     console.log('entries', key, value);
// }

// list.forEach(function(item) {
//     console.log(item);
// });

// keys add
// keys delete
// keys clear
// keys has
// value add
// value delete
// value clear
// value has
// entries add add
// entries delete delete
// entries clear clear
// entries has has
// add
// delete
// clear
// has


// weakset的元素只能是对象，WeakSet中的对象是弱引用，只是把地址拿过来，没有clear属性，不能遍历
// let weakList = new WeakSet();
// let arg = { a: '1' };
// weakList.add(arg);
// weakList.add({ b:'2' });
// console.log('weakList', weakList);


// Map中的key可以是任意数据类型：字符串，数组，对象等要注意集合Set添加元素用add(), 而集合Map添加元素用set()

// let map = new Map();
// let arr = ['123'];
// map.set(arr, 456);
// console.log('map', map, map.get(arr));

// let map = new Map([['a', 123], ['b', 456]]);
// console.log('map args', map);

// console.log('size', map.size);
// console.log('delete', map.delete('a'), map);
// map.clear();
// console.log('clear', map);

// weakmap  同weakSet一样接收的key值必须是对象，没有size属性，clear方法，也是不能遍历
// let weakmap = new WeakMap();
// let o = {};
// weakmap.set(o, 123);
// console.log(weakmap.get(o));


// console.log(process.env);

// const myFunc = function() {}

// const myFunc = () => {
//     console.log('11111');
// }
// myFunc();

