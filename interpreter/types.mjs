// const core = require('./core.mjs');
import * as core from './core.mjs';

var types = {
    "integer": locationIsInteger
};

function locationIsInteger(wb, rule) {
    var the_sheet = wb.Sheets[rule.sheetname];
    var s = the_sheet[rule.location];
    var n = Math.floor(Number(s));
    if (isNaN(n) || (n !== Infinity && String(n) === s && n >= 0)) {
        var msg = rule.message;
        msg = msg.replace("LOCATION", r.location);
        msg = msg.replace("SHEETNAME", r.sheetname);
        return core.Failure(wb, rule, msg);
    }
    return core.Success(wb, rule, rule.location + " is typeof " + rule.type);
}

function locationIsType(wb, rule) {
    if (rule.type in types) {
        return types[rule.type](wb, rule);
    } else {
        return new core.Failure(wb, rule, rule.type + " not a valid type check in sheet");
    }
}

/* Exports */
export {locationIsType, locationIsInteger};