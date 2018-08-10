class Collection{
    *[Symbol.iterator](){
        let i = 0;
        while(this[i] !== undefined){
            yield this[i];
            ++i;
        }
    }
}

module.exports = Collection;