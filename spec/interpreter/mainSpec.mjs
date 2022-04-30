//const core = require('../../interpreter/core.js');
import * as core from '../../interpreter/core.mjs';
//const main = require("../../interpreter/main.js");
import * as main from '../../interpreter/main.mjs';

describe("Suite for 'main'", function() {
    it("runs on empty", function() {
        var result = main.runRules({}, {rules: []});
        expect(result).toEqual([])
    });

    it('Runs successful rules', () => {
        var wb = {SheetNames: ["A Sheet"]};
        var rules = {rules: []};
        rules.rules.push({category: "sheet_exists", sheetname: "A Sheet"});
        var r = main.runRules(wb, rules);
        expect(r[0]).toBeInstanceOf(core.Success);
    });

    it('Runs a successful rule', () => {
        var wb = {SheetNames: ["A Sheet"]};
        var rule = {category: "sheet_exists", sheetname: "A Sheet"};
        var r = main.runRule(wb, rule);
        expect(r).toBeInstanceOf(core.Success);
    });    
});



