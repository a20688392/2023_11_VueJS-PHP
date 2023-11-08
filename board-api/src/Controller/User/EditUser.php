<?php

namespace App\Data;

use App\Model\User;

require '../../../vendor/autoload.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

//確認資料格式有傳來，沒傳到設為無、刪除前後空白、特殊符
isset($_POST['account']) ? $account = trim($_POST['account']) : $account = '';
isset($_POST['email']) ? $email = trim($_POST['email']) : $email = '';
isset($_POST['intro']) ? $intro = trim($_POST['intro']) : $intro = '';
isset($_POST['pass']) ? $pass = trim($_POST['pass']) : $pass = '';
isset($_POST['pass_check']) ? $pass_check = trim($_POST['pass_check']) : $pass_check = '';

session_start();

$User = new User();

$return = $User->editUser($account, $email, $intro, $pass, $pass_check);

session_unset();

header("Content-Type: application/json");
echo json_encode($return);
