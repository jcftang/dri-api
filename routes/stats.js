/*
 * GET home page.
 */

var dri = require("dri");
var winston = require("winston");
try {
	config = require('../config');
} catch(err) {
	config = require('../config.js.tp');
}

exports.index = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	dri.countObjects({}, function(amount) {
		res.json(amount);
	}, function(err) {
		winston.log("error", err)
		res.send(err);
	});

}

exports.open = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	dri.countObjects({
		status : "open"
	}, function(amount) {
		res.json(amount);
	}, function(err) {
		winston.log("error", err)
		res.send(err);
	});
}

exports.approved = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	dri.countObjects({
		status : "approved"
	}, function(amount) {
		res.json(amount);
	}, function(err) {
		winston.log("error", err)
		res.send(err);
	});
}
exports.lastCreated = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	dri.lastCreated(function(data) {
		res.json(data);
	}, function(err) {
		winston.log("error", err)
		res.send(err);
	});
}
exports.lastEdited = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	dri.lastEdited(function(data) {
		res.json(data);
	}, function(err) {
		winston.log("error", err)
		res.send(err);
	});
}

exports.lastCreatedByType = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	dri.lastCreatedByType(req.params.type, function(data) {
		res.json(data);
	}, function(err) {
		winston.log("error", err)
		res.send(err);
	});
}
exports.lastEditedByType = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	dri.lastEditedByType(req.params.type, function(data) {
		res.json(data);
	}, function(err) {
		winston.log("error", err)
		res.send(err);
	});
}

