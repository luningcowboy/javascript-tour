function CustomMath(){}

CustomMath.LianCheng = (baseValue, times)=>{
    let result = 1;
    for(let i = 0; i < times; ++i) result *= baseValue;
    return result;
};

module.exports = CustomMath;