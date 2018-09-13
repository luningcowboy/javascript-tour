let twoSum = function(nums, target){
    let tmp = new Map();
    for(let i = 0; i < nums.length; i++){
        let v_i = nums[i];
        let t_i = tmp.values.indexOf(v_i);
        if(t_i >= 0 && tmp[t_i][0] !== i){
            return [t_i,i];
        }
        else{
            let v_n = target - v_i;
            tmp.set(i, v_n);
        }
    }

};

module.exports = twoSum;
