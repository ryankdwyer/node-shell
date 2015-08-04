var commands = require('./commands.js');

process.stdout.write('prompt > ');

//The stdin 'data' event fires after user inputs data
process.stdin.on('data', function(data) {
    var args = data.toString().trim().split(' ');
    var cmd = args[0];
    var param = args[1];
    // var param = process.argv;
    if (!commands[cmd]) {
    	process.stdout.write('prompt > ');	
    } else {
    	commands[cmd](param, funcs.done);	
    }
});

var funcs = {
	done: function(output) {
		// show the output
		process.stdout.write(output);
		// show the prompt
		process.stdout.write('\nprompt > ');
	}
};

module.exports = funcs;