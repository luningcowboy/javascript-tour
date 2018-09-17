let MsgPack = require('msgpack-lite');

console.log(Reflect.ownKeys(MsgPack));
// * 所有方法
/**
 * [ 'encode',
  'decode',
  'Encoder',
  'Decoder',
  'createEncodeStream',
  'createDecodeStream',
  'createCodec',
  'codec' ]
 */
let buffer = MsgPack.encode({"foo":"bar","a":"b","c":"d"});
console.log(typeof buffer, buffer);
let buf_str = buffer.toString('hex');
console.log(buf_str,typeof buf_str, buf_str.length);
let new_buffer = new Buffer(buf_str,'hex');
console.log(new_buffer);
let dec_json = MsgPack.decode(new_buffer);
console.log(dec_json);

let fs = require('fs');

let w_stream = fs.createWriteStream('./test.msp');
let encode_stream = MsgPack.createEncodeStream();
encode_stream.pipe(w_stream);

encode_stream.write({foo:'bar'});
encode_stream.write({baz:'qux'});

encode_stream.end();