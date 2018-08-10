class TestIsConcatSpreadAble extends Array{
    constructor(args){
        super(args);
        this[Symbol.isConcatSpreadable] = true;
    }
}
class TestIsConcatSpreadAble2 extends Array{
    constructor(args){
        super(args);
    }
    get [Symbol.isConcatSpreadable] (){
        return false;
    }
}
module.exports = {TestIsConcatSpreadAble,TestIsConcatSpreadAble2};