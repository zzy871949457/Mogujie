/**
 * 轮播图
 */
$(function () {
    //从json中获取轮播图数据
    $.post("json/carousel.json", function (data) {
        var arrImg = new Array();
        //背景颜色
        var arrBgColor = new Array();
        for (var k in data) {
            arrImg.push(data[k]["1"]);
            arrBgColor.push(data[k]["2"]);
        }

        /**
         * 创建img
         */
        for (var i = 0; i < arrImg.length; i++) {
            $("#imgBanner").append("<img src='images/" + arrImg[i] + "'/>");
        }

        /**
         * 初始化显示
         */
        $("#banner").css({
            "background": arrBgColor[0]
        });
        $("#imgBanner img").eq(0).show();


        var num = 0;
        var timer = 0;
        var maxLength = $("#spanBox a").length;
        /**
         * 自动轮播
         */
        function play() {
            timer = setInterval(function () {
                $("#imgBanner img:eq(" + num + ")").fadeIn(400).siblings().hide();
                $("#spanBox a:eq(" + num + ")").addClass("showDian").siblings().removeClass("showDian");

                // $("#spanBox a").eq(num).css({
                //     "transform": "rotate(360deg)",
                //     "transition-duration": "4s"
                // });

                //缩放效果
                // $("#imgBanner img:eq(" + num + ")").animate({
                //     "width": "1000px",
                //     "height": "600px"
                // }, 4000, function () {
                //     $(this).css({
                //         "width": "778px",
                //         "height": "440px"
                //     })
                // });
                $("#banner").css({
                    "background": arrBgColor[num]
                });
                num++;
                if (num == maxLength) {
                    num = 0
                }
            }, 4000)
        }

        /**
         * 鼠标在banner上就停止轮播
         */
        $("#imgBanner").mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            play();
        });

        /**
         * 鼠标移动点事件  当在电上面的时候停止轮播
         */
        $("#spanBox a").mouseenter(function () {
            clearInterval(timer);
            num = $(this).index();
            $("#imgBanner img:eq(" + num + ")").fadeIn(400).siblings().hide();
            $(this).addClass("showDian").siblings().removeClass("showDian");
            //改变背景颜色
            $("#banner").css({
                "background": arrBgColor[num]
            });
        }).mouseleave(function () {
            play();
        });
        play();
    });
});




