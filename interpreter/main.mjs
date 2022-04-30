const core = require('./core.mjs');
const names = require('./names.mjs');
const types = require('./types.mjs');

var rule_lookup = {
    "sheet_exists": names.sheetExists,
    "cell_value_type": types.locationIsType
};

function runRules(wb, rules) {
    var results = [];
    for (const r of rules.rules) {
        if (r.category in rule_lookup) {
            var result = rule_lookup[r.category](wb, r);
            results.push(result);
        } else {
            console.log("cannot find rule category " + r.category);
        }
    }
    return results;
}

/* Exports */
exports.runRules = runRules;