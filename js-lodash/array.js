var _ = require('lodash');
// * _.chunk(array, size = 1)
// * 创建一个元素数组，分成长度为size,如果元素不能均匀分割，最后的块将包含剩余的元素
console.log(_.chunk([1,2,3,4,5,6,7],2));//  [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7 ] ]
console.log(_.chunk('abcde',3));// [ [ 'a', 'b', 'c' ], [ 'd', 'e' ] ]

// * _.compact(array) 创建一个数组，删除其中所有falsey值
// * false, null, 0, "", undefined, NaN都是falsey值
console.log(_.compact([0,1,2,'',3,"",NaN,4,5,undefined,6,false, 7, true, 8, null, 9]));// [ 1, 2, 3, 4, 5, 6, 7, true, 8, 9 ]

// * _.concat(array, values)
// * 创建array与任何其他数组或值，连接为新数组
console.log(_.concat([1,2],3,[4,[5]],[[6]])); // [ 1, 2, 3, 4, [ 5 ], [ 6 ] ]
// ! 嵌套的数值并不能合并

// * _.difference(array, values)
// * array 使用 SameValueZero想等性比较创建未包含在其它给定数组中的值数组，结果值的顺序和引用，由第一个数组确定
// ! array中有，而values中没有的元素, 返回的是一个新数组
console.log(_.difference([1,2],[2,3]));

// * _.differenceBy(array, values, iteratee=_.identity)
// ! 通过iteratee对比
console.log(_.differenceBy([2.1, 1.2],[2.3, 3.4], Math.floor));//[ 1.2 ]
console.log(_.differenceBy([{x:2},{x:1}],[{x:1}], 'x'));// [ { x: 2 } ]

// * _.differenceWith(array, values, comparator)
// * 通过comparator方法进行对比
console.log(_.differenceWith([{'x':1, 'y':2},{'x':2, 'y':1}], [{'x':1, 'y':2}], _.isEqual));//[ { x: 2, y: 1 } ]

// * _.drop(array, n=1)
// * 删除n之前的部分，生成一个新数组
console.log(_.drop([1,2,3])); // [2, 3]
console.log(_.drop([1, 2, 3],2)); // [3]
console.log(_.drop([1, 2, 3], 5)); // []
console.log(_.drop([1, 2, 3], 0)); // [1, 2, 3]

// * _.dropRight(array, n=1)
console.log(_.dropRight([1,2,3])); // [1, 2]
console.log(_.dropRight([1,2,3], 2)); // [1]
console.log(_.dropRight([1,2,3], 5)); // []
console.log(_.dropRight([1, 2, 3], 0)); // [1, 2, 3]

let users = [
    {'user': 'barney', 'active': true},
    {'user': 'fred', 'active': false},
    {'user': 'pebbles', 'active': false}
];
console.log(_.dropRightWhile(users, o=>!o.active)); // [ { user: 'barney', active: true } ]

users = [
    {'user': 'barney', 'active': false},
    {'user': 'fred', 'active': true},
    {'user': 'pebbles', 'active': false}
];
console.log(_.dropWhile(users, o=>!o.active)); // [ { user: 'fred', active: true },{ user: 'pebbles', active: false } ]

// * _.fill(array, value, start = 0, end = array.length)
// * 用value填充array,区间是[start, end), 不包括end
console.log(_.fill([1,2,3],0,0,2)); // [ 0, 0, 3 ]
console.log(_.fill(Array(3), 2)); // [ 2, 2, 2 ]
console.log(_.fill(new Array(3), 2)); // [ 2, 2, 2 ]
console.log(_.fill([1,2,3,4], "*", 1, 3)); // [ 1, '*', '*', 4 ]

// * _.findIndex(array, predicate = _.indentity, fromIndex = 0)
// * 查找指定元素，通过值匹配，返回元素index, 只返回找到的第一个元素
users = [
    {'user': 'barney', 'active': false},
    {'user': 'fred', 'active': true},
    {'user': 'fred', 'active': false}
];
console.log(_.findIndex(users, obj=>obj.user==='fred')); // 1
console.log(_.findIndex(users, {'user': 'fred', 'active': true})); // 1

