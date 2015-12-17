//The difference between 'fork' and 'online' is that fork is emitted when the master forks a worker, 
//and 'online' is emitted when the worker is running.

var cluster = require('cluster');

if (cluster.isMaster) {
	var worker = cluster.fork();
} else {
	console.log(" WORKER PROCESS IS UP AND RUNNING with pid: ", process.pid);
}
cluster.on('fork', function() {
	console.log(" FORK event emitted \n");
});

cluster.on('online', function() {
	console.log(" ONLINE event is emitted means WORKER PROCESS is RUNNING now ");
});