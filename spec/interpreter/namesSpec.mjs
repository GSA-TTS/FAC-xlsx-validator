//const core = require('./core.mjs');
import * as core from '../../interpreter/core.mjs';
//const names = require('./names.mjs');
import * as names from '../../interpreter/names.mjs';

describe("Suite for 'names'", function() {
    it('success returns Success', () => {
        var wb = {};
        wb.SheetNames = ["A Sheet"];
        var rule = {};
        rule.sheetname = "A Sheet";
        var res = names.sheetExists(wb, rule);
        expect(res).toBeInstanceOf(core.Success);
    });

    it('failure returns Failure', () => {
        var wb = {};
        wb.SheetNames = ["A Sheet"];
        var rule = {};
        rule.sheetname = "Another Different Sheet";
        rule.message = "Sheet SHEETNAME does not exist";
        var res = names.sheetExists(wb, rule);
        expect(res).toBeInstanceOf(core.Failure);
    });
});