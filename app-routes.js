/**
 * @author Quirijn Groot Bluemink
 * Module dependencies.
 */
var routes = require('./routes');
var Resource = require('express-resource');

var objectRoutes = require('./routes/objects');
var devRoutes = require('./routes/dev');

exports.createRoutes = function make(app) {

	// Creates mapping for the documentation page of the various versions
	var devResource = app.resource('dev', devRoutes);

	// Creates default mapping
	var objectsResource = app.resource('dev/objects', objectRoutes);

	// Adds custom route mappings
	objectsResource.map('get','/:object/list',objectRoutes.list)
	objectsResource.map('get','/:object/delete',objectRoutes.remove)
	objectsResource.map('get','/:object/approve',objectRoutes.approve)
	objectsResource.map('post','/:object/update',objectRoutes.update)

	// Sets index page route
	app.get('/', routes.index);
}