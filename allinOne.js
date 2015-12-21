var cluster = require('cluster');


var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    var worker;
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
    	setTimeout(function(){
    		        cluster.fork();
                console.log("#########", Date.now()) 
    		      }, i* 10)

	// Ignore function within a loop warning for now ....

	// No need for separate event registering for all workers
	//cluster.on("exit") handles those cases ;
	/*
	worker.on("exit" , function (code, signal) {
            console.log("Worker " + worker.id + " killed ");
            if (signal) {
		console.log("Worker killed by signal: " + signal);
            } else if (code !== 0) {
		console.log("worker exited with error code: " + code);
            } else {
                console.log("Worker Success !");
            }
        });
	 */
    }

    /*
     The difference between 'fork' and 'online' is that fork is emitted when the master forks a worker, and 'online' is emitted when the worker is running.
     */


    cluster.on('fork', function (worker) {
	     console.log('worker ' + worker.id + ' forked ... is it master ??? ' + cluster.isMaster);
    });

    cluster.on('online', function(worker) {
    	  console.log("is it master online ... " + cluster.isMaster);
        console.log('worker ' + worker.id + ' with process id ' + worker.process.pid + ' is now ' + worker.state );
    });


    cluster.on('listening', function(worker, address) {
        console.log('worker ' + worker.id + ' with process id ' + worker.process.pid + ' on ' + address.port);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.id + ' with process id ' + worker.process.pid + ' is now ' + worker.state + ' because ' + signal);

	if (worker.suicide) {
            console.log("Worder Id " + worker.id + " committed suicide");
	}
    });

    cluster.on('disconnect', function(worker) {
	console.log('The worker #' + worker.id + ' has disconnected');
    });


    // Can worker process communicate with master process ?

    var numReqs = 0;
    // setInterval(function() {
    // 	console.log("numReqs =", numReqs);
    // }, 1000);

    // Count requests

    // Ignore another warning ...
    function messageHandler(msg) {
        if (msg.cmd && msg.cmd == 'notifyRequest') {
            numReqs += 1;
        }
    }

    /// Send message handler to master
    Object.keys(cluster.workers).forEach(function(id) {
	cluster.workers[id].on('message', messageHandler);
    });

} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server

    // Showing all worker servers are created once ...
    console.log("Creating server", cluster.worker.id);

    http.createServer(function(req, res) {
    	// Showing all worker servers are sending response in round robin  ...
        res.writeHead(200);

        res.end("hello world from " + cluster.worker.id + " The pid for this worker is " + cluster.worker.process.pid + "\n.");

        process.send({ cmd: 'notifyRequest' });

    }).listen(8000);

    setTimeout(function () {
        // Sets suicide mode to be true
        cluster.worker.kill();
        // cluster.worker.disconnect();
    }, 2000);

    // process.disconnect();

}