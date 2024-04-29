$(function () {

    //表单处理
    //标题验证
    var titFlag = 0;   //0 表示格式正确， 1 表示错误
    var descFlag = 0;   //0 表示格式正确， 1 表示错误
    var matchTimetFlag = 0;   //0 表示格式正确， 1 表示错误
    var bodyFlag = 0;   //0 表示格式正确， 1 表示错误
    var newElement;
    // newElement = $("<p>err</p>");

    $("#article_tit").focus();
    $("#article_tit").blur(function () {
        // var pattern = /^[\u4e00-\u9fa5\w]{2,20}$/;
        if ($(this).val().length < 2 || $(this).val().length > 20){
            $(this).css("border", "1px solid red");
            $(this).css("outline-color", "red");
            if (titFlag === 0){//没有提示字
                newElement = $("<p>标题内容长度为2~20</p>")
                newElement.css("font-size", "12px");
                newElement.css("color", "red");
                newElement.css("padding-left", "80px");
                newElement.insertAfter($(this).parent().parent());
                titFlag = 1;
            }
        }else {
            if (titFlag === 1){//有提示字
                $(newElement).remove();
                titFlag = 0;
            }
            $(this).css("border", "1px solid #666666");
            $(this).css("outline-color", "dodgerblue");
        }
    })

    //简介验证
    $("#article_desc").blur(function () {
        // var pattern = /^[\u4e00-\u9fa5\w]{2,40}$/;
        if ($(this).val().length < 2 || $(this).val().length > 40){
            $(this).css("border", "1px solid red");
            $(this).css("outline-color", "red");
            if (descFlag === 0){//没有提示字
                newElement = $("<p>简介长度为2~40</p>")
                newElement.css("font-size", "12px");
                newElement.css("color", "red");
                newElement.css("padding-left", "80px");
                newElement.insertAfter($(this).parent().parent());
                descFlag = 1;
            }
        }else {
            if (descFlag === 1){//有提示字
                $(newElement).remove();
                descFlag = 0;
            }
            $(this).css("border", "1px solid #666666");
            $(this).css("outline-color", "dodgerblue");
        }
    })

    //比赛时间验证
    $("#article_matchTime").blur(function () {
        var pattern = /^[1-9]{4}[\u4e00-\u9fa5][0-1][0-9][\u4e00-\u9fa5][0-3][0-9][\u4e00-\u9fa5]\s[0-2][0-9][:][0-5][0-9]$/;
        if (!pattern.test($(this).val())){
            $(this).css("border", "1px solid red");
            $(this).css("outline-color", "red");
            if (matchTimetFlag === 0){//没有提示字
                newElement = $("<p>时间格式错误</p>")
                newElement.css("font-size", "12px");
                newElement.css("color", "red");
                newElement.css("padding-left", "80px");
                newElement.insertAfter($(this).parent().parent());
                matchTimetFlag = 1;
            }

        }else {
            if (matchTimetFlag === 1){//有提示字
                $(newElement).remove();
                matchTimetFlag = 0;
            }
            $(this).css("border", "1px solid #666666");
            $(this).css("outline-color", "dodgerblue");
        }
    })

    //内容验证
    $("#article_body").blur(function () {
        // var pattern = /^[\u4e00-\u9fa5\w]{0,2000}$/;
        if ($(this).val().length > 2000){
            $(this).css("border", "1px solid red");
            $(this).css("outline-color", "red");
            if (bodyFlag === 0){//没有提示字
                newElement = $("<p>正文内容不得超过2000字</p>")
                newElement.css("font-size", "12px");
                newElement.css("color", "red");
                newElement.css("padding-left", "80px");
                newElement.insertAfter($(this).parent().parent());
                bodyFlag = 1;
            }
        }else {
            if (bodyFlag === 1){//有提示字
                $(newElement).remove();
                bodyFlag = 0;
            }
            $(this).css("border", "1px solid #666666");
            $(this).css("outline-color", "dodgerblue");
        }
    })

    function getCurrentDate() {

        //获取当前系统时间
        var currentDate = new Date( );
        //获职年份
        var year = currentDate.getFullYear();
        //获取月份
        var month = currentDate.getMonth() + 1;
        //获取日期
        var day = currentDate.getDate();
        //获取小时
        var hours = currentDate.getHours();
        //获取分钟
        var minutes = currentDate.getMinutes();
        //显示当前系统时同
        return year + "年" + month + "月" + day + "日 " + hours + ":" + minutes;

    }

    function add() {

        $("#btn_rel").click(function () {

            var username = $.cookie('username'); // cookie不存在 => null
            if (username == null){

                alert("请先登录！");
            }else
            if (titFlag===0 && descFlag===0 && matchTimetFlag===0 && bodyFlag===0){

                var title = $("#article_tit").val();
                var desc = $("#article_desc").val();
                var matchTime = $("#article_matchTime").val();
                var postTime = getCurrentDate();
                var body = $("#article_body").val();
                var team1 = $("#team_1 > option:selected").val();
                var team2 = $("#team_2 > option:selected").val();
                var score1 = $("#score_1 > option:selected").val();
                var score2 = $("#score_2 > option:selected").val();
                var status = 0;

                $.post("http://localhost:3000/posts",{title: title, description: desc, matchTime: matchTime, postTime: postTime, team1: team1, team2: team2, score1: score1, score2: score2, body: body, status:status}, function(response) {
                    alert("发布成功");
                    // 跳转到指定的 URL 地址
                    location.href = "./index.html";
                });
            }else {

                alert("格式还有错误哦");
            }
        })
    }

    function update() {
        var updateId = parseInt($.cookie("updateId"));
        $.get("http://localhost:3000/posts", {id: updateId}, function(response) {

            $("#article_tit").val(response[0].title);
            $("#article_desc").val(response[0].description);
            $("#article_matchTime").val(response[0].matchTime);
            $("#article_body").val(response[0].body);
            $("#team_1").val(response[0].team1);
            $("#team_2").val(response[0].team2);
            $("#score_1").val(response[0].score1);
            $("#score_2").val(response[0].score2);

        });
        $("#btn_rel").click(function () {

            var username = $.cookie('username'); // cookie不存在 => null
            if (username == null){

                alert("请先登录！");
            }else
            if (titFlag===0 && descFlag===0 && matchTimetFlag===0 && bodyFlag===0){

                var title = $("#article_tit").val();
                var desc = $("#article_desc").val();
                var matchTime = $("#article_matchTime").val();
                var postTime = getCurrentDate();
                var body = $("#article_body").val();
                var team1 = $("#team_1 > option:selected").val();
                var team2 = $("#team_2 > option:selected").val();
                var score1 = $("#score_1 > option:selected").val();
                var score2 = $("#score_2 > option:selected").val();
                var status = 0;


                $.ajax({
                    type: 'delete',
                    url: 'http://localhost:3000/posts'+'/'+updateId.toString(),

                    success: function() {

                        $.ajax({
                            type: 'post',
                            url: 'http://localhost:3000/posts',
                            data: {title: title, description: desc, matchTime: matchTime, postTime: postTime, team1: team1, team2: team2, score1: score1, score2: score2, body: body, status:status},

                            success: function() {

                                alert("修改成功");
                                location.href = "./index.html";
                            }
                        })
                    }
                });
            }else {

                alert("格式还有错误哦");
            }
        })
    }

    if ($.cookie("updateId") == null){

        add();
    }else {

        update();
    }

    $("#btn_logout").click(function () {

        $.removeCookie('username', { path: '/' });
        location.href = "../../index.html";
    })


})
