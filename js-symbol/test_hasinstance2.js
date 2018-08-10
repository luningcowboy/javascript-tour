class Even1{
    static [Symbol.hasInstance](obj){
        return Number(obj) % 2 === 0;
    }
}

const Even2 = {
    [Symbol.hasInstance](obj){
        return Number(obj) % 2 === 0;
    }
}

module.exports = {Even1,Even2};