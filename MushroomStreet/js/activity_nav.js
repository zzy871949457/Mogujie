$(function () {
    var initIndex = 10;
    var index = 0;

    /**
     * 获取当前的小时
     */
    var h = new Date().toString().split(" ")[4].toString().split(":")[0];
    var currentIndex = 0;
    for (var i = 0; i < $(".nav_item .seckill-time").length; i++) {
        if ($(".nav_item .seckill-time").eq(i).html() == "今日" + h + ":00") {
            $(".nav_item .seckill-time").eq(i).siblings().html("快抢中");
            currentIndex = $(".nav_item").eq(i).index();
        }
        if ($(".nav_item").eq(i).index() > currentIndex) {
            $(".nav_item .seckill-time").eq(i).siblings().html("即将开始");
        } else if ($(".nav_item").eq(i).index() < currentIndex) {
            $(".nav_item .seckill-time").eq(i).siblings().html("已开抢");
        }
    }

    /**
     * 鼠标滑过显示出来
     */
    $(".activity_main_content").hover(function () {
        $(".controller .ctrl-item").show();
    }, function () {
        $(".controller .ctrl-item").hide();
    });

    /**
     * 给每一个nav_item添加点击事件
     */
    $(".nav_content .nav_item").on("click", function () {
        //获取当前的下标
        index = $(this).index();
        var s = index - initIndex;
        // if ($(".nav_content").is(':animated')) {
        //     return;
        // }
        $(".nav_content").finish().animate({left: $(".nav_content").position().left - s * 133 + "px"}, 500, function () {
            $(".nav_content .nav_item").eq(index).addClass("nav_item_fontColor").siblings().removeClass("nav_item_fontColor");
        });
        initIndex = index;
        $(".item-list").eq(initIndex).css({display: "block"}).siblings().css({display: "none"});
    });

    /**
     * 右点击
     */
    $(".controller .controller_right,.centent_foot .next").click(function () {
        initIndex++;
        // if ($(".nav_content").is(':animated')) {
        //     return;
        // }
        $(".nav_content").finish().animate({left: $(".nav_content").position().left - 133 + "px"}, 500, function () {
            $(".nav_content .nav_item").eq(initIndex).addClass("nav_item_fontColor").siblings().removeClass("nav_item_fontColor");
        });
        $(".item-list").eq(initIndex).css({display: "block"}).siblings().css({display: "none"});
    });

    /**
     * 左点击
     */
    $(".controller .controller_left,.centent_foot .prev").click(function () {
        initIndex--;
        // if ($(".nav_content").is(':animated')) {
        //     return;
        // }
        $(".nav_content").finish().animate({left: $(".nav_content").position().left + 133 + "px"}, 500, function () {
            $(".nav_content .nav_item").eq(initIndex).addClass("nav_item_fontColor").siblings().removeClass("nav_item_fontColor");
        })
        $(".item-list").eq(initIndex).css({display: "block"}).siblings().css({display: "none"});
    });

});