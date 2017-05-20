
$(function () {
    var cookieArr = new Array();
    var numArr = new Array();
    /**
     * 从cookie里面获取数据
     */
    cookieArr = readCookie().match(/p\d+/g);
    try{

    numArr = readCookie().match(/p\d+=\d+/g).toString().replace(/p\d+=/g, "").split(",");
    }catch (e){

    }
    getData(cookieArr, numArr);
});

/**
 * 获取json数据
 */
function getData(cookieArr, numArr) {
    var s = 0;
    /**
     * 请求json数据
     */
    $.post("json/productDetails.json", function (data, textStatus) {
        if (textStatus == "success") {
            var con = "";
            if(cookieArr!=null){
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

        }

        var tBody = $("#t_body")[0];
        var head = $(".shop_header");
        var mit = $(".cart_mitem");


        //单价
        var dPrice = $("p.cart_bold");
        //总价
        var allPrice = $("#allPrice")[0];
        var zMoney = 0;
        //总数量
        var allNum = $("#allNum")[0];
        var zNum = 0;

        //小计
        var itemPrice = $(".xj");
        //条目的删除元素
        var itemDel = $(".deleteP");
        //所有小cb
        var cbs = $(".cbs");
        //top cb
        var topCb = $("#topAll")[0];
        //bottom cb
        var bottomCb = $("#bottomAll")[0];
        //  +
        var add = $(".cart_num_add");
        //  -
        var cut = $(".cart_num_reduce");
        // input
        var num = $(".cart_num_input");
        //全删
        var allDel = $("#cartRemoveChecked")[0];

        /**
         * 创建完成数据之后给删除按钮添加hover事件
         */
        delHover();

        /**
         * 点击删除键删除cookie和元素
         */
        itemClick(itemDel, cookieArr, tBody, head, mit);

        /**
         * cb的点击事件
         */
        cbClick(cbs, topCb, bottomCb, allPrice, allNum, zMoney, zNum, itemPrice, num);

        /**
         * 数量加减
         */
        numOfAddSub(add, cut, num, itemPrice, dPrice, cbs, zMoney, zNum, allPrice, allNum)

        /**
         * 全部删除的事件
         */
        allDelBtnEvent(allDel, cookieArr, head, mit);
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
 * 点击删除键删除cookie
 */
function itemClick(itemDelArr, cookieKey, tBody, head, mit) {
    for (var i = 0; i < itemDelArr.length; i++) {
        itemDelArr[i].index = i;
        itemDelArr[i].onclick = function () {
            //删除cookie
            delectCookie(cookieKey[this.index], "/");
            //删除元素
            head[this.index].style.display = "none";
            mit[this.index].style.display = "none";
        }
    }
}

/**
 * cb的点击事件
 * @param cbs     小CB
 * @param topCb     上面的全选按钮
 * @param bottomCb     下面的全选按钮
 * @param allPrice     总价元素
 * @param allNum     总数量元素
 * @param zMoney     总价变量
 * @param zNum     总数量变量
 * @param itemPrice     小计
 * @param num       input
 */
function cbClick(cbs, topCb, bottomCb, allPrice, allNum, zMoney, zNum, itemPrice, num) {
    /**
     * 当点击全选按钮的时候全部选中
     */
    topCb.onclick = function () {
        zMoney = 0;
        zNum = 0;
        for (var i = 0; i < cbs.length; i++) {
            if (topCb.checked) {
                cbs[i].checked = true;
                bottomCb.checked = true;

                zMoney += Number(itemPrice[i].innerText);
                zNum += Number(num[i].value);
                allPrice.innerText = zMoney;
                allNum.innerText = zNum;

            } else {
                cbs[i].checked = false;
                bottomCb.checked = false;
                allPrice.innerText = 0;
                allNum.innerText = 0;
            }
        }
    };
    bottomCb.onclick = function () {
        for (var i = 0; i < cbs.length; i++) {
            if (bottomCb.checked) {
                cbs[i].checked = true;
                topCb.checked = true;
            } else {
                cbs[i].checked = false;
                topCb.checked = false;
            }
        }
    };
    /**
     * 当全部选中的时候，点击商品的cb，则全选的cb也会消失
     */
    for (var j = 0; j < cbs.length; j++) {
        cbs[j].index = j;
        var onOff = true;
        cbs[j].onclick = function () {
            if (this.checked) {
                onOff = false;
                for (var k = 0; k < cbs.length; k++) {
                    if (cbs[k].checked == false) {
                        onOff = true;
                    }
                }
                if (onOff == false) {
                    topCb.checked = true;
                    bottomCb.checked = true;
                }

                /**
                 * 点击cb的时候获取数量和小计
                 */
                zMoney += Number(itemPrice[this.index].innerText);
                allPrice.innerHTML = "¥" + zMoney;
                zNum += Number(num[this.index].value);
                allNum.innerText = zNum;

            } else {

                topCb.checked = false;
                bottomCb.checked = false;

                zMoney -= Number(itemPrice[this.index].innerText);
                allPrice.innerHTML = "¥" + Math.round(zMoney);
                zNum -= num[this.index].value;
                allNum.innerText = zNum;

            }
        }
    }
}

/**
 * 数量加减
 * @param add    添加的元素
 * @param cut       删除的元素
 * @param num       input元素
 * @param itemPrice     小计元素
 * @param dPrice     单价元素
 * @param cbs     小cb集合
 * @param zMoney     总价变量
 * @param zNum     总数量变量
 * @param allPrice    总价
 * @param allNum    总数量
 */
function numOfAddSub(add, cut, num, itemPrice, dPrice, cbs, zMoney, zNum, allPrice, allNum) {

    console.log(zMoney)

    /**
     * --------
     */
    for (var i = 0; i < cut.length; i++) {
        cut[i].index = i;
        cut[i].onclick = function () {
            //获取当前的价
            zMoney = allPrice.innerText;
            zNum = allNum.innerText;


            if (num[this.index].value > 1) {
                num[this.index].value--;
            }
            itemPrice[this.index].innerText = Number(num[this.index].value * dPrice[this.index].innerText);

            /**
             * 如果当前的cb是点击状态，也要改变总价
             */
            if (cbs[this.index].checked == true) {
                zMoney -= itemPrice[this.index].innerText;
                zNum -= 1;
                allPrice.innerText = zMoney;
                allNum.innerText = zNum;
            }
        }
    }

    /**
     * ++++++++
     */
    for (var i = 0; i < add.length; i++) {

        add[i].index = i;
        add[i].onclick = function () {

            num[this.index].value++;
            itemPrice[this.index].innerText = Number(num[this.index].value * dPrice[this.index].innerText);

            //获取当前的价
            zMoney = Number(allPrice.innerText);
            zNum = Number(allNum.innerText);

            /**
             * 如果当前的cb是点击状态，也要改变总价
             */
            if (cbs[this.index].checked == true) {
                zMoney += Number(itemPrice[this.index].innerText);
                zNum += 1;
                allPrice.innerText = zMoney;
                allNum.innerText = zNum;
            }
        }
    }

}


function allDelBtnEvent(allDel, cookieArr, head, mit) {
    allDel.onclick = function () {
        for (var i = 0; i < cookieArr.length; i++) {
            try {
                delectCookie(cookieArr[i], "/")
            } catch (e) {

            }
            //删除元素
            head[i].style.display = "none";
            mit[i].style.display = "none";
        }
    }
}