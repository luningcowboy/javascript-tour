function lengthOfLongestSubstring1(s){
    let n = s.length;
    let ans = 0;
    if(n === 1) return 1;
    if(n === 2 && s[0] === s[1]) return 1;
    for(let i = 0; i < n; ++i){
        for(let j = i + 1; j < n; ++j){
            if(allUnique(s, i, j)) {
                let len = j - i;
                if(i === 0 && j === n - 1) len += 1;
                ans = Math.max(ans, len);
            }
        }
    }
    return ans;
}

function allUnique(s, start, end){
    let map = new Map();
    for(let i = start; i < end; ++i){
        if(map.has(s[i])){
            return false;
        }
        map.set(s[i],1);
    }
    return true;
}

module.exports = {
    lengthOfLongestSubstring1
};