/**
 * @author Quirijn Groot Bluemink
 * Module dependencies.
 */

exports.configure = function configure(app) {
	var dri = require('dri')
	var express = require('express');
	var routes = require('./routes');
	this.getConfig(function(err, config) {
		if(err) {
			app.get('/', routes.config);
			throw new Error(err);
		} else {
			dri.configure(config);
		}
	});
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
exports.getConfig = function getConfig(callback) {
	var fs = require('fs');
	try {
		fs.lstat('./config.json', function(e, file) {
			if(e) {
				//Config.json file doesn't exist
				callback("Config.json file not found!\nUse the template (config.json.tp) provided to make the config.json", null)
			} else {
				//Config.json exist
				var f = fs.readFileSync('./config.json')
				var conf = JSON.parse(f)
				//console.log(conf)
				callback(null, conf)
			}
		});
	} catch(e) {
		callback("Config.json file not found!\nUse the template (config.json.tp) provided to make the config.json", null)
	}
}

