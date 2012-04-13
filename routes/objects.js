/*
 * GET home page.
 */

var dri = require("dri");
var fedora = require("fedora");

exports.index = function(req, res) {
	dri.getChildren(null,function(arr) {
		res.json(arr);
	}, function(err){
		console.log(arr)
		res.json(err);
	});
}
exports.show = function(req, res) {
	var id = req.params.object;
	dri.getObject(id, function(arr) {
		res.json(arr);
	}, function(err){
		res.json(err);
	});
}
exports.create = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin','*');
	var data = req.body;
	dri.createObject(data, function(arr) {
		res.send(arr);
	}, function(err){
		res.send(err);
	});
}
exports.destroy = function(req, res) {
	var id = req.params.object;
	dri.removeObject(id, function(arr) {
		res.send(arr);
	}, function(err){
		res.send(err);
	});
}
exports.update = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin','*');
	var data = req.body;
	var id = req.params.object;
	dri.updateObject(id,data, function(numAffected) {
		res.json(numAffected);
	}, function(err) {
		res.send(err);
	});
}
exports.list = function(req, res) {
	var id = req.params.object;
	dri.getChildren(id,function(arr) {
		res.json(arr);
	}, function(err){
		console.log(arr)
		res.json(err);
	});
}