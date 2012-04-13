/**
 * @author Quirijn Groot Bluemink
 */
exports.toDC = function(json) {
	var dcString = "";
	var dcStart = '<oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd">';

	//Add opening tag
	dcString += dcStart;
	var dcEnd = '</oai_dc:dc>';

	dcString += ' <dc:title>' + json.properties.title + '</dc:title>';
	dcString += ' <dc:identifier>' + json._id + '</dc:identifier>';

	//Add closing tag
	dcString += dcEnd;
	return dcString;
}
function isArray(what) {
	return Object.prototype.toString.call(what) === '[object Array]';
}