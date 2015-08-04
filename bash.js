var commands = require('./commands-pipe.js');
var cmdList, lastStdout;

process.stdout.write('prompt > ');

//The stdin 'data' event fires after user inputs data
process.stdin.on('data', function(data) {
    cmdList = data.toString().trim().split(/\s*\|\s*/g);
    runner(cmdList.shift());
});

function runner (nextCmds) {
	var args = nextCmds.toString().trim().split(' ');
	var cmd = args[0];
	var param = args.slice(1).join(' ');
	if (commands[cmd]) {
		commands[cmd](lastStdout, param, funcs.done);
	} else {
		process.stdout.write('prompt > ');
	}

}

var funcs = {
	done: function(output) {
		if (cmdList.length === 0) {
			process.stdout.write(output + '\nprompt > ');	
		} else {
			lastStdout = output;
			var nextCmds = cmdList.shift();
			runner(nextCmds);
		}
		// show the output
		// process.stdout.write(output + '\nprompt > ');
	},

};

module.exports = funcs;