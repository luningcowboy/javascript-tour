class BaseModal{
    close(){
        console.log("close");
    }
};
let DragModalMixin = (extendsClass)=> class extends extendsClass{
    hasLayer = true;
    drag(){
        console.log("drag");
    }
};
let ScaleModalMixin = (extendsClass)=> class extendsClass{
    scale(){
        console.log("scale");
    }
    close(){
        if(super.close) super.close();
    }
};
