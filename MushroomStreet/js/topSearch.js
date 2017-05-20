$(function () {
    var onOff = true;
    $(".search_nav_menu").click(function () {
        if (onOff) {
            $("#bannerNav").css({
                "position": "fixed",
                "top": "50px",
                "background": "rgba(0, 0, 0, 0.8)"
            });
            $(".nav_title a").css({
                "color": "#fff"
            });
            $(".nav_content_span a").css({
                "color": "#fff"
            });
            onOff = !onOff;
        } else {
            $("#bannerNav").css({
                "position": "relative",
                "top": "0px",
                "background": "rgba(255, 255, 255, 0.8)"
            });
            $(".nav_title a").css({
                "color": "#333"
            });
            $(".nav_content_span a").css({
                "color": "#666"
            });
            onOff = !onOff
        }
    });

    $(".sticky-search-content").load("publicStyle/search.html", function () {
        $(".ts_txt").eq(1).on("input",function () {
            var s = $(".ts_txt").eq(1).val();
            $(".search_content").eq(1).css({
                "display":"block",
                "top":"42px"
            });
            function fn(data) {
                var ss = "";
                for (var k in data["result"]) {
                    ss += data["result"][k];
                    $(".search_tip").append('<li><a class="title" href="###">'+ss+'</a></li>')
                }
            }
            var url = "https://suggest.taobao.com/sug?code=utf-8&q=" + s + "&callback=?";
            if (s == "") {
                $(".search_content").css({
                    "display": "none"
                });
            }
            $.getJSON(url, fn);
        });
        $(".ts_txt").blur(function () {
            $(".search_content").css({
                "display": "none"
            });
        });
    });
});








