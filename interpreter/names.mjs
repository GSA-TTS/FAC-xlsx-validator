const core = require('./core.mjs');

function sheetExists (wb, rule) {
    var found = false;
    for (const sn of wb.SheetNames) {
        if (sn === rule.sheetname) {
            found = true;
        }
    }

    if (!found) {
        var msg = rule.message;
        var msg = msg.replace("SHEETNAME", rule.sheetname);
        return new core.Failure(wb, rule, msg);
    }

    return new core.Success(wb, rule, rule.sheetname + " exists");    
}

/* Exports */
exports.sheetExists = sheetExists;