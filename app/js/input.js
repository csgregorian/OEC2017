var app = require('electron').remote;
var dialog = app.dialog;

$('#gettext').click(function() {
    dialog.showOpenDialog(function(fileNames) {
        // fileNames is an array that contains all the selected
        if (fileNames === undefined) {
            console.log("No file selected");
        } else {
            readFile(fileNames[0]);
        }
    });

    function readFile(filepath) {
        fs.readFile(filepath, 'utf-8', function(err, data) {
            if (err) {
                alert("An error ocurred reading the file :" + err.message);
                return;
            }
            // Change how to handle the file content
            console.log("The file content is : " + data);
        });
    }

    // Note that the previous example will handle only 1 file, if you want that the dialog accepts multiple files, then change the settings:
    // And obviously , loop through the fileNames and read every file manually
    dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections', function(fileNames) {
            console.log(fileNames);
        }]
    });
});