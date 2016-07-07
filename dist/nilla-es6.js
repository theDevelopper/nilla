(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Nilla = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Nilla = {
	Collection: require('./src/es6/collection.js'),
	Model: require('./src/es6/model.js')
};

module.exports = Nilla;

},{"./src/es6/collection.js":3,"./src/es6/model.js":4}],2:[function(require,module,exports){
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

},{"./model.js":6,"./nilla.js":7}],3:[function(require,module,exports){
var Collection = require('../collection.js');

module.exports = Collection;

},{"../collection.js":2}],4:[function(require,module,exports){
var Model = require('../model.js');

module.exports = Model;

},{"../model.js":6}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
var Nilla = require('./nilla.js');

var Model = Nilla.extend({
	name: 'Model',

	data: {},

	get: function(key, fallbackValue) {
		console.log(arguments);

		return (this.data.hasOwnProperty(key) && key != null) ? this.data[key] : fallbackValue;
	},

	set: function(key, value) {
		this.data[key] = value;
	}
});

module.exports = Model;

},{"./nilla.js":7}],7:[function(require,module,exports){
var _extend = require('./extend.function.js');

var Nilla = function() {};

Nilla.extend = _extend;

module.exports = Nilla;

},{"./extend.function.js":5}]},{},[1])(1)
});