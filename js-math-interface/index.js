let math = require('./math_interface');
let Point = function(x = 0, y = 0){
    this.x = x;
    this.y = y;
};
let center_pos = new Point(400.00, 563.88);
console.log(center_pos);
let p_list = [];
p_list.push(new Point(80.00, 403.88));
p_list.push(new Point(160.00, 403.88));
p_list.push(new Point(240.00, 403.88));
p_list.push(new Point(240.00, 483.88));
p_list.push(new Point(240.00, 563.88));
p_list.push(new Point(320.00, 563.88));
p_list.push(new Point(240.00, 643.88));
p_list.push(new Point(320.00, 643.88));
p_list.push(new Point(400.00, 643.88));
for(let i = 0; i < p_list.length; ++i){
    let p = p_list[i];
    let dis = math.distance(center_pos, p).toFixed(2);
    let sin = math.sine(center_pos, p).toFixed(2);
    let degree = math.degree(center_pos, p).toFixed(2);
    let info = `dis:${dis}, sin:${sin}, degree:${degree}`;
    console.log(info);
}