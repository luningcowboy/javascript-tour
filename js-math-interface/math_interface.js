let math = {};
module.exports = math;

math.PI = 3.141592653;
math.distance = (p1, p2)=>{
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};
math.sine = (p1, p2)=>{
    let dis = math.distance(p1, p2);
    let dis_y = p2.y - p1.y;
    return dis_y / dis;
};
math.degree = (p1, p2)=>{
    let angle = Math.asin(math.sine(p1, p2));
    let degree = angle * 180 / math.PI;
    if(p2.x > p1.x && p2.y > p1.y) degree += 90;
    if(p2.x > p1.x && p2.y < p1.y) degree += 180;
    if(p2.x < p1.x && p2.y < p1.y) degree += 270;
    if(Math.abs(p2.y - p1.y) <= 1 && p2.x > p1.x) degree = 180;
    return degree;
};
math.toAngle = (degree)=>degree*math.PI/180;
math.toDegree = (angle)=>angle*180/math.PI;