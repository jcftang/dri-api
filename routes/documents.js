/*
 * GET home page.
 */

var dri = require("dri");
var fedora = require("fedora");
var arrDocuments = ['collections', 'series', 'items'];

exports.index =  function(req, res) {
	res.render('dev', {
		title : 'DRI API - dev',
		id : 'index'
	})
};
