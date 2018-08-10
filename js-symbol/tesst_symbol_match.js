class MyMatcher{
    constructor(){}
    [Symbol.match](string){
        return 'hello world'.indexOf(string);
    }
}

module.exports = MyMatcher;