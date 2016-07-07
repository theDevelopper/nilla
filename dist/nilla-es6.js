(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Nilla = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Nilla = {
	Collection: require('./src/es6/collection.js'),
	Model: require('./src/es6/model.js')
};

module.exports = Nilla;

},{"./src/es6/collection.js":3,"./src/es6/model.js":4}],2:[function(require,module,exports){
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

},{"./model.js":6,"./nilla.js":7}],3:[function(require,module,exports){
var Collection = require('../collection.js');

module.exports = Collection;

},{"../collection.js":2}],4:[function(require,module,exports){
var Model = require('../model.js');

module.exports = Model;

},{"../model.js":6}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
var Nilla = require('./nilla.js');

var Model = Nilla.extend('Model', {
	get: function(key, fallbackValue) {
		if (!arguments.length) {
			return this.data;
		}

		return (this.data.hasOwnProperty(key) && key != null) ? this.data[key] : fallbackValue;
	},

	set: function(key, value) {
		this.data[key] = value;
	}
}, {
	data: {}
});

module.exports = Model;

},{"./nilla.js":7}],7:[function(require,module,exports){
var _extend = require('./extend.function.js');

var Nilla = function() {};

Nilla.extend = _extend;

module.exports = Nilla;

},{"./extend.function.js":5}]},{},[1])(1)
});