class MySearch{
    constructor(value){
        this.value = value;
    }
    [Symbol.search](string){
        return this.value.indexOf(string);
    }
}

module.exports = MySearch;