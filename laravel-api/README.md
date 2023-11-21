# second-hand-books backend - Laravel 環境初始化
### 先來確認以下事情
#### 安裝套件
```bash
# 包含開發環境所需的套件
composer install
# 僅安裝正式環境所需的套件，而不包含開發環境所需的套件
composer install --no-dev
```
#### .env 設定
>.env 檔並不會預設就存在，因為這是整個專案的環境變數

```bash
# 將 .env.example 複製成 .env
cp .env.example .env
```


#### 預設情況下，不會有 APP key
> 透過artisan產生一組網站專屬密鑰用來確保session、password等加密資料安全性

```bash
# 網頁上會有這些警告
No application encryption key has been specified.
Your app key is missing
Generate your application encryption key using `php artisan key:generate`.
```
```bash
php artisan key:generate
```
>就會在 .env 產生


```bash
# 這是範例，請勿複製
# 會在 .env 中出現這段環境變數
APP_KEY=base64:dR4haQ8vN2TERj2M/tvUdSyC1cAZv4WbIDBCgDEzdzk=
```


---
## 以下為在 Linux 的環境需要做的事情
### storage 權限不足
```bash
# 會有底下類似說明的錯誤，Permission denied
The stream or file "/home/web/public/core/storage/logs/laravel.log" could not be opened in append mode: Failed to open stream: Permission denied The exception occurred while attempting to log: The stream or file "/home/web/public/core/storage/logs/laravel.log" could not be opened in append mode: Failed to open stream: Permission denied......................
```

#### 本機是開發環境可以調整檔案權限
>將檔案權限全開啟(不安全)
```
chmod -R 0777 storage
```

#### 開發站、測試站、正式站皆比照正式環境辦理
>正式環境上應該遵循「最小權限原則」

```
chown -R www-data:www-data storage
```

## 正式環境下務必

```bash
APP_NAME=Laravel-SHD-Backend
APP_ENV=local #環境變數，正式改為 production
APP_KEY=base64:dR4haQ8vN2TERj2M/tvUdSyC1cAZv4WbIDBCgDEzdzk=
APP_DEBUG=true #Debug用途，正式改為 false
APP_URL=http://localhost # 主機 URL
```
```
APP_NAME
config/app.php
預設為 Laravel-SHD-Backend
此服務名稱
注意同一個 Domain Name 下每一個服務的 APP_NAME 都必須不同，避免瀏覽器混淆不同網站的 Cookie Name，可能會導致 419 expired 的問題。

APP_ENV
config/app.php
預設為 production
開發環境，用於加載不同環境時的配置

通常為
開發環境: local
自動測試: testing
產品環境: production

APP_DEBUG
config/app.php
預設為 false
開啟時一旦發生錯誤會跳在網頁上，有可能會將重要資訊或程式碼洩漏

APP_URL
config/app.php
預設為 http://localhost
為此服務預設的網頁根目錄
```

### 開發時幫助檢查腳本
#### 執行腳本（開發時使用）
```bash
composer dev
# 將會進行 phpcs 錯誤顏色顯示
# phpcs 預設標準 PSR12
# git 設定使用我們所寫的 hooks
# 詳情指令可以看 composer.json 中的 "scripts" 的 dev
```

### 開發者幫助工具
#### 產生套件提示
```
php artisan ide-helper:generate
```
#### 產生Model 資料庫操作提示
```bash
php artisan ide-helper:models
# 要選 no ，_ide_helper_models.php 他會產生提示
# 選 yes，會注入註解到 model，不需要麼做
```

#### 產生 swagger 文檔
僅非 production 會產生

先將設定改置網頁目錄
```php
L5_SWAGGER_CONST_HOST=http://{domain or ip}/{path}/public/
```
生 swagger 文檔
```php
php artisan l5-swagger:generate
```

打開網頁
```bash
http://{domain or ip}/{path}/public/api/documentation
# 路徑是 config\l5-swagger.php 設定的
```