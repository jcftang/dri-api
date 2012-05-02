/**
 * @author Quirijn Groot Bluemink
 * Module dependencies.
 */

var routes = require('./routes');
exports.createRoutes = function make(app) {
	showAPI(app);
}
function showAPI(app) {
	var Resource = require('express-resource');

	var objectRoutes = require('./routes/objects');
	var devRoutes = require('./routes/dev');
	var uploadRoutes = require('./routes/upload');
	var fedoraRoutes = require('./routes/fedora');
	// Creates mapping for the documentation page of the various versions
	var devResource = app.resource('dev', devRoutes);

	// Creates default mapping
	var objectsResource = app.resource('dev/objects', objectRoutes);

	// Adds custom route mappings
	objectsResource.map('get', '/:object/list', objectRoutes.list)
	objectsResource.map('get', '/:object/delete', objectRoutes.remove)
	objectsResource.map('get', '/:object/approve', objectRoutes.approve)
	objectsResource.map('get', '/:object/compare', objectRoutes.compare)
	objectsResource.map('post', '/:object/update', objectRoutes.update)


	var uploadResource = app.resource('dev/upload', uploadRoutes);
	var fedoraResource = app.resource('dev/fedora', fedoraRoutes);

	// Sets index page route
	app.get('/', routes.index);

}
