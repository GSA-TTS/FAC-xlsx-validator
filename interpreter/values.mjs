import * as core from './core.mjs';

function locationHasValue(wb, rule) {
    var the_sheet = wb.Sheets[rule.sheetname];
    if (!the_sheet.hasOwnProperty(rule.location)) {
        return new core.Failure(wb, rule, "Cell " + rule.location + " not found in sheet " + rule.sheetname);
    } 

    return new core.Success(wb, rule, "Cell " + rule.location + " found");
}

export {locationHasValue};