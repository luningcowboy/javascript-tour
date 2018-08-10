/// Symbol.for 生成只是外部无法引用，但，还是能被改写
/// const FOO_KEY = Symbol.for('foo');
/// 改写方法: global[Symbol.for('foo')] = {foo:123};
/// 使用Symbol外部无法引用，也就不能被改写了
const FOO_KEY = Symbol('foo');
function A(){
    this.foo = 'hello';
}
if(!global[FOO_KEY]) global[FOO_KEY] = new A();

module.exports = global[FOO_KEY];