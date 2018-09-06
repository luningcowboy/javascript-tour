let test = ()=>{
    console.log('iterator for...of ');
    {
        // ! 简单的遍历器实现
        function makeIterator(arr){
            let nextIdx = 0;
            return {
                next: ()=>{
                    return nextIdx < arr.length ? {value: arr[nextIdx++], done: false} : {value: undefined, done: true};
                }
            };
        }

        function makeIterator2(arr){
            let nextIdx = 0;
            return {
                next:()=>{
                    return nextIdx < arr.length ?
                        {value: arr[nextIdx++]}: {done: true};
                }
            };
        }

        let it = makeIterator(['a','b']);
        console.log(it.next(),it.next(),it.next()); // { value: 'a', done: false } { value: 'b', done: false } { value: undefined, done: true }
    }
};


test();