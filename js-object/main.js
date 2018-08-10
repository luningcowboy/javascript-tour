let obj_test = ()=>{

    /// es6 允许直接写入变量和函数
    let foo = 'bar';
    let o0 = {foo};
    console.log(o0); //{ foo: 'bar' }
    let f1 = (x, y)=>{return {x,y};};
    let f2 = (x,y)=>{return {x:x,y:y};};
    console.log(f1(1,2),f2(1,2)); // { x: 1, y: 2 } { x: 1, y: 2 } 上面两种形式的结果是一样对
    /// 方法简写
    let o0_1 = {method(){return 'Hello';}};
    let o0_2 = {method: function(){return 'Hello';}};
    console.log(o0_1.method(),o0_2.method()); // Hello Hello
    let birth = '2000/01/01';
    let o0_3 = {
        name: '章三',
        birth,
        hello(){console.log('我的名字是',this.name);}
    };
    o0_3.hello();// 我的名字是 章三
    let getPoint = ()=>{
        const x = 1;
        const y = 10;
        return {x,y};
    };
    console.log(getPoint()); // { x: 1, y: 10 }

    let ms ={};
    let getItem = (key)=>{return key in ms ? ms[key] : null;};
    let setItem = (key, value)=>{ms[key] = value;};
    let clear = ()=>{ms = {};};
    //module.exports = {getItem, setItem, clear};
    /// 等同于
    //module.exports = {getItem: getItem, setItem : setItem, clear: clear}; 

    let cart = {
        _wheels: 4,
        get wheels(){ return this._wheels;},
        set wheels(value){ this._wheels = value;},
    };
    let descriptor = Object.getOwnPropertyDescriptor(cart, 'wheels');// 必须用wheels,用_wheels获取到对不对
    console.log(descriptor.get.name,descriptor.set.name);//get wheels set wheels
    console.log(getPoint.bind().name);//bound getPoint
    /// Object.is
    console.log(Object.is('foo','foo')); // true
    console.log(Object.is({},{})); // false
    console.log(+0 === -0,Object.is(+0,-0)); // true false
    console.log(NaN === NaN, Object.is(NaN,NaN));// false true
    /// Object.assign()  用于对象对合并,将源对象下对所有可枚举属性，复制到目标对象
    let o1 = {a: 1,b:2};
    let o1_1 = {a: 2, c:3};
    Object.assign(o1, o1_1);// 
    console.log(o1, o1_1);// { a: 2, b: 2, c: 3 } { a: 2, c: 3 }
    // 如果目标不是对象，则辉先转为对象
    console.log(Object.assign(2));//[Number: 2]
    /// 由于undefined和null不能转换为对象，所以，会报错
    //Object.assign(undefined);//TypeError: Cannot convert undefined or null to object
    //Object.assign(null);//TypeError: Cannot convert undefined or null to object
    /// assign只能拷贝源对象对自身属性，不能拷贝其继承属性,也不能拷贝枚举属性
    /// 注意:
    /// 1. assign 是浅拷贝
    let o2_0 = {xx:1};
    let o2_1 = {a: 1,b: 2,c: o2_0};
    let o2_2 = {d: 3,e: 4,f: o2_0};
    let o2_3 = {g: 5,h: 6,i: o2_0};
    let o2_4 = Object.assign(o2_1,o2_2,o2_3);
    console.log(o2_4);
    console.log(o2_4.c === o2_4.f,o2_4.c === o2_4.i);//true true
    /// 2. 同名的属性会替换
    /// 3. 可以用来处理数组，但是，数组会被视为对象
    let o3 = Object.assign([1,2,3],[4,5]);
    console.log(o3); // [ 4, 5, 3 ]
    /// 4. 取值函数对处理:如果处理对是一个取值函数，那么将先求值，再复制
    let source = {
        get foo(){return 1;}
    };
    let o4 = {};
    let o4_1 = Object.assign(o4,source);
    console.log(o4_1,source); // { foo: 1 } { foo: [Getter] }
    /// 常见用途
    /// 1. 为对象添加属性
    class Point{
        constructor(x,y){
            Object.assign(this, {x, y});
        }
        
    }
    let o5 = new Point(1,2);
    console.log(o5, o5.x, o5.y); // Point { x: 1, y: 2 } 1 2
    /// 2. 克隆对象
    /// 方法1: 不能拷贝对象对继承属性
    let clone = obj=>{return Object.assign({}, obj);};
    /// 方法2: 可拷贝继承属性
    let clone2 = obj=>{
        let originProto = Object.getPrototypeOf(obj);
        return Object.assign(Object.create(originProto),obj);
    };
    /// 3. 为对象添加方法
    Object.assign(Point.prototype,{
        add(a,b) {return a + b;}
    });
    let o5_1 = new Point(1,2);
    console.log(o5_1.add(3,4)); // 7
    /// 4. 合并多个对象
    let [o6,o6_1,o6_2] = [{a:1,b:2},{a:1,b:2,c:3},{d:1,e:2}];
    /// 4.1 将多个对象合并到一个对象
    let o6_3 = (target, ...source)=>Object.assign(target,...source);
    /// 4.2 合并后返回一个新的对象
    let o6_4 = (...source)=>Object.assign({},...source);
    let o6_5 = o6_4(o6,o6_1,o6_2);
    let o6_6 = o6_3(o6,o6_1,o6_2);
    console.log(o6_5,o6_6,o6 === o6_6,o6 === o6_5);// { a: 1, b: 2, c: 3, d: 1, e: 2 } { a: 1, b: 2, c: 3, d: 1, e: 2 } true false
    /// 5. 为属性指定默认值
    const DEFAULTS = {
        logLevel: 0,
        outputFormat: 'html'
    };
    function processContent(options){
        options = Object.assign({},DEFAULTS,options);
        return options;
    }
    let o7_1 = {logLevel:2};
    console.log(o7_1,processContent(o7_1));
    /// 6. 属性的可枚举性和遍历
    let o8_1 = {foo:123};
    /// enumerable 称为可枚举属性,如果，修改为false,就表示某些操作会忽略当前属性
    console.log(Object.getOwnPropertyDescriptor(o8_1,'foo'));//{ value: 123,writable: true,enumerable: true,configurable: true }
    /// 会忽略 enumerable = false的属性的操作
    /// for...in
    /// Object.keys()
    /// JSON.stringify()
    /// Object.assign()   只拷贝可枚举的属性
    /// for...in 会返回继承属性，其他三个会忽略继承属性,只处理对象自身的属性
    /// ES6规定:所有Class的原型的方法都是不可枚举的
    
    /// 属性的遍历
    let o9_1 = {
        a: 1,
        b: 2,
        c: 3,
        d:function(){
            console.log('d');
        },
        [Symbol()]: 10
    };
    /// 1. for...in 遍历对象自身和可枚举的属性(不包括Symbol属性)
    for(let key in o9_1) console.log(key); // a b c d
    /// 2. Object.keys(obj) 只遍历自身的属性，不包括继承属性和Symbol属性
    console.log(Object.keys(o9_1));// [ 'a', 'b', 'c', 'd' ]
    /// 3. Object.getOwnPropertyNames(obj) 返回自身所有属性键名的数组,不包括Symbol属性
    console.log(Object.getOwnPropertyNames(o9_1)); // [ 'a', 'b', 'c', 'd' ]
    /// 4. Object.getOwnPropertySymbols(obj) 返回自身所有Symbol属性键名
    console.log(Object.getOwnPropertySymbols(o9_1)); // [ Symbol() ]
    /// 5. Reflect.ownKeys(obj) 获取所有键名，包括继承，Symbol,不区分是否可枚举
    console.log(Reflect.ownKeys(o9_1));//[ 'a', 'b', 'c', 'd', Symbol() ]

    /// 7. Object.getOwnPropertyDescriptors()  返回某个对象属性的描述对象
    let o10_1 = {
        foo: 123,
        get bar(){return 'abc'},
        a:{}
    };
    /** 
     * { foo:
   { value: 123,
     writable: true,
     enumerable: true,
     configurable: true },
  bar:
   { get: [Function: get bar],
     set: undefined,
     enumerable: true,
     configurable: true } }
    */
    console.log(Object.getOwnPropertyDescriptors(o10_1));
    /// 配合Object.defineProperties实现正确的拷贝
    let o10_2 ={};
    Object.defineProperties(o10_2,Object.getOwnPropertyDescriptors(o10_1));
    /**
     * { foo:
   { value: 123,
     writable: true,
     enumerable: true,
     configurable: true },
  bar:
   { get: [Function: get bar],
     set: undefined,
     enumerable: true,
     configurable: true } }
{ foo: 123, bar: [Getter] }
     */
    console.log(o10_2);
    /// 封装===>浅拷贝
    const shallow_clone = src=>Object.defineProperties({},Object.getOwnPropertyDescriptors(src));
    let o10_3 = shallow_clone(o10_1);
    console.log(o10_3 === o10_1,o10_3.a === o10_1.a); // false true
    /// 封装===>浅拷贝2
    const shallow_clone2 = obj=>Object.create(Object.getPrototypeOf(obj),Object.getOwnPropertyDescriptors(obj));
    let o10_4 = shallow_clone2(o10_1);
    console.log(o10_4 === o10_1, o10_4.a === o10_1.a); // false true
    /// 实现继承
    const o11 = {
        foo: 0,
        show: function(){
            console.log('foo',this.foo);
        }
    };
    /// ES5
    let o11_1 = {
        __proto__: o11,
        foo: 123
    };
    /// ES6 规定 __proto__ 只有浏览器需要部署，其他环境不用部署
    let o11_2 = Object.create(o11);//shallow_clone2(o11);
    o11_2.foo = 123;
    console.log(o11_2,o11_2.show());
    /// 实现Mixin(混入)模式
    let mix = obj=>({
        with:(...mixins)=>mixins.reduce((c,mixin)=>Object.create(Object.getPrototypeOf(c),Object.getOwnPropertyDescriptors(mixin)),obj)
    });
    let mix2 = (object) => ({
        with: (...mixins) => mixins.reduce(
          (c, mixin) => Object.create(
            c, Object.getOwnPropertyDescriptors(mixin)
          ), object)
      });
    let [a,b,c] = [{a:'a'},{b:'b'},{c:'c'}];
    let d = mix2(c).with(a,b);
    console.log(d);
    let arr = [1,2,3,4,5];
    console.log(arr.reduce((x,y)=>{console.log(x,y);return x+y;}));// 15
    /// mix例子有问题,下面是例子
    let mix3 = (object) => ({
        with: (...mixins) => mixins.reduce(
          (c, mixin) => Object.create(
            c, Object.getOwnPropertyDescriptors(mixin)
          ), object)
      });
    let d1 = o6_4(a,b,c);
    let d2 = mix3(a,b,c);
    console.log(d1,d2);
    //// 注意:混入还没实现

    /// __proto__ 属性
    /// Object.setPrototypeOf()  
    /// Object.getPrototypeOf()
    /// js 的继承是通过原型链实现的。
    /// __proto__ 用来读取或设置当前对象的prototype对象
    /// es5
    const o12 = {
        method: function(){ console.log('o12...method');}
    };
    o12.__proto__ = {a:10,b:20};
    console.log(Reflect.ownKeys(o12));//[ 'method' ] 毛都没用
    /// es6
    const o12_1 = Object.create({a:10,b:12});
    o12_1.method = ()=>{console.log('o12_1...method');};
    console.log(Reflect.ownKeys(o12_1));//[ 'method' ] 妈蛋说好的继承呢？？？？？？？？
    let o12_2 = {};
    let o12_3 = {x:10};
    Object.setPrototypeOf(o12_3,o12_2);

    o12_2.y = 20;
    o12_2.z = 30;

    console.log(o12_3,o12_3.x,o12_3.y,o12_3.z);//{ x: 10 } 10 20 30
    console.log(Reflect.ownKeys(o12_3),Reflect.ownKeys(o12_2));//[ 'x' ] [ 'y', 'z' ]

    /// super
    let o13_1 = {
        foo: 'hello'
    };
    let o13_2 = {
        foo: 'world',
        find(){
            return super.foo + this.foo;
        },
    };
    Object.setPrototypeOf(o13_2,o13_1);
    console.log(o13_2.find());// helloworld
    /// super关键字表示原型对象时，只能用在对象的方法中，用在其他地方都会报错
    // let o13_3 = {
    //     foo: 'world',
    //     find:function(){
    //         return super.foo; // SyntaxError: 'super' keyword unexpected here
    //     }
    // };
    // Object.setPrototypeOf(o13_2,o13_3);
    //let o13_4 = {foo:super.foo}; // SyntaxError: 'super' keyword unexpected here
    // Object.setPrototypeOf(o13_2,o13_4);
    // let o13_5 = {
    //     foo: 'world',
    //     find: ()=>{return super.foo;} //SyntaxError: 'super' keyword unexpected here
    // };
    // Object.setPrototypeOf(o13_2,o13_5);

    /// Object.keys(), Object.values(), Object.entries()
    let o14_1 = {foo: 'bar', baz: 123};
    console.log(Object.keys(o14_1),Object.values(o14_1),Object.entries(o14_1)); // [ 'foo', 'baz' ] [ 'bar', 123 ] [ [ 'foo', 'bar' ], [ 'baz', 123 ] ]
    /// for ... of 循环
    for (let key of Object.keys(o14_1)){
        console.log(key);// foo baz
    }

    for (let value of Object.values(o14_1)) console.log(value); // bar 123
    for (let [k,v] of Object.entries(o14_1)) console.log(`key:${k},value:${v}`); // key:foo,value:bar key:baz,value:123
    /// Object.values会过滤 enumberable = false 的属性
    let o14_2 = Object.create({},{p:{value:42}});
    console.log(Object.values(o14_2));//[]
    let o14_3 = Object.create({},{p:{
        value:42,
        enumerable: true
    }});
    console.log(Object.values(o14_3));// [ 42 ]
    /// 如果 Object.values 传入的是一个字符串，则会返回字符数组,所以可以用这种方法直接将字符串拆分为字符数组
    console.log(Object.values('es6'));// [ 'e', 's', '6' ]
    /// 如果 Object.values 传入 数字 或 boolean 类型，会返回空数组
    console.log(Object.values(111),Object.values(false)); // [] []

    /// Object.entries 也会返回所有可遍历属性的数组
    for (let [k,v] of Object.entries(o14_1)) console.log(`key:${k},value:${v}`); // key:foo,value:bar key:baz,value:123
    /// 通过 Object.entries 方法可以将对象转换为真正的Map
    /// 这个原理其实就是，将数组转换为Map,Object.entries会返回一个key,value的数组，跟Map直接转换这样的数组是一样的
    /// 并没有什么特殊的
    let mp = new Map(Object.entries(o14_3));
    console.log(mp); // Map { 'p' => 42 }

    /// 对象的扩展运算符
    /// 左右名字必须是一致的才行，不一致就不能赋值，只能时undefined
    /// 需要注意的是，这种拷贝时浅拷贝
    // let {x1,x2,...o15_3} = {x1:1,x2:2,a:3,b:4,c:5};
    // console.log(x1,x2,o15_3);// 1 2 { a: 3, b: 4, c: 5 }
    // let o15 = {a:3,b:4};
    // let o15_1 = { ...o15_3 }; // IDE提示错误，但是，能正常运行(vscode jshint)
    // console.log(o15_1); // { a: 3, b: 4, c: 5 }
    // /// {...obj} === Object.assign({},obj);
    // /// 合并对象 等同于 Object.assign({},a,b)
    // let o15_4 = {...o15_3,...o15};// IDE提示错误，但是，能正常运行(vscode jshint)
    // console.log(o15_4); //{ a: 3, b: 4, c: 5 }




};

let main = ()=>{
    obj_test();
};

main();