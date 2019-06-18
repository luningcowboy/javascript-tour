let random = {};

random.normal = (min, max)=>{
    let ret = parseInt(Math.random() * max + min);
    return ret;
};
random.shuffle = (arr, times = 1)=>{
    for(let t = 0; t < times; ++t){
        for(let i = 0; i < arr.length; ++i){
            let tmp = arr[i];
            let idx = random.normal(0, arr.length);
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }
    return arr;
};
random.series = (min, max)=>{
    let arr = [];
    let idx = min;
    while(idx < max) arr.push(idx++);
    arr = random.shuffle(arr, random.normal(1, 4));
    return arr[0];
};
random.series2 = (min, max)=>{
    let arr = [];
    for(let i = min; i < max; ++i) arr.push(random.normal(min, max));
    arr = random.shuffle(arr, random.normal(1, 4));
    return arr[random.normal(0, arr.length)];
};
Math.seed = 6;
random.seededRandom = (min, max)=>{
    max = max || 1;
    min = min || 0;
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    let rnd = Math.seed / 233280;
    return parseInt(min + rnd * (max - min));
};
module.exports = random;
