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
