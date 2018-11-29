var os = require('os');
// 返回操作系统的默认临时文件夹
console.log(os.tmpdir());
// 返回CPU的字节序
// 可能是BE/LE
console.log(os.endianness());
console.log(os.type()); // 返回操作系统名
console.log(os.platform()); // 返回操作系统名
console.log(os.arch()); // 返回操作系统CPU架构
console.log(os.release()); // 操作系统的发行版本
console.log(os.uptime()); // 操作系统的运行时间
console.log(os.loadavg()); // 平均负载数组
console.log(os.totalmem()); // 内存
console.log(os.freemem()); // 空闲内存
console.log(os.cpus());
console.log(os.networkInterfaces()); // 获得网络接口列表
