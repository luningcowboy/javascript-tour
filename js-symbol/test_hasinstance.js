/// 测试 hasInstance
class MyClass{
    [Symbol.hasInstance](foo){
        return foo instanceof Array;
    }
}

module.exports = MyClass;