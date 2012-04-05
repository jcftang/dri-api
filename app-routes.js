/**
 * Module dependencies.
 */
var routes = require('./routes');
var documentsRoutes = require('./routes/documents');
var collectionsRoutes = require('./routes/collections');
var seriesRoutes = require('./routes/series');
var itemsRoutes = require('./routes/items');
var Resource = require('express-resource');

exports.createRoutes = function make(app) {
	var documentsResource = app.resource('dev', documentsRoutes);

	var collectionsResource = app.resource('dev/collections', collectionsRoutes);
	var seriesResource = app.resource('series', seriesRoutes);
	var itemsResource = app.resource('items', itemsRoutes);
	collectionsResource.add(seriesResource);
	seriesResource.add(itemsResource);
	
	app.get('/', routes.index);
}
