
async function runRules(wb, rules) {
    for (const r of rules.rules) {
        console.log(r);
        switch (r.category) {
            case "sheetexists":
                
            case "cellvaluetype":
                var the_sheet = wb.Sheets[r.sheetname];
                var s = the_sheet[r.location];
                
                switch (r.type) {
                    case "integer":
                        var n = Math.floor(Number(s));
                        if (isNaN(n) || (n !== Infinity && String(n) === s && n >= 0)) {
                            var msg = r.message;
                            msg = msg.replace("LOCATION", r.location);
                            msg = msg.replace("SHEETNAME", r.sheetname);
                            console.log(msg);
                        } else {
                            console.log(n.toString() + " looks like an integer to me!")
                        }
                        break;
                    default:
                        console.log("No handler for type " + r.type);
                }
                break;
            default:
                console.log("No rule handler for " + r.category);
        }
    }
}
