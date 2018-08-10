//http://es6.ruanyifeng.com/#docs/array
let test_array = ()=>{
    console.log('test_array start');
    /// 常用方法
    /// filter: 创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素.
    /// 1. 不会对空数组进行检测
    /// 2. 不会改变原始数组
    /// array.filter(function(currentValue, index, arr), thisValue);
    /// currentValue 当前元素的值
    /// index 当前元素的索引
    /// arr 当前元素属于的数组对象
    /// thisValue 
    /// 问题: 传入了a1, this输出的是{},传入o1，this也是{}
    let o1 = {
        max: 2
    };
    let isBig = (currentValue, index, array)=>{
        console.log(currentValue ,index, array, this);
        //console.log(this);
        return currentValue > 2;
    };
    let a1 = [1,2,3,4];
    let a1_1 = a1.filter(isBig,o1);
    //let a1_1 = a1.filter(isBig);
    console.log(a1_1, a1);
    /// map
    /// map 定义一个新数组，新数组的元素为，调用函数处理过的值
    /// map 不会对空数组进行检测
    /// map 不会修改原始数组
    /// 新数组的长度等于老数组的长度
    let a2 = [4,9,16,25];
    let a2_1 = a2.map(v=>{
        console.log(v);
        return v * 2;
    });
    console.log(a2, a2_1);
    /// some
    /// some 检测数组中的元素是否满足条件(函数提供)
    /// 会依次执行数组的每个元素,如果有一个元素满足条件则返回true,没有元素满足条件返回false
    let a3 = [1,2,3,4,5];
    let a3_1 = a3.some(v=>{return v > 3;}); // 是否有>3的元素
    console.log(a3, a3_1);  //[ 1, 2, 3, 4, 5 ] true
    /// every
    /// every 用于检测数组中所有元素是否都符合指定条件
    /// 如果有一个元素不满足则返回false,都满足则返回true
    let a4 = [1,2,3,4,5];
    let a4_1 = a4.every(v=>{return v < 4;}); // 是否都是小于4的元素
    console.log(a4, a4_1); // [ 1, 2, 3, 4, 5 ] false
    /// 扩展运算符 spread 其实就是 ...(三个点)
    let push = (arr, ...items)=>{arr.push(...items);};
    let add = (x, y)=>{return x + y;};
    let a5 = [3,4];
    console.log(add(...a5)); // 7
    let a6 = [1,2,3,4];
    push(a6,'a','b','c');
    console.log(a6); // [ 1, 2, 3, 4, 'a', 'b', 'c' ]
    /// 代替函数的apply方法
    let f1 = (x,y,z)=>{console.log(x,y,z);};
    let args = [0,1,2];
    /// es5
    f1.apply(null,args); // 0 1 2
    /// es6
    f1(...args); // 0 1 2
    let a7 = [14,3,77];
    console.log(Math.max.apply(null,a7)); // 77
    console.log(Math.max(...a7)); // 77
    /// 数组合并
    let [a8,a9] = [[0,1,2],[3,4,5]];
    /// es5
    Array.prototype.push.apply(a8,a9);
    console.log(a8); //[ 0, 1, 2, 3, 4, 5 ]
    /// es6
    let [a8_1,a9_1] = [[0,1,2],[3,4,5]];
    a8_1.push(...a9_1); //[ 0, 1, 2, 3, 4, 5 ]
    console.log(a8_1);
    /// 
    console.log(new (Date.bind.apply(Date,[null,2015,1,1]))); //2015-01-31T16:00:00.000Z
    console.log(new Date(...[2015,1,1])); //2015-01-31T16:00:00.000Z
    /// 扩展运算符的应用
    /// 1. 复制数组
    let a10 = [1,2];
    /// es5
    let a10_1 = a10.concat();
    console.log(a10_1); // [1,2]
    /// es6
    let a10_2 = [...a10]; // 方法1
    let [...a10_3] = a10; // 方法2
    console.log(a10_2,a10_3); //[ 1, 2 ] [ 1, 2 ]
    /// 2. 合并数组
    let a11_1 = ['a','b'];
    let a11_2 = ['c','d'];
    let a11_3 = ['e','f'];
    /// es5
    console.log(a11_1.concat(a11_2,a11_3)); // [ 'a', 'b', 'c', 'd', 'e', 'f' ]
    /// es6
    console.log([...a11_1,...a11_2,...a11_3]); //[ 'a', 'b', 'c', 'd', 'e', 'f' ]
    /// 以上两种方式都是浅拷贝，需要注意
    let [a12_1,a12_2] = [[{foo: 1}],[{bar: 2}]];
    let a12_3 = a12_1.concat(a12_2);
    let a12_4 = [...a12_1,...a12_2];
    console.log(a12_4[0] === a12_3[0],a12_4[1] === a12_3[1]); // true true
    /// 3. 有解构赋值组合
    let a13 = [1,2,3,4,5];
    let [a13_1,...a13_2] = a13;
    console.log(a13_1,a13_2); // 1 [ 2, 3, 4, 5 ]
    let [a13_3,...a13_4] = []; // undefined []
    console.log(a13_3,a13_4);
    let [a13_5, a13_6] = ['foo'];
    console.log(a13_5,a13_6); // foo undefined
    /// 扩展运算符只能放在参数的最后一位，否则报错
    //let [...a13_7,a13_8] = [1,2,3,4,5]; //SyntaxError: Rest element must be last element
    //let [a13_9,...a13_10,a13_11] = [1,2,3,4,5]; //SyntaxError: Rest element must be last element
    /// 4. 字符串
    /// 将字符串转换为真正的数组
    console.log([...'HelloWrold']); // [ 'H', 'e', 'l', 'l', 'o', 'W', 'r', 'o', 'l', 'd' ]
    /// 上面的写法能够正确识别4个字节的Unicode字符
    console.log('x\uD83D\uDE80y'.length); // 4
    console.log([...'x\uD83D\uDE80y'].length); // 3
    /// 更好的获取字符串长度的方案
    let len = str=>{return [...str].length;};
    console.log(len('x\uD83D\uDE80y')); // 3
    /// 凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写
    console.log('x\uD83D\uDE80y'.split('').reverse().join(''));
    console.log([...'x\uD83D\uDE80y'].reverse().join(''));
    /// 5. 实现了 Iterator接口的对象
    let a14 = {
        '0':'a','1':'b','2':'c',length:3
    };
    let a14_1 = [...Array.from(a14)];
    let a14_2 = Array.from(a14);
    console.log(a14_1,a14_2); // [ 'a', 'b', 'c' ] [ 'a', 'b', 'c' ]
    /// 6. Map,Set,Generator
    let a15 = new Map([[1,'one'],[2,'two'],[3,'three']]);
    let a15_1 = [...a15.keys()]; // [ 1, 2, 3 ]
    let fg = function*(){yield 1; yield 2; yield 3;};
    console.log([...fg()]); 
    console.log(a15_1); // [ 1, 2, 3 ]

    /// Array.from
    /// Array.from 用于将类似数组的对象(array-like-object)和可遍历(iterable)的对象(包括es6的Map和Set),转换为真正的数组
    let a16 = {'0':'a','1':'b','2':'c',length:3};
    /// es5
    console.log([].slice.call(a16)); // [ 'a', 'b', 'c' ]
    /// es6
    console.log(Array.from(a16)); // [ 'a', 'b', 'c' ]

    /// Array.of
    /// Array.of 用于将一组值转换为数组
    console.log(Array.of(1,2,3,4), Array.of(1,2,3,4).length); // [ 1, 2, 3, 4 ] 4
    /// Array.of 代替方法
    let arrayOf = ()=>{return [].slice.call(arguments);}; /// 这个方法不可行,输出不对， 你妹
    console.log(arrayOf(1,2,3,4,5).length);
    let tmp_a = arrayOf(1,2,3,4,5);
    tmp_a.forEach(e => {
        console.log(e);
    });

    //copyWithin
    let a17 = [1,2,3,4,5];
    let a17_1 = a17.copyWithin(0,3);
    console.log(a17_1); // [ 4, 5, 3, 4, 5 ]
    let a17_2 = a17.copyWithin(0,2,4); 
    console.log(a17_2); // [ 3, 4, 3, 4, 5 ]
    let a17_3 = a17.copyWithin(0,-2,-1); // -2:3 -1:4
    console.log(a17_3);// [ 4, 4, 3, 4, 5 ]
    let a17_4 = [].copyWithin.call({length:5,3:1},0,3); // 操作类数组元素
    console.log(a17_4); // { '0': 1, '3': 1, length: 5 }
    let a17_5 = [].copyWithin.call(new Int32Array([1,2,3,4,5]),0,3,4);
    console.log(a17_5); //Int32Array [ 4, 2, 3, 4, 5 ]
    let a17_6 = [].copyWithin.call([1,2,3,4,5],0,3,4);
    console.log(a17_6); // [ 4, 2, 3, 4, 5 ]
    /// find findIndex
    /// find 用于找到符合条件的第一个元素
    let a18 = [1,2,3,4,5].find(e=>e>3);
    console.log(a18); // 4
    let a18_1 = [1,2,3,4,5].find((value, index, arr)=>{
        console.log(value, index, arr);
        return value > 10;
    });
    console.log(a18_1);//undefined 没有符合条件的元素，返回undefined
    /// findIndex 用于返回第一个满足条件的元素的index
    let a18_2 = [1,2,3,4,5].findIndex(e=>e>3);
    console.log(a18_2); // 3
    let a18_3 = [1,2,3,4,5].findIndex((value, index, arr)=>{
        console.log(value, index, arr);
        return value > 5;
    });
    console.log(a18_3);// -1 没有符合条件的元素，返回-1
    /// 绑定this
    let person = {name:'Tom',age:20};
    let f = v=>{return v > this.age;};
    let a18_4 = [10,12,15,26].find(f,person); // 卧槽，这里不管用，不能用
    console.log(a18_4);// undefined

    /// fill(value, start, end)
    console.log(['a','b','c'].fill(7));// [ 7, 7, 7 ]
    console.log(new Array(10).fill(8));// [ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8 ]
    console.log(['a','b','c'].fill(7,1,2)); // [ 'a', 7, 'c' ]
    console.log(['a','b','c'].fill(7,0,3)); // [ 7, 7, 7 ]
    /// 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象
    let a19_1 = new Array(3).fill({name: 'Tom'});
    console.log(a19_1); // [ { name: 'Tom' }, { name: 'Tom' }, { name: 'Tom' } ]
    a19_1[0].name = 'Brown';
    console.log(a19_1);
    let a19 = new Array(3).fill([]);
    console.log(a19); // [ [], [], [] ]
    a19[0].push(5); // [ [ 5 ], [ 5 ], [ 5 ] ]
    console.log(a19);

    /// entries keys values
    for(let idx of ['a','b'].keys()) console.log(idx); // 0 1
    /// 擦，报错了，理论上不应该这样的
    //for(let v of ['a','b'].values()) console.log(v);// TypeError: ["a","b"].values(...) is not a function or its return value is not iterable
    for(let [idx,value] of ['a','b'].entries()) {
        console.log(idx, value); // 0 'a' 1 'b'
    }
    let a20 =['a','b','c'];
    let entries = a20.entries();
    console.log(entries.next().value);//[ 0, 'a' ]
    console.log(entries.next().value);//[ 1, 'b' ]
    console.log(entries.next().value);//[ 2, 'c' ]
    
    /// includes 返回一个boolean值，表示某个数组是否包含给定的值
    console.log([1,2,3].includes(1)); // true
    console.log([1,2,3].includes(4)); // false
    console.log([1,2,NaN].includes(NaN)); // true

    /// 数组的空位
    console.log(new Array(3)); // [ <3 empty items> ]
    /// 空位不是undefined，一个位置的值等于undefined，依然是有值的
    console.log(0 in [undefined,undefined,undefined]); // true
    console.log(0 in [,,]); // false
    /// forEach, filter, reduce, every, some 都会跳过空位
    /// map 会跳过空位，但会保留这个值
    /// join toString 会将空位视为undefined,而undefined和null会被处理成空字符串
    [,'a'].forEach(e=>console.log(e)); // a
    ['a',,'b'].forEach(e=>console.log(e)); // a b
    [,'a'].forEach(e=>console.log(e==='a'));// true
    console.log([1,,2].reduce((x,y)=>{return x+y;})); // 3
    console.log([,'a'].some(x=> x!=='a')); // false
    console.log([,'a'].map(x => 1)); // [ <1 empty item>, 1 ]
    console.log([,'a',undefined,null,'b'].join('#')); // #a###b
    console.log([...'abcdef'].join(',')); // a,b,c,d,e,f 字符串拆分方法
    console.log(['a',null,'b',undefined].toString());// a,,b,
    /// ES6直接将空位转为undefined
    console.log(Array.from(['a',,'b']));// [ 'a', undefined, 'b' ]
    console.log([...['a',,'b']]);// [ 'a', undefined, 'b' ]
    console.log([,'a','b',,].copyWithin(2,0)); // [ <1 empty item>, 'a', <1 empty item>, 'a' ]
    console.log(new Array(3).fill('a')); // [ 'a', 'a', 'a' ]
    let a21 = [,,];
    for(let i of a21) console.log(i);// undefined undefined
    /// 空位的处理规则非常的不统一，尽量避免出现空位

    console.log('test_array end');

};

let main = ()=>{
    test_array();
};
main();