/**
 * @author Quirijn Groot Bluemink
 */

// Dublin Core Tags
// ================
// Title
// Creator
// Subject
// Description
// Publisher
// Contributor
// Date
// Type
// Format
// Identifier
// Source
// Language
// Relation
// Coverage
// Rights
var mods_map = {
//  json_value:xml_value
	'title' : 'title',
	'subtitle' : 'title',
	'_id' : 'identifier'
}
exports.getMODSTags = function(id) {
	var tags = {};
	var tag = mods_map[id];
	if(tag) {
		tags.start = '<' + mods_map[id] + '>'
		tags.end = '</' + mods_map[id] + '>'
		return tags;
	}else{
		return undefined;
	}
}