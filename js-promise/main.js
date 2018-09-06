//http://es6.ruanyifeng.com/#docs/promise
let test_promise = ()=>{
    console.log('test promise');
    // * 特点:
    // * 1. 对象的状态不受外界影响:promise对象代表一个异步操作，有三种状态: pending,fulfilled,reject
    // * 2. 一旦状态改变，就不会再变，任何时候都会得到这个结果:
    // *    Promise的状态只用两种可能从pending变为fulfilled和从pending变成reject,只要发生这两种情况，
    // *    状态就凝固了，不会再变化了。
    {
        let promise = new Promise(function(resolve, reject){
            let a = 3;
            if(a === 2){
                resolve(a);
            }
            else{
                reject(new Error('wrond number.'));
            }
        });
        promise.then(
            value=>{
                // * success
                console.log('success',value);
            },
            error=>{
                // * failure
                console.error(error.message);
            }
        );
    }

    {
        function timeout(ms){
            return new Promise((resolve, reject)=>{
                setTimeout(resolve, ms, 'done');
            });
        }

        timeout(100).then(
            value=>{
                console.log('success',value);
            },
            error=>{
                console.log('error',error.message);
            }
        );
    }

    {
        let promise = new Promise(function(resolve, reject){
            console.log('Promise');
            resolve();
        });
        promise.then(value=>{
            console.log('resolved');
        });
        console.log('hi');
    }

    {
        // * 异步加载图片
        function loadImageAsync(url){
            return new Promise(function(resolve, reject){
                let img = new Image();
                img.onload = ()=>{
                    resolve(img);
                };
                img.onerror = ()=>{
                    reject(new Error('load image failed' + url));
                };
                img.src = url;
            });
        }
    }

    {
        let p1 = new Promise(function(resolve, reject){
            setTimeout(()=> reject(new Error('failed')), 3000);
        });
        let p2 = new Promise(function(resolve, reject){
            setTimeout(()=> resolve(p1), 1000);
        });

        p2.then(result=>console.log(result)).catch(error=>console.log(error));
    }

    // * resolve 和 reject 前最后有return语句，防治出现问题
    {
        let a = 2;
        let p1 = new Promise((resolve, reject)=>{
            if(a > 5) return resolve();
            return reject(new Error('wrong num'));
        });

        p1.then(
            ()=>{
                console.log('right num');
            }
        ).catch(error=>{
            console.log(error.message);
        });
    }
    // * Promise.prototype.then
    // * Promise.prototype.cach
    // * Promise.prototype.catch 是 .then(null, rejection)的别名
    {
        let p1 = new Promise(function(resolve, reject){
            try{
                throw new Error('test');
            }
            catch(e){
                reject(e);
            }
        });
        p1.catch(error=>console.log(error.message));

        let p2 = new Promise(function(resolve, reject){
            reject(new Error('test2'));
        });
        p2.catch(error=>console.log(error.message));

        let p3 = new Promise(function(resolve, reject){
            resolve('ok');
            throw new Error('test 3'); // ! 这时候再throw error 不会被捕获
        });

        p3.then(value=>console.log(value)).catch(error=>console.log(error.message));

        // ! Promise对象的错误具有‘冒泡’性质，会一直向后传递，直到被捕获为止，也就是说，错误
        // ! 总是会被下一个catch语句捕获.
        // ! 一般来说，then方法中不会定义reject回调函数(即then的第二个参数)，总是使用catch方法。
    }

    // ! Promise的内部错误，不会影响Promise的外部代码
    {
        let someAsyncThing = ()=>{
            return new Promise((resolve, reject)=>{
                resolve(x + 2);
            });
        };
        someAsyncThing().then(value=>console.log(value)).catch(error=>console.log(error.message));
        setTimeout(()=>console.log(123333), 2000);
    }

    // ! Promise.prototype.finally
    // ! Promise.all 用于将多个Promise实例包装成一个新的Promise实例
    {
        let promises = [2,3,4,5,6].map(id=>`xxx_${id}.json`);
        console.log(promises);
        Promise.all(promises).then(
            (v)=>console.log(v)
        ).catch(err=>console.log(err.message));

        // ! 如果作为参数的Promise定义了自己的catch方法，
        // ! 他一旦rejected,并不会触发Promise.all的catch方法
        // ! 如果没有定义则会触发Promise.all的catch方法
        let p1 = new Promise((resolve, reject)=>resolve('hello')).then(result=>result).catch(e=>e);
        //let p2 = new Promise((resolve, reject)=>resolve('promise')).then(result=>result).catch(e=>e);
        let p2 = new Promise((resolve, reject)=>reject(new Error('报错了'))).then(result=>result).catch(e=>e);
        Promise.all([p1,p2]).then(result=>console.log('xxxx',result)).catch(e=>console.log('error',e));

        let p3 = new Promise((resolve, reject)=>resolve('hello')).then(result=>result);
        let p4 = new Promise((resolve, reject)=>reject(new Error('爆葱了'))).then(result=>result);
        Promise.all([p3,p4]).then(result=>console.log('yyyy',result)).catch(e=>console.log(e));
    }

    // ! Promise.race 同样是将多个promise包装成一个Promise实例.
    // ! 只要有一个Promise的状态发生变化，Promise.race的状态就会跟随变化
    {
        let p1 = new Promise((resolve, reject)=>setTimeout(()=>reject(new Error('p1 error')),100)).then(result=>result);
        let p2 = new Promise((resolve, reject)=>setTimeout(()=>resolve('p2 resolve'),200)).then(result=>result);
        Promise.race([p1,p2]).then(result=>console.log(result)).catch(e=>e);
    }

};

test_promise();