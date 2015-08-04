var commands = require('./commands.js');

process.stdout.write('prompt > ');

//The stdin 'data' event fires after user inputs data
process.stdin.on('data', function(data) {
    var args = data.toString().trim().split(' ');
    var cmd = args[0];
    var param = args.slice(1).join(' ');

 //    var cmdString = d.toString().trim();
	// var cmdList = cmdString.split(/\s*\|\s*/g);
	// var cmdList_cmd1 = cmdList[0].split(' ');

    // var param = process.argv;
    if (commands[cmd]) {
    	commands[cmd](param, funcs.done);
    } else {
    	process.stdout.write('prompt > ');
    }
});

var funcs = {
	done: function(output) {
		// show the output
		process.stdout.write(output + '\nprompt > ');
	}
};

module.exports = funcs;