console.log('hello world');
/// Proxy用于修改某些操作的默认行为，等同于在语言层面做修改
/// 属于一种元编程(meta programming), 即对编程语言进行编程
/// Proxy意思是 代理，也就是说由他来代理某些操作
function test_proxy(){
    let obj = new Proxy({},{
        get: function(target, key, receiver){
            console.log(`getting ${key}`);
            return Reflect.get(target, key, receiver);
        },
        set: function(target, key, value, receiver){
            console.log(`setting ${key}`);
            return Reflect.set(target, key, value, receiver);
        }
    });
    obj.count = 1;
    ++obj.count; 
    // var proxy = new Proxy(target, handler); handler没有设置任何拦截，那就等同于直接通向原对象
    var p1 = new Proxy({},{
        get:function(target, property){
            return 35;
        }
    });
    console.log(p1.time); // 35
    console.log(p1.name); // 35
    console.log(p1.title); // 35
    /// 不做任何拦截,就等于直接通向原对象
    var t = {};
    var h1 = {};
    var p2 = new Proxy(t,h1);
    p2.a ='b';
    console.log(t.a); // b

    /// 可以将Proxy对象设置到Object.proxy属性，从而可以在object对象上调用。
    // var object = { proxy: new Proxy(target, handler) }; // 测试失败
    var o1 = {proxy: new Proxy({},{get:function(target, property){return 35;}})};
    console.log(o1.name);// undefined

    /// Proxy实例也可以作为其他对象到原型对象
    var p3 = new Proxy({},{
        get:()=>35
    });
    let p3_1 = Object.create(p3);
    console.log(p3_1.time);// 35

    /// 同一个拦截器函数，可以设置多个拦截操作
    var h1 = {
        get:(target, name)=>{
            if(name === 'prototype'){
                return Object.prototype;
            }
            return 'hello' + name;
        },
        apply:(target, thisBinding, args)=>{
            return args[0];
        },
        construct:(target, args)=> {
            return {value: args[1]};
        }
    };

    var f1 = new Proxy(function(x,y){return x+y;},h1);
    console.log(f1(1,2)); // 1
    console.log(new f1(1,2)); // {value:2}
    console.log(f1.foo); // hellofoo
    console.log(f1.prototype === Object.prototype); // true
    /// 注意: 如果函数要作为一个对象，只能是function(params){}这种形式的函数，(params)=>{}这种
    /// 形式的函数是没用构造函数的。

    /// Proxy支持的拦截操作总共有13种:
    /// 1. get
    /// get方法用于拦截某个属性的读取操作，可以接收三个参数，分别为，目标对象，属性名，proxy实例本身(操作行为所针对的对象)
    /// 最后一个参数可选
    let person = {
        name: '张三'
    };
    var p4 = new Proxy(person,{
        get:function(target,property){
            if(property in target) return target[property];
            throw new ReferenceError(`Property "${property}" does not exist.`);
        }
    });
    console.log(p4.name); // 张三
    //console.log(p4.age); //ReferenceError: Property "age" does not exist
    /// get方法可以继承
    let p4_1 = Object.create(p4);
    console.log(p4_1.name); // 张三
    //console.log(p4_1.age); //ReferenceError: Property "age" does not exist.
    /// 实现数组读取负数元素
    function createArray(...elements){
        let handler = {
            get(target, propKey, receiver){
                let idx = Number(propKey);
                if(idx < 0){
                    propKey = String(target.length + idx);
                }
                return Reflect.get(target,propKey,receiver);
            }
        };
        let target = [];
        target.push(...elements);
        return new Proxy(target, handler);
    }
    let arr = createArray(1,2,3,4,5,6);
    console.log(arr[-1]); // 6
    console.log(arr[-10]); // undefined
    /// 上面的还不太好，超出长度就不能读取了，下面改造下
    function createArray2(...elements){
        let getIdx = (propKey,length)=>{
            let idx = Number(propKey);
            if(idx >= 0){
                if(idx >= length){
                    let a = parseInt(idx / length);
                    let b = parseInt(length - idx / length);
                    if(a % 2 === 0){
                        return b;
                    }
                    else{
                        return length - b;
                    }
                }
                else{
                    return idx;
                }
            }
            else{
                let a = parseInt(idx / length);
                let b = parseInt(length - idx / length);
                if(a % 2 === 0) return 0;
                else{
                    return length + b;
                }
            }

        };
        let handler = {
            get(target, propKey, receiver){
                let idx = getIdx(propKey, target.length);
                console.log('xxx',propKey, idx);
                propKey = String(idx);
                return Reflect.get(target,propKey,receiver);
            }
        };
        let target = [];
        target.push(...elements);
        return new Proxy(target, handler);
    }
    let arr2 = createArray2(1,2,3,4,5,6);
    //console.log(arr2[-1]);
    console.log(arr2[-10]);

    /// 利用Proxy，可以将读取属性的操作，转变为某个函数，从而实现属性的链式操作
    /// 这个很牛逼，很炫酷
    /// 将所有的操作存储起来，整合到一起
    let pipe = (function(){
        return function(value){
            var functionStack = [];
            var oproxy = new Proxy({},{
                get: function(pipObject, fnName){
                    if(fnName === 'get'){
                        return functionStack.reduce(function(val,fun){
                            return fun(val);
                        },value);
                    }
                    functionStack.push(global[fnName]);
                    return oproxy;
                }
            });
            return oproxy;
        };
    }());
    global.double = n=>n*2;
    global.pow = n=>n*n;
    global.reverseInt = n=> n.toString().split("").reverse().join("") | 0;

    console.log(pipe(3).double.pow.reverseInt.get); // 63

    /// 
    let p5 = new Proxy({},{
        get:function(target, property, receiver){
            return receiver;
        }
    });
    let p5_1 = Object.create(p5);
    console.log(p5.getReceiver === p5); // true
    console.log(p5_1.a === p5_1); // true
    /// 如果一个属性不可配置(configurable),并且不可以写(writable),则proxy不能修改该属性，
    /// 否则通过proxy对象访问该属性就会报错
    let p6 = Object.defineProperties({},{
        foo:{
            value: 123,
            writable: false,
            configurable: false
        }
    });
    let p6_1 = {get(target,propKey){
        return 'abc';
    }};
    let p6_2 = new Proxy(p6,p6_1);
    //p6_2.foo; //TypeError: 'get' on proxy: property 'foo' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '123' but got 'abc')

    /// set
    /// set方法用来拦截某个属性的赋值操作，可以接收四个参数，依次为目标对象，属性名，属性值和Proxy实例本身，其中
    /// 最后一个参数为可选
    let p7 = {
        set(obj, prop,value){
            if(prop === 'age'){
                if (!Number.isInteger(value)){
                    throw new TypeError('the age is not an integer.');
                }
                if(value > 200){
                    throw new RangeError('The age seems invalid');
                }
            }
            obj[prop] = value;
        }
    };
    let p71 = new Proxy({},p7);
    p71.age = 100;
    //p71.age = 'abc'; //TypeError: the age is not an integer.
    //p71.age = 300; // RangeError: The age seems invalid

    /// 下面的例子,通过proxy禁止外部访问和设置私有属性
    let p7_2 = {
        get(target, key){
            invariant(key,'get');
            return target[key];
        },
        set(target,key,value){
            invariant(key,'set');
            target[key] = value;
        }
    };
    function invariant(key, action){
        if(key[0] === '_'){
            throw new Error(`Invalid attempt to ${action} private '${key} property` );
        }
    }
    let p7_3 = new Proxy({},p7_2);
    //p7_3._idx; // Error: Invalid attempt to get private '_idx property
    //p7_3._idx = 10;//Error: Invalid attempt to set private '_idx property

    /// apply
    /// apply方法拦截函数调用
    /// apply方法可以接收三个参数,目标对象，目标对象的上下文对象(this),目标对象的参数数组
    let p8 = function(){return `i am p8.`;};
    var p8_1 = {
        apply:function(){return 'i am the proxy.';}
    };
    let p8_2 = new Proxy(p8,p8_1);
    console.log(p8_2()); //i am the proxy.

    let p8_3 = {
        apply(target, ctx, args){
            return Reflect.apply(...arguments) * 2;
        }
    };
    function sum(left, right){
        return left + right;
    }
    let p8_4 = new Proxy(sum, p8_3);
    console.log(p8_4(1,2)); // 6
    console.log(p8_4.call(null, 5,6)); // 22
    console.log(p8_4.apply(null, [5,6])); // 22
    console.log(Reflect.apply(p8_4,null, [9,10])); // 38

    /// has
    /// has用来拦截HasProperty操作，判断某个对象是否有某个属性时，这个方法会生效。
    /// 典型的操作是 in 运算符
    let p9 = {
        has (target,key){
            if(key[0] === '_'){
                return false;
            }
            return key in target;
        }
    }
    let p9_1 = {_prop: 'foo', prop:'foo2'};
    let p9_2 = new Proxy(p9_1,p9);
    console.log('_prop' in p9_2); // false
    console.log('prop' in p9_2); // true

    /// construct
    /// 用于拦截new命令
    /// construct方法可以接受两个参数,分别为: target:目标对象,args:构造函数的参数对象,newTarge:创造实例对象时，new命令作用的构造函数
    let p10 = new Proxy(function (){},{
        construct: function(target, args){
            console.log('called:' + args.join(', '));
            return {value: args[0] + 10};
        }
    });
    console.log((new p10(1)).value); // 11
    /// construct方法返回的必须是一个对象，否则会报错


    /// deleteProperty
    /// 用于拦截delete操作，如果这个方法抛出错误活着返回false，当前属性就不能被delete命令删除
    var p11 = {
        deleteProperty(target, key){
            invariant(key,'delete');
            return true;
        }
    };
    var p11_1 = {_prop:'foo'};
    var p11_2 = new Proxy(p11_1, p11);
    //delete p11_2._prop; // Error: Invalid attempt to delete private '_prop property
    /// 注意，目标对象自身的不可配置(configurable)属性，不能被deleteProperty方法删除，否则会报错

    /// defineProperty
    /// 拦截了Object.defineProperty操作
    let p12 = {
        defineProperty(target, key, descriptor){
            return false;
        }
    };
    let p12_1 = {};
    let p12_2 = new Proxy(p12_1, p12);
    p12_2.foo = 'bar';
    console.log(p12_2.foo);// undefined
    /// 如果目标对象不可扩展(extensible),则defineProperty不能增加目标对象上不存在的属性，否则会报错
    /// 如果目标对象的某个属性不可写(writable)或不可配置(configurable),则defineProperty不能修改这两个设置

    /// isExtensible 是否可以扩展
    /// isExtensible方法拦截Object.isExtensible操作
    let p13 = new Proxy({},{
        isExtensible(target){
            console.log('called');
            return true;
        }
    });
    console.log(Object.isExtensible(p13)); // true
    /// 该方法返回boolean值，如果，不是boolean值，则强制转换为boolean值
    /// 这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。
    let p13_1 = new Proxy({},{
        isExtensible: function(target){
            return false;
        }
    });
    //Object.isExtensible(p13_1);// TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')

    let p13_1_1 = {};
    /// Object.preventExtensions 经过这个方法处理过的对象,不影响原有对象的删除,修改.但是无法添加新的属性成员了.
    Object.preventExtensions(p13_1_1);
    let p13_2 = new Proxy(p13_1_1,{
        isExtensible: function(target){return false;}
    });
    console.log(Object.isExtensible(p13_2)); // false
    /// 感觉，没卵用啊，或许是理解不够深入吧

    /// ownKeys 用来拦截对象自身属性的读取操作
    /// Object.getOwnPropertyNames
    /// Object.getOwnPropertySymbols
    /// Object.keys
    /// for ... in  循环
    let p14 = {a:1, b:2, c:3};
    let p14_1 = {
        ownKeys(target){
            return ['a'];
        }
    }
    let proxy = new Proxy(p14, p14_1);
    console.log(Object.keys(proxy)); // [ 'a' ]
    console.log(Object.getOwnPropertyNames(proxy)); // [ 'a' ]
    console.log(Object.getOwnPropertySymbols(proxy)); // []
    for(let k in proxy) console.log(k); // a
    /// 过滤私有属性
    let p14_2 = {_bar:'foo',_prop:'bar',prop:'bar2'};
    let p14_2_1 = {
        ownKeys(target){
            return Reflect.ownKeys(target).filter(key=>key[0] !== '_');
        }
    };
    let p14_2_2 = new Proxy(p14_2,p14_2_1);
    for(let key of Object.keys(p14_2_2)){
        console.log(key); // prop
    }
    /// 使用Object.keys方法时，有三类属性会被ownKeys自动过滤
    /// 1. 目标对象上不存在的属性，2. 属性名为Symbol值，3. 不可遍历(enumerable)的属性
    /// ownKeys方法返回的数组，只能时字符串或者Symbol值，如果有其他类型的值，或者返回的
    /// 根本不是数组，就会报错。

    /// preventExtensions
    /// 拦截Object.preventExtensions方法，该方法必须返回一个boolean值，否则会自动转换为
    /// boolean值
    /// 只有目标对象不可扩展时，才能返回true,否则会报错。
    let p15 = new Proxy({},{
        preventExtensions(target){
            return true;
        }
    });
    //Object.preventExtensions(p15); // TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible
    let p15_1 = new Proxy({},{
        preventExtensions(target){
            /// 为了防止上面的问题，通常再调用一次Object.preventExtensions方法
            Object.preventExtensions(target);
            return true;
        }
    });
    console.log(Object.preventExtensions(p15_1));//{}

    /// setPrototypeOf
    /// 拦截Object.setPrototypeOf方法
    let p16 = {
        setPrototypeOf(target, proto){
            throw new Error('Changing the prototype is forbidden');
        }
    };
    var p16_1 = {};
    var p16_2 = function (){};
    var p16_3 = new Proxy(p16_2,p16);
    //Object.setPrototypeOf(p16_3,p16_1); // Error: Changing the prototype is forbidden
    /// 注意，该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（extensible），setPrototypeOf方法不得改变目标对象的原型。

    /// Proxy.revocable()
    /// 返回一个可以取消的Proxy实例
    {
        let p17 = {};
        let p17_1 = {};
        /// 注意: Proxy.revocable返回的是{proxy,revoke},所以，前面变量必须同名
        let {proxy,revoke} = Proxy.revocable(p17,p17_1);
        proxy.foo = 123;
        console.log(proxy.foo);
        revoke();
        console.log(proxy.foo); // TypeError: Cannot perform 'get' on a proxy that has been revoked
    }

    /// this问题
    /// 虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，
    /// 即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是
    /// 在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。

}

function main(){
    test_proxy();
}

main();