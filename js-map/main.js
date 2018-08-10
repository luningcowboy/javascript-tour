//参考资料: http://es6.ruanyifeng.com/#docs/set-map
console.log('hello world');

let test_map = ()=>{
    /// object 提供的是string-value的对应，map提供的是object-value的对应
    /// 是更完善的hash结构实现
    const m = new Map();
    const p = {p: 'hello world'};
    m.set(p,'content');
    console.log(m.get(p)); // content
    console.log(m.has(p)); // true
    console.log(m.delete(p)); // true
    console.log(m.has(p)); // false
    /// map可以接受数组作为参数
    const m1 = new Map([
        ['name','章三'],
        ['sex','男'],
        ['age',12]
    ]);
    console.log(m1.size); // 3
    console.log(m1.has('name')); // true
    console.log(m1.get('name')); // 章三
    /// 上面构造函数解析的实质是
    const items = [
        ['name','章三'],
        ['sex','男'],
        ['age',12]
    ];
    const m2 = new Map();
    items.forEach(([key,value])=> m2.set(key,value));
    console.log(m2);
    /// 人好有iterator接口，其每个成员都是一个双元素的数据的结构，都可以当作Map构造函数的参数
    const s1 = new Set(
        [
            ['foo',1],['bar',2]
        ]    
    );
    const m3 = new Map(s1);
    console.log(m3);
    const [a1,a2] = [['a'],['a']];
    m3.set(a1,555);
    console.log(m3.get(a1),m3.get(a2)); // 555 undefined
    
    let m4 = new Map();
    m4.set(-0,123);
    console.log(m4.get(+0)); // 123

    m4.set(true,1);
    m4.set('true',2);
    console.log(m4.get(true),m4.get('true')); // 1 2

    m4.set(undefined,3);
    m4.set(null,4);
    console.log(m4.get(undefined),m4.get(null)); // 3 4

    m4.set(NaN,1234);
    console.log(m4.get(NaN)); // 1234

    //m4.delete(NaN);
    //console.log(m4); // Map { 0 => 123, true => 1, 'true' => 2, undefined => 3, null => 4 }

    //m4.clear();
    //console.log(m4); // {}
    /// 遍历
    for(let key of m4.keys()) console.log(key); // keys
    for(let value of m4.values()) console.log(value); // values
    for(let item of m4.entries()) console.log(item[0],item[1]); // item[0] = key, item[1] = value
    for(let [key, value] of m4.entries()) console.log(key, value);
    /// 等同于 m4.entries
    for(let [key, value] of m4) console.log(key, value);

    // map的默认遍历接口(Symbol.iterator)就是entries方法
    console.log(m4[Symbol.iterator] === m4.entries); // true
    // map ===> array
    console.log([...m4.keys()]); //[ 0, true, 'true', undefined, null, NaN ]
    console.log([...m4.values()]); //[ 123, 1, 2, 3, 4, 1234 ]
    console.log([...m4.entries()]);//[ [ 0, 123 ],[ true, 1 ],[ 'true', 2 ],[ undefined, 3 ],[ null, 4 ],[ NaN, 1234 ] ]
    console.log([...m4]);//[ [ 0, 123 ],[ true, 1 ],[ 'true', 2 ],[ undefined, 3 ],[ null, 4 ],[ NaN, 1234 ] ]
    // 通过数组的map和filter方法实现map的遍历和过滤
    let m5 = new Map().set(1,'a').set(2,'b').set(3,'c');
    let m5_1 = new Map([...m5].filter(([k,v])=> k < 3));
    console.log(m5_1); //Map { 1 => 'a', 2 => 'b' }
    let m5_2 = new Map([...m5].map(([k,v])=> [k * 2, `_${v}`]));
    console.log(m5_2); //Map { 2 => '_a', 4 => '_b', 6 => '_c' }
    // forEach 注意:第一个参数是value,第二个参数是key
    m5.forEach((v,k)=>{console.log(k,v);});
    // forEach 绑定 this
    const reporter = {
        reporter: function(key, value){
            console.log(`Key:${key},Value:${value}`);
        }
    };
    m5.forEach(function(v,k){
        this.reporter(k,v);
    },reporter);
    // Map ==> Object 要求map的key都是字符串
    let map2Obj = (map)=>{
        let obj = Object.create(null);
        for(let [k,v] of map){
            obj[k] = v;
        }
        return obj;
    };
    console.log(map2Obj(new Map([['yes',true],['no',false]]))); //{ yes: true, no: false }
    // Object ==> map
    let obj2Map = (obj)=>{
        let mp = new Map();
        // 这里的遍历有2中方案
        // 1. for(let xxx of xxxx)
        // for(let k in obj){
        //     mp.set(k,obj[k]);
        // }
        // 2.for(let k of Object.keys(obj)){ 
        for(let k of Object.keys(obj)){
            mp.set(k, obj[k]);
        }
        return mp;
    };
    console.log(obj2Map({yes: true,no: false})); //Map { 'yes' => true, 'no' => false }
    // map ==> json
    let map2Json = (map)=>{ // key 都是字符串的情况
        return JSON.stringify(map2Obj(map));
    };
    console.log(map2Json(new Map([['yes',true],['no',false]]))); //{"yes":true,"no":false}
    let map2ArrayJson = (map)=>{ // key 非字符串的情况
        return JSON.stringify([...map]);
    };
    console.log(map2ArrayJson(new Map([['1',1],[true,1],[false,0]]))); //[["1",1],[true,1],[false,0]]
    let json2Map = (json)=>{
        return obj2Map(JSON.parse(json));
    };
    console.log(json2Map('{"yes": true,"no":false}')); //Map { 'yes' => true, 'no' => false }
    let json2Map2 = (json)=>{// json 是数组
        return new Map(JSON.parse(json));
    };
    console.log(json2Map2('[[true,7],[{"foo":3},["abc"]]]')); //Map { true => 7, { foo: 3 } => [ 'abc' ] }
    // WeakMap
    /// 区别:   1. 只接受对象作为键名(null除外)
    ///        2. WeakMap键名指向的对象不计入垃圾回收机制 
    let wm1 = new WeakMap();
    //wm1.set(1,2); //TypeError: Invalid value used as weak map key
    //wm1.set(Symbol(),2); //TypeError: Invalid value used as weak map key
    //wm1.set(null,2); //TypeError: Invalid value used as weak map key
    /// get/set/has/delete 只有这几个方法，不支持遍历
};

let main = ()=>{
    test_map();
};
main();