/*
 * GET home page.
 */

var dri = require("dri");
try{
	config = require('../config');
}catch(err){
	config = require('../config.js.tp');
}

exports.index = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	dri.countObjects({},function(amount) {		
		console.log(amount)
		res.json(amount);
	}, function(err) {
		res.send(err);
	});

}

exports.open = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log("OPEN")
	dri.countObjects({status:"open"},function(amount) {
		console.log(amount)
		res.json(amount);
	}, function(err) {
		res.send(err);
	});
}

exports.approved = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log("approved")
	dri.countObjects({status:"approved"},function(amount) {
		console.log(amount)
		res.json(amount);
	}, function(err) {
		res.send(err);
	});
}
exports.lastCreated = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	dri.lastCreated(function(data) {
		res.json(data);
	}, function(err) {
		res.send(err);
	});
}
exports.lastEdited = function(req, res) {
		res.setHeader('Access-Control-Allow-Origin', '*');
	dri.lastEdited(function(data) {
		res.json(data);
	}, function(err) {
		res.send(err);
	});
}

