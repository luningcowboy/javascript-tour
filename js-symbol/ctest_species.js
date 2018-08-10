class MyArray extends Array{
    constructor(args){
        super(args);
    }
    static get [Symbol.species] (){
        return Array;
    }
}

module.exports = MyArray;