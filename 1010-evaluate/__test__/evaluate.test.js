const evaluate = require('../evaluate');
describe('Evaluate',()=>{
    it('test const value',()=>{
        expect(evaluate.getInstance().maxDeep).toBe(1);
        expect(evaluate.getInstance().deepAddScore).toBe(10);
        expect(evaluate.getInstance().stepAddScore).toBe(5);
    });
    it('set value',()=>{
        let tmp_eva = evaluate.getInstance();
        tmp_eva.setMaxDeep(2);
        expect(tmp_eva.maxDeep).toBe(2);
    });
});