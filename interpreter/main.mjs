import * as core from './core.mjs';
import * as names from './names.mjs';
import * as types from './types.mjs';
import * as values from './values.mjs';

var rule_lookup = {
    "sheet_exists": names.sheetExists,
    "cell_value_type": types.locationIsType,
    "cell_exists": values.locationHasValue,
    "cell_regex": values.locationMatchesRegex
};

function runRule(wb, rule) {
    // https://dmitripavlutin.com/check-if-object-has-property-javascript/
    if (rule.category in rule_lookup) {
        return rule_lookup[rule.category](wb, rule);
    } else {
        return new core.Failure(wb, rule, "Cannot find " + rule.category + " in rule interpreter");
    }
}

function runRules(wb, rules) {
    var results = [];
    for (const rule of rules.rules) {
        var result = runRule(wb, rule);
        results.push(result);
    }
    return results;
}

function runRuleSet(wb, json) {
    // First, we need to run the basics against this workbook.
    const rulesets = json.rulesets;
    var results = [];
    for (const rule of rulesets["ALWAYS"].rules) {
        console.log("ALWAYS " + rule.id);
        var result = runRule(wb, rule);
        results.push(result);
        if (result.isFailure) break;
    }
    console.log("ALWAYS ", results);

    // If this is true, the basics passed, and we can grab
    // the ID of the ruleset that applies to this workbook.
    const can_proceed = results.every(e => e.isSuccess === true);
    var ruleset_id = null;
    if (can_proceed) {
        // FIXME: We need to extract out this kind of hard-coded
        // magic location stuff. What if this changes?
        ruleset_id = wb.Sheets.metadata.B1.v;
    }

    if (ruleset_id) {
        var results = [];
        for (const rule of rulesets[ruleset_id].rules) {
            console.log(rule.id);
            var result = runRule(wb, rule);
            results.push(result);
            if (result.isFailure) break;
        }
        return results;
    }
    return [new core.Failure(wb, {"status": "warning", "title": "Basic checks failed"}, "<p>The workbook you checked did not pass basic checks.</p><p>Did you start with a correct template?</p>")]
}

/* Exports */
export {runRuleSet, runRules, runRule};
//exports.runRule = runRule;
//exports.runRules = runRules;
