/*
 * GET home page.
 */

var dri = require("dri");
var fedora = require("fedora");
var converter = require("../data-converters");

exports.index = function(req, res) {
	dri.getAllItems(function(arr) {
		res.json(arr);
	}, function(err){
		res.send(err);
	});
}

exports.show = function(req, res) {
	switch (req.format) {
		case 'json':
			var id = req.params.item;
			dri.getItem(id, function(arr) {
				res.send(arr);
			}, function(err) {
				res.send(err);
			});
			break;
		case 'xml':
			var id = req.params.item;
			dri.getItem(id, function(arr) {
				res.send("<xml>" + arr + "</xml>");
			}, function(err) {
				res.send(err);
			});
			break;
		case 'mods':
			var id = req.params.item;
			dri.getItem(id, function(arr) {
				res.send("<mods>" + arr + "</mods>", {
					'Content-Type' : 'text/xml'
				});
			}, function(err) {
				res.send(err);
			});
			break;
		case 'dc':
			var id = req.params.item;
			dri.getItem(id, function(arr) {
				var dc = converter.toDC(arr)
				console.log(dc)
				res.send(dc, {
					'Content-Type' : 'text/xml'
				});
			}, function(err) {
				res.send(err);
			});
			break;
		default:
			var id = req.params.item;
			dri.getItem(id, function(arr) {
				res.send(arr);
			}, function(err) {
				res.send(err);
			});
	}
}
exports.create = function(req, res) {
	var data = req.body;
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
	var data = req.body;
	dri.updateItem(data, null, function(arr) {
		res.send(arr);
	}, function(err) {
		res.send(err);
	});
}