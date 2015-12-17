//After calling listen() from a worker, when the 'listening' event is emitted on the server,
// a 'listening' event will also be emitted on cluster in the master.

var cluster = require('cluster');
var http = require('http');

if (cluster.isMaster) {
	console.log("Master process is up")
	var worker = cluster.fork();
	cluster.on('listening', function(worker, addr) {
		console.log("LISTEN EVENT HAS ALSO BEEN EMITTED BY THE MASTER CLUSTER ,ALONG WITH THE SERVER")
		console.log("ADDRESS: " + addr.address + " and PORT: " + addr.port);
	});
} else {
	console.log("Worker process is up");
	http.Server(function(req, res) {
		console.log("Listen() has been called from a worker");
		res.end("worker process with pid : " + process.pid + " is listening to all the requests\n");
	}).listen(0);
}