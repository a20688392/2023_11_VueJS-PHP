<?php

namespace App\Data;

use App\Model\User;

require '../../../vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Origin, Methods, Content-Type");

//確認資料格式有傳來，沒傳到設為無、刪除前後空白、特殊符
isset($_POST['account']) ? $account = trim($_POST['account']) : $account = '';
isset($_POST['email']) ? $email = trim($_POST['email']) : $email = '';
isset($_POST['pass']) ? $pass = trim($_POST['pass']) : $pass = '';
isset($_POST['pass_check']) ? $pass_check = trim($_POST['pass_check']) : $pass_check = '';

$User = new User();

$return = $User->addUser($account, $email, $pass, $pass_check);

header("Content-Type: application/json");
echo json_encode($return);
