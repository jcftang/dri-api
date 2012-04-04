/**
 * Module dependencies.
 */
var routes = require('./routes');
var Resource = require('express-resource');

exports.createRoutes = function make(app) {
	var documentsResource = app.resource('dev', require('./routes/documents'));

	var collectionsResource = app.resource('dev/collections', require('./routes/collections'));
	var seriesResource = app.resource('series', require('./routes/series'));
	var itemsResource = app.resource('items', require('./routes/items'));
	collectionsResource.add(seriesResource);
	seriesResource.add(itemsResource);
	
	app.get('/', routes.index);
}
