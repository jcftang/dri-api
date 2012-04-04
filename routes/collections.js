/*
 * GET home page.
 */

var dri = require("dri");
var fedora = require("fedora");

exports.index = function(req, res) {
	dri.getAllRecordsByType("collection", function(arr) {
		res.send(arr);
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
	dri.removeItem(id, function(arr) {
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