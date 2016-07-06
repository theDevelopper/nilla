var _extend = require('./extend.function.js');

var Nilla = function() {};

Nilla.prototype.foo = function() {
	console.log('foo');
};

Nilla.extend = _extend;

module.exports = Nilla;
