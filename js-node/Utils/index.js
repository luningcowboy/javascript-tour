let util = require('util');

// ! util.inherits
function Base(){
    this.name = 'Base';
    this.base = 1991;
    this.sayHello = function(){
        console.log('Hello' + this.name);
    };
}
Base.prototype.showName = function(){
    console.log(this.name);
};

function Sub(){
    this.name = 'sub';
}

util.inherits(Sub, Base);
let objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub = new Sub();
objSub.showName();
//objSub.sayHello();
// * Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。

// ! util.inspect
function Person(){
    this.name = "byvoid";
    this.toString = ()=>{
        return this.name;
    };
}

let objPerson = new Person();
console.log(util.inspect(objPerson));
console.log(util.inspect(objPerson, true));

// ! util.isArray

console.log(util.isArray([]));
console.log(util.isArray(new Array()));
console.log(util.isArray({}));

// ! util.isRegExp(object) 是否是正则表达式
console.log(util.isRegExp(/some regexp/));
console.log(util.isRegExp(new RegExp('another regexp')));
console.log(util.isRegExp({}));

// ! uitl.isError(object)
console.log(util.isError(new Error()));
console.log(util.isError(new TypeError()));
console.log(util.isError({}));

// ! util.isDate(object)
console.log(util.isDate(new Date()));
console.log(util.isDate(Date())); // false
console.log(util.isDate({}));