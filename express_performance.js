// 1) shows how we can develop a highly scalable Express server. 
// 2) It also demonstrates how to migrate a single process server to take advantage of a cluster module 
//with few lines of code.Thereby enhancing performance.

var cluster = require('cluster');
var app = require('express')();
var numCPUs = require('os').cpus().length;


if (cluster.isMaster) {
	console.log("MASTER process is up now");
	console.log("Master process is setting up " + numCPUs + " processes");
	for (i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('online', function(worker) {
		console.log("worker process with pid : " + worker.process.pid + " is online");
	});
} else {
	if (cluster.isWorker) {
		console.log("Worker process are up now");

		app.all("/*", function(req, res) {
			res.send("Worker process with pid : " + process.pid + " says  hello").end();
		});
		var server = app.listen(8000, function() {
			console.log("Process with pid : " + process.pid + " is listening to all incoming requests");
		});
	}
}