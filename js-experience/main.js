
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


function luckyValue(array, lucky_rate){
    let sum = 0;
    let max = 0;
    for(let i = 0; i < array.length; ++i){
        let r = array[i];
        for(let j = 0; j < r.length; ++j){
            if(array[i][j] > 0){
                sum += array[i][j];
                max++;
            }
        }
    }
    let mid = sum / max;
    let lucky_add = lucky_rate * mid;
    let add_value = Math.random() > 0.5 ? lucky_add : -lucky_add;
    let lucky_value = mid + add_value;
    lucky_value = lucky_value < 1 ? 1 : lucky_value;
    console.log(lucky_rate, mid, parseInt(lucky_value));
    return parseInt(lucky_value);
}

function testLuckyValue(){
    let array = [
        [1,5,6],
        [9,0,4],
        [3,2,5]
    ];
    let rates = [0.05,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95];
    for(let i = 0; i < rates.length; i++){
        let lucky_info = `rate:${rates[i]}===>`;
        for(let j = 0; j < 5; ++j){
            let lucky = luckyValue(array, rates[i]);
            lucky_info += lucky + "  ";
        }
        console.log(lucky_info);
    }
}

function createMap(row, col){
    let map = [];
    for(let r = 0; r < row; ++r){
        let tmp_row = [];
        for(let c = 0; c < col; ++c){
            tmp_row.push(0);
        }
        map.push(tmp_row);
    }
    console.log(map);
    let values = [1,2,3,4,5];
    for(let r = 0; r < row; ++r){
        let tmp_row = map[r];
        for(let c = 0; c < col; ++c){
            tmp_row[c] = values[parseInt(Math.random() * values.length)];
        }
    }
    console.log(map);
}

//getTimeStamp();

createMap(5,5);

