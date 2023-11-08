<?php

###################
# 使用者登入認證API
# Jone 2022-07
###################

namespace App\Data;

use App\Model\User;

require '../../../vendor/autoload.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


session_start();

//確認資料格式有傳來，沒傳到設為無、刪除前後空白、特殊符
isset($_POST['account']) ? $user_name = trim($_POST['account']) : $user_name = '';
isset($_POST['pass']) ? $user_password = trim($_POST['pass']) : $user_password = '';

$User = new User();

$return = $User->userLogin($user_name, $user_password);

header("Content-Type: application/json");
echo json_encode($return);
