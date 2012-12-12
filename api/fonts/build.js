var fs = require('fs'),
    compressor = require('node-minify'),
    sys = require('sys'),
    exec = require('child_process').exec;


var folder = '.',
    stuff = [];

function getFiles(folder) {
    var files = fs.readdirSync(folder);    
    folder += '/';
    
    // Ignore shit
    if (folder == '.git/') {
      return false;
    }

    for (var i = 0; i < files.length; i++) {
        if (files[i] != 'build.js') {
            // Query the entry
            stats = fs.lstatSync(folder + files[i]);
        
            // Is it a directory?
            if (stats.isDirectory()) {
                getFiles(files[i]);
            } else {
                if ((folder + files[i]).search('-min.') == -1) {
                    stuff.push(folder + files[i]);
                } 
            }
        }
    }
  
    return stuff;
}

// Get files to minify
getFiles(folder);

// Minify
for (var i = 0; i < stuff.length; i++) {
    var file = stuff[i];

    if (file.search('.css') != -1) {
        new compressor.minify({
            type: 'yui-css',
            fileIn: file,
            fileOut: file.replace('.css', '-min.css'),
            callback: function(err){
                if (err != null) {
                    console.log(err);
                }
            }
        });
    }
}