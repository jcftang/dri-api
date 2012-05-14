/*
 * GET home page.
 */

var dri = require("dri");

// Returns the list of parent-less objects
exports.index = function(req, res) {
	
	// For pagination
	var page = req.query.page
	var amount = req.query.amount
	page = typeof page !== 'undefined' ? page : 0;
	amount = typeof amount !== 'undefined' ? amount : 20;
	
	dri.getChildren(null, page, amount, function(arr) {
		switch (req.format) {
			case 'json':
				res.json(arr);
				break;
			case 'dc':
				res.setHeader('Content-Type', 'text/xml');
				var xml = "<objects>";
				for(var i = 0, j = arr.length; i < j; i++) {
					var dc = dri.convertToDC(arr[i])
					xml += dc
				};
				xml += "</objects>"
				res.send(xml);
				break;
			case 'mods':
				res.setHeader('Content-Type', 'text/xml');
				var xml = "<modsCollection>";
				for(var i = 0, j = arr.length; i < j; i++) {
					var mods = dri.convertToMODS(arr[i])
					xml += mods
				};
				xml += "</modsCollection>"
				res.send(xml);
				break;
			default:
				res.json(arr);
		}
	}, function(err) {
		console.log(arr)
		res.json(err);
	});

}
// Returns the object given by the ID
exports.show = function(req, res) {
	var id = req.params.object;
	dri.getObject(id, function(arr) {
		switch (req.format) {
			case 'json':
				res.json(arr);
				break;
			case 'dc':
				res.setHeader('Content-Type', 'text/xml');
				var dc = dri.convertToDC(arr)
				res.send(dc);
				break;
			case 'mods':
				res.setHeader('Content-Type', 'text/xml');
				var mods = dri.convertToMODS(arr)
				res.send(mods);
				break;
			default:
				res.json(arr)
		}
	}, function(err) {
		res.json(err);
	});

}
// Creates an object with the given data
exports.create = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	//console.log(req)
	var res = res
	var data = req.body;
	var files = req.files
	//console.log(files)
	dri.createObject(data, function(arr) {
		var id = arr
		if(files) {
			//console.log("HAS FILES!")
			dri.uploadFile(files, function(result) {
				res.send(id);
			}, function(err) {
				res.writeHead(500, {
					"Content-Type" : "text/plain"
				});
				res.end(err);
			})
		} else {
			//console.log("HAS NOOOO FILES!")
			res.send(arr);
		}
	}, function(err) {
		res.writeHead(500, {
			"Content-Type" : "text/plain"
		});
		res.send(err);
	});
}
// Removes the object with the corresponding ID
exports.remove = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.params.object;
	dri.removeObject(id, function(arr) {
		res.send(arr);
	}, function(err) {
		res.send(err);
	});
}
// Updates the object with the given ID and data
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
// Lists all the children of the given object ID
exports.list = function(req, res) {
	var id = req.params.object;
	
	// For pagination
	var page = req.query.page
	var amount = req.query.amount
	page = typeof page !== 'undefined' ? page : 0;
	amount = typeof amount !== 'undefined' ? amount : 20;
	
	dri.getChildren(id, page, amount, function(arr) {
		switch (req.format) {
			case 'json':
				res.json(arr);
				break;
			case 'dc':
				res.setHeader('Content-Type', 'text/xml');
				var xml = "<objects>";
				for(var i = 0, j = arr.length; i < j; i++) {
					var dc = dri.convertToDC(arr[i])
					xml += dc
				};
				xml += "</objects>"
				res.send(xml);
				break;
			case 'mods':
				res.setHeader('Content-Type', 'text/xml');
				var xml = "<modsCollection>";
				for(var i = 0, j = arr.length; i < j; i++) {
					var mods = dri.convertToMODS(arr[i])
					xml += mods
				};
				xml += "</modsCollection>"
				res.send(xml);
				break;
			default:
				res.json(arr);
		}
	}, function(err) {
		console.log(arr)
		res.json(err);
	});

}
// Updates the object with the given ID and data
exports.approve = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var data = req.body;
	var id = req.params.object;
	dri.getObject(id, function(data) {
		dri.approveItem(data, "7FedoraLib", function(pid) {
			//console.log("Item created: " + pid)
			data.status = "approved"
			data.fedoraId = pid
			data = JSON.parse(JSON.stringify(data))
			// Mongo ID must be removed or Mongo throws error when updating
			var mongoId = data._id
			delete data._id
			dri.updateObject(mongoId, data, function(result) {
				//console.log(result)
				res.send(pid)
			}, function(e) {
				console.log(e)
			})
			res.send(data);
		}, function(err) {
			console.log(err)
			res.send(err)
		})
	}, function(err) {
		onError(err)
	})
}

exports.compare = function(req, res) {
	var id = req.params.object;
	dri.getObject(id, function(arr) {
		var json = {};
		json.mongo = arr
		if(json.mongo.fedoraId) {
			dri.fedora.getFedoraObject(json.mongo.fedoraId, function(data) {
				json.fedora = data
				res.json(json)
			}, function(err) {
				console.log(err)
				res.end(err);
			})
		} else {
			json.fedora = "This object hasn't been pushed to Fedora"
			res.json(json)
		}
	}, function(err) {
		res.json(err);
	});
}
