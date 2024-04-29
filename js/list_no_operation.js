
$(function () {

    var post;
    var postsID = 1;
    $.get("http://localhost:3000/posts", function(response) {

        response.forEach(function (res) {

            $.get("./tpl/list_no_operation.txt", function(result) {

                var html = ejs.compile(result)(res);
                $("#list").append(html);
            });
        })


    });

    // hash路由
    var hash;
    var path;
    var method;
    var id;
    window.onhashchange = function() {
        hash = window.location.hash;
        path = hash.substring(1);
        method = hash.substring(1, path.lastIndexOf("/")+1);
        id = path.substring(path.lastIndexOf("/")+1);

        switch (method) {
            case 'show':
                blogShow(id);
                break;
            default:
                location.href="index.html";
        }

    };

    function blogShow(id) {

        $.get("http://localhost:3000/posts", {id: id}, function(response) {

            post = {
                title: response[0].title,
                description: response[0].description,
                matchTime: response[0].matchTime,
                postTime: response[0].postTime,
                matchTitle: response[0].matchTitle,
                team1: response[0].team1,
                team2: response[0].team2,
                score1: response[0].score1,
                score2: response[0].score2,
                body: response[0].body,
                status: response[0].status,
                id: response[0].id
            };
            console.log(post);

            $.get("./tpl/show.txt", function(result) {

                var html = ejs.compile(result)(post);
                $(".banner").remove();
                $(".home").remove();
                $(".container").html(html);
            });
        });
    }

})