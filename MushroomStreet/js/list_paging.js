/**
 * 创建分页布局
 */
var flag = true;
function createPaging(s, ss) {
    $.post("json/paging.json", function (data) {
        var loadImg = "";
        var n = 0;
        for (var k in data) {
            n++;
            if (Number(k) > s && Number(k) < ss) {
                loadImg += '<div class="goods_item"><a href="###" class="zxs">找相似</a><a href="###"' +
                    ' class="imgBox"><img src="images/waterfall/' + data[k]["g_url"] + '"/></a><a href="###"' +
                    ' class="goods_info"><p class="info">' + data[k]["g_detail"] + '</p></a><div' +
                    ' class="goods_price"><b class="new_price">¥' + data[k]["g_discount"] + '</b><p' +
                    ' class="old_price">¥<span>' + data[k]["g_price"] + '</span></p><span' +
                    ' class="fav_num"><img src="images/xx.png"/><b class="num">2017</b></span></div></div>';
            }
            $("#paging").html(loadImg);
        }
        if (flag) {
            createBtn(Math.ceil(n / 30));
            flag = false;
        }
    })
}

/**
 * 添加按钮
 */
function createBtn(n) {
    var btn = "";
    var leftBtn = '<span style="display: none;" class="leftBtn" href="###"><</span>';
    var oneShengluo = '<i style="display: none" class="oneDian">...</i>'
    var shengluo = '<i class="dian">...</i>'
    var rightBtn = '<span class="rightBtn">下一页></span>';
    $(".leftBtn").insertBefore(".page_container");
    for (var i = 0; i < n; i++) {
        btn += '<a href="###">' + (i + 1) + '</a>';
    }
    $(".page_container").append(oneShengluo);
    $(".page_container").append(shengluo);
    $(".page_container").append(btn);
    $(".page_container").append(leftBtn);
    $(".page_container").append(rightBtn);
    $(".page_container a").eq(0).addClass("s").attr("id", "oneBtn");
    /**
     * 把第一个点添加到第一个元素的后面
     */
    $(".oneDian").insertAfter(".page_container a:eq(0)");
    /**
     * 把点添加到最后一个元素的前面
     */
    $(".dian").insertBefore(".page_container a:last");
    /**
     * 判断按钮的数量是否>5
     */
    var aArr = $(".page_container a")
    var hideArr = aArr.slice(5, $(".page_container a").length - 1);
    hideArr.css({
        "display": "none"
    });
    clickBtn();
}

/**
 * 点击改变颜色
 */
function clickBtn() {
    var index = 0;
    var length = $(".page_container a").length;

    $(".page_container a").on("click", function () {
        index = $(this).index();
        $(this).addClass("s").siblings().removeClass("s");
        /**
         * 获取第一个btn的class名用来判断
         */
        var name = $(".page_container a:eq(0)")[0].className;
        /**
         * 判断，如果1不处于选中状态，在左侧添加一个<
         */
        if (name != "s") {
            /**
             * 把<添加到第一个btn的前面
             */
            $(".leftBtn").insertBefore("#oneBtn");
        }

        var arrBtn = $(".page_container a");

        var currentIndex = Number($(".s").text());
        if (currentIndex > 5 && currentIndex + 2 <= length || currentIndex - 2 > 1) {
            $(".page_container a").eq(currentIndex).show();
            $(".page_container a").eq(currentIndex + 1).show().nextAll().hide();
            // $(".page_container a").eq(currentIndex - 1).show();
            $(".page_container a").eq(currentIndex - 2).show();
            $(".page_container a").eq(currentIndex - 3).show().prevAll().hide();
            $(".page_container a").eq(0).show();
            $(".page_container a").eq(length - 1).show();
            $(".oneDian").show();
            $(".dian").show();
            console.log(currentIndex + "-----" + typeof (length - 3))
        }
        if (currentIndex >= length - 3) {
            $(".dian").hide();
        } else if (currentIndex == 4) {
            $(".oneDian").hide();
        }

        if (currentIndex > 1 && currentIndex <= length) {
            $(".leftBtn").show();
        }

        /**
         * 如果直接点击1的话让...消失
         */
        if (currentIndex == 1) {
            $(".leftBtn").hide();
            $(".oneDian").hide();
            $(".page_container a").eq(currentIndex-1).show();
        }

        if (currentIndex != length) {
            $(".rightBtn").show();
        }
        if (currentIndex == length) {
            $(".rightBtn").hide();
        }

        createPaging((parseInt(this.innerText) - 1) * 30, parseInt(this.innerText) * 30);
    });
}

