
/**
 * 获取时间戳
 */
function getTimeStamp(){
    // * 方法1
    let time_stamp_1 = Date.parse(new Date()); // * 这种方法只能精确到秒
    // * 方法2
    let time_stamp_2 = (new Date()).valueOf(); // * 精确到毫秒
    // * 方法3
    let time_stamp_3 = new Date().getTime(); // * 精确到毫秒
    console.log(time_stamp_1, time_stamp_2, time_stamp_3);
}

getTimeStamp();