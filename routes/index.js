/*
 * GET home page.
 */

var dri = require("dri");
var fedora = require("fedora");

exports.index = function(req, res) {
	res.render('index', {
		title : 'DRI API',
		id : 'index'
	})
};
