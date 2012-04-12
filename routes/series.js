/*
 * GET home page.
 */

var dri = require("dri");
var fedora = require("fedora");

exports.index = function(req, res) {
	dri.getAllSeries(function(arr) {
		res.json(arr);
	}, function(err) {
		res.json(err);
	});
}

exports.show = function(req, res) {
	var id = req.params.series;
	dri.getSeries(id, function(arr) {
		res.json(arr);
	}, function(err) {
		res.json(err);
	});
}
exports.create = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin','*');
	var data = req.body;
	dri.createSeries(data, function(arr) {
		res.send(arr);
	}, function(err) {
		res.send(err);
	});
}
exports.destroy = function(req, res) {
	var id = req.params.series;
	dri.removeSeries(id, function(arr) {
		res.send(arr);
	}, function(err) {
		res.send(err);
	});
}
exports.update = function(req, res) {
	var data = req.body;
	dri.updateItem(data, null, function(arr) {
		res.send(arr);
	}, function(err) {
		res.send(err);
	});
}