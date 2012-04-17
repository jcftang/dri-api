/*
 * GET home page.
 */

var dri = require("dri");
var fedora = require("fedora");
var converter = require("../data-converters");

exports.index = function(req, res) {
	switch (req.format) {
		case 'json':
			dri.getChildren(null, function(arr) {
				res.json(arr);
			}, function(err) {
				console.log(arr)
				res.json(err);
			});
			break;
		case 'dc':
			dri.getChildren(null, function(arr) {
				res.setHeader('Content-Type', 'text/xml');
				var xml = "<objects>";
				for(var i = 0, j = arr.length; i < j; i++) {
					var dc = converter.toDC(arr[i])
					xml += dc
				};
				xml += "</objects>"
				res.send(xml);
			}, function(err) {
				res.json(err);
			});
			break;
		case 'mods':
			dri.getChildren(null, function(arr) {
				res.setHeader('Content-Type', 'text/xml');
				var xml = "<modsCollection>";
				for(var i = 0, j = arr.length; i < j; i++) {
					var mods = converter.toMODS(arr[i])
					xml += mods
				};
				xml += "</modsCollection>"
				res.send(xml);
			}, function(err) {
				res.json(err);
			});
			break;
		default:
			dri.getChildren(null, function(arr) {
				res.json(arr);
			}, function(err) {
				console.log(arr)
				res.json(err);
			});
	}
}
exports.show = function(req, res) {
	var id = req.params.object;
	switch (req.format) {
		case 'json':
			dri.getObject(id, function(arr) {
				res.json(arr);
			}, function(err) {
				res.json(err);
			});
			break;
		case 'dc':
			res.setHeader('Content-Type', 'text/xml');
			dri.getObject(id, function(arr) {
				var dc = converter.toDC(arr)
				res.send(dc);
			}, function(err) {
				res.json(err);
			});
			break;
		case 'mods':
			res.setHeader('Content-Type', 'text/xml');
			dri.getObject(id, function(arr) {
				var mods = converter.toMODS(arr)
				res.send(mods);
			}, function(err) {
				res.json(err);
			});
			break;
		default:
			dri.getObject(id, function(arr) {
				res.json(arr);
			}, function(err) {
				res.json(err);
			});
	}

}
exports.create = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var data = req.body;
	dri.createObject(data, function(arr) {
		res.send(arr);
	}, function(err) {
		res.send(err);
	});
}
exports.remove = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.params.object;
	dri.removeObject(id, function(arr) {
		res.send(arr);
	}, function(err) {
		res.send(err);
	});
}

exports.update = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var data = req.body;
	var id = req.params.object;
	dri.updateObject(id, data, function(numAffected) {
		res.json(numAffected);
	}, function(err) {
		res.send(err);
	});
}
exports.list = function(req, res) {

	var id = req.params.object;
	switch (req.format) {
		case 'json':
			dri.getChildren(id, function(arr) {
				res.json(arr);
			}, function(err) {
				console.log(arr)
				res.json(err);
			});
			break;
		case 'dc':
			dri.getChildren(id, function(arr) {
				res.setHeader('Content-Type', 'text/xml');
				var xml = "<objects>";
				for(var i = 0, j = arr.length; i < j; i++) {
					var dc = converter.toDC(arr[i])
					xml += dc
				};
				xml += "</objects>"
				res.send(xml);
			}, function(err) {
				res.json(err);
			});
			break;
		case 'mods':
			dri.getChildren(id, function(arr) {
				res.setHeader('Content-Type', 'text/xml');
				var xml = "<modsCollection>";
				for(var i = 0, j = arr.length; i < j; i++) {
					var mods = converter.toMODS(arr[i])
					xml += mods
				};
				xml += "</modsCollection>"
				res.send(xml);
			}, function(err) {
				res.json(err);
			});
			break;
		default:
			dri.getChildren(id, function(arr) {
				res.json(arr);
			}, function(err) {
				console.log(arr)
				res.json(err);
			});
	}

}