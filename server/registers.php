<?php

  // 1. 接受前端传递来的参数
  $username = $_POST['username'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];

  
  $link = mysqli_connect('127.0.0.1', 'root', 'root', 'anli');
  $sql = "INSERT INTO `users` VALUES(NULL, '$username', '$password', '$nickname')";
  $res = mysqli_query($link, $sql);


    if($res){
        echo json_encode(array(
            "message" => "用户注册成功",
            "code" => 1,
          ));
    }else{
        echo json_encode(array(
            "message" => "用户注册失败",
            "code" => 0,
          ));
    }


//   3. 根据查询结果给前端返回一些信息
//   if (count($data)) {
//     // 表示有内容, 用户名密码对了
//     echo json_encode(array(
//       "message" => "用户登录成功",
//       "code" => 1,
//       "nickname" => $data[0]['nickname']
//     ));
//   } else {
//     // 表示没有内容, 用户名密码错误
//     echo json_encode(array(
//       "message" => "用户名密码错误",
//       "code" => 0
//     ));
//   }

?>
