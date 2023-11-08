<?php

namespace App\Data;

use App\Model\Comment;

require '../../../vendor/autoload.php';

$comment = new Comment();

//回應標頭
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Origin, Methods, Content-Type");

//確認資料格式有傳來，沒傳到設為無、刪除前後空白、特殊符
isset($_POST['first_time']) ? $first_time = trim($_POST['first_time']) : $first_time = '';
isset($_POST['last_time']) ? $last_time = trim($_POST['last_time']) : $last_time = '';
isset($_POST['search_content']) ? $search_content = trim($_POST['search_content']) : $search_content = '';

//取得所有指定搜尋留言
$return = $comment->searchTimeComment($search_content, $first_time, $last_time);

echo json_encode($return);
