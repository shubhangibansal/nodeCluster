var cluster = require('cluster');
var http = require('http');

if (cluster.isMaster) {
	var worker = cluster.fork();
	worker.send("HI THere");
	worker.on("message",function(msg){
		console.log(msg);
		worker.disconnect();
	});
} else {
	process.on("message", function(msg) {
		console.log(msg);
		process.send("hi master process");
	});

}