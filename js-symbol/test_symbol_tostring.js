class MyString{
    constructor(){}
    get [Symbol.toStringTag](){
        return 'myString';
    }
}

module.exports = MyString;