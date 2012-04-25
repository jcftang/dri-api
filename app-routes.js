/**
 * @author Quirijn Groot Bluemink
 * Module dependencies.
 */
var routes = require('./routes');
var Resource = require('express-resource');

var objectRoutes = require('./routes/objects');
var devRoutes = require('./routes/dev');
var uploadRoutes = require('./routes/upload');
var dri = require("dri");

exports.createRoutes = function make(app) {
	var fs = require('fs');
	try {
		fs.lstat('./config.json', function(e, file) {
			if(e) {
				//Config.json file doesn't exist
				showConfigPage(app);
			} else {
				//Config.json exist
				if(file.isFile()) {
					//The config.json is a file
					showAPI(app);
				}else{
					//config.json is not a file
					showConfigPage(app);
				}
			}
		});
	
	} catch (e) {
		console.log(e)
	}
}
function showAPI(app){
	// Creates mapping for the documentation page of the various versions
	var devResource = app.resource('dev', devRoutes);

	// Creates default mapping
	var objectsResource = app.resource('dev/objects', objectRoutes);

	// Adds custom route mappings
	objectsResource.map('get', '/:object/list', objectRoutes.list)
	objectsResource.map('get', '/:object/delete', objectRoutes.remove)
	objectsResource.map('get', '/:object/approve', objectRoutes.approve)
	objectsResource.map('post', '/:object/update', objectRoutes.update)
	
	// Creates default mapping
	var uploadResource = app.resource('dev/upload', uploadRoutes);

	// Sets index page route
	app.get('/', routes.index);
	
}
function showConfigPage(app) {

	// Sets index page route
	app.get('/', routes.config);
	
}