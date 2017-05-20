window.onscroll = function () {
    var top = document.body.scrollTop;
    var height = $(".left_goods_list").height();
    var rightHeight = $(".right_menu").height();

    /**
     * 当滚动的距离大于530的时候
     */
    if (top >= 530) {
        $(".nav_times").css({
            position: "fixed",
            top: "0"
        });
        $(".rightBox .right_menu").css({
            position: "fixed",
            top: "55px"
        });
        if (top >= height - 180) {
            $(".rightBox .right_menu").css({
                position: "absolute",
                top: (height - rightHeight) - 15
            })
        }
    } else {
        $(".nav_times").css({
            position: "relative",
            top: "0"
        });
        $(".rightBox .right_menu").css({
            position: "absolute",
            top: "0"
        })
    }

    /**
     * 当滚动距离大于100的时候
     */
    if (top >= 100) {
        $(".rightListNav .right_menu").css({
            position: "fixed",
            top: "55px"
        });
    } else {
        $(".rightListNav .right_menu").css({
            position: "absolute",
            top: "100px"
        })
    }

    /**
     * 获取滚动条当前的位置
     */
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }

    /**
     * 显示/隐藏TOP
     */
    if (getScrollTop() > 0) {
        $(".sideBottom").css({
            "display": "block"
        })
    } else {
        $(".sideBottom").css({
            "display": "none"
        })
    }
};

$(function () {

    /**
     * 点击切换首页和售罄
     */
    $(".activity_menu .activity_item_one").click(function () {
        $(".activity_body_content").show();
        $(".activity_waterfall").hide();
        $(".activity_menu .activity_item_one").addClass("active").siblings().removeClass("active");
    });

    $(".activity_menu .activity_item_two").click(function () {
        $(".activity_body_content").hide();
        $(".activity_waterfall").show();
        $(".activity_menu .activity_item_two").addClass("active").siblings().removeClass("active");
    });

    var start = 1, over = 2;

    function load2() {
        $.post("json/active.json", null, function (data, textStatus) {
            if (textStatus == "success") {
                console.log(data[1])
                for (var j = start; j < over; j++) {
                    var shouQing = "";
                    var collection2 = "";
                    for (var i = 0; i < data[j]["img_url"].length; i++) {
                        shouQing += '<div class="item"><a href="###" class="item_img"><img' +
                            ' src="images/activity/' + data[j]["img_url"][i] + '"/></a><a' +
                            ' href="###"' +
                            ' class="item_detail"><div class="title">' + data[j]["title"][i] + '</div><div' +
                            ' class="price"><span>快抢价<span class="cur">¥' + data[j]["new_price"][i] + '</span><del class="old">¥' + data[j]["old_price"][i] + '</del></span></div><div' +
                            ' class="status_bar_box"><div class="status_bar_text">库存' + data[j]["status"][i] + '件</div><div class="status_bar"><div class="status_bar_progress"></div></div></div><div' +
                            ' class="buy_btn_box"><span class="buy_btn">点击查看</span><span class="buy_text">' + data[j]["follow"][i] + '人关注</span></div></a></div>'
                    }
                    collection2 += '<div class="item-list item-list' + j + '">' + shouQing + '</div>';
                    $(".contents").append(collection2);
                }
            }
        })
    }

    load2();
    $(window).scroll(function () {
        /**
         * 即将售罄瀑布流
         */
        if ($(document).scrollTop() + $(window).height() == $(document).height()) {
            start = over;
            over++;
            if (over <= 22) {
                load2();
            }
        }
    })
});