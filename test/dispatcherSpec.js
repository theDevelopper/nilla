var Nilla = require('../index.js');

describe("The Dispatcher", function() {
  	it("registers callback", function() {
		var dispatcher = new Nilla.Dispatcher();
		var cb = function(){};
		dispatcher.listenTo('testEvent',cb);
		expect(dispatcher.eventQueue.testEvent[0]).toBe(cb);

  	});

	it("triggers callback", function() {
		var dispatcher = new Nilla.Dispatcher();
		var spy = jasmine.createSpy('spy');
		dispatcher.listenTo('testEvent', spy);
		dispatcher.publish('testEvent');
		expect(spy).toHaveBeenCalled();
  	});

	it("triggers multible callbacks", function() {
		var dispatcher = new Nilla.Dispatcher();
		var spy = jasmine.createSpy('spy');
		var spy2 = jasmine.createSpy('spy2');
		var spy3 = jasmine.createSpy('spy3');

		dispatcher.listenTo('testEvent', spy);
		dispatcher.listenTo('testEvent', spy2);
		dispatcher.listenTo('otherEvent', spy3);

		dispatcher.publish('testEvent');

		expect(spy).toHaveBeenCalled();
		expect(spy2).toHaveBeenCalled();
		expect(spy3).not.toHaveBeenCalled();
  	});
});
