function get_question_list() {
    var result = null;
    $.ajax({
        type: "GET",
        async: false,
        url: "/getquestions",
        data: {

        },
        success: function(r) {
            result = r;
        }
    });

    return result;
}

function ParseTimetoStr(s) {
    var result = "";
    var d = new Date(s);
    var year = d.getFullYear();
    var month = leadingZero(d.getMonth() + 1);
    var date = leadingZero(d.getDate());

    var hour = leadingZero(d.getHours());
    var minute = leadingZero(d.getMinutes());
    var second = leadingZero(d.getSeconds());

    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

function leadingZero(val) {
    var str = val.toString();
    if (str.length == 1) {
        str = '0' + str;
    }

    return str;
}



function save_candidate_comment() {
    var result = null;
    var comment = $("textarea[name=textarea_comment]").val();
    if (comment.length == 0) {
        return result;
    }
    $.ajax({
        type: "POST",
        async: false,
        url: "/insertcomment",
        data: {
            "content": $("textarea[name=textarea_comment]").val(),
            "candidateid": $.cookie("id")
        },
        success: function(r) {
            result = r;
            location.reload();
        }
    });
    return result;
}


function get_label_list() {
    var result = [];
    $.ajax({
        type: "GET",
        async: false,
        url: "/getlabellist",
        success: function(r) {
            $.each(r, function(index, value) {
                var item = {
                    id: value[0],
                    text: value[1],
                    disabled : value[2],
                };
                result.push(item);
            });
        }
    });
    return result;
}

function get_candidate_label_list() {
    var result = [];
    $.ajax({
        type: "POST",
        async: false,
        url: "/getcandidatelabellist",
        data: {
            "candidateid": $.cookie("id"),
        },
        success: function(r) {
            $.each(r, function(index, value) {
                var item = {
                    id: value[0],
                    labelid: value[1],
                };
                result.push(item);
            });
        }
    });
    return result;
}