<?php

$to = "feminagame@163.com"; //收件人  
$subject = "答提有奖"; //主题  


$message = "用户名:".$_GET['user']."手机号:".$_GET['phone']; //正文  



var $result = mail($to,$subject,$message);  
echo $result;

?>




