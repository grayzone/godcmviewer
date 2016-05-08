$(function() {

	$("#select_admin_label").select2({
		theme: "bootstrap",
		language: "zh-CN",
		tags: "true",
		tokenSeparators: [';'],
		data: get_label_list()
	});

	$('#btn_admin_add_label').click(function() {
		add_new_label();
	});

	$('#btn_admin_delete_label').click(function() {
		var labelid = $("#select_admin_label").select2("data")[0].id;
		delete_one_label(labelid);
		location.reload();
	});

	$('#btn_admin_clean_label').click(function() {
		clean_deleted_labels();
		location.reload();
	});

});