# 2023_11_VueJS-PHP
2023 11 月 主要用於教學無基礎的學員

## 此篇教學為 前端 Vue3 Composition API + pinia + 後端 純 PHP

## Getting started
```bash=
git clone https://gitlab.com/a20688392/practicevue.git
```
網頁目錄設定位置
http://localhost/2023_11_VueJS-PHP


## 後端匯入資料庫
位於 board-api，fortest.sql 匯入至資料庫

## 後端設置檔案
### 將 board-api/src/Config/Database.php.example 複製一份到  board-api/src/Config/ 並命名為 Database.php
```bash=
cd board-api/src/Config
cp Database.php.example Database.php
```
## 安裝依賴套件，確認你已安裝好 composer
```bash=
composer install
``` 

## 確認你已安裝好 node.js 

### 安裝依賴
```bash=
cd board
yarn install
```
### 啟動前端
```bash=
yarn dev
```
打開網頁
http://localhost:5173/