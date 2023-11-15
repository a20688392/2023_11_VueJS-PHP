<?php

namespace App\Data;

use App\Model\Comment;

require '../../../vendor/autoload.php';

$comment = new Comment();

//回應標頭
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_start();

//取得自身留言的回應，成功或失敗原因
if (isset($_SESSION["User-Id"])) {
    $return = $comment->getSelfComment($_SESSION["User-Id"]);
} else {
    $return = [
        "event" => "編輯訊息",
        "status" => "error",
        "content" => "編輯失敗，請先登入",
    ];
}

header("Content-Type: application/json");
echo json_encode($return);
