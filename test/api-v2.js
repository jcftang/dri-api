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
	describe('POST /dev/collections', function() {
		it("should respond with the id of the created collection", function(done) {
			request({
				method : 'POST',
				uri : socket + '/dev/collections',
				form : {
					properties : {
						title : "AutoTestColl",
						subtitle : "AutoTestColl"
					},
					status : "Open"
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
	describe('POST /dev/collections/:id/series', function() {
		it("should respond with the id of the created series", function(done) {
			request({
				method : 'POST',
				uri : socket + '/dev/collections/' + collectionId + '/series',
				form : {
					properties : {
						title : "AutoTestSeries",
						subtitle : "AutoTestSeries"
					},
					status : "Open"
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
	describe('POST /dev/collections/:id/series/:id/items', function() {
		it("should respond with the id of the created item", function(done) {
			request({
				method : 'POST',
				uri : socket + '/dev/collections/' + collectionId + '/series/' + seriesId + '/items',
				form : {
					properties : {
						title : "AutoTestTitle",
						subtitle : "AutoTestTitle"
					},
					status : "Open"
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
	/*
	 describe('PUT /dev/collections/:id/series/:id/items/:id', function() {
	 it("should respond with the id of the updated item", function(done) {
	 request({
	 method : 'PUT',
	 uri : socket + '/dev/collections/' + collectionId + '/series/' + seriesId + '/items/' + itemId,
	 form : {
	 _id : itemId,
	 Title : 'Autobot titleUpdate',
	 Subtitle : 'Autobot Subtitle',
	 update : 'update',
	 type : 'item',
	 parentId : seriesId
	 }
	 }, function(err, resp, body) {
	 assert.isNull(err);
	 assert.isDefined(body);
	 assert.length(body, 24);
	 done();
	 });
	 });
	 });
	 describe('PUT /dev/collections/:id/series/:id', function() {
	 it("should respond with the id of the updated series", function(done) {
	 request({
	 method : 'PUT',
	 uri : socket + '/dev/collections/' + collectionId + '/series/' + seriesId,
	 form : {
	 _id : seriesId,
	 Title : 'Autobot seriesUpdate',
	 author : 'Autobot',
	 update : 'update',
	 type : 'series',
	 parentId : collectionId
	 }
	 }, function(err, resp, body) {
	 assert.isNull(err);
	 assert.isDefined(body);
	 assert.length(body, 24);
	 done();
	 });
	 });
	 });
	 describe('PUT /dev/collections/:id', function() {
	 it("should respond with the id of the updated series", function(done) {
	 request({
	 method : 'PUT',
	 uri : socket + '/dev/collections/' + collectionId,
	 form : {
	 _id : collectionId,
	 Title : 'Autobot collectionUpdate',
	 type : 'collection',
	 update : 'update'
	 }
	 }, function(err, resp, body) {
	 assert.isNull(err);
	 assert.isDefined(body);
	 assert.length(body, 24);
	 done();
	 });
	 });
	 });*/
	describe('GET /dev/collections', function() {
		it("should respond with an array of all the collections", function(done) {

			request({
				method : 'GET',
				uri : socket + '/dev/collections'
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, collectionId);
				assert.include(body, "AutoTestColl");
				done();
			});
		});
	});
	describe('GET /dev/collections/:id', function() {
		it("should respond with the array containing the data of the specified collection", function(done) {

			request({
				method : 'GET',
				uri : socket + '/dev/collections/' + collectionId
			}, function(err, resp, body) {
				var json = JSON.parse(body);
				assert.isNull(err);
				assert.isDefined(body);
				assert.equal(json.Title, "Autobot collection");
				done();
			});
		});
	});
	describe('GET /dev/collections/:id/series', function() {
		it("should respond with an array of all the series corresponding to the given id", function(done) {
			request({
				method : 'GET',
				uri : socket + '/dev/collections/' + collectionId + '/series'
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, seriesId);
				assert.include(body, "Autobot series");
				done();
			});
		});
	});
	describe('GET /dev/collections/:id/series/:id', function() {
		it("should respond with the array containing the data of the specified series", function(done) {
			request({
				method : 'GET',
				uri : socket + '/dev/collections/' + collectionId + '/series/' + seriesId
			}, function(err, resp, body) {
				var json = JSON.parse(body);
				assert.isNull(err);
				assert.isDefined(body);
				assert.equal(json.Title, "Autobot series");
				done();
			});
		});
	});
	describe('GET /dev/collections/:id/series/:id/items', function() {
		it("should respond with an array of all the items corresponding to the given ids", function(done) {
			request({
				method : 'GET',
				uri : socket + '/dev/collections/' + collectionId + '/series/' + seriesId + '/items'
			}, function(err, resp, body) {
				assert.isNull(err);
				assert.include(body, itemId);
				assert.include(body, "Autobot title");
				done();
			});
		});
	});
	describe('GET /dev/collections/:id/series/:id/items/:id', function() {
		it("should respond with the array containing the data of the specified item", function(done) {
			request({
				method : 'GET',
				uri : socket + '/dev/collections/' + collectionId + '/series/' + seriesId + '/items/' + itemId
			}, function(err, resp, body) {
				var json = JSON.parse(body);
				assert.isNull(err);
				assert.isDefined(body);
				assert.equal(json.Title, "Autobot title");
				done();
			});
		});
	});
	/*
	 describe('DELETE /dev/collections/:id/series/:id/items/:id', function() {
	 it("should respond with the id of the deleted item", function(done) {
	 request({
	 method : 'DELETE',
	 uri : socket + '/dev/collections/' + collectionId + '/series/' + seriesId + '/items/' + itemId
	 }, function(err, resp, body) {
	 assert.isNull(err);
	 assert.include(body, itemId);
	 //assert.length(body, 24);
	 done();
	 });
	 });
	 });
	 describe('DELETE /dev/collections/:id/series/:id', function() {
	 it("should respond with the id of the deleted series", function(done) {
	 request({
	 method : 'DELETE',
	 uri : socket + '/dev/collections/' + collectionId + '/series/' + seriesId
	 }, function(err, resp, body) {
	 assert.isNull(err);
	 assert.include(body, seriesId);
	 //assert.length(body, 24);
	 done();
	 });
	 });
	 });
	 describe('DELETE /dev/collections/:id', function() {
	 it("should respond with the id of the deleted collection", function(done) {
	 request({
	 method : 'DELETE',
	 uri : socket + '/dev/collections/' + collectionId
	 }, function(err, resp, body) {
	 assert.isNull(err);
	 assert.include(body, collectionId);
	 //assert.length(body, 24);
	 done();
	 });
	 });
	 });*/
});