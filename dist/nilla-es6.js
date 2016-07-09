(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Nilla = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Nilla = {
	Model: require('./src/es6/model.js'),
	Collection: require('./src/es6/collection.js'),
	Dispatcher: require('./src/es6/dispatcher.js'),
	View: require('./src/es6/view.js')
};

module.exports = Nilla;

},{"./src/es6/collection.js":4,"./src/es6/dispatcher.js":5,"./src/es6/model.js":6,"./src/es6/view.js":7}],2:[function(require,module,exports){
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

},{"./model.js":9,"./nilla.js":10}],3:[function(require,module,exports){
var Nilla = require('./nilla.js');

var Dispatcher = Nilla.extend('Dispatcher', {
	eventQueue: {},

	publish: function() {
		if (arguments.length) {
			var data = Array.prototype.slice(1);
			var events = arguments[0].split(':');
			var index = 0, event = '';

			while (events[index]) {
				event += events[index];

				if (this.eventQueue.hasOwnProperty(event)) {
					var listener = this.eventQueue[event];
					for (var i = 0; i < listener.length; i++) {
						listener[i](data);
					}
				}
			}
		}
	},

	trigger: function() {
		this.publish.apply(this, arguments);
	},

	subscribe: function(event, cb) {
		if (typeof event !== 'string' || typeof cb !== 'function') {
			return;
		}

		if (!this.eventQueue.hasOwnProperty(event)) {
			this.eventQueue[event] = [];
		}

		this.eventQueue[event].push(cb);
	},

	listenTo: function(event, cb) {
		this.subscribe(event, cb);
	},

	on: function(event, cb) {
		this.subscribe(event, cb);
	}
});

module.exports = Dispatcher;

},{"./nilla.js":10}],4:[function(require,module,exports){
var Collection = require('../collection.js');

module.exports = Collection;

},{"../collection.js":2}],5:[function(require,module,exports){
var Dispatcher = require('../dispatcher.js');

module.exports = Dispatcher;

},{"../dispatcher.js":3}],6:[function(require,module,exports){
var Model = require('../model.js');

module.exports = Model;

},{"../model.js":9}],7:[function(require,module,exports){
var View = require('../view.js');

module.exports = View;

},{"../view.js":11}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./nilla.js":10}],10:[function(require,module,exports){
var _extend = require('./extend.function.js');

var Nilla = function() {};

Nilla.extend = _extend;

module.exports = Nilla;

},{"./extend.function.js":8}],11:[function(require,module,exports){
var Nilla = require('./nilla.js');

var View = Nilla.extend('View', {});

module.exports = View;

},{"./nilla.js":10}]},{},[1])(1)
});