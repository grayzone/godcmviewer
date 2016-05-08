function delete_one_label(labelid) {
    $.ajax({
        type: "POST",
        async: false,
        url: "/deletelabel",
        data: {
            "labelid": labelid
        },
        success: function(r) {
            result = r;
        }
    });
}

function delete_candidate_label(labelid) {
    $.ajax({
        type: "POST",
        async: false,
        url: "/deletecandidatelabelbylabel",
        data: {
            "labelid": labelid
        },
        success: function(r) {
            result = r;

        }
    });
}

function clean_deleted_labels(){
    $.ajax({
        type: "POST",
        async: false,
        url: "/cleanuselesslabels",
        data: {
        },
        success: function(r) {
            result = r;
        }
    });
}

function add_new_label() {
    var result = null;
    var label = $("#select_admin_label").val();
    if (label == null) {
        return result;
    }
    if (label.length == 0) {
        return result;
    }
    var last = "";
    if (typeof(label) == "string") {
        last = label;
    } else {
        last = label[label.length - 1];
    }
    if (last.length == 0) {
        return result;
    }

    $.ajax({
        type: "POST",
        async: false,
        url: "/insertlabel",
        data: {
            "label": last
        },
        success: function(r) {
            result = r;
            location.reload();
        }
    });
    return result;
}
