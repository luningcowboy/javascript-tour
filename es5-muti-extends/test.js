let MutiExtends = (base, ...mixins)=>{
	let mutiExtends = class __MutiExtends extends base{
		constructor(...args){
			super(...args);

			mixins.forEach(mixin=>{
				if(typeof mixin.initializer === 'function'){
					mixin.prototype.initializer.apply(this, args);
				}
			});
		}
	};
	let copyProps = (target, source)=>{
		Object.getOwnPropertyNames(source)
			.concat(Object.getOwnPropertySymbols(source))
			.forEach(prop=>{
				if(prop.match(/^(?:initializer|constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
					return;
				Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
			});
	};
	mixins.forEach(mixin=>{
		copyProps(mutiExtends.prototype, mixin.prototype);
		copyProps(MutiExtends, mixin);
	});
	return mutiExtends;
};
class A{
	initializer(){
		this._aAtt = '';
	}
	methodA(){
		console.log('methodA');
	}
}
class B{
	initializer(){
		this._bAtt = '';
	}
	methodB(){
		console.log('methodB');
	}
}
class C extends MutiExtends(A, B){
	constructor(){
		super();
		this.initializer();
	}
	initializer(){
		this._bAtt = 'cbAtt';
		this._aAtt = 'caAtt';
	}
	outputAttr(){
		console.log(this._bAtt, this._aAtt);
	}
	methodA(){
		super.methodA();
		console.log('C', 'methodA');
	}
	methodB(){
		super.methodB();
		console.log('C', 'methodB');
	}
}
let c = new C();
c.methodA();
c.methodB();
c.outputAttr();
