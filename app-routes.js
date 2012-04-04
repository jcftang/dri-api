/**
 * Module dependencies.
 */
var routes = require('./routes');
var Resource = require('express-resource');

exports.createRoutes = function make(app) {
	var collectionsResource = app.resource('dev/collections', require('./routes/collections'));
	var documentsResource = app.resource('dev', require('./routes/documents'));
	
	
	app.get('/', routes.index);
}