
$(function () {

    var post;
    var postsID = 1;
    $.get("http://localhost:3000/posts", {id: postsID}, function(response) {

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

        $.get("../../tpl/show.txt", function(result) {

            var html = ejs.compile(result)(post);
            $(".container").html(html);
        });
    });



})