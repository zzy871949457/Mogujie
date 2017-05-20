$(function () {

    var dian = $(".dian");
    var img = $(".left_banner img");
    var index = 0;
    var currentIndex = 0;
    var timer = 0;

    /**
     * 给每一个点，添加mouseover mouseout 事件
     */
    dian.on("mouseover mouseout", function () {
        if (event.type == "mouseover") {
            window.clearInterval(timer);
            $(this).addClass("active").siblings().removeClass("active");
            index = $(this).index();
            currentIndex = index;
            /**
             * 移动图片
             */
            move(currentIndex);
        } else if (event.type == "mouseout") {
            play();
        }
    });

    /**
     * hover显示左右按钮
     */
    $(".left_banner").hover(function () {
        $(".left_banner .btn").show();
    }, function () {
        $(".left_banner .btn").hide();
    })

    /**
     * 给右按钮添加点击事件
     */
    $(".left_banner .rightBtn").click(function () {
        window.clearInterval(timer);
        currentIndex++;
        if (currentIndex >= img.length) {
            currentIndex = 0;
        }
        $(".span_list .dian").eq(currentIndex).addClass("active").siblings().removeClass("active");
        move(currentIndex)
    });

    /**
     * 给左边按钮添加点击事件
     */
    $(".left_banner .leftBtn").click(function () {
        window.clearInterval(timer);
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = img.length - 1
        }
        $(".span_list .dian").eq(currentIndex).addClass("active").siblings().removeClass("active");
        //当点击左边按钮的时候把所有图片的left改成240
        $(".left_banner img").css({
            left: "240px"
        });
        $(".left_banner img").eq(currentIndex).css({
            "left": "-240px"
        }).animate({
            "left": "0px",
            "opacity": "1"
        }, 700);
        $(".left_banner img").eq(currentIndex).siblings("img").css({
            left: "240px",
        }).animate({
            "opacity": "0"
        }, 700)
    });

    /**
     * 运动
     */
    function move(n) {
        $(".left_banner img").eq(n).css({
            "left": "240px"
        }).finish().animate({
            "left": "0",
            "opacity": "1"
        }, 700);
        $(".left_banner img").eq(n).siblings("img").css({
            left: "-240px"
        }).finish().animate({
            "opacity": "0"
        }, 700);
    }

    /**
     * 轮播
     */
    function play() {
        window.clearInterval(timer);
        timer = setInterval(function () {
            currentIndex++;
            if (currentIndex >= img.length) {
                currentIndex = 0;
            }
            $(".span_list span").eq(currentIndex).addClass("active").siblings().removeClass("active");
            move(currentIndex)
        }, 4000)
    }

    play();

    /**
     * 当鼠标hover时候停止轮播
     */
    $(".left_banner img").hover(function () {
        window.clearInterval(timer);
    }, function () {
        play();
    })

    /**
     * 添加活动页的右侧导航
     */
    $(".activityRightNav").load("publicStyle/publicRightNav.html");
});
