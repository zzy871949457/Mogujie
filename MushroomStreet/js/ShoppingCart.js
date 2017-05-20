$(function () {
    var cookieArr = new Array();
    var numArr = new Array();
    /**
     * 从cookie里面获取数据
     */
    cookieArr = readCookie().match(/p\d+/g);
    numArr = readCookie().match(/p\d+=\d+/g).toString().replace(/p\d+=/g, "").split(",");
    getData(cookieArr, numArr);
});

/**
 * 获取json数据
 */
function getData(cookieArr, numArr) {
    var key = new Array();
    var s = 0;
    /**
     * 请求json数据
     */
    $.post("json/productDetails.json", function (data, textStatus) {
        if (textStatus == "success") {
            var con = "";
            for (var i = 0; i < cookieArr.length; i++) {
                s++;
                con += '<tr class="shop_header"><td' +
                    ' class="cart_group_head"><a href="###" class="cart_bold">' + data[cookieArr[i]]["store"]["s_name"] + '</a></td></tr><tr' +
                    ' class="cart_mitem"><td class="vm"><input type="checkbox"' +
                    ' class="cart_thcheck cbs"/></td><td' +
                    ' class="cart_table_goods_wrap"><a href="###" class="cart_goods_img"><img' +
                    ' src="' + data[cookieArr[i]]["p_mainImg"] + '"/></a><a' +
                    ' href="###" class="cart_goods_t">' + data[cookieArr[i]]["p_describe"] + '</a></td><td><p' +
                    ' class="cart_lh20">颜色：' + data[cookieArr[i]]["p_param"]["color"] + '</p><p' +
                    ' class="cart_lh20">尺码：' + data[cookieArr[i]]["p_size"]["s"] + '</p></td><td' +
                    ' class="cart_alcenter"><p class="cart_lh20 cart_throughline cart_lightgray">' + data[cookieArr[i]]["p_price"] + '</p><p class="cart_lh20 cart_bold">' + data[cookieArr[i]]["p_sales_price"] + '</p></td><td class="cart_alcenter"><div class="cart_num"><input type="text" value="1" class="cart_num_input cart_bold"/><span class="cart_num_add"></span><span class="cart_num_reduce"></span></div></td><td class="cart_alcenter"><p class="xj">' + data[cookieArr[i]]["p_sales_price"] + '</p></td><td class="cart_alcenter"><a href="###" class="deleteP">删除</a></td></tr>'
            }
            $("tbody").append(con);
        }
        var zMoney = 0;
        var zNum = 0;
        console.log($("#allNum")[0])
        /**
         * 创建完成数据之后给删除按钮添加hover事件
         */
        delHover();
        /**
         * 设置初始的数量
         */
        setNum($(".cart_num_input"), numArr);

        /**
         * 增加和减少数据，改变cookie
         */
        addAndCut($(".cart_num_add"), $(".cart_num_reduce"), $(".cart_num_input"), $(".vm .cbs"), zMoney, zNum);

        /**
         * checked的点击
         */
        setCheckedEvent(zMoney, zNum, s, $("#topAll")[0], $("#bottomAll")[0], $(".vm .cbs"), $(".xj"), $("#allPrice")[0], $(".cart_num_input"), $("#allNum")[0]);

    });
}

/**
 * 创建完成数据之后给删除按钮添加hover事件
 */
function delHover() {
    $("#cartRemoveChecked").hover(function () {
        $(this).css({
            "text-decoration": "underline"
        })
    }, function () {
        $(this).css({
            "text-decoration": "none"
        })
    });
    $(".cart_mitem .deleteP").on("mouseover mouseout", function () {
        if (event.type == "mouseover") {
            //鼠标悬浮
            $(this).css({
                "text-decoration": "underline"
            })
        } else if (event.type == "mouseout") {
            //鼠标离开
            $(this).css({
                "text-decoration": "none"
            })
        }
    });
}

/**
 * 设置初始的购买数量
 */
function setNum(objArr, numArr) {
    for (var i = 0; i < numArr.length; i++) {
        objArr.eq(i).val(numArr[i])
    }
}

/**
 * 增加和减少数据，改变cookie
 */
function addAndCut(addObj, cutObj, numObj, cbs, zMoney, zNum) {
    for (var i = 0; i < addObj.length; i++) {
        // 点击add
        addObj[i].index = i;
        addObj[i].onclick = function () {
            numObj[this.index].value++;

            /**
             * 改变cookie的value值
             */
            // setCookie(key[this.index], numObj[this.index].value, "/", new Date(new Date().getTime() + 7 * 24 * 3600000));

            /**
             * 改变价格
             */
            console.log($(".xj").eq(this.index).html());//价格
            console.log($("input.cart_bold").eq(this.index).val());//input
            console.log($("p.cart_bold").eq(this.index).html());//单价
            $(".xj").eq(this.index).html(Number($("input.cart_bold").eq(this.index).val()) * Number($("p.cart_bold").eq(this.index).html()));
            /**
             * 判断如果当前单选框选中了，要改变总价的值
             */
            if (cbs[this.index].checked == true) {
                zMoney+=Number($("p.cart_bold").eq(this.index).html());
            }

        };

        // 点击cut
        cutObj[i].index = i;
        cutObj[i].onclick = function () {
            numObj[this.index].value--;
            // setCookie(key[this.index], numObj[this.index].value, "/", new Date(new Date().getTime() + 7 * 24 * 3600000));
            $(".xj").eq(this.index).html(Number($("input.cart_bold").eq(this.index).val()) * Number($("p.cart_bold").eq(this.index).html()));
            if (numObj[this.index].value <= 1) {
                return;
            }
        }
    }
}

/**
 * checked的点击
 */
function setCheckedEvent(zMoney, zNum, s, top, bottom, cbs, xjs, allPrice, pNum, allNum) {

    /**
     * 当一进来不点全选的时候，点满商品的cb，全选也会跟着选中
     */
    for (var i = 0; i < s; i++) {
        cbs[i].index = i;
        cbs[i].onclick = function () {
            if (this.checked == true) {
                //获取价格，和件数
                zMoney += Number(xjs[this.index].innerText);
                allPrice.innerText = "¥" + Math.round(zMoney);
                zNum += Number(pNum[this.index].value);
                allNum.innerText = zNum;
            } else {
                //减去价格，和件数
                zMoney -= Number(xjs[this.index].innerText);
                allPrice.innerText = "¥" + Math.round(zMoney);
                zNum -= Number(pNum[this.index].value);
                allNum.innerText = zNum;
            }
        }
    }
}
 
 