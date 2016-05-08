$(function() {

	$("#select_candidate_gender").select2({
		theme: "bootstrap",
		minimumResultsForSearch: Infinity
	});

	$("#select_candidate_label").select2({
		theme: "bootstrap",
		language: "zh-CN",
		tags: "true",
		data: get_label_list()
	});

	$('#input_candidate_birthday').datetimepicker({
		locale: 'zh-CN',
		viewMode: 'years',
        format: 'YYYY-MM-DD'
	});

	$('#input_candidate_birthday').blur(function(){
		update_candidate_age();
	});

	$("#btn_candidate_save").click(function() {
		var name = $("#input_candidate_name").val();
		if (name.length == 0){
			return;
		}
		var current_url = $(location).attr('pathname');

		if (current_url == "/new") {
			var result = insert_candidate_info();
			if (parseInt(result) > 0) {
				save_candidate_label();
				window.location.href = "/candidate";
			}
		} else if (current_url == "/candidate") {
			update_candidate_info();
			save_candidate_label();
		} else {
			// do nothing.
		}

	});



/*
	$("#form_candidate_basic").validate({
		rules: {
			input_candidate_name: {
				required: true
			},
			input_candidate_email: {
				required: true,
				email: true
			},
			input_candidate_post: {
				required: true
			}
		},
		messages: {
			input_candidate_name: "不能为空"

		},
		tooltip_options: {
			input_candidate_name: {
				//	placement: 'right',
				//	html: true
			}
		},

	});
*/
});