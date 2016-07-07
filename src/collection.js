var Nilla = require('./nilla.js');
var Model = require('./model.js');

var Collection = Nilla.extend('Collection', {
	add: function(model) {
		if (model instanceof this.model) {
			this.models.push(model);
		}
		else {
			this.models.push(new this.model(model));
		}
	}
},{
	model: Model,
	models: []
});

module.exports = Collection;
