function autoLoading() {
    var i = 0;

    function getData() {
        $.post("json/waterfall.json", function (data) {
            var loadImg = "";
            i++;
            for (var k in data) {
                loadImg = '<div class="goods_item"><a href="###" class="zxs">找相似</a><a href="../GoodsDetails.html"' +
                    ' class="imgBox"><img src="images/waterfall/' + data[k]["g_url"] + '"/></a><a href="###"' +
                    ' class="goods_info"><p class="info">' + data[k]["g_detail"] + '</p></a><div' +
                    ' class="goods_price"><b class="new_price">¥' + data[k]["g_discount"] + '</b><p' +
                    ' class="old_price">¥<span>' + data[k]["g_price"] + '</span></p><span' +
                    ' class="fav_num"><img src="images/xx.png"/><b class="num">2017</b></span></div></div>';
                $("#pubu").append(loadImg);
            }
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
     * 获取当前窗口可视范围的高度
     */
    function getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    }

    /**
     * 获取文档完整高度
     */
    function getScrollHeight() {
        var scorllHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        return scorllHeight;
    }

    getData();

    window.onscroll = function () {
        // console.log(getScrollTop()+"-------滚动条当前的位置");
        // console.log(getClientHeight()+"-------当前窗口可视范围的高度");
        // console.log(getScrollHeight()+"-------文档完整高度");
        // console.log("---------------------------------------------")
        if (getScrollTop() + getClientHeight() == getScrollHeight()) {
            var sum = 3;
            var timer = null;
            function ajaxServise() {
                if (i < 3) { timer = setTimeout(getData(), 500); }
                if (i == sum) { clearTimeout(timer); }
            }
            ajaxServise();
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

        /**
         * 滚动高度大于600时
         */
        if (getScrollTop() >= 600) {
            $("#topSearch").css({ "display": "block" });
        } else {
            $("#topSearch").css({ "display": "none" })
        }

        /**
         * 左侧栏的显示和隐藏
         */
        if (getScrollTop() >= 1850 && getScrollTop() < 7600) {
            $(".leftNav").fadeIn().show();
        } else {
            $(".leftNav").fadeOut().hide();
        }
    }
}
$(function () {
    autoLoading();
});