let RAN = require('./random.js');
console.log('random', RAN);
let normal_ran = [];
for(let i = 0; i < 50; ++i){
    normal_ran.push(RAN.normal(0,10));
}
console.log(normal_ran.join(','));

let series_ran = [];
for(let i = 0; i < 50; ++i){
    series_ran.push(RAN.series(0,10));
}
console.log(series_ran.join(','));

series_ran = [];
for(let i = 0; i < 50; ++i){
    series_ran.push(RAN.series2(0,10));
}
console.log(series_ran.join(','));
series_ran = [];
for(let i = 0; i < 50; ++i){
    series_ran.push(RAN.seededRandom(0,10));
}
console.log(series_ran.join(','));
