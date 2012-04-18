/*
 * @author Quirijn Groot Bluemink
 * GET dev home page.
 */

// Renders the development version of the documentation
exports.index =  function(req, res) {
	res.render('dev', {
		title : 'DRI API - dev',
		id : 'index'
	})
};
