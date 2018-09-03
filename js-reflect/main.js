
let test_reflect = ()=>{
    console.log('test_reflect');
    // * Reflect是为了操作对象而提供的新API
    // * 设计目的:
    // * 1. 将Object对象的一些明显属于语言内部的方法，放到Reflect对象上
    // * 2. 修改某些Object方法的返回结果，使其变的更合理
    // * 声明一个属性
    {
        /*
        // 老写法
        try{
            Object.defineProperty(target, property, attributes);
            // success
        }
        catch(e){
            // failure
        }
        // 新写法
        if(Reflect.defineProperty(target, property, attributes)){
            // success
        }
        else{
            // failure
        }
        */
       
    }
    // * 让Object操作都变成函数行为
    // * 某些Object操作是命令式的，比如: name in obj 和 delete obj[name],
    // * 而Reflect.has(obj,name) 和 Reflect.deleteProperty(obj, name)让他们变成函数行为
    {
        // * 老写法
        // ! 'assign' in Object
        // * 新写法
        // ! Reflect.has(Object, 'assign')
    }
    // * Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象
    // * 上找到对应的方法.
    // ! 不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为
    {
        // * 老写法
        console.log(Function.prototype.apply.call(Math.floor, undefined, [1.75])); // 1
        // * 新写法
        console.log(Reflect.apply(Math.floor, undefined, [1,75])); // 1
    }

    // * 静态方法
    // ! Reflect.apply(target, thisArg, args)
    // ! Reflect.construct(target, args)
    // ! Reflect.get(target, name, receiver)
    // ! Reflect.set(target, name, value, receiver)
    // ! Reflect.defineProperty(target, name, desc)
    // ! Reflect.deleteProperty(target, name)
    // ! Reflect.has(target, name)
    // ! Reflect.ownKeys(target)
    // ! Reflect.isExtensible(target)
    // ! Reflect.preventExtensions(target)
    // ! Reflect.getOwnPropertyDescriptor(target, name)
    // ! Reflect.getPrototypeOf(target)
    // ! Reflect.setPrototypeOf(target, prototype)
    {
        // * Reflect.get(target, name, receiver)
        let myObj = {
            foo: 1,
            bar: 2,
            get baz(){
                return this.foo + this.bar;
            }
        };
        console.log(Reflect.get(myObj,'foo')); // 1
        console.log(Reflect.get(myObj,'bar')); // 2
        console.log(Reflect.get(myObj,'baz')); // 3
        // * 如果name属性部署了了读取函数(getter),则读取函数的this绑定receiver
        let myReciverObj = {
            foo: 4,
            bar: 4
        };
        console.log(Reflect.get(myObj,'baz',myReciverObj)); // 8

        // * 如果第一个参数不是对象，那么Reflect.get方法会报错
    }
    // * Reflect.set(target, name, value, receiver)
    {
        let myObj = {
            foo: 1,
            set bar(value){
                return this.foo = value;
            }
        };
        console.log(myObj.foo); // 1
        Reflect.set(myObj, 'foo',2);
        console.log(myObj.foo); // 2
        Reflect.set(myObj, 'bar',3);
        console.log(myObj.foo); // 3
        // * 如果name属性设置了赋值函数， 则赋值函数的this绑定receiver
        let myReciverObj = {
            foo: 0,
        };
        Reflect.set(myObj,'bar',1,myReciverObj);
        console.log(myObj.foo); // 3
        console.log(myReciverObj.foo); // 1
    }
    // * Reflect.has(obj, name)
    {
        let myObj = {foo: 1};
        console.log('foo' in myObj); // true
        console.log(Reflect.has(myObj, 'foo')); // true
    }
    // * Reflect.deleteProperty(Obj, name)
    {
        let myObj = {
            foo: 'bar'
        };
        // ! 旧写法
        console.log(delete myObj.foo); // true
        // ! 新写法
        console.log(Reflect.deleteProperty(myObj,'foo')); // true
    }
    // * Reflect.construct(target, args)
    // * 等同于 new target(...args),这里提供了一种不使用new来调用构造函数的方法
    {
        function Greeting(name){
            this.name = name;
        }
        // ! 旧写法
        const instance = new Greeting('张三');
        // ! 新写法
        const instance_2 = Reflect.construct(Greeting,['张三']);
    }

    // * Reflect.getPrototypeOf(obj)
    // * 等同于Object.getPrototypeOf(obj)
    {
        function Greeting(name){
            this.name = name;
        }
        let n = new Greeting('章三');
        // ! 旧写法
        console.log(Object.getPrototypeOf(n) === Greeting.prototype); // true
        // ! 新写法
        console.log(Reflect.getPrototypeOf(n) === Greeting.prototype); // true

        // * Object.getPrototypeOf 和 Reflect.getPrototypeOf 的一个区别:
        // * 如果参数不是对象,Object.getPrototypeOf会将这个参数转为对象，
        // * Reflect.getPrototypeOf会报错
        console.log(Object.getPrototypeOf(1)); // [Number: 0]
        //console.log(Reflect.getPrototypeOf(1)); // TypeError: Reflect.getPrototypeOf called on non-object
    }

    // * Reflect.setPrototypeOf(obj, newProto)
    {
        const myObj = {};
        Object.setPrototypeOf(myObj, Array.prototype);
        Reflect.setPrototypeOf(myObj, Array.prototype);
        console.log(myObj.length); // 0
        // * 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数，
        // * Reflect.setPrototypeOf 会报错
        console.log(Object.setPrototypeOf(1, {})); // 1
        //console.log(Reflect.setPrototypeOf(1,{})); // TypeError: Reflect.setPrototypeOf called on non-object
        // * 如果第一个参数是undefined/null,两个都会报错
    }

    // * Reflect.apply(func, thisArg, args)
    // * 等同于 Function.prototype.apply.call(func, thisArg, args),用于绑定this对象后执行给定函数
    {
        const args = [11,33, 12, 54, 18, 96];
        // ! 旧写法
        let y0 = Math.min.apply(Math, args);
        let o0 = Math.max.apply(Math, args);
        let t0 = Object.prototype.toString.call(y0);

        // ! 新写法
        let y1 = Reflect.apply(Math.min, Math, args);
        let o1 = Reflect.apply(Math.max, Math, args);
        let t1 = Reflect.apply(Object.prototype.toString, y1,[]);

        console.log(y0,y1, o0,o1, t0, t1); // 11 11 96 96 '[object Number]' '[object Number]'
    }

    // * Reflect.defineProperty(target, propertyKey, attributes)
    // * 等同于Object.defineProperty, 用来为对象定义属性
    {
        function myFun(){}
        Object.defineProperty(myFun, 'now',{
            value: ()=>Date.now()
        });
        Reflect.defineProperty(myFun, 'xxx',{
            value: ()=>'xxxx'
        });
        let m1 = Reflect.construct(myFun,[]);
        console.log(m1, m1.now, m1.xxxx); // myFun {} undefined undefined
    }

    // * Reflect.getOwnPropertyDescriptor(target, propertyKey)
    // * 等同于Object.getOwnPropertyDescriptor(),拥堵得到指定属性的描述对象
    {
        let myObj = {};
        Object.defineProperty(myObj, 'hidden',{
            value: true,
            enumerable: false
        });
        console.log(Object.getOwnPropertyDescriptor(myObj, 'hidden'));
        console.log(Reflect.getOwnPropertyDescriptor(myObj, 'hidden'));
    }

    // * Reflect.isExtensible(target)
    {
        let myObj = {};
        console.log(Object.isExtensible(myObj)); // true
        console.log(Reflect.isExtensible(myObj)); // true
        console.log(Object.isExtensible(1)); // false
        console.log(Reflect.isExtensible(1)); // TypeError: Reflect.isExtensible called on non-object
    }

    // * Reflect.preventExtensions(target)
    // * 对应Object.preventExtensions,用于让一个对象变为不可扩展，返回一个布尔值，表示是否操作成功
    {
        let myObj = {};
        Object.preventExtensions(myObj);
        Reflect.preventExtensions(myObj);
    }


};

let main = ()=>{
    test_reflect();
};

main();