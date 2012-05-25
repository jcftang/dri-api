
0.0.4 / 2012-05-25 
==================

  * removed config file
  * added last created and last edited functionality
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Added more stats stubs
  * fixed the upload. Merge.
  * Revert "changed upload to xmlhttpupload"
  * small fix for upload
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * changed upload to xmlhttpupload
  * Added in query functionality
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * up
  * Changed files so they use config template if none other is found, fixed some tests
  * Updated config to use the node public folders for uploads, initial stub for queries
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * added license
  * commit missing changelogs etc...
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Added routes for the StatsAPI
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Added 500 error page3
  * Error page is dynamic
  * Added navbar to error page
  * Added 404 error page
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Updated tests to use new Chai functions
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Fixed pagination bug
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Made some changes for pagination
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Updated pagination for list function
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * fix
  * Pagination is not in headers, but in meta property in response data
  * up
  * Fedora uses fedoraNamespace in API config.js
  * Added .project to .gitignore
  * Updated config template file
  * Response sends amount of pages
  * Added pagination
  * Changed fedora namespace for testing
  * multiple files now upload properly
  * send back the filelocation if you upload multiple files now
  * Fixed package.json
  * update the fileLocation property name
  * Fixed tests to new upload
  * Object approve now stores the fedoraID in th mongo object, changes status to "approved"
  * test fix
  * approve function also updates mongo item when successful. Currently bugged
  * bux fix on upload for standard form uploads
  * api now works with jquery upload plugin and normal upload
  * fix
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Added authors
  * added functionality for multiple files
  * Added new route to get mongo and fedora object for comparison
  * Added binary to /upload route
  * Added fedora routes, removed config page
  * fix upload test with a node variable for directory basename of file
  * Depends on superagent
  * Depends on superagent
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Integrated binary upload, wrote test to prove it. Moved config to config.js
  * bump version as previous tag did not function
  * updated startup message
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Structured code so that it throws an error when no config.json file is available

0.0.3 / 2012-05-16 
==================

  * Updated tests to use new Chai functions
  * Fixed pagination bug
  * Made some changes for pagination
  * Updated pagination for list function
  * Pagination is not in headers, but in meta property in response data
  * Fedora uses fedoraNamespace in API config.js
  * Added .project to .gitignore
  * Updated config template file
  * Response sends amount of pages
  * Added pagination
  * Changed fedora namespace for testing
  * multiple files now upload properly
  * send back the filelocation if you upload multiple files now
  * Fixed package.json
  * update the fileLocation property name
  * Fixed tests to new upload
  * Object approve now stores the fedoraID in th mongo object, changes status to "approved"
  * test fix
  * approve function also updates mongo item when successful. Currently bugged
  * bux fix on upload for standard form uploads
  * api now works with jquery upload plugin and normal upload
  * fix
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Added authors
  * added functionality for multiple files
  * Added new route to get mongo and fedora object for comparison
  * Added binary to /upload route
  * Added fedora routes, removed config page
  * fix upload test with a node variable for directory basename of file
  * Depends on superagent
  * Depends on superagent
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Integrated binary upload, wrote test to prove it. Moved config to config.js
  * bump version as previous tag did not function
  * updated startup message
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Structured code so that it throws an error when no config.json file is available

0.0.2 / 2012-04-27 
==================

  * updated startup message
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Structured code so that it throws an error when no config.json file is available

0.0.1 / 2012-04-26 
==================

  * Added README.md, removed unused module from tests
  * Forgot to add some files
  * Added configuration file, Added an Error page when no config file is found Removed formidable
  * Added file upload and dependencies
  * added dependancy for multipart
  * Restuctured code
  * Moved all converter code to DRI package
  * Updated dependencies, fedora approve works
  * revert
  * Removed unused files, updated documentation page menu, added comments
  * Removed unused code and files, added some inline comments
  * Changed api to use POST for updates, removed dead code, updated tests
  * Added DC test and fixed global var leak
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Added mods converter
  * set access for removal
  * Added delete route
  * Get requests store data in the query.
  * Changed routes to avoid PUT and DELETE
  * Uncommented delete tests
  * Added DC functionality to index, show and list
  * Added DC functionality to /objects/
  * Moved to single schema objects
  * Decreased timeout in makefile
  * Increased timeout in makefile
  * Moved api to mongoose, fixed cross domain issues
  * Fixed the tests to reflect schemas
  * Test for cross domain problems
  * microformatting
  * minor formatting for document generation
  * Added callback functionality to all GET resquests
  * Added jsonp callbacks
  * Modified to use the new DRI package
  * added docs target
  * markdown output enabled
  * Added new urls and create converter file
  * Added more tests for routes
  * added head and tail for auto generation of test docs
  * removed console.logs
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * Created CRUD tests
  * Merge branch 'master' of ssh://howest-server.tchpc.tcd.ie/howest/node/dri-api
  * First tests and routes
  * make public facing side of api server look like the rest application server, this is to prepare the system for automatic document generation later on
  * Updated dependencies
  * ignore some files
  * Start of API server
