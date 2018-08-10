class MyCalss1{
    foo(){return 1;}
}
class MyCalss2{
    foo(){return 2;}
    [Symbol.unscopables](){
        return {foo:true};
    }
}
module.exports = {MyCalss1,MyCalss2};