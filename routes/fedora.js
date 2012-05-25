/*
 * GET home page.
 */
var dri = require('dri')

// Returns the list of parent-less objects
exports.index = function(req, res) {
	console.log(req.query.s)
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
		res.writeHead(500, {
			'content-type' : 'text/xml'
		});
		res.end(err);
	})
}
exports.show = function(req, res) {
	var pid = req.params.fedora
	console.log(pid)
	dri.fedora.getFedoraObject(pid, function(data) {
		res.writeHead(200, {
			'content-type' : 'text/xml'
		});
		res.end(data);
	}, function(err) {
		console.log(err)
		res.writeHead(500, {
			'content-type' : 'text/xml'
		});
		res.end(err);
	})
}