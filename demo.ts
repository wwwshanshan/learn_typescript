

let count: number;
count = 123 
function add(a: number, b: number) {
    return a + b
}
const sum = add(1, 2)
const add1 = function(){}
const add2 = ()=>{}

function add3({ a }: {a: string}){
    return a
}
const func = (str: string): number => {
    return parseInt(str, 10)
}
const func1: (str: string) => number = (str)=>{
    return parseInt(str, 10)
}
// 数组
const arr: (number | string )[]= [1,2,3,'99']
// 类型别名 type alias
type User = {name: string, age: number}
const objarr: User[] = [{name: 'ss', age: 10}]

// 元祖 tuplr 类型、数量固定的数组（可用于csv Excel文件导出等）
const teacherInfo: [string, string, number] = ['aaa','bbb',10]

// interface 接口
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
    say(): string
}
const getName = (person: Person) => {
    console.log(person.name);
}
const setName = (person: Teacher, name: string) => {
    person.name = name;
}

const person = {
    name: 'www',
    age: 18,
    sex: '男',
    say() {
        return 'hello'
    },
    teach() {
        return 'teach'
    }

}
getName(person);
setName(person, 'qq');
// 使用 implements 语法，表示一个类应用一个接口,那么类里面必须拥有接口里的属性 
class Man implements Person {
    name = 'DELL';
    say() {
        return 'hello'
    }
}
// 接口继承
interface Teacher extends Person {
    teach(): string;
}
// 函数定义
interface sayHi {
    (word: string): string 
}

const say: sayHi = (word: string)=>{
    return 'word'
}
// 类的定义
class Ren {
    name = 'dell';
    public getName(){
        return this.name;
    }
    private sayA() {
        this.name
    }
    protected age: number
}
// 类的继承
class Student extends Ren{
    getStudentName(){
        return 'student';
    }
    // 类的重写
    getName(){
        return super.getName() + this.age
    }
    // super用来干什么？ 类重写之后还是想调用父类的方法可用super调用父类方法
}
const ren = new Ren();

// 访问类型
// private 允许在类内被使用
// protected 允许在类内及继承的子类中使用
// public 允许在类的内外被使用

// constructor 构造器
class Ming{
// 传统写法
    // public name: string;
    // constructor( name: string) {
        // this.name = name
    // }

// 简化写法
    constructor(public name: string) {}
}
// 创建类实例的时候构造器会自动被执行，传递的属性也会被构造器接收
const ming = new Ming('dell')
// console.log(ming.name); // dell

class Hong extends Ming{
    // 子类有构造器时要调用父类使用super关键字调用父类构造器
    constructor(public age: number){
        super('mingming')
    }
}
const hong = new Hong(28)
// console.log(hong.age); // 28
// console.log(hong.name); // mingming
// getter | setter
class One{
    constructor(private _name: string){}
    get name(){
        return this._name;
    }
    set name(name: string){
        const realName = name.split(' ')[1];
        this._name = realName
    }
}
const one = new One('one')
// console.log(one.name); // get下name是属性不用加括号  one
one.name = 'one two';
// console.log(one.name);

// 单例模式
class Demo {
    private static instance: Demo;
    private constructor(public name: string){}
    // static 把方法挂在类上而不是类的实例上
    static getInstance(){
        if(!this.instance){
            this.instance = new Demo('lili')
        }
        return this.instance
    }
}
const demo1 = Demo.getInstance();
const demo2 = Demo.getInstance();
// console.log(demo1.name);

// 只读 readonly 类属性修饰符
class Two {
    public readonly name: string;
    constructor(name: string){
        this.name = name;
    }
}
const two = new Two('TWO');
// two.name = '111'; // 只读不可修改
console.log(two.name)

// 抽象类 abstract 只能被继承不能被实例化 类相关的通用的东西抽象出来
abstract class Three {
    color: string;
    getName(){
        return 'name';
    }
    abstract getAge(): number
}
class four extends Three{
    // 继承抽象方法中抽象的方法，那么要在类中实现该方法，否则会报错
    getAge(){
        return 123;
    }
}
// 接口 interface  
