$(function(){

    //读取cookie,检查是否登录
    var username = $.cookie('username'); // cookie不存在 => null
    if (username == null){

        var tpl = "<a href=\"../../login.html\">\n" +
            "                   <span class=\"user-login\">登录</span>\n" +
            "              </a>";

        var html = ejs.compile(tpl);
        $(".user").html(html);
    }else {

        var tpl = "<a href=\"./form.html\">\n" +
            "                    <img src=\"../../uploads/user.webp\" alt=\"\">\n" +
            "                    <span>发布页</span>\n" +
            "                </a>";

        var html = ejs.compile(tpl);
        $(".user").html(html);
    }


});