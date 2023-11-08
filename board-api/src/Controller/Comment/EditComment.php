<?php

namespace App\Data;

use App\Model\Comment;

require '../../../vendor/autoload.php';

//回應標頭
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_start();

//確認資料格式有傳來，沒傳到設為無、刪除前後空白、特殊符
isset($_POST['id']) ? $comment_id = trim($_POST['id']) : $comment_id = '';
isset($_POST['title']) ? $comment_title = trim($_POST['title']) : $comment_title = '';
isset($_POST['content']) ? $comment_content = trim($_POST['content']) : $comment_content = '';

$comment = new Comment();

$return = [];

//取得編輯留言的回應，成功或失敗原因
if (isset($_SESSION["User-Id"])) {
    $return = $comment->editComment($comment_id, $comment_title, $comment_content);
} else {
    $return = [
        "event" => "編輯訊息",
        "status" => "error",
        "content" => "編輯失敗，請先登入",
    ];
}

header("Content-Type: application/json");
echo json_encode($return);
