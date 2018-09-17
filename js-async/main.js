console.log('js-async');

{
    function timeout(ms){
        return new Promise(resolve=>{
            setTimeout(resolve, ms);
        });
    }
    async function asyncPrint(value, ms){
        await timeout(ms);
        console.log(value);
    }

    async function timeout2(ms){
        await new Promise(resolve=>{
            setTimeout(resolve,ms);
        });
    }
    async function asyncPrint2(value, ms){
        await timeout2(ms);
        console.log(value);
    }
    asyncPrint('hello',100);
    asyncPrint2('hello2',200);
}

// * 语法
{
    // *  async 函数返回一个Promise对象
    // *  async 函数内部return语句返回的值，回成为then方法回调函数的参数
    async function f(){
        return 'hello,world';
    }
    f().then(v=>console.log(v));
    // * async 函数内部抛出错误，回导致返回的Promise对象变为reject状态
    // * 抛出的错误回被catch方法回调函数接收到
    async function f2(){
        throw new Error('出错了');
    }
    f2().then(v=>console.log(v)).catch(e=>console.error(e));
}
// * Promise对象的状态变化
{
    // * async函数返回的Promise对象，必须等到内部所有await命令后面的Promise对象执行完，才会
    // * 发生状态改变，除非遇到return语句或者抛出错误，也即使说，只有async函数内部的异步操作执行完,
    // * 才会执行then方法指定的回调函数
}

// * await 命令
{
    // * 正常情况下await命令后面是一个Promise对象，如果不是，回被转成一个立即resolve的Promise对象
    async function f(){return await 123;}
    f().then(v=>console.log(v));
    // * await 命令后面的Promise对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到
    async function f2(){
        await Promise.reject('error await');
    }
    f2().then(v=>console.log(v)).catch(e=>console.log(e));
    // *  只要一个await语句后面的Promise变为reject,那么整个async函数都会中断执行
    async function f3(){
        await Promise.reject('error await 2');
        await Promise.resolve('helloworld'); // 不会执行
    }
    f3().then(v=>console.log(v)).catch(e=>console.log(e));
    // * 如果希望无论前一个是否成功，后一个都要执行，前一个可以放在try...catch中
    async function f4(){
        try{
            await Promise.reject('error await 3');
        }
        catch(e)
        {
            console.log(e);
        }
        return await Promise.resolve('helloworld f4');
    }
    f4().then(v=>console.log(v)).catch(e=>console.log(e));
    // * 第二种方法是在await 后面的Promise对象后再跟一个catch方法，处理前面可能出现的错误
    async function f5(){
        await Promise.reject('error await f5').catch(e=>console.log(e));
        return await Promise.resolve('helloworld f5');
    }
    f5().then(v=>console.log(v));
}
// * 错误处理
{
    // * 如果await后面的异步操作出错，那么，等同于async函数返回的Promise对象被reject
    async function f1(){
        await new Promise(function(resolve, reject){
            throw new Error('错误处理 error f1');
        });
    }
    f1().then(v=>console.log(v)).catch(e=>console.log(e));

    async function f2(){
        try{
            await new Promise((resolve, reject)=>{
                throw new Error('错误处理 error 2');
            });
        }
        catch(e){
            console.log(e);
        }
        return await('错误处理 f2')
    }
    f2().then(v=>console.log(v)).catch(e=>console.log(e));
    // * 如果有多个await命令，可以统一放在一个try...catch中
}
// ! 注意:
// ! 1. await 后面的 Promise对象，运行结果可能是rejected, 所以最好把await命令放在try..catch中
// ! 2. 多个await命令后面的异步操作，如果不存在继发关系，最好，让他们同时触发
// ! 3. await命令只能用在async函数中，如果用在普通函数中，就会报错

// * async 函数的实现原理
// * async 函数的实现原理，就是将Generator函数和自动执行器，包装在一个函数里。
{
    function spawn(genF){
        return new Promise((resolve, reject)=>{
            const gen = genF();
            function setp(nextF){
                let next;
                try{
                    next = nextF();
                }catch(e){
                    return reject(e);
                }
                if(next.done) return resolve(next.value);
                Promise.resolve(next.value).then(
                    v=>{
                        setp(function(){return gen.next(v)})
                    },
                    e=>{
                        setp(function(){return gen.throw(e)})
                    }
                );
            }
            setp(function(){return gen.next(undefined)});
        });
    }
}

// * 与其他异步方法的比较
{
    // * 假设某个Dom元素上部署了一系列动画，前一个动画结束，才能开始后一个动画，如果
    // * 当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值.
    // ! Promise写法
    function chainANimationPromise(elem, animations){
        let ret = null;
        let p = Promise.resolve();

        for(let anim of animations){
            p = p.then(v=>{
                ret = v;
                return anim(elem);
            })
        }
        return p.catch(e=>console.log(e)).then(()=>{return ret;});
    }

    // ! Generator写法
    // function chainAnimationGenerator(elem, animaitons){
    //     let ret = null;
    //     try{
    //         for(let anim of animaitons){
    //             ret = yield anim(elem);
    //         }
    //     }
    //     catch(e){
    //         console.log(e);
    //     }
    //     return ret;
    // }

    // ! async 写法
    async function chainAnimationAsync(elem, animaitons){
        let ret = null;
        try{
            for(let anim of animaitons){
                ret = await anim;
            }
        }
        catch(e){}
        return ret;
    }
}

// * 按顺序完成异步操作
{
    // ! 远程读取url
    // * 继发
    async function logInOrder(urls){
        for(const url of urls){
            const response = await fetch(url);
            console.log(await response.text());
        }
    }
    // * 并发
    async function logInOrder2(urls){
        const textPromises = urls.map(async url=>{
            const response = await fetch(url);
            return response.text();
        });
        for(const textPromise of textPromises){
            console.log(await textPromise);
        }
    }
    // ! 虽然map方法的参数是async函数，但是它是并发执行的，因为只有async函数内部是继发执行，
    // ! 外部不受影响.后面的for...of循环使用了await,因此实现了按顺序输出。
}

{
    async function* gen(){
        yield 'hello';
    }
    let genObj = gen();
    genObj.next().then(x=>console.log(x));
}
// * 异步遍历器相关，以后补上