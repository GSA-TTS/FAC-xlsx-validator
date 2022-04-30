// https://jestjs.io/docs/getting-started
// jest --verbose=false core
//const core = require('../../interpreter/core.mjs');
import * as core from '../../interpreter/core.mjs';

describe("Suite for 'main'", function() {
  it('class Result exists', () => {
    var r = new core.Result();
    expect(r).toBeInstanceOf(core.Result);
  });

  it('class Success exists', () => {
      var r = new core.Success();
      expect(r).toBeInstanceOf(core.Success);
  });

  it('result object contains a message', () => {
      var r = new core.Success({}, {}, "Duck Duck Goose");
      expect(r.message).toEqual("Duck Duck Goose");
  });
});