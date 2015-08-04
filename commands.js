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
            if (err) throw err;
            files.forEach(function(file) {
                output += (file.toString() +"\n");
            });
            done(output);
        });
        
    },
    echo: function(file, done) {
        done(file);
    },
    date: function(param, done) {
        done(Date());
    },
    cat: function(file, done) {
        var output = '';
        fs.readFile(file, function(err, data){
            if(err) throw err;
            output += (data.toString());
            done(output);
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
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    done(body); // Show the HTML for the Google homepage. 
                }
            });
    },
};

module.exports = commands;