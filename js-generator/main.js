console.log('js-generator');
// * Generator可以理解为一个状态机，封装了多个内部状态
// * Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历去对象生成器
// ! 特征
// * function关键字和函数名之间又一个星号
// * 函数体内部使用yield表达式,定义不同的内部状态(yield==>产出)
{
    function * helloGenerator(){
        yield 'hello';
        yield 'generator';
        return 'ending';
    }

    let hw = helloGenerator();
    console.log(hw,typeof hw,Reflect.ownKeys(hw));
    let hw2 = [...helloGenerator()];
    console.log(hw2,hw.next(),hw.next(),hw.next());
}
// * 由于Generator函数返回的遍历对象，只有调用next方法才会遍历下一个内部
// * 状态，所以其实提供了一种可以暂停执行的函数，yield表达式就是暂停标志。
// * yield方法的运行逻辑
// * 1. 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回对象的value属性值
// * 2. 下一次调用next方法时，在继续往下执行，知道遇到下一个yield表达式
// * 3. 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止,并将return语句后面的表达式的值，
// *    作为返回对象的value属性值.
// * 4. 如果函数没有return语句，则返回对象的value属性值为undefined
// ! 由于 yield 表达式后面的表达式，只有调用next方法,内部指针指向该语句的时候才会执行，因此，等于
// ! 为JavaScript提供了手动的'惰性求值'(LazyEvaluation)的语法功能。
{
    function* gen(){
        yield 123 + 456; // ! 这里不会立即求值，只会在next方法指针指向这一句的时候才会求值。
    }
}
// * Generator函数可以不包含yield表达式，这时候就变成了一个单纯的暂缓执行的函数
{
    function* f(){
        console.log('执行函数');
    }
    let g = f();
    setTimeout(() => {
        g.next();
    }, 500);
}
// ! yield表达式只能用在Generator函数中，用在其他任何地方都会报错
{
    let arr = [1,[[2,3],4],[5,6]];
    // let flat1 = function*(a){
    //     a.forEach(element => {
    //         if(typeof element !== 'number'){
    //             yield * flat1(element);
    //         }
    //         else{
    //             yield element;
    //         }    
    //     });
    // };
    let flat2 = function*(a){
        for(let i = 0; i < a.length; i++){
            let element = a[i];
            if(typeof element !== 'number'){
                yield * flat2(element);
            }
            else{
                yield element;
            }  
        }
    };

    for(let f of flat2(arr)){
        console.log(f);
    }
    // * flat1 使用了forEach，但是forEach方法的参数是一个普通函数，里面使用了yield,就辉报错
    // * 修改方法就是像 flat2中一样使用for循环
}
// ! yield 表达式如果放在另一个表达式中，必须放在圆括号里面
{
    function * demo(){
        //console.log('Hello' + yield); //SyntaxError: Unexpected identifier
        //console.log('Hello' + yield 123); // SyntaxError: Unexpected identifier
        console.log('hello' + (yield)); // ok
        console.log('hello' + (yield 123)); // ok
    }
}
// ! yield 表达式用作函数参数，或者放在赋值表达式的右边，可以不加括号
{
    function * demo(){
        foo(yield 'a', yield 'b');
        let input = yield;
    }
}
// ! 与 Iterator 接口的关系
// * 任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象
// * 由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给对象的Symbol.iterator属性，从而使该
// * 对象具有Iterator接口
{
    var myIterable = {};
    myIterable[Symbol.iterator] = function *(){
        yield 1;
        yield 2;
        yield 3;
    };
    console.log([...myIterable]); // [1,2,3]
}
// * Generator函数执行后，返回一个遍历器对象，该对象本身也具有Symbol.iterator属性，执行后返回自身.
{
    function * gen(){}
    let g = gen();
    console.log(g[Symbol.iterator]() === g); // true
}
// ! next 方法的参数
// * yield表达式本身没有返回值，或者说总是返回undefined, next方法可以带一个参数，该参数就会被当作
// * 上一个yield表达式的返回值.
// ! 这个功能的意义: 在Generator函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为.
// ! 注意:在第一次调用next的时候传参数是无效的,因为传入的参数代表的是上一次yield返回的值
{
    function * f(){
        for(let i = 0; true; i++){
            var reset = yield i;
            if(reset) i = -1;
        }
    }
    var g = f();
    console.log(g.next(),g.next(),g.next(true),g.next());// { value: 0, done: false } { value: 1, done: false } { value: 0, done: false } { value: 1, done: false }

    function * foo(x){
        let y = 2 * (yield (x + 1));
        let z = yield(y / 3);
        return x + y + z;
    }
    let a = foo(5);
    console.log(a.next(),a.next(),a.next());// { value: 6, done: false } { value: NaN, done: false } { value: NaN, done: true }
    let b = foo(5);
    console.log(b.next(),b.next(12), b.next(13));//{ value: 6, done: false } { value: 8, done: false } { value: 42, done: true }


    function * dataConsumer(){
        console.log('started');
        console.log(`1.${yield}`);
        console.log(`2.${yield}`);
        return 'result';
    }
    let genObj = dataConsumer();
    console.log(genObj.next(),genObj.next('a'),genObj.next('b'));
}