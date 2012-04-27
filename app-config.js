/**
 * @author Quirijn Groot Bluemink
 * Module dependencies.
 */

var dri = require('dri')
var express = require('express');
var routes = require('./routes');
var config = require('./config');
var fs = require('fs');
exports.configure = function configure(app) {

	dri.configure(config)
	// Configuration
	app.configure(function() {
		app.set('views', __dirname + '/views');
		app.set('view options', {
			layout : "_layouts/layout"
		});
		app.set('view engine', 'jade');
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(__dirname + '/public'));
		app.set("jsonp callback", true);
	});

	app.configure('development', function() {
		app.use(express.errorHandler({
			dumpExceptions : true,
			showStack : true
		}));
	});

	app.configure('production', function() {
		app.use(express.errorHandler());
	});
}