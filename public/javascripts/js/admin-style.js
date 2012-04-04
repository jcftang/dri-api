/**
 * @author Quirijn Groot Bluemink
 */

$(document).ready(function() {
	$('#checkAll').click(function() {
		$('#series-table').find(':checkbox').attr('checked', this.checked);
	});
	$('#bulk-execute').click(function() {
		var action = $(this).prev().val();
		switch(action) {
			case "approve":
				console.log("Approve");
				$(this).prev().val("-1");
				approveAllSelected();
				if(!('#checkAll:checkbox[checked]').length) {
					('#checkAll').removeAttr("checked");
				}
				break;
			case "remove":
				console.log("Remove All");
				removeAllSelected();
				$(this).prev().val("-1");
				if(!('#checkAll:checkbox[checked]').length) {
					('#checkAll').removeAttr("checked");
				}
				break;
			default:
				console.log("Select an action");
		}
	});
	$('.removeItem').click(function() {
		$this = $(this)
		id = $(this).attr("data-id");

		var confirmDialog = confirm("Are you sure you want to continue?\nThis cannot be undone!");
		if(confirmDialog == true) {
			removeItem(id, function(id) {
				$("#" + id).remove();
			})
		}
	});
	$('.approveItem').click(function() {
		$this = $(this)
		id = $(this).attr("data-id");
		console.log("Approve: " + id);
		approveItem(id, function(data) {
			console.log(data);
		});
	});
});
function approveAllSelected() {
	var confirmDialog = confirm("Are you sure you want to continue?\nThis cannot be undone!");
	if(confirmDialog == true) {
		$('#series-table tbody input:checked').each(function() {
			console.log($(this).attr("data-id"));
			approveItem($(this).attr("data-id"), function(id) {
				$("#" + id).remove();
			})
		});
	}

};

function removeAllSelected() {
	var confirmDialog = confirm("Are you sure you want to continue?\nThis cannot be undone!");
	if(confirmDialog == true) {
		$('#series-table tbody input:checked').each(function() {
			console.log($(this).attr("data-id"));
			removeItem($(this).attr("data-id"), function(id) {
				$("#" + id).remove();
			})
		});
	}
};

function removeItem(id, callback) {
	$.ajax({
		url : "/object/item/" + id + "/remove",
		success : function(data) {
			callback(id);
		},
		error : function(d, r) {
			console.log(d);
			console.log(r);
		}
	});
};

function approveItem(id, callback) {
	$.ajax({
		url : "/fedora/" + id + "/approve",
		success : function(data) {
			callback(data);
		},
		error : function(d, r) {
			console.log(d);
			console.log(r);
		}
	});
};