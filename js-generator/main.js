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