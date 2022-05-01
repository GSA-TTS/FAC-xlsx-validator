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

function createAlertMessage(wb, rule, msg) {
    var div_alert = document.createElement("div");
    div_alert.setAttribute("class", "usa-alert usa-alert--" + rule.status)
    var div_alert_body = document.createElement("div");
    div_alert_body.setAttribute("class", "usa-alert__body");
    var h4 = document.createElement("h4");
    h4.setAttribute("class", "usa-alert__heading");
    h4.innerText = rule.title;
    var p = document.createElement("p");
    p.setAttribute("class", "usa-alert__text");
    p.innerHTML = msg;
    div_alert_body.appendChild(h4);
    div_alert_body.appendChild(p);
    div_alert.appendChild(div_alert_body);
    return div_alert
}

function changeTopText() {
    var e = document.getElementById("top-text");
    e.innerText =  "Drag a new set of workbooks on, and we'll check them again."
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function cleanupPreviousAlerts () {
    removeAllChildNodes(document.getElementById("results"));
}

async function processWorkbook (path) {
    
    const workbook = await fetch(path)
        // I'm operating in a web browser, the file is far away...
        // Read it into a local buffer.
        .then(resp => resp.arrayBuffer())
        // Ask XLSX to read the buffer, not the file from the filesystem.
        .then(buff => XLSX.read(buff))
        // FIXME: This is not error handling.
        .catch(err => console.error(err))
    console.log(workbook)
    
    var ruleset = null;
    readTextFile("./rules.json", function(text){
        ruleset = JSON.parse(text);
        console.log(ruleset);

        // FIXME: What if the rules don't load?
        if (ruleset != null) {
            Promise.resolve().then(_ => {
                var results = interpreter.runRuleSet(workbook, ruleset);
                var error_found = false;
                for (const r of results) {
                    if (!r.isSuccess) {
                        // Should we only show one error at a time?
                        // This is the BlueJ way...
                        var div = createAlertMessage(r.wb, r.rule, r.message);
                        document.getElementById("results").appendChild(div);
                        error_found = true;
                        break;
                    } 
                }

                // If we counted everything as being correct
                if (!error_found) {
                    var div = createAlertMessage({}, {status: "success", "title": "Everything looks good!"}, "These sheets are ready for submission");
                    document.getElementById("results").appendChild(div);
                }
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
            cleanupPreviousAlerts();
            changeTopText();
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

