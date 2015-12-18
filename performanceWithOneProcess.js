//Single process handling all requests without creating any cluster.
var app = require('express')();

app.all("/*", function(req, res) {
	res.send("process with pid : " + process.pid + " says hello!!").end();
});
var server = app.listen(8000, function() {
	console.log("process with pid : " + process.pid + " is listening to all requests");
});