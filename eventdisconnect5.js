var cluster = require('cluster');
var http = require('http');


if (cluster.isMaster) {
  console.log("&&&&&&&&&&&&&&&&&  MASTER IS UP &&&&&&&&&&&&&&&&\n");
  var worker = cluster.fork();
  var timeout;

  worker.on('listening', function(address) {
    console.log("!!!!!! BEFORE WORKER PROCESS IS DISCONNECTED !!!!!!!");
    console.log("KILLED --", worker.process.killed + " ,SUICIDE --" + worker.suicide + "\n");
    worker.send('shutdown');
    worker.disconnect();
    timeout = setTimeout(function() {
      console.log("AFTER THE TIMER IS SET AT WHICH WORKER PROCESS with pid : " + process.pid + " WILL BE KILLED WITH FIELD VALUES AS:");
      console.log("KILLED --", worker.process.killed + " ,SUICIDE --" + worker.suicide + "\n");
      worker.kill();
      console.log("WORKER PROCESS with pid : " + process.pid + " HAS BEEN KILLED");
      console.log("KILLED --", worker.process.killed + " ,SUICIDE --" + worker.suicide);
    }, 2000);
  });

  worker.on('disconnect', function() {
    console.log(" DISCONNECTING IPC CHANNEL, AS DISCONNECT EVENT HAS BEEN EMITTED \n");
    console.log(" Now the process won't be killed, as it is getting disconnected gracefully ");
    clearTimeout(timeout);
  });

} else if (cluster.isWorker) {
  console.log("&&&&&&&&&&&&&&&&&  WORKER PROCESS IS UP &&&&&&&&&&&&&&&&");
  var net = require('net');
  var server = net.createServer(function(socket) {
    // connections never end
  });
  console.log("INSIDE WORKER AND LISTENING ON PORT\n")
  server.listen(8000);

  process.on('message', function(msg) {
    console.log(" MESSAGEE EVENT HAS BEEN EMITTED ")
    if (msg === 'shutdown') {
      console.log(" informing abt the process normal shutdown \n");
      // initiate graceful close of any connections to server
    }
  });
}