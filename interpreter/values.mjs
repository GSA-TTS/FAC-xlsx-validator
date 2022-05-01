import * as core from './core.mjs';

function locationHasValue(wb, rule) {
    var the_sheet = wb.Sheets[rule.sheetname];
    if (!the_sheet.hasOwnProperty(rule.location)) {
        return new core.Failure(wb, rule, "Cell " + rule.location + " not found in sheet " + rule.sheetname);
    } 

    return new core.Success(wb, rule, "Cell " + rule.location + " found");
}

function locationMatchesRegex(wb, rule) {
    var the_sheet = wb.Sheets[rule.sheetname];
    var cell_value = the_sheet[rule.location].v;
    const re = new RegExp(rule.regex);
    if (cell_value.match(re)) {
        return new core.Success(wb, rule, "Cell " + rule.location + " matches pattern"); 
    } else {
        var m = rule.message;
        m = m.replace("REGEX", rule.regex);
        m = m.replace("LOCATION", rule.location);
        return new core.Failure(wb, rule, m); 
    }
}

export {locationHasValue, locationMatchesRegex};