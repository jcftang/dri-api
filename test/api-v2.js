var assert = require('chai').assert;
var request = require('request');
var express = require('express');
var http = require('http');
var appRoutes = require('../app-routes');
var appConfig = require('../app-config');
var app = module.exports = express.createServer();

var port = 4001;
var socket = 'http://localhost:' + port;
appConfig.configure(app);
appRoutes.createRoutes(app);
app.listen(port);

//console.log("Express test server listening on port %d in %s mode", app.address().port, app.settings.env);

describe('Tests for DRI APIv2', function() {

	var collectionId, seriesId, itemId;

	describe('GET /', function() {
		it("should respond with the root page, this is just a sanity check", function(done) {
			request({
				method : 'GET',
				uri : socket + '/'
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, '<title>DRI API</title>');
				done();
			});
		});
	});
	describe('POST /dev/objects type = collection', function() {
		it("should respond with the id of the created object", function(done) {

			request({
				method : 'POST',
				uri : socket + '/dev/objects',
				json : {
					"status" : "Open",
					"properties" : {
						"title" : "AutoTestSeries",
						"subtitle" : "AutoTestSeries"
					},
					"type" : "collection"
				}
			}, function(err, resp, body) {

				assert.isNull(err);
				assert.isDefined(body);
				assert.length(body, 24);
				collectionId = body;
				done();
			});
		});
	});
	describe('POST /dev/objects type = series', function() {
		it("should respond with the id of the created object", function(done) {

			request({
				method : 'POST',
				uri : socket + '/dev/objects',
				json : {
					"status" : "Open",
					"properties" : {
						"title" : "AutoTestItem",
						"subtitle" : "AutoTestItem"
					},
					"type" : "series",
					parentId : collectionId
				}
			}, function(err, resp, body) {

				assert.isNull(err);
				assert.isDefined(body);
				assert.length(body, 24);
				seriesId = body;
				done();
			});
		});
	});
	describe('POST /dev/objects type = item', function() {
		it("should respond with the id of the created object", function(done) {
			request({
				method : 'POST',
				uri : socket + '/dev/objects',
				json : {
					"status" : "Open",
					"properties" : {
						"title" : "AutoTestColl",
						"subtitle" : "AutoTestColl"
					},
					"type" : "item",
					parentId : seriesId
				}
			}, function(err, resp, body) {

				assert.isNull(err);
				assert.isDefined(body);
				assert.length(body, 24);
				itemId = body;
				done();
			});
		});
	});
	describe('POST /dev/objects/:id/update', function() {
		it("should respond with the id of the updated object", function(done) {
			request({
				method : 'POST',
				uri : socket + '/dev/objects/' + collectionId + '/update',
				json : {
					properties : {
						title : "I updated this collection",
						subtitle : "AutoTestSeries"
					}
				}
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.equal(body, 1);
				assert.isDefined(body);
				done();
			});
		});
	});
	describe('POST /dev/objects/:id/update', function() {
		it("should respond with the id of the updated object", function(done) {
			request({
				method : 'POST',
				uri : socket + '/dev/objects/' + seriesId + '/update',
				json : {
					properties : {
						title : "I updated this series"
					}
				}
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.equal(body, 1);
				assert.isDefined(body);
				done();
			});
		});
	});
	describe('POST /dev/objects/:id/update', function() {
		it("should respond with the id of the updated object", function(done) {
			request({
				method : 'POST',
				uri : socket + '/dev/objects/' + seriesId + '/update',
				json : {
					properties : {
						title : "I updated this item"
					}
				}
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.equal(body, 1);
				assert.isDefined(body);
				done();
			});
		});
	});
	describe('GET /dev/objects', function() {
		it("should respond with the an array with all the top level objects", function(done) {
			request({
				method : 'GET',
				uri : socket + '/dev/objects'
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, '_id');
				done();
			});
		});
	});
	describe('GET /dev/objects/:id', function() {
		it("should respond with the JSON of the selected object", function(done) {
			request({
				method : 'GET',
				uri : socket + '/dev/objects/' + collectionId
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, collectionId);
				assert.include(body, 'updated');
				done();
			});
		});
	});
	describe('GET /dev/objects/:id.dc', function() {
		it("should respond with the Dublin core XML of the selected object", function(done) {
			request({
				method : 'GET',
				uri : socket + '/dev/objects/' + collectionId + '.dc'
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, collectionId);
				assert.include(body, 'dc:');
				done();
			});
		});
	});
	describe('GET /dev/objects/:id/list', function() {
		it("should respond with the an array with all the children items", function(done) {
			request({
				method : 'GET',
				uri : socket + '/dev/objects/' + collectionId + '/list'
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, collectionId);
				done();
			});
		});
	});
	describe('GET /dev/objects/:id/delete', function() {
		it("should respond with the id of the deleted object", function(done) {
			request({
				method : 'GET',
				uri : socket + '/dev/objects/' + collectionId + '/delete'
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, collectionId);
				done();
			});
		});
	});
	describe('GET /dev/objects/:id/delete', function() {
		it("should respond with the id of the deleted object", function(done) {
			request({
				method : 'GET',
				uri : socket + '/dev/objects/' + seriesId + '/delete'
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, seriesId);
				done();
			});
		});
	});
	describe('GET /dev/objects/:id/delete', function() {
		it("should respond with the id of the deleted object", function(done) {
			request({
				method : 'GET',
				uri : socket + '/dev/objects/' + itemId + '/delete'
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, itemId);
				done();
			});
		});
	});
});
