(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Nilla = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Nilla = {
	Model: require('./src/model.js')
};

module.exports = Nilla;

},{"./src/model.js":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./nilla.js":4}],4:[function(require,module,exports){
var _extend = require('./extend.function.js');

var Nilla = function() {};

Nilla.extend = _extend;

module.exports = Nilla;

},{"./extend.function.js":2}]},{},[1])(1)
});