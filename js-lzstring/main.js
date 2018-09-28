//https://www.cnblogs.com/hnyei/p/4625998.html?utm_source=tuicool
//http://pieroxy.net/blog/pages/lz-string/index.html
// ! Github: https://github.com/pieroxy/lz-string/

let LZString = require('./lz-string.js');
/*
[ 'compressToBase64',
  'decompressFromBase64',
  'compressToUTF16',
  'decompressFromUTF16',
  'compressToUint8Array',
  'decompressFromUint8Array',
  'compressToEncodedURIComponent',
  'decompressFromEncodedURIComponent',
  'compress',
  '_compress',
  'decompress',
  '_decompress' ]*/
//console.log(Reflect.ownKeys(LZString));
let s1 = 'helloworld';
let c1 = LZString.compress(s1);
let d1 = LZString.decompress(c1);
console.log(s1, c1, d1); // helloworld օ〶惶໩Ӧ  helloworld
let obj2 = {"retcode":1,"retmsg":[{"icon_interval":10,"icon_id":"142","icon_url":["https://marketqn.nalrer.cn/teris/share_image/jiayi/jy03.jpg"],"icon_weight":1,"icon_type":1,"icon_skip_type":1,"time_interval":0,"second_toappid":"","toappid":"wx1668490543c6bae9","togame":"ttylc","path":"?from=elsfkwlb&togame=ttylc","province":[],"webpages":[{"webpage_url":"http://xiaoyouxi.qiniu.andla.cn/pkgame/popstar/sharepng/moregame.jpg","webpage_name":"天天游乐场","webpage_weight":"10","webpage_id":"056","config_id":"142056"}]},{"icon_interval":10,"icon_id":"266","icon_url":["https://elsfkws.nalrer.cn/teris/share_image/jiayi/daoliu01.png"],"icon_weight":10,"icon_type":1,"icon_skip_type":1,"time_interval":0,"second_toappid":"","toappid":"wx785e80cff6120de5","togame":"tyddz","path":"?from=elsfkwlb&togame=tyddz","province":["北京"],"webpages":[{"webpage_url":"http://xiaoyouxi.qiniu.andla.cn/pkgame/popstar/sharepng/moregame.jpg","webpage_name":"天天游乐场","webpage_weight":"10","webpage_id":"056","config_id":"266056"}]}]};
let s2 = JSON.stringify(obj2);
let c2 = LZString.compress(s2);
console.log(s2.length, c2.length);
console.log(s2, c2);
