/*
ts优势:
1、开发过程中，发现潜在问题
2、更友好的编辑器自动提示
3、代码语义更清晰易懂

创建项目
npm init -y   // package.json
tsc -init    // tsconfig.json

tsc -w 监听编译

静态类型：更直观的判断到变量或者对象的属性的内容

基础类型：number string null undefined symbol boolean，void
对象类型: 函数 数组 类 对象

类型注解 type annotation 我们来告诉ts变量是什么类型
类型推断 type inference TS 会自动的去尝试分析变量的类型

数组与元祖
    数组
        const arr: (number | string )[]= [1,2,3,'99']
    类型别名 type alias
        type User = {name: string, age: number}
        const objarr: User[] = [{name: 'ss', age: 10}]
    元祖 tuplr 类型、数量固定的数组（可用于csv Excel文件导出等）
        const teacherInfo: [string, string, number] = ['aaa','bbb',10]

接口 
接口只是ts帮助我们做语法校验的工具，并不会真正变成js的代码
TS通用规范：1、能用接口interface表示的类型尽量使用接口，实在不行再使用type
        2、当以字面量形式传递对象给变量的时候，ts会对 对象进行强校验
        × getName({name: 'www', age: 18,sex: '男',}); 报错 会进行强校验
        ✔️ const person = {name: 'www', age: 18,sex: '男',} getName(person) 正确
interface 与 类型别名 type 相类型，但并不完全一直
    interface Person{}     interface只能代表对象或者函数
    type Person1 = string  type可直接代表string等基础类型

    interface Person {
        readonly name: string;  只读属性
        age?: number;  可选属性
        [propName: string]: any;  额外属性
        say(): string  方法属性
    }

    接口继承
    interface Teacher extends Person {
        teach(): string;
    }

    使用 implements 语法，表示一个类应用一个接口,那么类里面必须拥有接口里的属性 
    class Man implements Person {
        name = 'DELL';
        say() {
            return 'hello'
        }
    }

    方法接口定义
    interface sayHi {
        (word: string): string 
    }
    const say: sayHi = (word: string)=>{
        return 'word'
    }
类
    类的定义
    class Ren {
        name = 'dell';
        getName(){
            return this.name;
        }
    }
    类的继承
    class Student extends Ren{
        getStudentName(){
            return 'student';
        }
        类的重写
        getName(){
            return super.getName() + 'lee'
        }
    super用来干什么？ 类重写之后还是希望能调用父类的方法可用super调用父类方法
    }
    const ren = new Ren();
    console.log(ren.getName());  dell

    const student = new Student();
    console.log(student.getName()); delllee
    console.log(student.getStudentName()); student
访问类型
    private 允许在类内被使用
    protected 允许在类内及继承的子类中使用
    public 允许在类的内外被使用

constructor 构造器
class Ming{
// 传统写法
    public name: string;
    constructor( name: string) {
        this.name = name
    }

// 简化写法
    constructor(public name: string) {}
}
创建类实例的时候构造器会自动被执行，传递的属性也会被构造器接收
const ming = new Ming('dell')
console.log(ming.name); // dell

class Hong extends Ming{
    子类有构造器时要调用父类使用super关键字调用父类构造器
    constructor(public age: number){
        super('mingming')
    }
}
const hong = new Hong(28)
console.log(hong.age); // 28
console.log(hong.name); // mingming
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
    console.log(one.name); // get下name是属性不用加括号  one
    one.name = 'one two';
    console.log(one.name); // two

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
    console.log(demo1.name);

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

// 抽象类 abstract 只能被继承不能被实例化；把类相关的通用的东西抽象出来
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

tsconfig.json 执行编译时对编译文件的配置
1、指定某个文件tsc demo.ts命令，不会使用到tsconfig.json文件，若要使用直接tsc命令即可
2、限制编制文件的范围：include、exclude、files，若都不使用，会对根目录下所有ts文件都进行编译


联合类型及类型保护
联合类型中出现的语法问题 可通过类型保护等方法解决
    interface Bird {
        fly: boolean;
        sing:() => {};
    }
    interface Dog {
        fly: boolean;
        bark:() => {};
    }
    1、类型断言 
    function  trainAnimal(animal:Bird | Dog) {
        if (animal.fly) {
            (animal as Bird).sing();
        } else {
            (animal as Dog).bark();
        }
    }
    2、in 语法
    function trainAnimalSecond(animal:Bird | Dog) {
        if ('sing' in animal) {
            (animal as Bird).sing();
        } else {
            (animal as Dog).bark();
        }
    }
    3、typeof 语法
    function add(a: string | number,b: string | number) {
        if(typeof a === 'string' || typeof b === 'string'){
            return `${a}${b}`
        }
        return a + b
    }
    4、instanceof语法 只有class才能使用该操作符
    class NumberObj {
        count: number;
    }
    function addSecond(a:object|NumberObj,b:object|NumberObj) {
        if(a instanceof NumberObj && b instanceof NumberObj) {
            return a.count + b.count;
        }
        return 0;
    }

枚举类型(enum) 原理：反响映射
    enum Status {a, b=4, c}
    console.log(Status.a, Status[0]); // 0 a
    console.log(Status.a, Status[5]); // 0 c

泛型<T>：泛指的类型
泛型: 不需要预先确定的数据类型，具体的类型在使用的时候才能确定
理解: 把泛型变量与函数参数等同对待，它是代表类型的参数不是代表值的参数

1、函数泛型
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
2、类泛型
    class Test<T> {
        constructor(private data: T[]) {}
        getItem(index: number): T{
            return this.data[index];
        }
    }
    const test = new Test<number>([1]);
    test.getItem(0);
3、泛型继承
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

4、如何使用泛型作为一个具体的类型注解
    function hello<T>(params: T){
        return params
    }
    const aaa: <T>(params: T) => T = hello;

namespace  模块化开发 减少全局方法
    //components.ts
        namespace Component {
            export interface User{
                name: string
            }
            export namespace SubComponent{
                export class Test{

                }
            }
            export class Head {
                constructor(){
                console.log("This is Head");
                }
            }
        }
    //page.ts
        ///<reference path="components.ts" />声明引用
        namespace Home{
            export class Page {
                user: Component.User = {
                    name: 'QQ'
                }
                constructor(){           
                    new Component.Head();
                }
            }
        }
    // index.html
        <script src="./dist/page.js"></script>
        <script>new Home.Page()</script>

类型定义文件 .d.ts  让ts理解js文件
    jq.d.ts    
        定义全局变量
        declare var $ : (param:() => void) => void;

        定义全局函数 一个函数多种形式 => 函数重载
        interface JqueryInstance {
            html: (html: string) => JqueryInstance;
        }
        函数重载
        declare function $(readyFunc:() => void): void;
        declare function $(selector: string): JqueryInstance
        
        对象、类进行类型定义，以及命名空间的嵌套
        declare namespace ${
            namespace fn {
                class init{} 
            }
        }

        使用interface语法，实现函数重载
        interface Jquery {
            (readyFunc:() => void): void;
            (selector: string): JqueryInstance
        }
        declare var $: Jquery;
    .ts
        $(function(){
            alert(123);
        })
        $(function(){
            $('body').html('<div>123</div>');
            new $.fn.init();
        })

    ES6 模块化
    jq.d.ts  
    declare module 'jquery'{
        interface JqueryInstance {
            html: (html: string) => JqueryInstance;
        }
        混合类型
        function $(readyFunc:() => void): void;
        function $(selector: string): JqueryInstance
        namespace ${
            namespace fn {
                class init{} 
            }
        }
        export = $;
    }
    .ts
    import $ from 'jquery'


    1、类装饰器
    类装饰器接收的参数是构造函数 constructor
    多个装饰器，从下到上 从左到右执行
    本身是一个函数 通过 @ 符合来使用
    function test(constructor: any) {
        console.log(111)
        constructor.prototype.getName = () =>{
            console.log(222)
        }
    }
    @test
    class Test{}
    const test = new Test()
    test.getName()

    function test{
        return function<T extends new (...args: any[]) => {}(constructor: any) {
            return class extends constructor {
                name = 'lili';
                getName() {
                    return this.name
                }
            };
        }
    }
    const test = Test(){
    class  {
        name: string;
        constructor(name: string){
            this.name = name
        }
        }
    }
    const test = new Test('cece')
    console.log(test.getName())

    2、方法装饰器
    普通方法  target 对应的是类的 prototype
    静态方法  target 对应的是类的构造函数
    function getNameDec(tayget: any, key: string, descriptor: PropertyDescriptor){
        // console.log(EventTarget)
        // descriptor.writable = true;
        // descriptor.value = function () {
        //     return '789';
        // }
    }
    class Beat {
        name: string
        constructor(name: string) {
            this.name = name;
        }
        @getNameDec
        getName(){
            return '123'
        }
    }
    const beat= new Beat('DELL');
    beat.getName = ()=>{
        return '456'
    }
    console.log(beat.getName())

    3、参数装饰器
    // 原型 方法名 参数所在的位置
    function getNameDec(tayget: any, method: string, paramIndex: number){
        console.log(tayget, method, paramIndex)
    }
    class Beat {
        getInfo(@getNameDec name: string, age: number){
            console.log(name, age)
        }
    }
    const beat= new Beat();
    beat.getInfo('dell', 30)

    装饰器例子
    const userInfo: any = undefined;
    function catchError(msg: string) {
        return function(target: any, key: string, descriptor: PropertyDescriptor){
            const fn = descriptor.value;
            descriptor.value = function() {
                try{
                    fn();
                } catch (e) {
                    console.log(msg)
                }
            }
        }
    }
    class Case {
        @catchError('name不存在')
        getName(){
            return userInfo.name;
        }
        @catchError('age不存在')
        getAge(){
            return userInfo.age;
        }
    }
    const case1 = new Case();
    case1.getName();
    case1.getAge();
*/
