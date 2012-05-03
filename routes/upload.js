/*
 * GET home page.
 * @author: Matthias Van Wambeke
 * @author: Quirijn Groot Bleumink
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

var amountOfFiles = 1;
exports.create = function(req, res) {
	console.log(req.files.upload)
	if(req.files.upload){
		uploadFile(res,req,req.files.upload,1)
	}
	else if(req.files.files[0].size != undefined) {
		amountOfFiles = 1
		uploadFile(res,req,req.files.files[0],1)

	} else {
		amountOfFiles = req.files.files[0].length;
		for(var i = 0 ;i < req.files.files[0].length;i++) {

			uploadFile(res,req,req.files.files[0][i],i+1)
		}
	}


	//console.log("HAS FILES!")

}

function uploadFile(res, req, file, count) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	dri.uploadFile(file, function(result) {
		if(req.files.upload){
			res.send(result);
		}
		else if(amountOfFiles == 1) {
			req.files.files[0].filelocation = result;
			res.redirect(req.body.redirect + "[" + JSON.stringify(req.files.files[0]) + "]")
		} else if(count == amountOfFiles) {
			req.files.files[0].filelocation = result;
			res.redirect(req.body.redirect + JSON.stringify(req.files.files[0]))
		}

	}, function(err) {
		res.writeHead(500, {
			"Content-Type" : "text/plain"
		});
		res.end(err);
	})
}


