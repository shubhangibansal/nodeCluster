//A simple example where a simple server has been set up responding to all the incoming requests,
//in a round robin fashion
var cluster = require('cluster');
var http = require('http');
var numCPUs = 4;

if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
} else {
	http.createServer(function(req, res) {
		res.end('process ' + process.pid + ' says hello!');
	}).listen(8000);
}

// DOUBTS: 
// 1) What will happen if the worker process keeps on dying one by one 
// then master process will be left with no other worker process?

// 2) There are different no. of cores and threads in the system to which we deploy our application to.
// so inorder to take full advantage of the system's resouces, 
// need to manually check deployment server's specifictions and should update it in the code accordingly.