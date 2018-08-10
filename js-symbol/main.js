/**
 *
 *
 * @returns
 */
let testSymbol = ()=>{
    /// es6 引入 symbol 表示独一无二的值，属于js的第七种数据类型，前6种为:undefined,null,boolean,string,number,object
    /// 对象的属性名可以用symbol类型表示，这样合并对象的时候就不会有名称冲突了，所有symbol类型的值都是独一无二的
    let s1 = Symbol();
    console.log(typeof s1); // symbol
    /// symbol 不能使用new来创建
    //let s1_1 = new Symbol(); // TypeError: Symbol is not a constructor
    /// symbol 可以接收一个字符串作为参数，表示对symbol实例的描述
    /// 主要是为了在控制台显示或者转为字符串时，比较容易区分
    let tmp_str_0 = 'foo';
    let s1_2 = Symbol(tmp_str_0);
    let s1_3 = Symbol(tmp_str_0);
    console.log(s1_2,s1_3,s1_2 === s1_3); // Symbol(foo) Symbol(foo) false
    console.log(s1_2.toString(),s1_3.toString()); // Symbol(foo) Symbol(foo)
    /// Symbol 还能传入对象，如果，传入的是对象，那么，Symbol.toString会调用对象的toString方法
    let tmp_obj_0 = {toString(){return 'tmp_obj_tostring';}};
    let s1_4 = Symbol(tmp_obj_0);
    console.log(s1_4.toString());// Symbol(tmp_obj_tostring)
    /// Symbol的参数只表示对Symbol实例对描述，所以，相同参数对Symbol实例时不相等的
    console.log(Symbol() === Symbol(),Symbol(tmp_obj_0) === Symbol(tmp_obj_0)); // false false
    /// Symbol值不能与其他类型的值进行运算，会报错
    let s1_5 = Symbol('My symbol');
    //console.log('aaaa' + s1_5);//TypeError: Cannot convert a Symbol value to a string
    /// Symbol可以转换为字符串和boolean类型，不能转换为number
    console.log(String(s1_5),s1_5.toString(),Boolean(s1_5)); // Symbol(My symbol) Symbol(My symbol) true
    //console.log(Number(s1_5)); // TypeError: Cannot convert a Symbol value to a number

    /// 作为属性名的 Symbol
    /// 有三种方法，结果是一样的
    let mySymbol_0 = Symbol();
    let mySymbol_1 = Symbol();
    let mySymbol_2 = Symbol();

    /// 方法1
    let tmp_obj_1 = {
        [mySymbol_1]: 'hello-1'
    };
    /// 方法2
    tmp_obj_1[mySymbol_0] = 'hello-0';
    /// 方法3
    Object.defineProperty(tmp_obj_1,mySymbol_2,{value:'hello-2',enumerable:true});// 默认enumerable=false,需要自己选择是否指定
    /// 注意:Symbol做对象的属性名的时候不能使用点运算符
    /// 因为点运算符后面总是字符串，所以读取不到symbol标识的属性，
    /// 所以，在对象内部定义symbol标识的属性时也需要放在方括号内，如:方法1
    console.log(tmp_obj_1,tmp_obj_1[mySymbol_0],tmp_obj_1[mySymbol_1],tmp_obj_1[mySymbol_2]); // { [Symbol()]: 'hello-1',[Symbol()]: 'hello-0',[Symbol()]: 'hello-2' } 'hello-0' 'hello-1' 'hello-2'
    /// 增强的对象写法
    let mySymbol_3 = Symbol('mySymbol_3');
    let tmp_obj_2 = {
        [mySymbol_3](){
            console.log(mySymbol_3.toString());
        }
    };
    tmp_obj_2[mySymbol_3](); // Symbol(mySymbol_3)
    /// 注意:Symbol作为属性名字的时候，属性还是公开属性不是私有属性


    /// 属性名的遍历
    /// Symbol作为属性名，该属性不会出现在for ... in , for ... of 循环中，
    /// 也不会被Object.keys,Object.getOwnPropertyNames,JSON.stringify返回，
    /// 但是，它并不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取
    /// 指定对象的所有Symbol属性名
    console.log(Object.getOwnPropertySymbols(tmp_obj_2));// [ Symbol(mySymbol_3) ]
    console.log('================================================');
    for(let k in tmp_obj_1) console.log(k); // 什么都没输出
    console.log('Object.getOwnPropertySymbols',Object.getOwnPropertySymbols(tmp_obj_1)); //Object.getOwnPropertySymbols [ Symbol(), Symbol(), Symbol() ]
    console.log('Object.getOwnPropertyNames',Object.getOwnPropertyNames(tmp_obj_1)); //Object.getOwnPropertyNames []
    /// Reflect.ownKeys 可以获取所有的属性名
    console.log(Reflect.ownKeys(tmp_obj_1)); // [ Symbol(), Symbol(), Symbol() ]
    /// 由于Symbol标识的属性名字不能被常规方法获取到，所以，可以用来定义一些非私有到，又希望只用于内部到方法
    let size = Symbol('size');
    class Collection{
        constructor() {
            this[size] = 0;
        }
        add(item){
            this[this[size]] = item;
            this[size]++;
        }
        static sizeOf(instance){
            return instance[size];
        }
    }
    let x = new Collection();
    console.log(Collection.sizeOf(x)); //0
    x.add('a');
    console.log(Collection.sizeOf(x)); //1

    /// Symbol.for Symbol.keyFor
    /// 重新使用同一个symbol值，可以使用Symbol.for获取
    let s2_1 = Symbol.for('foo');
    let s2_2 = Symbol.for('foo');
    console.log(s2_1 === s2_2); // true
    /// Symbol.for 和 Symbol 都会生成新的Symbol,不同的是
    /// Symbol.for会被登记在全局环境中供搜索，Symbol不会。
    /// Symbol.for不会每次调用都返回一个新的Symbol类型的值
    /// 而是会先检测给定的key是否已经存在，不存在才创建一个新的值
    /// Symbol每次都会创建一个新的值
    /// Symbol.keyFor 返回一个已经登记的Symbol类型值的key
    console.log(Symbol.keyFor(s2_1)); // foo
    let s2_3 = Symbol('Hello');
    console.log(Symbol.keyFor(s2_3)); // undefined  没有登记所以返回 undefined

    /// 定义单例模式 代码在test_singleton.js中
    let a = require('./test_singleton.js');
    let b = require('./test_singleton.js');
    console.log(a.foo, a===b); // hello true
    
    /// 内置的Symbol值
    /// Symbol.hasInstance: 对象的这个属性指向一个内部方法。当其他对象使用instanceOf
    /// 运算符的时候，判断是否为该对象的实例时，会调用这个方法。
    /// eg. foo instanceOf Foo 调用的是 Foo[Symbol.hasInstance](foo)
    let c = require('./test_hasinstance.js');
    let c1 = new c();
    console.log([1,2,3] instanceof c1); // true
    console.log("abc" instanceof c1); // false
    let d = require('./test_hasinstance2.js').Even1;
    console.log([1,2,3] instanceof d); // false
    console.log(10 instanceof d,11 instanceof d); // true false

    /// Symbol.isConcatSpreadable
    /// 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于
    /// Array.prototype.concat()时，是否可以展开
    /// Symbol.isConcatSpreadable为undefined和true的时候都可以展开
    let arr1 = ['c','d'];
    console.log(['a','b'].concat(arr1,'e')); // [ 'a', 'b', 'c', 'd', 'e' ]
    console.log(arr1[Symbol.isConcatSpreadable]); // undefined

    let arr2 = ['c','d'];
    arr2[Symbol.isConcatSpreadable] = false;
    console.log(['a','b'].concat(arr2,'e'));//[ 'a','b',[ 'c', 'd', [Symbol(Symbol.isConcatSpreadable)]: false ],'e' ]
    /// 类似数组的对象默认是不展开的，为true的时候才展开
    let arr3 = {length:2,0:1,1:2};
    console.log(['a','b'].concat(arr3,'e'));//[ 'a', 'b', { '0': 1, '1': 2, length: 2 }, 'e' ]
    arr3[Symbol.isConcatSpreadable] = true;
    console.log(['a','b'].concat(arr3,'e'));//[ 'a', 'b', 1, 2, 'e' ]

    /// Symbol.isConcatSpreadable也可以定义在类中
    let a1 = require('./test_isconcatspreadable').TestIsConcatSpreadAble;
    let a2 = require('./test_isconcatspreadable').TestIsConcatSpreadAble2;
    let a11 = new a1();
    let a21 = new a2();
    a11[0] = 3;
    a11[1] = 4;
    a21[0] = 5;
    a21[1] = 6;
    console.log([1,2].concat(a11).concat(a21));//[ 1, 2, 3, 4, TestIsConcatSpreadAble2 [ 5, 6 ] ]

    /// Symbol.species
    /// 对象的Symbol.species属性指向一个构造函数。创建衍生对象的时候，会使用这个属性。
    let a31 = new a1(1,2,3,4);
    let a311 = a31.map(x=>x);
    let a312 = a31.filter(x=>x>1);
    console.log(a311 instanceof a1); // true
    console.log(a312 instanceof a1); // true
    console.log(a312 instanceof Array); // true
    /// 上面a311,a312都是a31的衍生对象
    let a3 = require('./ctest_species');
    let a32 = new a3(1,2,3,4);
    let a321 = a32.map(x=>x);
    let a322 = a32.filter(x=>x>1);
    console.log(a321 instanceof a3); // false
    console.log(a322 instanceof a3); // false
    console.log(a321 instanceof Array); // true
    console.log(a322 instanceof Array); // true
    /// 注意:
    /// 作用是，示例对象在运行过程中，需要再次调用自身的构造函数的时候，会调用该属性指定的构造函数，
    /// 主要用途是:有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，
    //／ 而不是子类的实例

    /// Symbol.match
    /// Symbol.match指向一个函数，当执行str.match(myObjc)时，如果改属性存在，会调用该方法的返回值.
    /// String.prototype.match(regexp) === regexp[Symbol.mathc](this)
    let t1 = require('./tesst_symbol_match');
    console.log('e'.match(new t1())); // 1

    /// Symbol.replace
    /// Symbol.replace指向对象的一个方法，当对象被String.prototype.replace方法调用的时候，会返回该方法的返回值
    /// String.prototype.replace(searchValue,replaceValue) == searchValue[Symbol.replace](this,replaceValue)
    /// Symbol.replace会收集两个参数，一个是replace方法正在作用的对象，一个是参数替换后的值
    const x1 = {};
    x1[Symbol.replace] = (...s)=> console.log(s);
    'Hello'.replace(x1,'World'); // [ 'Hello', 'World' ]


    /// Symbol.search
    /// Symbol.search属性指向一个方法，当该对象被String.prototype.search方法调用的时候，会返回该方法的返回值
    let MySearch = require('./test_symbol_search');
    let m1 = new MySearch('hello');
    console.log('h'.search(m1)); // 0


    /// Symbol.split
    /// Symbol.split属性指向一个方法，当对象被String.prototype.split方法调用时，会返回该方法的值.
    let MySplit = require('./test_symbol_split');
    console.log('foobar'.split(new MySplit('foo'))); // [ '', 'bar' ]
    console.log('foobar'.split(new MySplit('bar'))); // [ 'foo', '' ]
    console.log('foobar'.split(new MySplit('baz'))); // foobar

    /// Symbol.iterator
    /// 指向该对象的默认遍历器方法
    const myIterable = {};
    myIterable[Symbol.iterator] = function*(){
        yield 1;
        yield 2;
        yield 3;
    };
    console.log([...myIterable]); // [1,2,3]

    let MyCollection = require('./test_symbol_iterable');
    let myCollection = new MyCollection();
    myCollection[0] = 1;
    myCollection[1] = 2;
    console.log([...myCollection]); // [1,2]
    for(let v of myCollection) console.log(v); // 1 2


    /// Symbol.toPrimitive
    /// 该属性指向一个方法，该对象被转换为原始类型时会调用这个属性指向的方法,
    /// Symbol.toPrimitive被调用时，会接收一个字符串参数，表示当前的运算模式
    /// 总共有三种运算模式: Number, String, Default:这种情况既可以转成数字也可转成字符串
    let obj = {
        [Symbol.toPrimitive](hint){
            switch(hint){
                case 'number':
                return 123;
                case 'string':
                return 'str';
                case 'default':
                return 'default';
                default:
                throw new Error();
            }
        }
    };
    console.log(2 * obj); // 246
    console.log(3 + obj); // 3default
    console.log(obj === 'default'); // false
    console.log(String(obj)); // str

    /// Symbol.toStringTag
    /// 指向对象的toString方法
    let MyString = require('./test_symbol_tostring');
    let ms = new MyString();
    console.log(Object.prototype.toString.call(ms)); // [object myString]
    console.log(ms.toString()); // [object myString]

    /// Symbol.unscopables
    /// Symbol.unscopables属性指向一个对象，该对象指定了使用with关键字时，哪些属性灰被with环境排除
    /*
    { copyWithin: true,
  entries: true,
  fill: true,
  find: true,
  findIndex: true,
  includes: true,
  keys: true }*/
    console.log(Array.prototype[Symbol.unscopables]);
    class MyCalss1{
        foo(){return 1;}
    }
    class MyCalss2{
        foo(){return 2;}
        get [Symbol.unscopables](){
            return {foo:true};
        }
    }
    var foo = function() {return 3;};
    with(MyCalss1.prototype){
        console.log(foo()); // 1
    }
    with(MyCalss2.prototype){
        console.log(foo()); // 3
    }
    //上面代码通过指定Symbol.unscopables属性，使得with语法块不会在当前作用域寻找foo属性，即foo将指向外层作用域的变量。
};


function main(){
    testSymbol();
}

main();