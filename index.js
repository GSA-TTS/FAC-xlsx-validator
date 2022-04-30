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
    readTextFile("./interpreter/rules.json", function(text){
        rules = JSON.parse(text);
        console.log(rules);

        // FIXME: What if the rules don't load?
        if (rules != null) {
            Promise.resolve().then(_ => {
                interpreter.runRules(workbook, rules);
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

