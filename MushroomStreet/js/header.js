$(function () {
    $("#header").load("publicStyle/header_style.html", function () {
        var cookie = document.cookie;
        var uName = cookie.split("user=")[1];
        // var uName = cookie.split(";")[0].split("=")[1];
        console.log(uName);
        /**
         * 判断密码不为空的时候
         */
        if (uName != "" && uName != undefined) {
            $("#index_register").css({
                "display": "none"
            });
            $("#index_login").css({
                "display": "none"
            });
            $("#index_uName").css({
                "display": "block"
            });
            $("#index_uName .user-name").html(uName);
            $("#index_uMsg").css({
                "display": "block"
            });
            $("#index_uCollect").css({
                "display": "block"
            });
        } else {
            $("#index_register").css({
                "display": "block"
            });
            $("#index_login").css({
                "display": "block"
            });
            $("#index_uName").css({
                "display": "none"
            });
            $("#index_uMsg").css({
                "display": "none"
            });
            $("#index_uCollect").css({
                "display": "none"
            });
        }

        /**
         * 隐藏显示
         */
        function showAndHide(para1, para2) {
            para1.hover(function () {
                para2.css({
                    "display": "block"
                })
            }, function () {
                para2.css({
                    "display": "none"
                })
            });
        }

        //个人设置
        showAndHide($("#index_uName"), $("#personal"));
        //我的收藏
        showAndHide($("#index_uCollect"), $("#MySC"));
        //购物车
        showAndHide($(".shopping-cart"), $(".shop-cart-info"));
        //客户服务
        showAndHide($(".khfw"), $(".khfw .ext-mode"));
        //我的小店
        showAndHide($(".myxiaodian"), $(".myxiaodian .ext-mode"));

        /**
         * 当点击退出的时候，清除cookie
         */
        $("#out").click(function () {
            document.cookie = "user=" + uName + ";path=/;expires=" + new Date("1970-01-01");
            window.location.href = "index.html"
        });
    });

    /**
     * 加载index的右边nav
     */
    $("#indexRightNav").load("publicStyle/publicRightNav.html");


});