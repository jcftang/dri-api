/**
 * @author Quirijn Groot Bluemink
 * Module dependencies.
 */

var express = require('express');
var appRoutes = require('./app-routes');
var appConfig = require('./app-config');
var winston = require('winston');
var app = module.exports = express.createServer();

//Load configuration file
// Configuration
// See app-config.js to see the configuration of the application
appConfig.configure(app);

appRoutes.createRoutes(app);

// Start the server on port 4000
app.listen(4000, function() {
	winston.log("info","DRI API running on port "+app.address().port+" in "+app.settings.env+" mode");
});

