var _extend = function(obj) {
	obj = obj || {};
	obj.name = obj.name || this.name || undefined;

	if (!(obj.name && typeof obj.name === 'string' && obj.name.length)) {
		throw Error('malformed data to extend Nilla');
	}

	obj.initialize = (obj.initialize && typeof obj.initialize === 'function') ? obj.initialize : function(){};

	var Extended = function(options) {
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

	Extended.prototype = Object.create(this.prototype);

	//Extended.prototype.constructor = Extended;
	Extended.prototype.name = obj.name;
	Extended.prototype.initialize = obj.initialize;

	delete obj.name;
	delete obj.initialize;

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (typeof obj[key] === 'function') {
				Extended.prototype[key] = obj[key];
			}
		}
	}

	return Extended;
};

var Nilla = function() {};

Nilla.prototype.foo = function() {
	console.log('foo');
};

Nilla.extend = _extend;

Nilla.Model = Nilla.extend({
	name: 'Model',

	data: {},

	get: function(key, fallbackValue) {
		return (this.data.hasOwnProperty(key) && key != null) ? this.data[key] : fallbackValue;
	},

	set: function(key, value) {
		this.data[key] = value;
	}
});

var model = new Nilla.Model({test: 1});
model.set('bar', 5);
console.log(model.get('bar'));
console.log(model.get('foo'));
console.log(model.get('foo', true));
model.set('bar', '');
console.log(model.get('foo'));
console.log(model.get('foo', true));
