
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'DRI API',
			id: 'index' })
};
