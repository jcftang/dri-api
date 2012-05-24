/*
 * GET home page.
 * @author: Matthias Van Wambeke
 * @author: Quirijn Groot Bleumink
 */
var dri = require('dri')

// Returns the list of parent-less objects
exports.index = function(req, res) {
	//console.log(req.query)
	if(req.query.field && req.query.value) {
		var field = req.query.field.toString()
		var value = req.query.value.toString()
		dri.query(field, value, function(data) {
			res.send(data)
		}, function(err) {
			res.writeHead(500)
			res.end(err)
		});
	} else {
		res.writeHead(400)
		res.end('{"error":"Send through a field and a value as querystring"}')
	}
}
