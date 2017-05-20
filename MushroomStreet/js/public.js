/**
 * 改变数组的原型（去重）
 * @returns {Array}
 */
Array.prototype.removeDuplicate = function () {
    var n = [];
    for (var i = 0; i < this.length; i++) {
        if (n.indexOf(this[i]) == -1) {
            n.push(this[i]);
        }
    }
    return n;
};

/**
 * 获取cookie
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

/**
 * 删除cookies
 */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function setCookie(key, value, path, date) {
    document.cookie = key + "=" + value + ";path=" + path + ";expires=" + date + ";"
}
function delectCookie(key, path) {
    document.cookie = key + "=asd;path=" + path + ";expires=" + new Date("1970-01-01") + ";";
}
function readCookie() {
    return document.cookie;
}

