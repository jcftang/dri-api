/**
 * @author mvanwamb
 * @author Quirijn Groot Bluemink
 */
var assert = require('chai').assert;
var request = require('request');
var express = require('express');
var fs = require('fs');
var superagent = require('superagent');
var appRoutes = require('../app-routes');
var appConfig = require('../app-config');
var app = module.exports = express.createServer();

var port = 4001;
var socket = 'http://localhost:' + port;
appConfig.configure(app);
appRoutes.createRoutes(app);
app.listen(port);

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
					status : "open",
					type : "collection",
					properties : {
						titleInfo : [{
							title : "This is a Collection title!"
						}]
					}
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
					status : "open",
					type : "series",
					properties : {
						titleInfo : [{
							title : "This is a Series title!"
						}]
					},
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
					status : "open",
					properties : {
						titleInfo : [{
							title : "This is a item title!"
						}]
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

	describe('POST /dev/upload type = item with binary object', function() {
		it("should respond with the path of the uploaded file", function(done) {
			var req = superagent.post(socket + '/dev/upload').attach(__dirname + '/car.jpg', 'upload')
			req.end(function(resp) {
				assert.isDefined(resp.text);
				assert.include(resp, "car.jpg");
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
					status : "open",
					properties : {
						titleInfo : [{
							title : "This is a updated collection title!"
						}]
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
					status : "open",
					properties : {
						titleInfo : [{
							title : "This is a updated series title!"
						}]
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
				uri : socket + '/dev/objects/' + itemId + '/update',
				json : {
					status : "open",
					properties : {
						titleInfo : [{
							title : "This is a updated item title!"
						}]
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
	describe('GET /dev/objects/:id/approve', function() {
		it("should respond with the Fedora pid", function(done) {
			request({
				method : 'GET',
				uri : socket + '/dev/objects/' + collectionId + '/approve'
			}, function(err, resp, body) {
				assert.isNull(err);
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
