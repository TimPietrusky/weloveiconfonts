var fs = require('fs'),
    compressor = require('node-minify'),
    sys = require('sys'),
    exec = require('child_process').exec;

  var StringExtensions=new function(){this.trim=function(){return this.replace(/^\s+|\s+$/g,"")};String.prototype.trim=this.trim;this.repeat=function(j){return Array(1+j).join(this)};String.prototype.repeat=this.repeat},CSSJSON=new function(){var j=/([^\:]+):([^\;]*);/,n=/(\/\*.*?\*\/)|([^\s\;\{\}][^\;\{\}]*(?=\{))|(\})|([^\;\{\}]+\;)/g;this.toJSON=function(b,d){return k(b,d)};var g=function(b){return"undefined"==typeof b||0==b.length||null==b},k=function(b,d){for(var c={},a=null,h=0;null!=(a=n.exec(b));)if(g(a[1]))if(g(a[2]))if(g(a[3])){if(!g(a[4])){var a=
  a[4].trim(),e=j.exec(a);if(e){var a=e[1].trim(),f=e[2].trim();d?(e={},e.name=a,e.value=f,e.type="attr",c[h++]=e):c[a]=f}else c[h++]=a}}else break;else a=a[2].trim(),f=k(b,d),d?(e={},e.name=a,e.value=f,e.type="rule",c[h++]=e):c[a]=f;else a=a[1].trim(),c[h++]=a;return c};this.toCSS=function(b){return l(b)};var l=function(b,d){var c="";"undefined"==typeof d&&(d=0);for(i in b){var a=b[i];"number"==typeof i||parseInt(i)==i?c="object"==typeof a?"rule"==a.type?c+m(a.name,a.value,d):c+("\t".repeat(d)+a.name+
  ": "+a.value+";\n"):c+("\t".repeat(d)+a+"\n"):"string"==typeof i&&(c="object"==typeof a?c+m(i,a,d):c+("\t".repeat(d)+i+": "+a+";\n"))}return c},m=function(b,d,c){b="\t".repeat(c)+b+" {\n";b+=l(d,c+1);return b+="\t".repeat(c)+"}\n\n"}};


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
        if (files[i] != 'extract.js') {
            // Query the entry
            stats = fs.lstatSync(folder + files[i]);
        
            // Is it a directory?
            if (stats.isDirectory()) {
                getFiles(files[i]);
            } else {
                    stuff.push(folder + files[i]);
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

    if (file.search('-min.css') != -1) {
        fs.readFile(file, "utf-8", function (err, data) {
          if (err) throw err;

          var json = CSSJSON.toJSON(data);
          console.log(json);

          fs.writeFile("./extract.txt", "Hey there!", function(err) {
            if (err) throw err;
          }); 
        });
    }

}