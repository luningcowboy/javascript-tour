console.log(new Date().getTime());
console.log(new Date().getUTCDate());
console.log(new Date().getYear());
console.log(new Date().getFullYear());
console.log(new Date().getMonth() + 1);
console.log(new Date().getDay());

let one_day_time = 24 * 60 * 60 * 1000; // 一天的时间
let current_time = new Date();
let MondayTime = current_time.getTime() - (current_time.getDay() - 1 )* one_day_time;
let SundayTime = current_time.getTime() + (7 - current_time.getDay()) * one_day_time;

let Monday = new Date(MondayTime);
let Sunday = new Date(SundayTime);
console.log(Monday.getMonth() + 1, Monday.getDate(), Monday.getDay());
console.log(Sunday.getMonth() + 1, Sunday.getDate(), Sunday.getDay());

// 获取当前时间的上一个周末
function getSunday(time){
    let date = new Date(time);
    let day = date.getDay();
    let one_day_time = 24 * 60 * 60 * 1000;
    let sunday_time = date - day * one_day_time;
    return sunday_time;
    //let Sunday = new Date(sunday_time);
    //return `${Sunday.getFullYear()}-${Sunday.getMonth() + 1}-${Sunday.getDate()}`;
}
function getSaturday(time){
    let date = new Date(time);
    let day = date.getDay();
    let one_day_time = 24 * 60 * 60 * 1000;
    let saturday_time = date + (6 - day) * one_day_time;
    let Saturday = new Date(saturday_time);
    return formatDate(saturday_time);
}
// 格式化当前时间:年-月-日
function formatDate(time){
    let date = new Date(time);
    let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return str;
}
console.log(getSunday(new Date().getTime()));
console.log(formatDate(new Date().getTime()));
console.log(getSaturday(new Date().getTime()));


let DateUtils = require('./date_utils');
