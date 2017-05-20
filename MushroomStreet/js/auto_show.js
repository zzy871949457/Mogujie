function silder() {
    var box = $("box");
    var container = $("#container");
    var oneWidth = container.find(".mslide_banner").eq(0).width();//找到第一个Width
    //找到dian
    var number = $("#dot_box a");
    var index = 0;
    var timer = 0;

    /**
     * 给每一个点添加点击事件
     */
    number.on("click", function () {
        $(this).addClass("dot_show").siblings(".dot_default").removeClass("dot_show");
        index = $(this).index();
        container.animate({
            "left": -(oneWidth * index)
        });
    });
    $("#next").stop(true, true).click(function () {
        index++;
        if (index == number.length) {
            index = 0
        }
        number.eq(index).trigger("click");
    });
    $("#prev").stop(true, true).click(function () {
        index--;
        if (index == number.length) {
            index = 0
        }
        number.eq(index).trigger("click");
    });
    timer = setInterval(function () {
        index++;
        if (index == number.length) {
            index = 0
        }
        number.eq(index).trigger("click");
    }, 4000);

    /**
     * 鼠标悬停停止轮播
     */
    container.hover(function () {
        $("#next,#prev").animate({
            opacity: "1"
        }, 200);
        clearInterval(timer);
    }, function () {
        $("#next,#prev").animate({
            "opacity": 0
        }, 500);
        timer = setInterval(function () {
            index++;
            if (index == number.length) {
                index = 0
            }
            number.eq(index).trigger("click");
        }, 4000);
    })
}
$(function () {
    silder();
});