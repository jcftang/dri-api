
var resourceTypes = ["text","cartographic","notated music",
"sound recording ","sound recording-musical",
"sound recording-nonmusical","still image",
"moving image","three dimensional object",
"software, multimedia","mixed material"];
//categorieGroup,groupName,property,type
//No spaces in categorieGroup
var buttons = [
	["collapseZero","Project Info","objectId","text"], 
	//----------------------------------------------//
	["collapseOne","Title Info","Title","text"],
	["collapseOne","Title Info","Subtitle","text"],
	["collapseOne","Title Info","partNumber","text"],
	["collapseOne","Title Info","partName","text"],
	["collapseOne","Title Info","nonSort","text"],
	//----------------------------------------------//
	["collapseTwo","Name ","namePart","text"],
	["collapseTwo","Name ","displayForm","text"],
	["collapseTwo","Name ","affiliation","text"],
	["collapseTwo","Name ","roleTerm","text"],
	["collapseTwo","Name ","description","text"],
	//----------------------------------------------//
	["collapseThree","typeOfResource","typeOfResource","select",createSelect(resourceTypes)],
	//----------------------------------------------//
	["collapseFour","genre","nonSort","text"],
	//----------------------------------------------//
	["collapseFive","originInfo","namePart","text"],
	//----------------------------------------------//
	["collapseSix","language","displayForm","text"],
	//----------------------------------------------//
	["collapseSeven","physicalDescription","affiliation","text"],
	//----------------------------------------------//
	["collapseEight","abstract","role","text"],
	//----------------------------------------------//
	["collapseNine","tableOfContents","description","text"],
	//----------------------------------------------//
	["collapseTen","Type of resource","type","text"],
	//----------------------------------------------//
	["collapseEleven","targetAudience","genre","text"],
	//----------------------------------------------//
	["collapseTwelve","note","genre","text"],
	//----------------------------------------------//
	["collapseThirteen","subject","genre","text"],
	//----------------------------------------------//
	["collapseFourteen","classification","genre","text"],
	//----------------------------------------------//
	["collapseFifteen","relatedItem","genre","text"],
	//----------------------------------------------//
	["collapseSixteen","identifier","genre","text"],
	//----------------------------------------------//
	["collapseSeventeen","location","genre","text"],
	//----------------------------------------------//
	["collapseEighteen","accessCondition","genre","text"],
	//----------------------------------------------//
	["collapseNineteen","part","genre","text"],
	//----------------------------------------------//
	["collapseTwenty","extension","genre","text"],
	//----------------------------------------------//
	["collapseTwentyOne","recordInfo","genre","text"]
	//----------------------------------------------//
 ]
 
 

function createSelect(items){
	var select = "<select>";
	for(var i in items){
		select += "<option>"+items[i]+"</option>";
	}
	select += "</select>"
	return select;
	
}

