(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Nilla = {
	Model: require('./src/model.js')
};

},{"./src/model.js":3}],2:[function(require,module,exports){
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

module.exports = _extend;

},{}],3:[function(require,module,exports){
var Nilla = require('./nilla.js');

var Model = Nilla.extend({
	name: 'Model',

	data: {},

	get: function(key, fallbackValue) {
		return (this.data.hasOwnProperty(key) && key != null) ? this.data[key] : fallbackValue;
	},

	set: function(key, value) {
		this.data[key] = value;
	}
});

module.exports = Model;

},{"./nilla.js":4}],4:[function(require,module,exports){
var _extend = require('./extend.function.js');

var Nilla = function() {};

Nilla.extend = _extend;

module.exports = Nilla;

},{"./extend.function.js":2}]},{},[1]);
