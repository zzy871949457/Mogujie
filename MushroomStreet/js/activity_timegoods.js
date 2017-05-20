$(function () {
    $.post("json/active.json", function (data, textStatus) {
        if (textStatus == "success") {
            var j = 0;
            for (var k in data) {
                j++;
                var index = "";
                var collection = "";
                for (var i = 0; i < data[k]["img_url"].length; i++) {
                    index += '<div class="item"><a href="" class="item_img"><img src="images/activity/' + data[k]["img_url"][i] + '"/></a><a' +
                        ' href="###"' +
                        ' class="item_detail"><div class="title">' + data[k]["title"][i] + '</div><div' +
                        ' class="price"><span>快抢价<span class="cur">¥' + data[k]["new_price"][i] + '</span><del class="old">¥' + data[k]["old_price"][i] + '</del></span></div><div' +
                        ' class="status_bar_box"><div class="status_bar_text">库存' + data[k]["status"][i] + '件</div><div class="status_bar"><div class="status_bar_progress"></div></div></div><div' +
                        ' class="buy_btn_box"><span class="buy_btn">点击查看</span><span class="buy_text">' + data[k]["follow"][i] + '人关注</span></div></a></div>'
                }
                collection += '<div class="item-list item-list'+j+'">'+index+'</div>'
                $(".centent_body").append(collection)
            }
        }
        $(".item-list").eq(10).css({display: "block"});
    })
    $(".rightBox").load("publicStyle/activityRightNav.html");
    $(".rightListNav").load("publicStyle/activityRightNav.html");
});












