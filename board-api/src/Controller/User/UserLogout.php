<?php

###################
# 使用者登出API
# Jone 2022-07
###################

namespace App\Data;

require '../../../vendor/autoload.php';

header("Access-Control-Allow-Origin: http://192.168.56.1:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_start();

session_unset();
$return = [
    "event" => "登出訊息",
    "status" => "success",
    "content" => "登出成功",
];

header("Content-Type: application/json");
echo json_encode($return);
