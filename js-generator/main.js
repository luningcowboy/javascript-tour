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