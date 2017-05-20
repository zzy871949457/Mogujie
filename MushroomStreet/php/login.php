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



    function getSession(){
        $right=0;
        if (isset($_POST["user"]) && $_POST["user"] != null && $_POST["pwd"] != null && isset($_POST["pwd"])) {
            /**
             * mysqli("远程服务器的地址","Mysql的用户名","mysql的密码","数据库名称");
             * 127.0.0.1
             */
            $conn = new mysqli("127.0.0.1", "root", "", "UserCenter");
            mysqli_query($conn,"set character set 'utf8'");//读取数据时设置字符集编码utf-8
            mysqli_query($conn,'set names utf8');//写入数据时设置字符集编码为utf-8
            $rs = $conn->query("select * from personal where uName='".$_POST["user"]."' and pwd='"
            .$_POST["pwd"]."';");
            while ($row = $rs->fetch_assoc()) {
                $_SESSION["user"] = $row["uName"];
                $right=1;
            }
            $rs->close();
            $conn->close();
            if($right==1) {
                echo $_SESSION["user"];
            }else{
                echo "0";
            }
        }
    }
    function doPOST(){

        if(isset($_SESSION["user"])){
            if($_SESSION["user"]==null) {
                getSession();
            }else {
                echo $_SESSION["user"];
            }
        }else{
            getSession();
        }
    }
    doPOST();
?>



