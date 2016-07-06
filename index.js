var Nilla = require('./src/nilla.js');

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
