$(function () {
    $.post("json/nav.json", function (data) {
        //存放li数量的数组
        var dl1 = new Array();
        var arrLi = new Array();
        for (var k in data) { arrLi.push(data[k]); }
        /**
         * 创建li
         */
        for (var i = 0; i < arrLi.length; i++) {
            $(".nav_list").append("<li class='nav_li'><dl class='nav_wrap'><dt" +
                " class='nav_title'><a href='###'>" + arrLi[i]["n_type"]["name"] + "</a></dt><dd class='nav_content'><span" +
                " class='nav_content_span'><a href='###'>" + arrLi[i]["n_showName"]["s1"]["name"] + "</a><a" +
                " href='###'>" + arrLi[i]["n_showName"]["s2"]["name"] + "</a><a" +
                " href='###'>" + arrLi[i]["n_showName"]["s3"]["name"] + "</a></span></dd></dl><div" +
                " class='nav_more_content'><div class='showContent'><div" +
                " class='leftContent'><h2 class='left_head'><a href='###'>" + arrLi[i]["n_type"]["name"] + "</a></h2><dl class='left_dl'><dt class='left_dt'><a href='###'>" + arrLi[i]["n_showInfo"]["1"]["01"] + "</a></dt><dd class='left_dd dd1'></dd></dl><dl class='left_dl'><dt class='left_dt'><a href='###'>" + arrLi[i]["n_showInfo"]["2"]["01"] + "</a></dt><dd class='left_dd dd2'></dd></dl><dl class='left_dl'><dt class='left_dt'><a href='###'>" + arrLi[i]["n_showInfo"]["3"]["01"] + "</a></dt><dd class='left_dd dd3'></dd></dl><dl class='left_dl last_dl'><dt class='left_dt'><a href='###'>品牌推荐</a></dt><dd class=''><div class='logo_wrap'><a href='###' class='logo-wrap-anchor'><img src='images/upload_5iaf9241k9ci5eacg60j3e0ki4113_54x54.jpg_200x9999.v1c7E.70.webp.jpg'/></a></div><div class='logo_wrap'><a href='###' class='logo-wrap-anchor'><img src='images/upload_67gg5bb4ha88d2k032bl09173jkgi_54x54.jpg_200x9999.v1c7E.70.webp.jpg'/></a></div><div class='logo_wrap'><a href='###' class='logo-wrap-anchor'><img src='images/upload_5ll1l317972l963a3lhi2334akcje_54x54.jpg_200x9999.v1c7E.70.webp.jpg'/></a></div><div class='logo_wrap'><a href='###' class='logo-wrap-anchor'><img src='images/upload_73c36k73jf91k9b67ed83g7jlbl5a_54x54.jpg_200x9999.v1c7E.70.webp.jpg'/></a></div></dd></dl></div><div class='rightContent'><h2" +
                " class='right_head_h2'>为你推荐</h2><h3" +
                " class='right_head_h3'>根据你购买浏览记录专门推荐</h3><img src='images/187919865_00i08hf242k959dj85h6dlda8igi4_646x652.png_750x999.jpg'/><img src='images/187919865_0dj123e014cl717hkj997fd4j1b29_640x960.png_100x100.jpg'/><img src='images/187919865_0kc99dld2ah1kefgilj7gf0hl63ie_640x960.png_100x100.jpg'/><img src='images/187919865_5ca91f7k8kc3ie9842d0ki46530i8_661x660.png_750x999.jpg'/><img src='images/187919865_1i731ec20hedi0i6ac4ck8f0d2602_652x652.png_750x999.jpg'/><img src='images/187919865_3fe5g1fe7hhbc17dihg27901l67cc_663x662.png_750x999.jpg'/></div></div></div></div></li>");
            for (var k in arrLi[i]["n_showInfo"]["1"]["02"]) {
                dl1.push(arrLi[i]["n_showInfo"]["1"]["02"][k]["name"]);
            }
        }

        var li = $(".nav_li"); //长度是14
        var content = $(".nav_more_content");
        var showContent = $(".showContent");

        /**
         * 获取每一个dd下面A的值
         * @param n
         * @param m
         * @returns {Array}
         */
        function getDDa(n, m) {
            var s = new Array();
            if (m < 1) { m = 1 }
            for (var r in arrLi[n]["n_showInfo"][m]["02"]) {
                s.push(arrLi[n]["n_showInfo"][m]["02"][r]["name"]);
            }
            return s;
        }

        /**
         * 创建第一个DD下面的A标签
         * @param x
         * @param y
         * @param z
         */
        function createDD1A(x,y,z) {
            for (var g = 0; g < getDDa(y, z).length; g++) {
                $(".dd1").eq(x).append("<a class='left_dd_a'>"+getDDa(y,z)[g]+"</a>")
            }
        }
        for(var f = 0; f < $(".dd1").length;f++){
            createDD1A(f,f,1);
        }

        /**
         * 创建第二个DD下面的A标签
         * @param x
         * @param y
         * @param z
         */
        function createDD2A(x,y,z) {
            for (var g = 0; g < getDDa(y, z).length; g++) {
                $(".dd2").eq(x).append("<a class='left_dd_a'>"+getDDa(y,z)[g]+"</a>")
            }
        }
        for(var e = 0; e < $(".dd2").length;e++){
            createDD2A(e,e,2);
        }

        /**
         * 创建第三个DD下面的A标签
         * @param x
         * @param y
         * @param z
         */
        function createDD3A(x,y,z) {
            for (var g = 0; g < getDDa(y, z).length; g++) {
                $(".dd3").eq(x).append("<a class='left_dd_a'>"+getDDa(y,z)[g]+"</a>")
            }
        }
        for(var q = 0; q < $(".dd3").length;q++){
            createDD3A(q,q,3);
        }

        /**
         * 鼠标移动事件
         */
        for (var s = 0; s < li.length; s++) {
            li[s].index = s;
            li[s].onmouseover = function () {
                content[this.index].style.display = "block";
                showContent[this.index].style.display = "block";
            };
            li[s].onmouseout = function () {
                content[this.index].style.display = "none";
                showContent[this.index].style.display = "none";
            };
        }
    });
});