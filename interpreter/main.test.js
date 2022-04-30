//const core = require('./core.mjs');
import * as core from './core.mjs';
//const main = require("./main.mjs");
import * as main from './main.mjs';

test('run on empty', () => {
    var result = main.runRules({}, {rules: []});
    expect(result).toEqual([])
});

test('run successful rules', () => {
    var wb = {SheetNames: ["A Sheet"]};
    var rules = {rules: []};
    rules.rules.push({category: "sheet_exists", sheetname: "A Sheet"});
    var r = main.runRules(wb, rules);
    expect(r[0]).toBeInstanceOf(core.Success);
});

test('run a successful rule', () => {
    var wb = {SheetNames: ["A Sheet"]};
    var rule = {category: "sheet_exists", sheetname: "A Sheet"};
    var r = main.runRule(wb, rule);
    expect(r).toBeInstanceOf(core.Success);
});