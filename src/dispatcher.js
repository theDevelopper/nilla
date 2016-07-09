var Nilla = require('./nilla.js');

var Dispatcher = Nilla.extend('Dispatcher', {
	eventQueue: {},

	publish: function() {
		if (arguments.length) {
			var data = Array.prototype.slice.call(arguments, 1);
			var events = arguments[0].split(':');
			var index = 0, event = '';

			while (events[index]) {
				event += events[index++];

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
