const core = require('./core.mjs');

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
    return types[rule.type](wb, rule);
}

/* Exports */
exports.locationIsType = locationIsType;
exports.locationIsInteger = locationIsInteger;