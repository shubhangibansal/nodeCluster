//when worker process is killed, it sets the worker fields : KILLED AND SUICIDE to be true
var cluster = require('cluster');
var http = require('http');


if (cluster.isMaster) {
  console.log("&&&&&&&&&&&&&&&&&  MASTER IS UP &&&&&&&&&&&&&&&&");
  var worker = cluster.fork();
  console.log("&&&&&&&&&&&&&&&&  FORK EVENT EMITTED &&&&&&&&&&&");
  var timeout;

  worker.on('listening', function(address) {
    //worker.send('shutdown');
    console.log("!!!!!! BEFORE WORKER PROCESS IS KILLED !!!!!!!");
    console.log("KILLED --", worker.process.killed + " ,SUICIDE --" + worker.suicide + "\n");
    timeout = setTimeout(function() {
      console.log("AFTER THE TIMER IS SET AT WHICH WORKER PROCESS with pid : " + process.pid + " WILL BE KILLED WITH FIELD VALUES AS:");
      console.log("KILLED --", worker.process.killed + " ,SUICIDE --" + worker.suicide + "\n");
      worker.kill();
      console.log("WORKER PROCESS with pid : " + process.pid + " HAS BEEN KILLED");
      console.log("KILLED --", worker.process.killed + " ,SUICIDE --" + worker.suicide);
    }, 2000);
  });

} else if (cluster.isWorker) {
  console.log("&&&&&&&&&&&&&&&&&  WORKER PROCESS IS UP &&&&&&&&&&&&&&&&")
  var net = require('net');
  var server = net.createServer(function(socket) {
    // connections never end
  });
  console.log("INSIDE WORKER AND LISTENING ON PORT")
  server.listen(8000);

}