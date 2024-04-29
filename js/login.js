// $(function(){

    // $("#btn_sub").click(function(){
    //     var username = $("#username").val();
    //     var password = $("#password").val();
    //     alert("Text: " + password);
    //     if (password === "123"){
    //         alert("Text: " + username);
    //         var date = new Date();
    //         date.setTime(date.getTime()+60*60*1000);
    //         $.cookie('username', username,{expires:date,path:'/',secure:false,raw:false});
    //     }
    // });
    //
    //


// });
// // 2.读取cookie
// $.cookie('uid'); // cookie存在 => '10001'
// $.cookie('uname'); // cookie不存在 => null
//
// // 3.删除cookie
// $.cookie('uid',null); // 删除名称为uid的cookie值
$(function () {

    //协议
    $("#agreement_admin").click(function () {

        alert("管理员协议");
    })

    $("#agreement_privacy").click(function () {

        alert("隐私协议");
    })

    //表单处理
    //标题验证
    var unameFlag = 0;   //0 表示格式正确， 1 表示错误
    var pwdFlag = 0;   //0 表示格式正确， 1 表示错误
    var newElement;

    $("#username").focus();
    $("#username").blur(function () {
        var pattern = /^\w{2,18}$/;
        if (!pattern.test($(this).val())){
            $(this).css("border", "1px solid red");
            $(this).css("outline-color", "red");
            if (unameFlag === 0){//没有提示字
                newElement = $("<p>用户名格式有误</p>")
                newElement.css("font-size", "12px");
                newElement.css("color", "red");
                newElement.css("padding-left", "80px");
                newElement.insertAfter($(this).parent().parent());
                unameFlag = 1;
            }
            // alert("标题长度为2~20");
        }else {
            if (unameFlag === 1){//有提示字
                $(newElement).remove();
                unameFlag = 0;
            }
            $(this).css("border", "1px solid #666666");
            $(this).css("outline-color", "dodgerblue");
        }

    })

    //密码验证
    $("#password").blur(function () {
        var pattern = /^\w{2,18}$/;
        if (!pattern.test($(this).val())){
            $(this).css("border", "1px solid red");
            $(this).css("outline-color", "red");
            if (pwdFlag === 0){//没有提示字
                newElement = $("<p>密码格式有误</p>")
                newElement.css("font-size", "12px");
                newElement.css("color", "red");
                newElement.css("padding-left", "80px");
                newElement.insertAfter($(this).parent().parent());
                pwdFlag = 1;
            }

        }else {
            if (pwdFlag === 1){//有提示字
                $(newElement).remove();
                pwdFlag = 0;
            }
            $(this).css("border", "1px solid #666666");
            $(this).css("outline-color", "dodgerblue");

        }
    })

    $("#btn_sub").click(function () {

        var acceptFlag = $("#accept:checked").length;
        if (acceptFlag === 0){

            alert("请先同意协议");
        }else
        if (unameFlag === 0 && pwdFlag === 0){

            var uname = $("#username").val();
            var pwd = $("#password").val();

            $.get("http://localhost:3000/users", {username: uname}, function(response) {

                if (response.length === 0){

                    alert("该用户不存在");
                }else
                if (response[0].password === pwd){

                    var date = new Date();
                    date.setTime(date.getTime()+60*60*1000);
                    $.cookie('username', username,{expires:date,path:'/',secure:false,raw:false});
                    //密码正确，跳转
                    // 跳转到指定的 URL 地址
                    location.href = "./admin/post/form.html";
                }else {
                    //密码错误
                    if (pwdFlag === 0){//没有提示字
                        newElement = $("<p> * 密码错误</p>")
                        newElement.css("font-size", "12px");
                        newElement.css("color", "red");
                        newElement.css("padding-left", "80px");
                        newElement.insertAfter($("#password").parent().parent());
                        pwdFlag = 1;
                    }
                }
            });
        }else {

            alert("还有错误哦");
        }
    })

})
