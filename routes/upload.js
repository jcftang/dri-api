/*
 * GET home page.
 */
var dri = require('dri')

// Returns the list of parent-less objects
exports.index = function(req, res) {
	res.writeHead(200, {
		'content-type' : 'text/html'
	});
	res.end('<form action="upload" enctype="multipart/form-data" method="post">' + '<input type="text" name="title"><br>' + '<input type="file" name="upload"><br>' + '<input type="submit" value="Upload">' + '</form>');
}
// Creates an object with the given data
exports.create = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	//console.log("HAS FILES!")
	dri.uploadFile(req.files, function(result) {
		res.send(result);
	}, function(err) {
		res.writeHead(500, {
			"Content-Type" : "text/plain"
		});
		res.end(err);
	})
}