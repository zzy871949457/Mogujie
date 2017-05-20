
/**
 * 搜索框事件
 */
function sousuo() {
    $(".ts_txt").on("input", function () {
        var s = $(".ts_txt").val();
        $(".search_content").css({
            "display": "block"
        });
        function fn(data) {
            var ss = "";
            for (var k in data["result"]) {
                ss += data["result"][k];
                $(".search_tip").append('<li><a class="title" href="###">' + ss + '</a></li>')
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
    $(".search_tip .title").eq(0).click(function () {
        alert("777")
    });
}

$(function () {
    $(".search").load("publicStyle/search_style.html",function () {
        $("#searchBox").load("publicStyle/search.html", function () {
            sousuo()
        });
    });
    $.post("json/search.json", function (data) {
        var arr = [];
        for (var k in data) {
            arr.push(data[k]);
        }
        for (var key in arr[0]) {
            $("#hotWords").append("<a href='###'>" + arr[0][key] + "</a>");
        }
    });
});