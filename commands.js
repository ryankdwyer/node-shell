var fs = require('fs');
var request = require('request');
var done = require('./bash.js').done;

var commands = {
    pwd: function(param, done) {
        done(process.cwd());
    },

    ls: function(param, done) {
        var output = '';
        fs.readdir('.', function(err, files) {
            // '.' refers to the current working directory NOT where this commands file exists
            // __dirname is the place where this commands file exists
            if (err) throw err;
            files.forEach(function(file) {
                output += (file.toString() +"\n");
            });
            done(output);
        });
        
    },
    echo: function(file, done) {
        if (file[0] === '$') {
            done(process.env[arg.slice(1)]);
        } else {
            done(file);    
        }
    },
    date: function(param, done) {
        done(Date());
    },
    cat: function(files, done) {
        files = files.split(' ');
        var texts = [];
        var counter = 0;
        files.forEach(function(file, idx){
            // Need to use a counter to check if all of the streams are complete
            // Store results to outer object
            fs.readFile(file, function(err, data){
                if(err) throw err;
                // Pushes the data at the index closed over from the forEach
                texts[idx] = data;
                counter++;
                if (counter === files.length) done(texts.join('\n'));
            });
        });
    },
    head: function(file, done) {
        fs.readFile(file, function(err, data){
            if(err) throw err;
            var fileStream = '';
            fileStream += data.toString();
            done(fileStream.split('\n').slice(0,5).join('\n'));
        });
    },
    tail: function(file, done){
        fs.readFile(file, function(err, data){
            if(err) throw err;
            var fileStream = '';
            fileStream += data.toString();
            done(fileStream.split('\n').slice(-5).join('\n'));
        });
    },
    sort: function(file, done){
        fs.readFile(file, function(err, data){
            if(err) throw err;
            var fileStream = '';
            fileStream += data.toString();
            done(fileStream.split('\n').sort().join('\n'));
        });
    },
    wc: function(file, done){
        fs.readFile(file, function(err, data){
            if(err) throw err;
            var fileStream = '';
            fileStream += data.toString();
            done(fileStream.split('\n').length.toString());
        });
    },
    uniq: function(file, done){
        fs.readFile(file, function(err, data){
            if(err) throw err;
            var fileStream = '';
            fileStream += data.toString();
            var sorted = fileStream.split('\n').sort();
            var uniqd = [sorted[0]];
            for (var i = 1; i < sorted.length; i++){
                if (sorted[i] !== sorted[i-1]) {
                    uniqd.push(sorted[i]);
                }
            }
            done(uniqd.join('\n'));
        });
    },
    curl: function(url, done) {
        if (stdin) url = stdin;
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    done(body); // Show the HTML for the Google homepage. 
                }
            });
    },
};

module.exports = commands;