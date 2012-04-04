/*
 * GET home page.
 */

var dri = require("dri");
var fedora = require("fedora");
var arrDocuments = ['collections', 'series', 'items'];

exports.index = {
	json : function(req, res) {
		res.send(arrDocuments);
	},
	xml : function(req, res) {
		res.send("<a>"+arrDocuments+"</a>");
	},
	default : function(req, res) {
		res.send(arrDocuments);
	}
};
