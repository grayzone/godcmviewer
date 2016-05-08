$(function() {



	$("#input_candidate_attachment").fileinput({
		language: "zh",
		showCaption: true,
		uploadUrl: "/insertattachment",
		maxFileCount: 1,
		autoReplace: true,
		maxFileSize: 10240,
		showPreview: false,
		uploadExtraData: {
			"candidateid": $.cookie("id")
		}
	}).on('fileuploaded', function(event, data, previewId, index) {
		location.reload();
	});

	init_candidate_page();

	$('#btn_candidate_save_comment').click(function() {
		save_candidate_comment();
	});


});