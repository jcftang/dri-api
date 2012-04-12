/*
 * GET home page.
 */

var dri = require("dri");
var fedora = require("fedora");
var converter = require("../data-converters");

exports.index = function(req, res) {
	var id = req.params.series;
	dri.getChildren(id,function(arr) {
		res.json(arr);
	}, function(err) {
		res.json(err);
	});
}

exports.show = function(req, res) {
	var id = req.params.item;
	dri.getItem(id, function(arr) {
		res.json(arr);
	}, function(err) {
		res.json(err);
	});
}
exports.create = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var data = req.body;
	var seriesId = req.params.series

	dri.createItem(data, function(arr) {
		res.send(arr);
	}, function(err) {
		res.send(err);
	});
}

exports.destroy = function(req, res) {
	var id = req.params.item;
	dri.removeItem(id, function(arr) {
		res.send(arr);
	}, function(err) {
		res.send(err);
	});
}
exports.update = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin','*');
	var data = req.body;
	var id = req.params.item;
	dri.updateItem(id,data, function(numAffected) {
		res.json(numAffected);
	}, function(err) {
		res.send(err);
	});
}