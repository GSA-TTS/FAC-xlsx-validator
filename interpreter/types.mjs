//const core = require('./core.mjs');
import * as core from './core.mjs';

var types = {
    "integer": locationIsInteger
};

function locationIsInteger(wb, rule) {
   
    var the_sheet = wb.Sheets[rule.sheetname];
    if (!the_sheet.hasOwnProperty(rule.location)) {
        return new core.Failure(wb, rule, "Cell " + rule.location + " note found in sheet " + rule.sheetname);
    }

    
    var cell = the_sheet[rule.location];
    var cell_type = cell.t;
    var cell_value = cell.v;
    var n = Math.floor(Number(cell_value));
    console.log("number found: ", n);
    if (isNaN(n) && 
        (n !== Infinity) && 
        (String(n) === cell.w) && 
        (cell_type === "n")) {
        var msg = rule.message;
        msg = msg.replace("LOCATION", rule.location);
        msg = msg.replace("SHEETNAME", rule.sheetname);
        return new core.Failure(wb, rule, msg);
    }
    return new core.Success(wb, rule, rule.location + " is typeof " + rule.type);    
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
//exports.locationIsType = locationIsType;
//exports.locationIsInteger = locationIsInteger;