/**
 * @author Matthias Van Wambeke
 *///starts when the main html file is loaded
$(document).ready(function() {
	
	//Hides all steps on the creation and edit page
	$("#step2,#step2Info,#step3,#step3Info,#step4,#step4Info").hide();
	
	loadBtnActions();
	backbone();
	//only executes if the current page is edit; it checks the url for that
	if(window.location.pathname == "/edit"){
		editActions();
	}
	if(window.location.pathname == "/all"){
		allActions();
	}
});

function allActions(){
	$('#checkAll').click(function () {
		$('#series-table').find(':checkbox').attr('checked', this.checked);
	});
	$('#bulk-execute').click(function () {
		var action = $(this).prev().val();
		switch(action)
		{
		case "remove":
			removeAllSelected();
			$(this).prev().val("-1");
		  break;
		default:
			console.log("Select an action");
		}
	});
	
}
function removeAllSelected(){
	var confirmDialog = confirm("Are you sure you want to continue?\nThis cannot be undone!");
	if (confirmDialog == true)
	{
		$('tbody input:checked').each(function() {
			console.log($(this).attr("data-id"));
			removeItem($(this).attr("data-id"), function(id){
				$("#"+id).remove();
			})
		});
	}

}
function removeItem(id, callback){
	$.ajax({
		url : "/object/media/"+id+"/remove",
		success : function(data) {
			callback(id);
		},
		error:function(d,r){
			console.log(d);
			console.log(r);
		}
	});
}
/*
   Function: editActions

   Loads actions for the edit page
*/
function editActions(){


	loadAllItems();
	//hides the box which allows users to upload files
	$("#fileBox").hide();
	$("#step2Btn").click(function() {
		item = $("#step1 option:selected").parent().attr("label");
		loadData("object/item/" + $("#step1 select").val()+"/get", function(data) {
			showItems([data],false)
			loadData("object/items/" + $("#step1 select").val()+"/get", function(data) {
				showItems(data,true)
				emptyForm();
			});
		});
	})

	
	
	//Highlights the selected item in the list
	$(".items li").live("click", function() {
		$(".items li").removeClass("accordion-heading-focus");
		$(this).addClass("accordion-heading-focus");
		//highlights the same item in the other steps (when switching between step 2 and 3)
		$(".items li").eq($(this).index()).addClass("accordion-heading-focus");
		$("#list2 li").eq($(this).index()).addClass("accordion-heading-focus");
	})
	
	$("#globalBtn").click(function(event){
		event.preventDefault();
		item = $("#step1 option:selected").parent().attr("label");
		window.location.replace("object/item/" + $("#step1 select").val()+"/global");
	})

}
/*
   Function: loadAllItems

   loads all items,series and collections and put them into a selectbox with id itemEditSelection
*/
function loadAllItems(){


	loadAllItemsByType("collection", function(root) {
		var list = "<optgroup label='collections'>";
		list += root;
		list += "</optgroup>";
		$("#itemEditSelection").append(list);
		loadAllItemsByType("series", function(root) {
			var list = "<optgroup label='series'>";
			list += root;
			list += "</optgroup>";
			$("#itemEditSelection").append(list);
			loadAllItemsByType("items", function(root) {
				var list = "<optgroup label='items'>";
				list += root;
				list += "</optgroup>";
				console.log(root);
				$("#itemEditSelection").append(list);
				$("#itemEditSelection").chosen();
			})
		})
	})


	
	
}
/*
   Function: loadAllItemsByType

   loads all the items of a cetain type(series,collections,items)

   Parameters:

      type - type of the item (series,collections or items)
      callback - the function to return it to

   Returns:

      A list of options for a select control.
*/
function loadAllItemsByType(type,callback){

	loadData("object/" + type+"/all/get", function(items) {
		var root = "";
		
		//creates several options depending on the type of the data. Example <option>title (author)</option> for series.
		for(i in items) {
			root += "<option value='"
			if(type == "series") {
				root += items[i]._id + "'>" + items[i].Title + " (" + items[i].author+")";
			}
			if(type == "collection") {
				root += items[i]._id + "'>" + items[i].Title;
			}
				if(type == "items") {
				root += items[i]._id + "'>" + items[i].Title + " ("+items[i].objectId+")";
			}
			root += "</option>";
		}

		callback(root);
	});


}
/*
   Function: showItems

   loads the items that are connected to a certain parentId

   Parameters:

      items - an array which contains all the items to dispay. These items are the parent's object children.
*/
function showItems(items,remove){
	var root = "";

	for(i in items){
		console.log(items[i])
		if(!remove){
			root+= "<li><a href='item/"+items[i]._id+"'>Parent: "+items[i].Title+" "+items[i]._id+"</a></li>";
		}else{
			root+= "<li><a href='item/"+items[i]._id+"'>"+items[i].Title+" "+items[i]._id+"</a></li>";
		}

	}
	if(!remove){
		$(".items ul").empty();
	}
	$(".items ul").append(root);
	

}
/*
   Function: loadData

   Gets any data from the server and gives it back

   Parameters:

      link - url where the data should come frome
      callback - the function to return it to

   Returns:

      The requested data
*/
function loadData(link,callback){
	$.ajax({
				url : link,
				cache:false,
				success : function(data) {
					callback(data);
				},
				error : function(d, r) {
					console.log(d);
					console.log(r);
				}
			});
}
/*
   Function: loadData

   Adds a input field to the form (gets triggered by option list).

   Parameters:

      array - data from the propertie to display

*/
function fillUpForm(data) {
	$(".dataform").empty();
	for(var prop in data) {
		if(data.hasOwnProperty(prop)) {
			$(".dataform").append('<div class="control-group"><label class="control-label">' + prop + '</label><div class="controls"><input type="text" class="input-xlarge" id="input01" name="' + prop + '" value="' + data[prop] + '"> </div><a class="close" data-dismiss="alert" href="#">&times;</a></div>');
		}
	}
}

