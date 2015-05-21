var restify = require('restify'),
    fs = require('fs');

// instantiate the server
// http://mcavage.me/node-restify/#Bundled-Plugins

var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: false }));

// bootstrap services

var models_path = __dirname + '/services';
var services = {};
fs.readdirSync(models_path).forEach(function(file) {
	console.log('load resource ' + file);
    var service = require(models_path + '/' + file);
    services[service.name] = service;
});

// bootstrap resources

var models_path = __dirname + '/resources';
fs.readdirSync(models_path).forEach(function(file) {
	console.log('load resource ' + file);
    var resource = require(models_path + '/' + file);
    resource.initialize(server, services);
});


// start the server listening

server.listen(9080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
