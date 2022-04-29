function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


async function runRules(wb, rules) {
    for (const r of rules.rules) {
        console.log(r);
        switch (r.category) {
            case "sheetexists":
                var found = false;
                for (const sn of wb.SheetNames) {
                    if (sn.match(r.sheetname)) {
                        found = true;
                    }
                }
                if (!found) {
                    msg = r.message;
                    msg.replace("SHEETNAME", r.sheetname);
                    console.log(msg);
                } else {
                    console.log("Found sheet '" + r.sheetname + "'")
                }
                break;
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


async function processWorkbook (path) {
    console.log(path)
    const workbook = await fetch(path)
        // I'm operating in a web browser, the file is far away...
        // Read it into a local buffer.
        .then(resp => resp.arrayBuffer())
        // Ask XLSX to read the buffer, not the file from the filesystem.
        .then(buff => XLSX.read(buff))
        // FIXME: This is not error handling.
        .catch(err => console.error(err))
    console.log(workbook)
    
    var rules = null;
    readTextFile("./rules.json", function(text){
        rules = JSON.parse(text);
        console.log(rules);

        // FIXME: What if the rules don't load?
        if (rules != null) {
            Promise.resolve().then(_ => {
                runRules(workbook, rules);
            });
        }
    });
    

}

document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
 
    for (const f of event.dataTransfer.files) {
        // Using the path attribute to get absolute file path
        console.log('File Path of dragged files: ', f.path)
        Promise.resolve().then(_ => {
            processWorkbook(f.path);
        });
      }
      
});
 
document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
 
document.addEventListener('dragenter', (event) => {
    console.log('File is in the Drop Space');
});
 
document.addEventListener('dragleave', (event) => {
    console.log('File has left the Drop Space');
});

