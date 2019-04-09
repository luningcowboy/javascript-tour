

function add_0(a, b){
    if(b === 0) return a;
    let sum = a ^ b;
    let carry = (a & b) << 1;
    return add_0(sum, carry);
}

function add_1(a, b){
    let sum = a ^ b;
    let carry = (a & b) << 1;
    while(carry != 0){
        let s = sum;
        let c = carry;
        sum = s ^ c;
        carry = (s & c) << 1;
    }
    return sum;
}

console.log(add_0(1, 1));
console.log(add_0(1, -1));
console.log(add_0(1000, 12341));

console.log(add_1(1, 1));
console.log(add_1(1, -1));
console.log(add_1(1000, 12341));

console.log(1 & 2);
console.log(1 & 3);
console.log(3 & 1);

console.log(1 | 2);
console.log(1 | 3);
console.log(3 | 1);

console.log(1 ^ 2);
console.log(1 ^ 3);
console.log(3 ^ 1);

console.log( ~2);
console.log( ~3);
console.log( ~1);

console.log(1 << 2);
console.log(1 << 3);
console.log(3 << 1);

console.log(1 >> 2);
console.log(1 >> 3);
console.log(3 >> 1);

console.log(1 >>> 2);
console.log(1 >>> 3);
console.log(3 >>> 1);
