/*
 * GET home page.
 * @author: Matthias Van Wambeke
 * @author: Quirijn Groot Bleumink
 */
var dri = require('dri')
var winston = require("winston");

// Returns the list of parent-less objects
exports.index = function(req, res) {
	res.writeHead(200, {
		'content-type' : 'text/html'
	});
	res.end('Post images to this url');
}
// Creates an object with the given data

var amountOfFiles = 1;
exports.create = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*')
	res.setHeader('Access-Control-Allow-Methods', ['POST', 'GET', 'OPTIONS'])
	if(req.files.upload) {
		uploadFile(res, req, req.files.upload, 1)
	} else if(req.files.files[0].size != undefined) {
		amountOfFiles = 1
		uploadFile(res, req, req.files.files[0], 1)
	} else {
		amountOfFiles = req.files.files[0].length;
		uploadFile(res, req, req.files.files[0][0], 1)
	}

}
function uploadFile(res, req, file, count) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*')
	res.setHeader('Access-Control-Allow-Methods', ['POST', 'GET', 'OPTIONS'])
	dri.uploadFile(file, function(result) {
		//console.log(count-1)
		if(req.files.upload) {
			res.send(result);
		} else if(amountOfFiles == 1) {
			req.files.files[0].fileLocation = result;
			res.send("[" + JSON.stringify(req.files.files[0]) + "]")
		} else if(count == amountOfFiles && amountOfFiles > 1) {
			req.files.files[0][count - 1].fileLocation = result;
			res.send(JSON.stringify(req.files.files[0]))
		} else if(amountOfFiles > 1) {
			req.files.files[0][count - 1].fileLocation = result;
		}
		if(count < amountOfFiles) {
			uploadFile(res, req, req.files.files[0][count], count + 1)
		}
	}, function(err) {
		winston.log("error", err)
		res.writeHead(500, {
			"Content-Type" : "text/plain"
		});
		res.end(err);
	})
}

