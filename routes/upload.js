/*
 * GET home page.
 */
var dri = require('dri')
var formidable = require('formidable')
// Returns the list of parent-less objects
exports.index = function(req, res) {
	res.writeHead(200, {
		'content-type' : 'text/html'
	});
	res.end('<form action="upload" enctype="multipart/form-data" method="post">' + '<input type="text" name="title"><br>' + '<input type="file" name="upload"><br>' + '<input type="submit" value="Upload">' + '</form>');
}
// Creates an object with the given data
exports.create = function(req, res) {

	var form = new formidable.IncomingForm();
	console.log("Preparing upload");

	form.parse(req, function(error, fields, files) {
		console.log(fields);
		console.log(files);
		if(error) {
			res.writeHead(500, {
				"Content-Type" : "text/plain"
			});
			res.end("CRAP! " + err + "\n");
		}
		dri.uploadFile(files, function(result) {

			res.writeHead(200, {
				"Content-Type" : "text/html"
			});
			res.end("Stored in " +result);
		}, function(err) {
			res.writeHead(500, {
				"Content-Type" : "text/plain"
			});
			res.end("CRAP! " + err + "\n");
		})
	});

}