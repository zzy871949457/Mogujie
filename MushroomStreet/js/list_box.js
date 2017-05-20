/**
 * 获取数据
 */
function getData() {
    $.post("json/list.json", function (data, textStatus) {
        if (textStatus == "success") {
            var jsonArr = new Array();
            for (var k in data) {
                var lis = "";
                var content = "";
                jsonArr.push(data[k]);

                /**
                 * 创建nav_list内容 并添加到nav_list
                 */
                createNavList(lis, data[k]);
                $(".nav_list li").eq(0).addClass("on");

                /**
                 * 创建goodsList内容 并添加到sp_content
                 */
                createSpTypeNav(content, data[k]);
                $(".goodsList").eq(0).css({display: "block"})
            }

            /**
             * 创建type_section 放入type_sections
             */
            for (var i = 0; i < $(".goodsList").length; i++) {
                var section = "";
                createSection(section, jsonArr, i);
            }

            /**
             * 创建ul下面的li
             */
            for (var i = 0; i < $(".nav_list li").length; i++) {
                createLis(i, 1, jsonArr);
                createLis(i, 2, jsonArr);
                createLis(i, 3, jsonArr);
                createLis(i, 4, jsonArr);
            }

            /**
             * 点击事件切换下面的内容
             */
            clickTab();
        }
    })
}

/**
 * 创建nav_list内容 并添加到nav_list
 */
function createNavList(li, json) {
    li += '<li><a href="###">' + json["name"] + '</a></li>'
    $(".nav_list").append(li);
}

/**
 * 创建goodsList内容 并添加到sp_content
 */
function createSpTypeNav(con, json) {
    con = '<div class="goodsList"><a href="###" class="right_img"><img src="images/list/' + json["images"] + '"/></a><div class="type_sections"></div></div>';
    $(".sp_content").append(con)
}

/**
 * 创建type_section 放入type_sections
 */
function createSection(con, jsonArr, i) {
    con += '<div class="type_section first"><dt><a href="###">' + jsonArr[i]["list"]["1"]["title"] + '</a></dt><dd><a class="cat_img" href="###"><img src="images/list/' + jsonArr[i]["list"]["1"]["img"] + '"/></a><ul></ul></dd></div><div class="type_section first"><dt><a href="###">' + jsonArr[i]["list"]["2"]["title"] + '</a></dt><dd><a class="cat_img" href="###"><img src="images/list/' + jsonArr[i]["list"]["2"]["img"] + '"/></a><ul></ul></dd></div><div class="type_section first"><dt><a href="###">' + jsonArr[i]["list"]["3"]["title"] + '</a></dt><dd><a class="cat_img" href="###"><img src="images/list/' + jsonArr[i]["list"]["3"]["img"] + '"/></a><ul></ul></dd></div><div class="type_section first"><dt><a href="###">' + jsonArr[i]["list"]["4"]["title"] + '</a></dt><dd><a class="cat_img" href="###"><img src="images/list/' + jsonArr[i]["list"]["4"]["img"] + '"/></a><ul></ul></dd></div>'
    $(".type_sections").eq(i).append(con)
}

/**
 * 点击事件切换下面的内容
 */
function clickTab() {
    var txt = "";
    $(".nav_list li").on("click", function () {
        var index = $(this).index()
        $(".nav_list li").eq(index).addClass("on").siblings().removeClass("on");
        $(".sp_content .goodsList").eq(index).show().siblings().hide();

        /**
         * 改变h3文本
         */
        txt = $(".nav_list a").eq(index).html();
        $("#category_all").html(txt);
    })
}

/**
 * 创建ul下面的li
 */
function createLis(a, b, arr) {
    var con = "";
    for (var i = 0; i < arr[a]["list"][b]["list"].length; i++) {
        con += '<li><a href="###">' + arr[a]["list"][b]["list"][i] + '</a></li>'
    }
    $(".type_sections:eq(" + a + ") .type_section ul:eq(" + (b - 1) + ")").append(con)
}







