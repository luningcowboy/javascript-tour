function createUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "";

    var uuid = s.join("");
    return uuid;
}

let rank_data = [
    {
        "name": "?诠释?",
        "lines": 35918
    },
    {
        "name": "平和的人",
        "lines": 35658
    },
    {
        "name": "北冰洋的水晶",
        "lines": 35532
    },
    {
        "name": "黎小莉",
        "lines": 35498
    },
    {
        "name": "苍海一笑",
        "lines": 35482
    },
    {
        "name": "诗和远方",
        "lines": 35465
    },
    {
        "name": "地狱天使星",
        "lines": 35450
    },
    {
        "name": "家人幸福就是我的幸福",
        "lines": 35406
    },
    {
        "name": "高价收驾驶证分！处理违章",
        "lines": 35389
    },
    {
        "name": "随风",
        "lines": 35365
    },
    {
        "name": "柔情似水",
        "lines": 35302
    },
    {
        "name": "狼图腾",
        "lines": 35086
    },
    {
        "name": "print，li。",
        "lines": 35035
    },
    {
        "name": "秀色家园",
        "lines": 34911
    },
    {
        "name": "✨ 何鎵小曦 ✨",
        "lines": 34909
    },
    {
        "name": "yong南",
        "lines": 34900
    },
    {
        "name": "财神爷爷",
        "lines": 34784
    },
    {
        "name": "铃铛",
        "lines": 34579
    },
    {
        "name": "丽娟",
        "lines": 34562
    },
    {
        "name": "许阿伟",
        "lines": 34423
    }
];


for(let i = 0; i < 10; i++){
    let uuid = createUUID();
    let name = rank_data[i].name;
    let value = rank_data[i].lines + 30000; 
    let info = `名次:${i + 1}    昵称:${name}    消除总行数:${value}   UUID:${uuid}`;
    console.log(info);
}