function loadBtnActions(){

	//Triggers when there is an option/input that needs to be added to the form
	$("#properties button").click(function() {
		addInputFieldToFrom(this);
		
	});
	//when clicking a dropdown section it makes it "highlighted"
	$(".accordion-heading").click(function() {
		$(".accordion-heading").removeClass("accordion-heading-focus");
		$(this).addClass("accordion-heading-focus");
	})

	
	$(".breaddisabled").click(function() {
		return false
	});

	$(".breadcrumb a").click(function() {

		if(!$(this).hasClass("breaddisabled")) {
			$(".breadcrumb a").parent().removeClass("active");
			$(this).parent().addClass("active");
		}
	});
	$(".pager a").click(function() {

		$(".breadcrumb a").parent().removeClass("active");
		link = $(this).attr("href");
		$(".breadcrumb").find("a").each(function(index) {
			if($(this).attr("href") == link) {
				$(this).removeClass("breaddisabled")
				$(this).parent().addClass("active");
			}
		});
	});
	$("#surcheck").click(function() {
		$("#fileBox").toggle();
	})

	$("#creatItem,#editItem1,#editItem2").click(function(event) {
		$("#itemCreation").submit();
		$("#itemCreation").submit(function(){
			alert("dfqfdsqf");
			$(this).parent().append('<div class="alert alert-success">Success.</div>')
		});
	})

	$("#createSerieBtn").click(function() {
		$("#serieCreation").submit();
		loadAllItemsByType("series",function(root){
			$("#seriesItemCreation").empty();
			$("#seriesItemCreation").append(root);
			$("#seriesItemCreation").chosen();
		})
	})

	$("#createCollectionBtn").click(function() {
		$("#collectionCreation").submit();
	})

	$('#step3EditBtn').click(function() {
		loadAllImages($("input[name='_id']").val());
	})

	$("#step3Info .items #list2 li a").live("click", function(event) {
		console.log(this);
		event.preventDefault();
		loadData("/object"+this.pathname+"/get",function(data){
			fillUpForm(data)
		});
		loadAllImages($(this).attr("href").substring($(this).attr("href").indexOf("/") + 1));
	});
	$("#step2Info .items ul li a").live("click",function(event) {
		event.preventDefault();
		loadData("/object"+this.pathname+"/get",function(data){
			fillUpForm(data)
		});
	});

	$("#createItems").live("click", function(event) {
		loadAllItems();
		emptyForm();
	});
	$("#createSerie").live("click", function(event) {
		loadAllItemsByType("collection",function(root){
			$(".seriesCollection").empty();
			$(".seriesCollection").append(root);
			$(".seriesCollection").chosen();
		})
		emptyForm();
	});
	
	$("#createCollection,#createSerie").live("click", function(event) {
		emptyForm();
	});	

	$(".nextItemBtn").click(function() {
		urlNextItem = $(".items li.accordion-heading-focus").next().find("a").attr("href");
		nextItem = $(".items li.accordion-heading-focus").next();
		if(!nextItem.is("li")) {
			nextItem = $(".items li:first");
			urlNextItem = $(".items li:first").find("a").attr("href");
		}
		$("#list2 li").eq(nextItem.index()).addClass("accordion-heading-focus");
		nextItem.siblings().removeClass("accordion-heading-focus");
		nextItem.addClass("accordion-heading-focus");
		loadData("object/"+urlNextItem+"/get", function(data) {
			fillUpForm(data)
		});
	})

	$(".previousItemBtn").click(function() {
		urlPrevItem = $(".items li.accordion-heading-focus").prev().find("a").attr("href");
		prevItem = $(".items li.accordion-heading-focus").prev();
		if(!prevItem.is("li")) {
			prevItem = $("#step2Info  .items li:last");
			urlPrevItem = $("#step2Info .items li:last").find("a").attr("href");
		}
		$("#list2 li").eq(prevItem.index()).addClass("accordion-heading-focus");
		prevItem.siblings().removeClass("accordion-heading-focus");
		prevItem.addClass("accordion-heading-focus");
		loadData("object/"+urlPrevItem+"/get", function(data) {
			fillUpForm(data)
		});
	})


}
function emptyForm(){
	$(".dataform").empty();
}

