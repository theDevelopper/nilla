var _extend = function(name, proto, static) {
	if (!(name && typeof name === 'string' && name.length)) {
		throw Error('malformed data to extend Nilla');
	}

	var initialize = (proto.initialize && typeof proto.initialize === 'function') ? proto.initialize : function(){};
	delete proto.initialize;

	var extended = new Function("return function " + name + "(options){ this._preInitialize(); this.initialize(options) };")();

	extended.prototype = Object.create(this.prototype);

	Object.defineProperty(extended, "name", { value: name });
	Object.defineProperty(extended, "displayName", { value: name });

	extended.prototype.constructor = extended;
	extended.prototype.initialize = initialize;
	extended.prototype._preInitialize = function() {
		Object.assign(this, static);
	};

	for (var key in proto) {
		if (proto.hasOwnProperty(key)) {
			extended.prototype[key] = proto[key];
		}
	}

	extended.extend = _extend;

	return extended;
};

module.exports = _extend;
