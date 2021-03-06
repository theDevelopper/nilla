var Nilla = require('./nilla.js');

var Model = Nilla.extend('Model', {
	data: {},

	get: function(key, fallbackValue) {
		if (!arguments.length) {
			return this.data;
		}

		return (this.data.hasOwnProperty(key) && key != null) ? this.data[key] : fallbackValue;
	},

	set: function(key, value) {
		this.data[key] = value;
	}
});

module.exports = Model;
