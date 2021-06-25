// 测试去掉注释
const teacher: string = 'shanshan';

// 枚举类型 原理：反响映射
enum Status {a, b=4, c}
console.log(Status.a, Status[0]);
console.log(Status.a, Status[5]);

// 泛型<T>：泛指的类型  在具体使用的时候才会知道类型
// 1、函数泛型
// 一个
function join<T>(a: T, b: T) {
    return `${a}${b}`;
}
join<number>(1,1);
// 多个
function join1<T,P>(a: T, b: P) {
    return `${a}${b}`;
}
join1<number, string>(1,'6');
join1(1,1);  //类型推断
// 返回泛型
function join2<T,P>(a: T, b: P): T {
    return a;
}
// 数组泛型
function map<T>(params:Array<T>) {
    return params;
}
function mapA<T>(params:T[]) {
    return params;
}
map<string>(['123']);

// 类泛型
class Test<T> {
    constructor(private data: T[]) {}
    getItem(index: number): T{
        return this.data[index];
    }
}
const test = new Test<number>([1]);
test.getItem(0);

// 泛型继承
interface Item{
    name: string
}
class Tests<T extends Item> {
    constructor(private data: T[]) {}
    getItem(index: number): string{
        return this.data[index].name;
    }
}
const test1 = new Tests([{name:'ss'}]);

// 如何使用泛型作为一个具体的类型注解
function hello<T>(params: T){
    return params
}
const aaa: <T>(params: T) => T = hello;

