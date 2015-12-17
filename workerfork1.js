var cluster = require('cluster');

if (cluster.isMaster) {
	console.log("&&&&&&&&&&&&&&&&&  MASTER IS UP &&&&&&&&&&&&&&&&");
	var worker = cluster.fork();
	cluster.on('exit', function(worker, code, signal) {
		console.log("******* EVENT EXIT GETS EMITTED *************\n");
		console.log(" WORKER PROCESS IS EXITING with code : " + code + " and signal : " + signal);
		console.log(" Process dying gracefully");
	});
} else {
	console.log(" DISCONNECTING IPC channel\n");
	process.disconnect();
}

cluster.on('fork', function(worker) {
	console.log("^^^^^^^^ EVENT FORK GETS EMITTED ^^^^^^ \n");
	console.log(" WORKER PROCESS IS FORKED\n ");
});