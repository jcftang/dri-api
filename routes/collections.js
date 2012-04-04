/*
 * GET home page.
 */

var dri = require("dri");
var fedora = require("fedora");

exports.index = function(req, res) {
	dri.getAllRecordsByType("collection", function(arr) {
		res.send(arr);
	});
}
