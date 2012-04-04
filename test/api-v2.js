var assert = require('chai').assert;
var request = require('request');
var express = require('express');
var appRoutes = require('../app-routes');
var appConfig = require('../app-config');
var app = module.exports = express.createServer();

var port = 4001;
var socket = 'http://localhost:' + port;
appConfig.configure(app);
appRoutes.createRoutes(app);
app.listen(port);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

describe('APIv2 tests', function() {

	describe('GET /', function() {
		it("should respond with the documentation page", function(done) {
			request({
				method : 'GET',
				uri : socket+'/'
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, '<title>DRI API</title>');
				done();
			});
		});
	});
	describe('GET /documents/collections', function() {
		it("should respond with an array of all the collections", function(done) {
			request({
				method : 'GET',
				uri : socket+'/dev/collections'
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, '"type":"collection"');
				done();
			});
		});
	});
});
