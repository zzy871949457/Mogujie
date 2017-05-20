/**
 * 创建整体布局
 */
function createHTML(index, sideBg, topTitle, leftBlockGround) {
    $(".select").append("<div class='module_row'><div class='wrap'><div" +
        " class='top_element'><div class='sideIcon' style='background:" + sideBg[index] + "'></div><div" +
        " class='titleName'>" + topTitle[index] + "</div><div" +
        " class='linkBox'></div></div><div" +
        " class='bottom_content'><div style='background:" + leftBlockGround[index] + "' class='leftBlock" +
        " fl'><div class='hot'></div><a href='###' class='txtContent'></a></div><div class='centerBlock" +
        " fl'><div class='picBlock'></div></div></div><div class='rightRec fl'></div></div></div>")
}
/**
 * 创建topLink
 */
function createTopLink(index, topLink) {
    for (var i = 0; i < topLink[index].length; i++) {
        $(".linkBox").eq(index).append("<a href='###' class='topLink'>" + topLink[index][i] + "</a>|")
    }
}
/**
 * 创建热搜
 */
function createHot(index, hot) {
    for (var i = 0; i < hot[index].length; i++) {
        $(".hot").eq(index).append("<a href='###' class='hotWord'>" + hot[index][i] + "</a>")
    }
}
/**
 * 创建文本部分内容
 */
function createTextContent(index, leftBigTitle, leftSmallTitle, leftImg) {
    $(".txtContent").eq(index).append("<div class='bigTitle'>" + leftBigTitle[index] + "</div><div" +
        " class='smallTitle'>" + leftSmallTitle[index] + "</div><div class='bigImg'><img class='publicImg'" +
        " src='" + leftImg[index] + "'></div>")
}
/**
 * 创建中间区域
 */
function createBlock(index, centerBlock) {
    for (var i = 1; i <= 6; i++) {
        $(".picBlock").eq(index).append("<a href='###' class='pic_item'><div class='bigTitle'>" + centerBlock[index][i]["bigTitle"] + "</div><div class='smallTitle'>" + centerBlock[index][i]["smallTitle"] + "</div><div class='picBox'><img class='publicImg' src='" + centerBlock[index][i]["img"] + "'/></div></a>")
    }
}

