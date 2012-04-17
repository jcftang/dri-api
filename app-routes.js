/**
 * Module dependencies.
 */
var routes = require('./routes');
var Resource = require('express-resource');

var objectRoutes = require('./routes/objects');

var documentsRoutes = require('./routes/documents');
var collectionsRoutes = require('./routes/collections');
var seriesRoutes = require('./routes/series');
var itemsRoutes = require('./routes/items');
var objectRoutes = require('./routes/objects');

exports.createRoutes = function make(app) {
	var documentsResource = app.resource('dev', documentsRoutes);
	
	var objectsResource = app.resource('dev/objects', objectRoutes);
	objectsResource.map('get','/:object/list',objectRoutes.list)
	objectsResource.map('get','/:object/delete',objectRoutes.remove)
	objectsResource.map('post','/:object/update',objectRoutes.update)
	
	var collectionsResource = app.resource('dev/collections', collectionsRoutes);
	var seriesResource = app.resource('series', seriesRoutes);
	var itemsResource = app.resource('items', itemsRoutes);
	collectionsResource.add(seriesResource);
	seriesResource.add(itemsResource);
	
	app.get('/', routes.index);
}
