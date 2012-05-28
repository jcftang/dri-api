/*
 * GET home page.
 */
var dri = require('dri')
var winston = require("winston");

// Returns the list of parent-less objects
exports.index = function(req, res) {
	var searchQuery = ''
	if(req.query.s){
		searchQuery = req.query.s
	}
	dri.fedora.getFedoraList(searchQuery, function(data) {
		res.writeHead(200, {
			'content-type' : 'text/xml'
		});
		res.end(data);
	}, function(err) {
		winston.log("error",err)
		res.writeHead(500, {
			'content-type' : 'text/xml'
		});
		res.end(err);
	})
}
exports.show = function(req, res) {
	var pid = req.params.fedora
	dri.fedora.getFedoraObject(pid, function(data) {
		res.writeHead(200, {
			'content-type' : 'text/xml'
		});
		res.end(data);
	}, function(err) {
		winston.log("error",err)
		res.writeHead(500, {
			'content-type' : 'text/xml'
		});
		res.end(err);
	})
}