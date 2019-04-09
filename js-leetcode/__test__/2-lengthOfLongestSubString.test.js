let func = require('../2-lengthOfLongestSubstring');

describe('test length of longest fo longest sub string',()=>{
    it('test function 1',()=>{
        expect(func.lengthOfLongestSubstring1('abcabcbb')).toBe(3);
        expect(func.lengthOfLongestSubstring1('bbbbb')).toBe(1);
        expect(func.lengthOfLongestSubstring1('pwwkew')).toBe(3);
        expect(func.lengthOfLongestSubstring1('au')).toBe(2);
        expect(func.lengthOfLongestSubstring1('a')).toBe(1);
        expect(func.lengthOfLongestSubstring1('abcd')).toBe(4);
        expect(func.lengthOfLongestSubstring1('aa')).toBe(1);
        expect(func.lengthOfLongestSubstring1('aab')).toBe(2);
    });
});