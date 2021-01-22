// // 在元素类型后面加上[]
// let arr: number[] = [1,2];
// // 或者使用数组泛型
// let arr1: Array<number> = [1,2];
// // 元组
// let x: [string, number];
// x = ['Runoob', 1];   // 对应位置的类型需要相同  运行正常
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Blue;
console.log(c); // 输出