$(function () {
    /**
     * 获取json数据
     */
    $.post("json/module.json", function (data) {
        var sideColor = new Array();
        var topTitle = new Array();
        var topLink = new Array();
        var leftBlockGround = new Array();
        var hot = new Array();
        var leftBigTitle = new Array();
        var leftSmallTitle = new Array();
        var leftImg = new Array();
        var centerBlock = new Array();
        for (var k in data) {
            sideColor.push(data[k]["side"]);
            topTitle.push(data[k]["top"]["title"]);
            topLink.push(data[k]["top"]["link"]);
            leftBlockGround.push(data[k]["leftBlock"]["background"]);
            hot.push(data[k]["hot"]);
            leftBigTitle.push(data[k]["leftBlock"]["bigTitle"]);
            leftSmallTitle.push(data[k]["leftBlock"]["smallTitle"]);
            leftImg.push(data[k]["leftBlock"]["img"]);
            centerBlock.push(data[k]["centerBlock"]);
        }

        for (var i = 0; i < hot.length; i++) {
            createHTML(i, sideColor, topTitle, leftBlockGround);
            createTopLink(i, topLink);
            createHot(i, hot);
            createTextContent(i, leftBigTitle, leftSmallTitle, leftImg);
            createBlock(i, centerBlock);
        }

        /**
         * 获取右侧推荐数据
         */
        function getRightData() {

            $.post("json/module-right.json", function (data) {
                var arrImg = new Array();
                var arrDesc = new Array();
                var arrPrice = new Array();
                var img = "";
                for (var k in data) {
                    arrImg.push(data[k]["img"]);
                    arrDesc.push(data[k]["desc"]);
                    arrPrice.push(data[k]["price"]);
                }
                function setImg(s) {
                    for (var i = 0; i < 4; i++) {
                        $(".rightBlock:eq(" + s + ") img").eq(i).attr("src", "images/" + arrImg[s][i])
                    }
                }

                function setDesc(s) {
                    for (var i = 0; i < 4; i++) {
                        $(".rightBlock:eq(" + s + ") .goodsDesc").eq(i).html(arrDesc[s][i])
                    }
                }

                function setPrice(s) {
                    for (var i = 0; i < 4; i++) {
                        $(".rightBlock:eq(" + s + ") .goodsPrice").eq(i).html(arrPrice[s][i])
                    }
                }

                $(".rightRec").eq(0).load("publicStyle/module_rightRecommend_style.html", function () {
                    setImg(0);
                    setDesc(0);
                    setPrice(0);
                });
                $(".rightRec").eq(3).load("publicStyle/module_rightRecommend_style.html", function () {
                    setImg(1);
                    setDesc(1);
                    setPrice(1);
                });
                $(".rightRec").eq(4).load("publicStyle/module_rightRecommend_style.html", function () {
                    setImg(2);
                    setDesc(2);
                    setPrice(2);
                });
                $(".rightRec").eq(5).load("publicStyle/module_rightRecommend_style.html", function () {
                    setImg(3);
                    setDesc(3);
                    setPrice(3);
                });
                $(".rightRec").eq(6).load("publicStyle/module_rightRecommend_style.html", function () {
                    setImg(4);
                    setDesc(4);
                    setPrice(4);
                });
                $(".rightRec").eq(7).load("publicStyle/module_rightRecommend_style.html", function () {
                    setImg(5);
                    setDesc(5);
                    setPrice(5);
                });
                $(".rightRec").eq(10).load("publicStyle/module_rightRecommend_style.html", function () {
                    setImg(6);
                    setDesc(6);
                    setPrice(6);
                });
                $(".rightRec").eq(11).load("publicStyle/module_rightRecommend_style.html", function () {
                    setImg(7);
                    setDesc(7);
                    setPrice(7);
                });
                $(".rightRec").eq(12).load("publicStyle/module_rightRecommend_style.html", function () {
                    setImg(8);
                    setDesc(8);
                    setPrice(8);
                });
            });
        }

        getRightData();
        /**
         * 获取品牌推荐数据
         */
        function getBrandData() {
            $.post("json/module-brand.json", function (data) {
                var imgData = new Array();
                for (var k in data) {
                    imgData.push(data[k])
                }
                function setImg(s) {
                    for (var i = 0; i < 8; i++) {
                        // console.log($(".brandBlock:eq(" + s + ") img").eq(i).attr("src", "images/" + imgData[s][i]))
                    }
                }

                $(".rightRec").eq(1).load("publicStyle/module_brandRecommend_style.html", function () {
                    setImg(0);
                });
                $(".rightRec").eq(2).load("publicStyle/module_brandRecommend_style.html", function () {
                    setImg(1);
                });
                $(".rightRec").eq(8).load("publicStyle/module_brandRecommend_style.html", function () {
                    setImg(2);
                });
                $(".rightRec").eq(9).load("publicStyle/module_brandRecommend_style.html", function () {
                    setImg(3);
                });
                $(".rightRec").eq(13).load("publicStyle/module_brandRecommend_style.html", function () {
                    setImg(4);
                });
            })
        }
        getBrandData();

        $(window).scroll(function () {
            /**
             * 楼梯
             */
            $(".module_row").each(function () {
                var index = $(this).index();
                var _height = $(this).offset().top + $(this).outerHeight() / 2;
                var _top = $(window).scrollTop();
                if (_height >= _top) {
                    $(".leftNav .nav-item").eq(index).addClass("nav-item-show").siblings().removeClass("nav-item-show");
                    return false;
                }
            });
        });
        $(".leftNav a").click(function () {
            var index = $(this).index();
            var top = $(".module_row").eq(index).offset().top - 70;
            $("body,html").animate({scrollTop: top})
            $(this).addClass("nav-item-show").siblings().removeClass("nav-item-show");
        });
    })
});
