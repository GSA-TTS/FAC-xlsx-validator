const core = require('./core.mjs');
const main = require("./main.mjs");

test('run on empty', () => {
    var result = main.runRules({}, {rules: []});
    expect(result).toEqual([])
});

test('run on empty', () => {
    var wb = {SheetNames: ["A Sheet"]};
    var rules = {rules: []};
    rules.rules.push({category: "sheet_exists", sheetname: "A Sheet", message: "SHEETNAME is missing"});
    var r = main.runRules(wb, rules);
    expect(r[0]).toBeInstanceOf(core.Success);
});