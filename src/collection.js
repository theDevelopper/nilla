var Nilla = require('./nilla.js');
var Model = require('./model.js');

var Collection = Nilla.extend({
	name: 'Collection',

	model: Model,

	models: [],

	add: function(model) {
		if (model instanceof this.model) {
			this.models.push(model)
		}
		else {
			this.models.push(new this.model(model))
		}
	}
});

module.exports = Collection;
