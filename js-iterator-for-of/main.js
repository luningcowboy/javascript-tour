let test = ()=>{
    console.log('iterator for...of ');
    {
        // ! 简单的遍历器实现
        function makeIterator(arr){
            let nextIdx = 0;
            return {
                next: ()=>{
                    return nextIdx < arr.length ? {value: arr[nextIdx++], done: false} : {value: undefined, done: true};
                }
            };
        }

        function makeIterator2(arr){
            let nextIdx = 0;
            return {
                next:()=>{
                    return nextIdx < arr.length ?
                        {value: arr[nextIdx++]}: {done: true};
                }
            };
        }

        let it = makeIterator(['a','b']);
        console.log(it.next(),it.next(),it.next()); // { value: 'a', done: false } { value: 'b', done: false } { value: undefined, done: true }
    }

    // ! 默认iterator接口
    {
        // ! for...of循环,使用for...of遍历某种数据结构的时候，该循环会自动去寻找iterator接口,
        // ! 一种数据结构主要部署了iterator接口，就是可遍历的
        // ! ES6中iterator接口部署在Symbol.iterator的属性，一个数据机构只要有这个属性就认为是可遍历的

        let obj = {
            [Symbol.iterator]:function(){
                return {
                    next: function(){
                        return {value:1, done: true};
                    }
                };
            }
        };
        // ! 可遍历对象的特点: 
        // !                1. 有Symbol.iterator属性，
        // !                2. 具有next方法，
        // !                3. next返回信息中有vaue,done属性

        // ! 原生具备iterator属性的数据结构: Array,Map,Set,String,TypedArray,函数的arguments,NodeList对象

        // ! 数组的Symbol.iterator属性
        let arr = ['a','b','c'];
        let iter = arr[Symbol.iterator]();
        console.log(iter.next(),iter.next(),iter.next(), iter.next()); // { value: 'a', done: false } { value: 'b', done: false } { value: 'c', done: false } { value: undefined, done: true }
        
        // ! 对象不原生支持Symbo.iterator是因为不知道从那个属性开始，从那个属性结束，所以需要开发者自己实现
        class RangeIterator{
            constructor(start, stop){
                this.value = start;
                this.stop = stop;
            }
            [Symbol.iterator](){return this;}
            next(){
                let value = this.value;
                if(value < this.stop){
                    this.value++;
                    return {done: false, value: value};
                }
                return {done: true, value: undefined};
            }
        }
        function range(start, stop){return new RangeIterator(start, stop)};
        for(let value of range(0,3)) console.log(value); // 0 1 2

        // ! 实现指针结构
        function Obj(value){
            this.value = value;
            this.next = null;
        }
        Obj.prototype[Symbol.iterator] = function(){
            var iter = {next: next};
            var current = this;
            function next(){
                if(current){
                    var value = current.value;
                    current = current.next;
                    return {done: false, value: value};
                }
                return {done: true};
            }
            return iter;
        };

        let one = new Obj(1);
        let two = new Obj(2);
        let three = new Obj(3);
        one.next = two;
        two.next = three;
        for(let i of one){
            console.log(i);
        }

        // ! 对于类似数组的对象可以直接引用数组的iterator属性部署接口
        // ! NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
        // ! NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
        // ! [...document.querySelectorAll('div')] // 可以执行了
        let iterable = {
            0: 'a',
            1: 'b',
            2: 'c',
            length: 3,
            [Symbol.iterator]: Array.prototype[Symbol.iterator]
        };
        for(let item of iterable) console.log(item); // a b c
        console.log([...iterable]); // [ 'a', 'b', 'c' ]
        // !  注意: 普通对象这样部署没有用的

        // ! 另一种循环
        let tmp_value = iterable.next();
        while(!tmp_value.done) {
            console.log(tmp_value);
            tmp_value = iterable.next();
        }
    }
};


test();