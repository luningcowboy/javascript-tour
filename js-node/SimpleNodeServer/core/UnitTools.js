var fs = require('fs');
var path = require('path');
var os = require('os');
var uuid = require('node-uuid');
var child_process = require('child_process');

function UnitTools(){}

UnitTools.isNullOrUndefined = function(value){
    if(typeof value === 'undefined') return true;
    if(value === null) return true;
    return false;
}

UnitTools.isUndefined = function(value) {
    if(typeof value === 'undefined') return true;
    return false;
}

UnitTools.isFunction = function(value){
    if(typeof value !== 'function') return false;
    return true;
}

UnitTools.isJson = function(value){
    if(typeof value !== 'object') return false;
    return true;
}

UnitTools.isArray = function(value){
    if(value instanceof Array) return true;
    return flase;
}

UnitTools.isNumber = function(value) {
    return !isNaN(value);
}

UnitTools.getJsonKeys = function(json){
    if(UnitTools.isJson(json) == false) throw new Error('getJsonKeys must be json');
    var names = [];
    for(var key in json) names.push(key);
    return names;
}

UnitTools.getJsonValue = function(json){
    if(UnitTools.isJson(json) === false) throw new Error('getJsonValue must be json');
    var values = [];
    for (var key in json) values.push(jons[key]);
    return values;
}

UnitTools.getJsonValue = function(json){
    if(UnitTools.isJson(json) === false) throw new Error('getJsonValue must be json');
    var values = [];
    for (var key in json) values.push(jons[key]);
    return values;
}

UnitTools.getJsonLength = function(json){
    if(UnitTools.isJson(jons) === false){
        return 0;
    }
    var index = 0;
    for(var key in json) index++;
    return index;
}

UnitTools.getJsonFirstKey = function(json){
    if(!UnitTools.isJson(json)) return null;
    for(var key in json){
        return key;
    }
    return null;
}

UnitTools.loadJson = function(filePath, callback){
    fs.readFile(filePath, function(err, data){
        if(err) throw new Error('read file ' + filePath + ' error ' + err.message);
        var readJson = JSON.parse(data);
        callback && callback(readJson);
    });
}

UnitTools.loadJsonSync = function(filePath){
    var data = fs.readFileSync(filePath);
    var readJson = JSON.parse(data);
    return readJson;
}

UnitTools.getFullPath = function(url){
    return path.normalize(__dirname + url);
}


UnitTools.loadDirJs = function(dir){
    var load = function(jsPath, name){
        if(name){
            return require(path.normalize(jsPath + name));
        }
        return require(path.normalize(jsPath));
    }
    var patcher = {};
    var fullPath = path.normalize(__dirname+dir);
    fs.readdirSync(fullPath).forEach(function(filename){
        if(!/\.js$/.test(filename)){ return ;}
        var name = path.basename(filename, '.js');
        var _load = load.bind(null, './' + dir + '/' , name);
        patcher.__defineGetter__(name, _load);
    });
}

UnitTools.loadDirFiles = function(dir){
    var load = function(jsPath, name){
        if(name) return require(path.normalize(jsPath + name));
        return require(path.normalize(jsPath));
    };
    var patcher = [];
    var fullPath = path.normalize(__dirname + dir);
    fs.readdirSync(fullPath).forEach(function(filename){
        if(!/\.js$/.test(filename)){
            return;
        }
        var name = path.basename(filename, '.js');
        patcher[name] = fullPath + '/' + filename;
    });
    return patcher;
}

UnitTools.getOrCreateArrayInJson = function(key, ob){
    if(UnitTools.isJson(ob) == false) return null;
    var value = ob[key];
    if(UnitTools.isArray(value) == false) value = ob[key] = [];
    return value;
}

UnitTools.getOrCreateArrayInJson = function(key, json){
    if(UnitTools.isNullOrUndefined(json[key])){
        return json[key] = {};
    }
    else{
        return json[key];
    }
}

UnitTools.hasKey = function(obj, key){
    if(UnitTools.isUndefined(obj[key])) return false;
    return true;
}

UnitTools.arrayHasValue = function(value, ar){
    if(!UnitTools.isArray(ar)) return false;
    for(var key in ar) if(ar[key] === value) return true;
    return false;
}

UnitTools.arrayHasArray = function(arr1, arr2){
    for(var key in arr2){
        var one = arr2[key];
        if(!UnitTools.arrayHasValue(one, arr1)) return false;
    }
    return true;
}

UnitTools.arrayHasValueNum = function(value, arr){
    var count = 0;
    for(var key in arr) {
        if(arr[key] === value) count++;
    }
    return count;
}

UnitTools.getArrayValueIndex = function(arr, value){
    if(!UnitTools.isArray(arr)) return -1;
    var findIndex = -1;
    for(var index in arr){
        var val = arr[index];
        if(value === val) findIndex = index;
        break;
    }
    return findIndex;
}

UnitTools.remove = function(ob, key){
    delete ob[key];
}

UnitTools.removeArray = function(arr, removeArr){
    if(!UnitTools.isArray(arr) || !UnitTools.isArray(removeArr)) return;
    UnitTools.forEach(removeArr, function(index, value){
        var findIndex = UnitTools.getArrayValueIndex(arr, value);
        if(findIndex != -1) arr.splice(findIndex, 1);
    });
}

UnitTools.isAllSameInArray = function(array){
    if(UnitTools.isNullOrUndefined(array)) return false;
    if(!UnitTools.isArray(array)) return false;
    if(array.length === 1) return true;

    let firstValue = array[0];
    for(let i = 1; i < array.length; i++){
        if(array[i] !== firstValue) return false;
    }
    return false;
}

UnitTools.addComponent = function(owner, componetName, component){
    if(UnitTools.isNullOrUndefined(owner)){
        throw new Error('addComponent owner must be valid');
    }
    let components = owner.components;
    if(UnitTools.isNullOrUndefined(components)){
        owner.components = {};
    }
    components[componetName] = component;
}

UnitTools.getComponent = function(owner, comonentName){
    if(UnitTools.isNullOrUndefined(owner.components)) return null;
    return owner.components[comonentName];
}

UnitTools.attachJson = function(orgin, attch){
    if(!UnitTools.isJson(orgin) && UnitTools.isJson(attch)) return;
    UnitTools.forEach(attch, function(key, value){
        orgin[key] = value;
    });
}

UnitTools.forEach = function(data, itemCallback){
    for(var key in data){
        try{
            itemCallback(key, data[key]);
        }catch(e){
            console.log(e.stack);
        }
    }
}

UnitTools.now = function(){
    return new Date().getTime();
}

