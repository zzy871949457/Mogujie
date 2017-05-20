/**
 * 创建XMLHttpRequest对象
 * @param _method 请求方式: post||get
 * @param _url 远程服务器地址
 * @param _async 是否异步
 * @param _parameter 向服务器发送数据
 * @param _callBack 回调函数
 */
function parameterDeal(_parameter){
    var _sender="";
    if(_parameter instanceof Object){
        for(var k in _parameter){
            _sender+=k+"="+_parameter[k]+"&";
        }
        return _sender.replace(/\&$/g,"");
    }else{
        return _parameter;
    }
}
function createXMLHttpRequest(){
    try{
        return new window.XMLHttpRequest();
    }catch(e){
        try{
            return new ActiveXObject("MSXML2.XMLHTTP.6.0");
        }catch(e){
            try{
                return new ActiveXObject("MSXML2.XMLHTTP.3.0");
            }catch(e){
                try{
                    return new ActiveXObject("MSXML2.XMLHTTP");
                }catch(e){
                    try{
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    }catch(e){
                        throw new Error("该浏览器版本太低,已经被大部分市场淘汰,请升级!!!");
                        return;
                    }
                }
            }
        }
    }
}
function ajaxRequest(_method,_url,_async,_parameter,_callBack){
    var _ajax=createXMLHttpRequest();
    if(_ajax){
        _ajax.onreadystatechange=function(){
            if(_ajax.readyState==4 && _ajax.status==200){
                _callBack(_ajax.responseText);
            }
        }
        _ajax.open(_method,_url,_async);
        _ajax.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=utf-8");
        _ajax.send(parameterDeal(_parameter));
    }
}