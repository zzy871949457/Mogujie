<?php
/**
 * Created by PhpStorm.
 * User: Evil
 * Date: 2017/3/22
 * Time: 下午3:38
 */


/*
create database UserCenter DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
use UserCenter;
create table personal
(
    ID int(11) not null auto_increment,
    p_account char(50) not null comment '账号',
    p_secret char(128) not null comment '密码',
    p_mobile char(11) not null default '' comment '手机号',
    primary key (ID)
)engine=myisam;
*/


    header("Content-type:text/html;charset=utf-8");
    function doPost(){
        $success=0;
        if($_POST["uName"]!=null && $_POST["pwd"]!=null) {
            $conn = new mysqli("127.0.0.1", "root", "", "UserCenter");
            mysqli_query($conn, "set character set 'utf8'");//读取数据时将字符集编码强制规范为utf-8
            mysqli_query($conn, 'set names utf8');//写入数据时将字符集编码强制规范为utf-8
            $value = "'" . $_POST["uName"] . "','" . $_POST["pwd"] . "'";
            if ($conn->query("insert into personal (uName,pwd) values (" . $value . ");") ==
            true) {
                $success = 1;
            }
            $conn->close();
        }
        echo $success;
    }
    doPost();
?>



