$(function() {



	$("#input-folder-1").fileinput({
		uploadUrl: "/uploaddcmfile",
		previewFileIcon: '<i class="fa fa-file"></i>',
		allowedPreviewTypes:true,
		showPreview:true,
		showUploadedThumbs:false,
		maxFileCount: 1000,
		autoReplace: true,
		maxFileSize: 10240,
		browseLabel: 'Select Folder...'
//		uploadExtraData: {
//			"candidateid": $.cookie("id")
//		}
	}).on('fileuploaded', function(event, data, previewId, index) {
		location.reload();
	});

//	init_candidate_page();

});