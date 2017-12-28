$(function () {
    $("#submit").click(function () {
        $.ajax({
            url: '/upload',
            type: 'POST',
            cache: false,
            data: new FormData($('#uploadForm')[0]),
            processData: false,
            contentType: false
        }).done(function(res) {
            $(".img").html("<img src='"+res.data.img+"'/>")
        }).fail(function(res) {});
    });
});
