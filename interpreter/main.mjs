import * as core from './core.mjs';
import * as names from './names.mjs';
import * as types from './types.mjs';
import * as values from './values.mjs';

var rule_lookup = {
    "sheet_exists": names.sheetExists,
    "cell_value_type": types.locationIsType,
    "cell_exists": values.locationHasValue
};

function runRule(wb, rule) {
    // https://dmitripavlutin.com/check-if-object-has-property-javascript/
    if (rule.category in rule_lookup) {
        return rule_lookup[rule.category](wb, rule);
    } else {
        return new core.Failure(wb, rule, "Cannot find " + r.category + " in rule interpreter");
    }
}

function runRules(wb, rules) {
    var results = [];
    for (var r of rules.rules) {
        var result = runRule(wb, r);
        results.push(result);
    }
    return results;
}

/* Exports */
export {runRules, runRule};
//exports.runRule = runRule;
//exports.runRules = runRules;
