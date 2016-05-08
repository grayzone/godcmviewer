function add_comment_into_list(createtime, content) {
	var component = '<li class="list-group-item"><h4 class="list-group-item-heading">' + createtime + '</h4><p class="list-group-item-heading">' + content + '</p></li>';
	$("#ul_candidate_comment_list").append(component);

}

function add_attachment_into_list(filename) {
	var component = '<li class="list-group-item"><a class="list-group-item" href="/download/' + filename + '">' + filename + '</a></li>';
	$("#ul_candidate_attachment_list").append(component);

}

function get_candidate_info() {
	var result = null;
	var id = $.cookie("id");
	$.ajax({
		type: "POST",
		async: false,
		url: "/getcandidatebyid",
		data: {
			"id": id
		},
		success: function(output) {
			result = output;
		}
	});

	return result;
}

function get_comment_list() {
	var result = null;
	var id = $.cookie("id");
	$.ajax({
		type: "POST",
		async: false,
		url: "/getcommentlist",
		data: {
			"candidateid": id
		},
		success: function(output) {
			result = output;
		}
	});

	return result;

}

function get_attachment_list() {
	var result = null;
	var id = $.cookie("id");
	$.ajax({
		type: "POST",
		async: false,
		url: "/getattachments",
		data: {
			"candidateid": id
		},
		success: function(output) {
			result = output;
		}
	});

	return result;

}

function get_label_content(labelid) {
	var result = null;
	$.ajax({
		type: "POST",
		async: false,
		url: "/getlabel",
		data: {
			"labelid": labelid
		},
		success: function(output) {
			result = output;
		}
	});
	return result;
}

function fill_candidate_label() {
	var labels = get_candidate_label_list();
	var labeldata = [];
	$.each(labels, function(index, value) {
		content = value['labelid'];
		labeldata.push(content);
	});

	$('#select_candidate_label').val(labeldata).trigger("change");
}

function fill_candidate_info(info) {
	$('#input_candidate_name').val(info.Fullname);
	$('#input_candidate_age').val(info.Age);
	$('#select_candidate_gender').val(info.Gender);
	$('#input_candidate_workyear').val(info.Workyear);
	$('#input_candidate_email').val(info.Email);
	$('#input_candidate_mobile').val(info.Mobile);
	$('#input_candidate_city').val(info.City);
	$('#input_candidate_post').val(info.Post);
	$('#input_candidate_company').val(info.Company);
	$('#input_candidate_education').val(info.Education);
 	$('#input_candidate_birthday').val(info.Birthday.substr(0, 10));

	// init candidate label
	fill_candidate_label();
}

function init_comment_list() {
	var list = get_comment_list();
	$.each(list, function(index, value) {
		add_comment_into_list(ParseTimetoStr(value[3]), value[2]);
	});
}

function init_attachment_list() {
	var list = get_attachment_list();
	$.each(list, function(index, value) {
		add_attachment_into_list(value[2]);
	});
}

function init_candidate_page() {
	// init basic information
	var candidateinfo = get_candidate_info();
	fill_candidate_info(candidateinfo);

	// init comment
	init_comment_list();

	// init attachment
	init_attachment_list();

}