function test(){
	alert("test");
}
function addInputFieldToFrom(btn){
	var input = '<div class="control-group"><label class="control-label">' + $(btn).text() + '</label><div class="controls">';
	if($(btn).next().text() == "select"){
		input +=  $(btn).next().next().html();
	}else{
	input += '<input type="' + $(btn).next().text()+ '" class="input-xlarge" id="input01" name="'+ $(btn).text() + '">';
	}
	input += '</div><a class="close" data-dismiss="alert" href="#">&times;</a></div>';
	$(".dataform").append(input);
}

function loadAllImages(id){
	$("#imageContainer").empty();
	console.log(id);
	loadData("object/media/" + id + "/list", function(data) {
		console.log(data);
		for(var file in data) {
			$("#imageContainer").append("<img src='object/media/" + data[file]._id + "/get'>")
		}
	});
}
	

function backbone() {

	var Workspace = Backbone.Router.extend({
		routes : {
			"edit" : "step2",
			"step1" : "step1", // #help
			"step2" : "step2", // #search/kiwis
			"step3" : "step3",
			"step4" : "step4"

		},

		step1 : function() {

			$("#step1,#step2,#step1Info,#step2Info,#step3,#step3Info,#step4,#step4Info").hide();
			$("#step1,#step1Info").show();
		},
		step2 : function() {

			$("#step1,#step2,#step1Info,#step2Info,#step3,#step3Info,#step4,#step4Info").hide();
			$("#step2,#step2Info").show();

		},
		step3 : function() {

			$("#step1,#step2,#step1Info,#step2Info,#step3,#step3Info,#step4,#step4Info").hide();
			$("#step3,#step3Info").show();

		},
		step4 : function() {

			$("#step1,#step2,#step1Info,#step2Info,#step3,#step3Info,#step4,#step4Info").hide();
			$("#step4,#step4Info").show();

		}
	});
	var w = new Workspace();

	Backbone.history.start();

}
