<?php
$to = "feminagame@qq.com"; //收件人  
$subject = "答题有奖活动"; //主题   13162080076
$message = "用户名:".$_GET['user']."手机号:".$_GET['phone']."地址:".$_GET['address']; //正文
echo mail($to, $subject, $message);

?> 





