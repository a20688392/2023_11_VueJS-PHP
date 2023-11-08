<?php

###################
# 找出使用者API
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

$User = new User();

$return = [];

if (isset($_SESSION["User-Id"])) {
    $return = $User->findUser($_SESSION["User-Id"]);
} else {
    $return = [
        "user_id" =>  '',
    ];
}

header("Content-Type: application/json");
echo json_encode($return);
