// https://jestjs.io/docs/getting-started
// jest --verbose=false core
const core = require('./core.mjs');

test('class Result exists', () => {
  var r = new core.Result();
  expect(r).toBeInstanceOf(core.Result);
});

test('class Success exists', () => {
    var r = new core.Success();
    expect(r).toBeInstanceOf(core.Success);
});

test('result object contains a message', () => {
    var r = new core.Success({}, {}, "Duck Duck Goose");
    expect(r.message).toEqual("Duck Duck Goose");
});