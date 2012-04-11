/*
 * GET home page.
 */

var dri = require("dri");
var fedora = require("fedora");

exports.index = function(req, res) {
	dri.getAllCollections(function(arr) {
		res.json(arr);
	}, function(err){
		res.json(err);
	});
}
exports.show = function(req, res) {
	var id = req.params.collection;
	dri.getCollection(id, function(arr) {
		res.json(arr);
	}, function(err){
		res.json(err);
	});
}
exports.create = function(req, res) {
	var data = req.body;
	dri.createCollection(data, function(arr) {
		res.send(arr);
	}, function(err){
		res.send(err);
	});
}
exports.destroy = function(req, res) {
	var id = req.params.collection;
	dri.removeCollection(id, function(arr) {
		res.send(arr);
	}, function(err){
		res.send(err);
	});
}
exports.update = function(req, res) {
	var data = req.body;
	dri.updateItem(data,null, function(arr) {
		res.send(arr);
	}, function(err){
		res.send(err);
	});
}