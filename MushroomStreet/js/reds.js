$(function () {
    $.post("json/reds.json", function (data) {
        var timer = 0;
        //存放图片地址
        var arrImg = new Array();
        //存放图片文本
        var arrTxt = new Array();
        var arrIndex = new Array();
        for (var k in data) {
            arrImg.push(data[k]["01"]);
            arrTxt.push(data[k]["02"]);
        }
        // var arr15 = getRandom(15);
        // 5 个 1 - 15 随机数，初始化创建图片
        var arr = getRandom(5);
        for (var i = 0; i < arr.length; i++) {
            $("#content_left").append('<div class="content_item fl"><a href="###" class="item_a"><div' +
                ' class="item_a_txt">' + arrTxt[arr[i]] + '</div><img' + ' src=' + arrImg[arr[i]] + '/></a></div>');
        }
        //自动随机旋转
        function play() {
            var arr = getR(1);
            timer = setInterval(function () {
                console.log("ok")
            }, 4000)
        }

        // play();


        function sss() {
            var itemLength = $("#content_left .content_item").length;
            var index = 0;
            var suiji = Math.floor(Math.random() * 15);
            for (var l = 0; l < itemLength; l++) {
                // TODO 判断当前随机的图片和文字是否与已出现的相同，有就话重新随机
                if (arrTxt[arr[suiji]] == arrTxt[arr[l]] || arrImg[arr[suiji]] == arrImg[arr[l]]) {
                    suiji = Math.floor(Math.random() * 15);
                    sss();
                } else {
                    $("#content_left .content_item").eq(l).click(function () {
                        index = $(this).index();
                        $("#content_left .content_item:eq(" + index + ") .item_a_txt").animate({
                            "width": "0px",
                            "margin-left": "35%"
                        }, 300, function () {
                            $("#content_left .content_item:eq(" + index + ") .item_a_txt").animate({
                                "width": "120px",
                                "margin-left": "0"
                            }).text(arrTxt[suiji]);
                        });
                        $("#content_left .content_item:eq(" + index + ") img").animate({
                            "width": "0px",
                            "margin-left": "50%",
                            "height": "100%"
                        }, 300, function () {
                            $("#content_left .content_item:eq(" + index + ") img").animate({
                                "width": "182px",
                                "margin-left": "0"
                            }).attr('src', arrImg[suiji])
                        });
                        // console.log(suiji);
                        suiji = Math.floor(Math.random() * 15);
                        if (arrTxt[arr[suiji]] == arrTxt[arr[index]]) {
                            suiji = Math.floor(Math.random() * 15);
                        }
                    });
                }
            }
        }
        sss();

        /**
         * 获取1-15以内的n个不一样的随机数
         * @returns {Array}
         */
        function getRandom(n) {
            var arrImgIndex = new Array();
            while (true) {
                arrIndex.push(Math.floor(Math.random() * 15));
                arrImgIndex = arrIndex.removeDuplicate();
                if (arrImgIndex.length == n) {
                    return arrImgIndex;
                }
            }
        }

        /**
         * 生成5个1-5随机数
         */
        function getR(x) {
            var arr = new Array();
            var arrImgI = new Array();
            while (true) {
                arr.push(Math.floor(Math.random() * 5));
                arrImgI = arr.removeDuplicate();
                if (arrImgI.length == x) {
                    return arrImgI;
                }
            }
        }
    });

    /**
     * 效果
     */
    $("#one").click(function () {
        $("#one .item_a_txt").animate({
            "width": "5px",
            "margin-left": "35%"
        }, 300, function () {
            $("#one .item_a_txt").animate({
                "width": "120px",
                "margin-left": "0"
            }).text("大个子啊");
        });

        $("#one img").animate({
            "width": "10px",
            "margin-left": "50%",
            "height": "100%"
        }, 300, function () {
            $("#one img").animate({
                "width": "182px",
                "margin-left": "0"
            }).attr('src', 'images/a5.jpg')
        });
    });
});






