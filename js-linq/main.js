//https://www.cnblogs.com/qwangxiao/p/8909391.html
let Enumerable = require('./linq.js');
{
    // ! 1. 根据lambda表达式创建匿名函数
    let func = Enumerable.Utils.createLambda('x=>x*2');
    console.log( func(5)); // 10
    // ! 2. repeat(count) 由count个该元素组成的新数组
    let d1 = Enumerable.repeat(['a','b'],3).toArray();
    console.log(d1); // [ [ 'a', 'b' ], [ 'a', 'b' ], [ 'a', 'b' ] ]    
    // ! 3. 条件查询
    let myList = [
        {Name:'Jim',Age: 20},
        {Name:'Kate',Age: 20},
        {Name:'LiLei',Age: 20},
        {Name:'John',Age: 14},
        {Name:'LinTao',Age: 25},
    ];
    let arrRes = Enumerable.from(myList).where("x=>x.Name=='Jim'").toArray();
    console.log(arrRes); // [ { Name: 'Jim', Age: 20 } ]
    // ! 4. 条件选择
    var arr2 = Enumerable.from(myList).select("x=>x.Age*10").toArray();
    console.log(arr2); // [ 200, 210, 180, 140, 250 ]
    // ! 5. 排序，去重: orderBy, distinct
    let arr3 = Enumerable.from(myList).distinct("x=>x.Age").toArray();
    console.log(arr3); // [ { Name: 'Jim', Age: 20 },{ Name: 'John', Age: 14 },{ Name: 'LinTao', Age: 25 } ]
    let arr4 = Enumerable.from(myList).orderBy('x=>x.Age').toArray();
    console.log(arr4);
    // ! 6. 遍历 forEach
    Enumerable.from(myList).forEach((value,index)=>{
        console.log(value,index);
    });
    // ! 7. 取唯一对象 first, firstOrDefault, last, lastOrDefault, single, singleOrDefault
    // ! 8. skip, take
    console.log(Enumerable.range(1,10).skip(5).toArray()); // [ 6, 7, 8, 9, 10 ]
    console.log(Enumerable.range(1,10).take(5).toArray()); // [ 1, 2, 3, 4, 5 ]
    // ! 9. 取交集，取差集，取并集 
    let arr5 = [1,2,3,4,5,6,7];
    let arr6 = [3,4,5,6,8,9,0];
    console.log(Enumerable.from(arr5).except(arr6).toArray()); // [ 1, 2, 7 ]
    console.log(Enumerable.from(arr5).intersect(arr6).toArray()); // [ 3, 4, 5, 6 ]
    console.log(Enumerable.from(arr5).union(arr6).toArray()); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]

}