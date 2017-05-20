$(function () {
    $(".joinCart").click(function () {
        $.post("json/productDetails.json", function (data, textStatus) {
            if (textStatus == "success") {
                /**
                 * 遍历数据，把数据加入json中
                 */
                for (var k in data) {
                    setCookie(k, 1, "/", new Date(new Date().getTime() + 7 * 24 * 3600000));
                }
            }
        })
    });
});







