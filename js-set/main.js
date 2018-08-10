//参考资料:http://es6.ruanyifeng.com/#docs/set-map
let test_set = ()=>{
    //如果想在遍历中，同步修改set的结构，只有以下两种方法
    let s1 = new Set([1,2,3]);
    s1 = new Set([...s1].map(v=>v*2));

    let s2 = new Set([1,2,3]);
    s2 = new Set(Array.from(s2, v=>v*2));

    console.log(s1,s2); // Set { 2, 4, 6 } Set { 2, 4, 6 }
    //WeakSet
    /// 与set的区别
    /// 1. 成员只能是对象
    /// 2. 对对象都是弱引用，gc不会考虑WeakSet对对象的引用
    /// 因为2,所以，weakset不可遍历
    const ws = new WeakSet();
    //ws.add(1); //TypeError: Invalid value used in weak set
    //ws.add(Symbol()); //TypeError: Invalid value used in weak set
    let ws1 = new WeakSet([[1,2],[3,4]]); // ok
    //let ws2 = new WeakSet([3,4]); //TypeError: Invalid value used in weak set
    /// weakset 接口 add,delete,has
    let ob1 = {};
    let ob2 = {};
    ws1.add({});
    ws1.add(ob1);
    ws1.add(ob2);
    console.log(ws1.has(ob1)); // true
    console.log(ws1.has(ob2)); // true
    console.log(ws1.delete(ob1)); // true
    console.log(ws1.has(ob1)); // false
    console.log(ws1.size); // undefined
    console.log(ws1.forEach); // undefined
};

function main(){
    test_set();
}
main();