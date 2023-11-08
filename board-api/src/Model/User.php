<?php

###################
# 使用者的處理函式
# Jone 2022-07
###################

namespace App\Model;

use App\Config\Database;
use PDO;
use Exception;
use PDOException;

class User
{
    /**
     * 進行與資料庫的初始連線
     * 回傳連線
     *
     * @return  PDO         $db     資料庫的連線
     * @throws  Exception   $e      回應錯誤訊息
     */
    public function dbConnect()
    {
        $db_type = Database::DATABASE_INFO['db_type'];
        $db_host = Database::DATABASE_INFO['db_host'];
        $db_name = Database::DATABASE_INFO['db_name'];
        $db_user = Database::DATABASE_INFO['db_user'];
        $db_pass = Database::DATABASE_INFO['db_pass'];
        $connect = $db_type . ":host=" . $db_host . ";dbname=" . $db_name;
        try {
            $db = new PDO($connect, $db_user, $db_pass);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $db->query("SET NAMES UTF8");
        } catch (PDOException $e) {
            die("Error!:" . $e->getMessage() . '<br>');
        }
        return $db;
    }
    /**
     * 尋找使用者
     *
     * @param   string      $id         使用者編號
     *
     * @throws  Exception   $e          回應錯誤訊息
     *
     * 有例外錯誤
     * 回傳 "未知錯誤"
     *
     * @return  array       $return     回傳使用者資訊
     */
    public function findUser($user_id)
    {
        $db = $this->dbConnect();
        $statement = $db->prepare("SELECT * FROM users WHERE `id`=?");
        $return = [];
        //沒有代表有人來亂
        try {
            $statement->execute([$user_id]);
            if ($statement->rowCount()) {
                $data = $statement->fetch(PDO::FETCH_ASSOC);
                $return = [
                    "account" => $data['account'],
                    "user_id" =>  $data['id'],
                    "email" => $data['email'],
                    "intro" => $data["intro"],
                ];
            } else {
                throw new Exception("未知錯誤");
            }
        } catch (PDOException $e) {
            $return = [
                "無此使用者",
            ];
        } catch (Exception $e) {
            $return = [
                $e->getMessage(),
            ];
        }
        return $return;
    }
    /**
     * 檢查信箱、使用者是否已註冊過
     *
     * @param   string  $account    使用者名
     * @param   string  $email      使用者信箱
     * @return  array
     * name_RESULT      為0 時，代表沒有被註冊過，1為有
     * email_RESULT     為0 時，代表沒有被註冊過，1為有
     */
    public function checkEmailName(string $account, string $email)
    {
        $db = $this->dbConnect();
        $sql = "SELECT IF( EXISTS(
                            SELECT account
                            FROM users
                            WHERE account = ?), 1, 0) as name_RESULT,
                        IF( EXISTS(
                            SELECT email
                            FROM users
                            WHERE email = ?), 1, 0) as email_RESULT;";
        $statement = $db->prepare($sql);
        $statement->execute([$account, $email]);
        return $statement->fetch(PDO::FETCH_ASSOC);
    }
    /**
     * 註冊使用者
     *
     * @param   string  $account        使用者名
     * @param   string  $email          使用者信箱
     * @param   string  $pass           使用者密碼
     * @param   string  $pass_check     使用者密碼確認
     *
     * @throws  Exception   $e          回應錯誤訊息
     *
     * $account、$email、$pass、$pass_check 之一未填
     * 回傳 "有欄位未填"
     *
     * $email FILTER_SANITIZE_EMAIL、FILTER_VALIDATE_EMAIL
     * 為true，代表信箱格是不合規定，
     * 回傳 "信箱格式錯誤" . "<br>" . "信箱範例：test@example.com"
     *
     * name_RESULT      為0 時，代表沒有被註冊過，1為有
     * 回傳 "使用者名已被註冊"
     *
     * email_RESULT     為0 時，代表沒有被註冊過，1為有
     * 回傳 "信箱已被註冊"
     * 同時都有回傳 "使用者名和信箱已被註冊"
     *
     * @return  array       $return     將回傳的 API 回應資訊，回傳成功 *                                  或者失敗
     */
    public function addUser(string $account, string $email, string $pass, string $pass_check)
    {
        $db = $this->dbConnect();
        $sql = "INSERT INTO `users`(`account`, `email`, `password`) VALUES (?,?,?)";
        $statement = $db->prepare($sql);
        $check = $this->checkEmailName($account, $email);
        $return = [];

        try {
            if (empty($account) || empty($email) || empty($pass) || empty($pass_check)) {
                throw new Exception("有欄位未填");
            }

            if ($pass !== $pass_check) {
                throw new Exception("密碼不一致");
            }

            //信箱
            //把值作為電子郵件地址來驗證
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new Exception("信箱格式錯誤" . "<br>" . "信箱範例：test@example.com");
            }

            if ($check['name_RESULT'] || $check['email_RESULT']) {
                if (($check['name_RESULT'] && $check['email_RESULT'])) {
                    throw new Exception("使用者名和信箱已被註冊");
                } elseif ($check['name_RESULT']) {
                    throw new Exception("使用者名已被註冊");
                } else {
                    throw new Exception("信箱已被註冊");
                }
            }
            $pass = password_hash($pass, PASSWORD_DEFAULT);
            if ($statement->execute([$account, $email, $pass])) {
                $return = [
                    "event" => "註冊成功",
                    "status" => "success",
                    "content" => "已註冊 # $account ，再請登入",
                ];
            } else {
                throw new Exception("未知錯誤" . $statement->errorInfo()[2]);
            }
        } catch (PDOException $e) {
            $return = [
                "event" => "註冊失敗",
                "status" => "error",
                "content" => "註冊失敗，原因： " . $e->getMessage(),
            ];
            http_response_code(500);
            return $return;
        } catch (Exception $e) {
            $return = [
                "event" => "註冊失敗",
                "status" => "error",
                "content" => "註冊失敗，原因： " . $e->getMessage(),
            ];
            http_response_code(400);
            return $return;
        }
        http_response_code(201);
        return $return;
    }
    /**
     * 編輯使用者資料
     *
     * @param   string  $account        使用者名
     * @param   string  $email          使用者信箱
     * @param   string  $intro          使用者簡介
     * @param   string  $pass           使用者密碼
     * @param   string  $pass_check     使用者密碼確認
     *
     * @throws  Exception   $e          回應錯誤訊息
     *
     * $account、$email、$pass、$pass_check 之一未填
     * 回傳 "有欄位未填"
     *
     * $email FILTER_SANITIZE_EMAIL、FILTER_VALIDATE_EMAIL
     * 為true，代表信箱格是不合規定，
     * 回傳 "信箱格式錯誤" . "<br>" . "信箱範例：test@example.com"
     *
     * name_RESULT      為0 時，代表沒有被註冊過，1為有
     * 回傳 "使用者名已被註冊"
     *
     * email_RESULT     為0 時，代表沒有被註冊過，1為有
     * 回傳 "信箱已被註冊"
     * 同時都有回傳 "使用者名和信箱已被註冊"
     *
     * @return  array       $return     將回傳的 API 回應資訊，回傳成功 *                                  或者失敗
     */
    public function editUser(
        string $account,
        string $email,
        string $intro,
        string $pass,
        string $pass_check
    ) {

        $return = [];
        try {
            if ($pass !== $pass_check) {
                throw new Exception("密碼不一致");
            }

            //信箱
            //把值作為電子郵件地址來驗證
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new Exception("信箱格式錯誤" . "<br>" . "信箱範例：test@example.com");
            }
            $data = [
                "account" => $account,
                "email" => $email,
            ];
            $user_id = $_SESSION["User-Id"];
            $user_data = $this->findUser($user_id);
            $check_data = [];
            foreach ($data as $key => $value) {
                if ($value !== $user_data[$key]) {
                    $check_data[$key] = $value;
                } else {
                    $check_data[$key] = "";
                }
            }
            // return $check_data;
            $check = $this->checkEmailName($check_data['account'], $check_data['email']);
            // return $check;
            $db = $this->dbConnect();
            $sql = "UPDATE `users` SET `account`=?, `email`=?, `intro`=?, `password`=? WHERE `id` = ?";
            $statement = $db->prepare($sql);

            if ($check['name_RESULT'] || $check['email_RESULT']) {
                if (($check['name_RESULT'] && $check['email_RESULT'])) {
                    throw new Exception("使用者名和信箱已被註冊");
                } elseif ($check['name_RESULT']) {
                    throw new Exception("使用者名已被註冊");
                } else {
                    throw new Exception("信箱已被註冊");
                }
            }
            $pass = password_hash($pass, PASSWORD_DEFAULT);
            if ($statement->execute([$account, $email, $intro, $pass, $user_id])) {
                $return = [
                    "event" => "修改成功",
                    "status" => "success",
                    "content" => "已成功修改 # $account ，再請重新登入",
                ];
            } else {
                throw new Exception("未知錯誤" . $statement->errorInfo()[2]);
            }
        } catch (PDOException $e) {
            $return = [
                "event" => "修改失敗",
                "status" => "error",
                "content" => "修改失敗，原因： " . $e->getMessage(),
            ];
            http_response_code(500);
            return $return;
        } catch (Exception $e) {
            $return = [
                "event" => "修改失敗",
                "status" => "error",
                "content" => "修改失敗，原因： " . $e->getMessage(),
            ];
            http_response_code(400);
            return $return;
        }
        http_response_code(201);
        return $return;
    }
    /**
     * 使用者登入
     *
     * @param   string  $account        使用者名
     * @param   string  $pass           使用者密碼
     *
     * @throws  Exception   $e          回應錯誤訊息
     *
     * $user_name、$user_email、$user_password 之一未填
     * 回傳 "有欄位未填"
     *
     * 密碼或帳號錯誤
     * 回傳 "帳號名或密碼錯誤"
     *
     * @return  array       $return     將回傳的 API 回應資訊，回傳成功 *                                  或者失敗
     */
    public function userLogin(string $account, string $pass)
    {
        $db = $this->dbConnect();
        $statement = $db->prepare("SELECT * FROM users WHERE `account`=?");
        $statement->execute([$account]);
        $return = [];
        try {
            if (empty($account) || empty($pass)) {
                throw new Exception("有欄位未填!!");
                //確認有沒有帳號
            }
            if (!$statement->rowCount()) {
                throw new Exception("帳號名或密碼錯誤");
            } else {
                $data = $statement->fetch(PDO::FETCH_ASSOC);
                $password_hash = $data['password'];
                $pass = password_verify($pass, $password_hash);

                if ($pass) {
                    // $md5_session_id = md5(session_id());
                    // $_SESSION["X-Session-Hash"] = $md5_session_id;
                    $_COOKIE['X-User-Id'] = $data['id'];
                    // $user_id = $data['id'];
                    $_SESSION["User-Id"] = $data['id'];
                    // $_COOKIE['PHPSESSID'] = $session_id;
                    // setcookie("Session-Hash",
                    // $session_id, [
                    //     'samesite' => 'None',
                    //     'secure' => true,
                    // ]);
                    $return = [
                        "account" => $account,
                        "user_id" => $data['id'],
                        "email" => $data['email'],
                        "intro" => $data['intro'],
                        "event" => "登入訊息",
                        "status" => "success",
                        "content" => "登入成功，歡迎 $account 登入",
                        // "X-Session-Hash" => $md5_session_id
                    ];
                    //確認有沒有密碼錯誤
                } else {
                    throw new Exception("帳號名或密碼錯誤");
                }
            }
        } catch (PDOException $e) {
            $return = [
                "event" => "登入訊息",
                "status" => "error",
                "content" => "登入失敗",
            ];
            http_response_code(500);
            return $return;
        } catch (Exception $e) {
            $return = [
                "event" => "登入訊息",
                "status" => "error",
                "content" => "登入失敗，" . $e->getMessage(),
            ];
            http_response_code(400);
            return $return;
        }
        http_response_code(200);
        return $return;
    }
}
