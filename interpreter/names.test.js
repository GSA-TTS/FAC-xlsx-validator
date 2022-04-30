const core = require('./core.mjs');
const names = require('./names.mjs');

test('success returns Success', () => {
    var wb = {};
    wb.SheetNames = ["A Sheet"];
    var rule = {};
    rule.sheetname = "A Sheet";
    var res = names.sheetExists(wb, rule);
    expect(res).toBeInstanceOf(core.Success);
});

test('failure returns Failure', () => {
    var wb = {};
    wb.SheetNames = ["A Sheet"];
    var rule = {};
    rule.sheetname = "Another Different Sheet";
    rule.message = "Sheet SHEETNAME does not exist";
    var res = names.sheetExists(wb, rule);
    expect(res).toBeInstanceOf(core.Failure);
});