// * _.findLastIndex(array, predicate = _.indentify, fromIndex = array.length - 1)
// * 查找指定元素，倒序查找，返回找到的第一个元素的index
console.log(_.findLastIndex(users,obj=>obj.user==='fred')); // 2

// * _.flatten(array)
// * 以单一的深度统一array, 只能统一一层
// * 比如：数组中有一维数组和二维数组，只能统一以为数组，再深层次的不能统一
console.log(_.flatten([1, [2, [3, [4]], 5]])); // [ 1, 2, [ 3, [ 4 ] ], 5 ]

// * _.flattenDeep(array)
// * 能够统一所有深度的数组
console.log(_.flattenDeep([1, [2, [3, [4,[6,7,[8]]]], 5]])); // [ 1, 2, 3, 4, 6, 7, 8, 5 ]


// * _.flattenDepth(array, depth = 1)
// * 统一数组，能够指定深度
console.log(_.flattenDepth([1, [2, [3, [4,[6,7,[8]]]], 5]], 2));//  [1, 2, 3, [ 4, [ 6, 7, [Array] ] ], 5 ]
console.log(_.flattenDepth([1, [2, [3, [4,[6,7,[8]]]], 5]], 3));// [ 1, 2, 3, 4, [ 6, 7, [ 8 ] ], 5 ]

// * _.fromPairs(pairs)
// * 生成一个键值对的object, 类似es6中通过数组新建map的功能
console.log(_.fromPairs([['a',1], ['b', 2]])); // { a: 1, b: 2 }
console.log(new Map([['a',1], ['b', 2]])); // Map { 'a' => 1, 'b' => 2 }

// * _.head(array)
// * 获取array的第一个元素
console.log(_.head([1,2,3,4]));// 1

// * _.indexOf(array, value, fromIndex = 0)
// * 与数组的indexOf方法功能一样
// # Deprecated==> 有原生算法支持，貌似没有原生算法效率高
console.log(_.indexOf(['a',{b:1}], {b:1})); // -1
console.log(_.indexOf(['a','b','c'],'c')); // 2
/*
let arr = [];
for(let i = 0; i < 10000000; ++i){
    arr.push(i);
}
console.log('time==>',new Date().getMilliseconds()); // time==> 146
console.log(_.indexOf(arr,999999));
console.log('time==>',new Date().getMilliseconds()); // time==> 151
console.log(arr.indexOf(999999));
console.log('time==>',new Date().getMilliseconds()); // time==> 152
*/
// ! 貌似原生的效率高些

// * _.initial(array)
// * 获取数组最后一个元素之外的所有元素
console.log(_.initial([1,2,3])); // [1, 2]

// * _.intersection(arrays)
// * 查找数组中的共同元素
console.log(_.intersection([1,2,3],[2,3,4])); // [2,3]


// * _.join(array, separator=',')
// * 数组生成字符串，以指定的separator隔开，有原生算法支持
// # Deprecated==> 有原生算法支持
console.log(_.join([1,2,3],'-')); // 1-2-3
console.log([1,2,3].join('*')); // 1*2*3

// * _.last(array)
// * 获取数组的最后一个元素
console.log(_.last([1,2,3])); // 3

// * _.lastIndexOf(array, value, fromIndex=array.length - 1)
// * 获取指定元素最后一次出现的index
console.log(_.lastIndexOf([1,2,3], 2)); // 1

// * _.nth(array, index) 
// * 获取指定index初数组的值, index可以为负数, 跟python类似了
console.log(_.nth([0,1,2,3], 2)); // 2
console.log(_.nth([0,1,2,3], -1)); // 3

// * _.pull(array, values)
// * 删除所有给定值的元素
console.log(_.pull([0,1,2,3, 4, 3],1,3)); // [0, 2, 4]

// * _.pullAll(array, values)
// * 作用与_.pull一样，不同的是，要删除的元素以数组的形式传入
console.log(_.pullAll([0,1,2,3,4,3],[1,3])); // [ 0, 2, 4 ]

console.log([0,1,2,3,4].reverse());// [ 4, 3, 2, 1, 0 ]



