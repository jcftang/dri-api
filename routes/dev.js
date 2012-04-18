/*
 * @author Quirijn Groot Bluemink
 * GET dev home page.
 */

exports.index =  function(req, res) {
	res.render('dev', {
		title : 'DRI API - dev',
		id : 'index'
	})
};
