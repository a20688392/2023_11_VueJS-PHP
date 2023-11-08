<?php

namespace App\Data;

use App\Model\Comment;

require '../../../vendor/autoload.php';

$comment = new Comment();

//回應標頭
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Origin, Methods, Content-Type");

//取得所有留言
$data = $comment->getAllComment();

$return = [
    "statement" => $data,
];

header("Content-Type: application/json");
echo json_encode($return);
