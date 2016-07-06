var Nilla = require('../index.js');

describe("The Model", function() {
  it("does stuff", function() {
	  var model = new Nilla.Model({test: 1});
	  model.set('bar', 5);

	expect(model.get('bar')).toBe(5);
	expect(model.get('foo')).not.toBe(1);
	expect(model.get('foo', true)).toBe(true);
  });
});
