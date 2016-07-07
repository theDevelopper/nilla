var _extend = function(obj) {
	obj = obj || {};
	var name = obj.name || this.name || undefined;

	if (!(name && typeof name === 'string' && name.length)) {
		throw Error('malformed data to extend Nilla');
	}

	obj.initialize = (obj.initialize && typeof obj.initialize === 'function') ? obj.initialize : function(){};

	var Extended = {};
	Extended[name] = function(options) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (typeof obj[key] !== 'function') {
					this[key] = obj[key];
					delete obj[key];
				}
			}
		}

		this.extend = _extend;

		 this.initialize(options);
	};

	Object.defineProperty(Extended[name], "name", { value: name });
	Object.defineProperty(Extended[name], "displayName", { value: name });
	Extended[name].displayName = name;

	Extended[name].prototype = Object.create(this.prototype);

	Extended[name].prototype.constructor = Extended[name];
	Extended[name].prototype.initialize = obj.initialize;

	delete obj.name;
	delete obj.initialize;

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (typeof obj[key] === 'function') {
				Extended[name].prototype[key] = obj[key];
			}
		}
	}

	return Extended[name];
};

module.exports = _extend;
