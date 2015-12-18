var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var app = require('express')();

if (cluster.isMaster) {
	console.log("Master process is up");
	console.log("master process is setting up " + numCPUs + " processes");
	for (i = 0; i < numCPUs; i++) {
		var worker = cluster.fork();
		worker.on('message', function(msg) {
			console.log("message : '" + msg.msg + "' has been sent from : " + msg.from + " to : " + msg.to);
		});
	}
	cluster.on('online', function(worker) {
		console.log('Worker ' + worker.process.pid + ' is online');
	});

	for (var wid in cluster.workers) {
		cluster.workers[wid].send({
			from: 'master',
			to: "process with pid " + cluster.workers[wid].process.pid,
			msg: "Hi worker process"
		});
	}

} else {
	process.on('message', function(msg) {
		console.log("message : '" + msg.msg + "' has been sent from : " + msg.from + " to : " + msg.to);
		process.send({
			from: 'worker with id : ' + process.pid,
			to: 'master process',
			msg: 'hello master'
		});
	});
}