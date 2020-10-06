## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

兩者最大的差別在於：「加密可逆，雜湊不可逆。」加密可以透過解密得到原文，雜湊無法逆向解出原始輸入。

一個安全資料庫應該儲存的是經過雜湊的密碼，而不是使用者輸入的明碼，萬一資料庫不慎遭到攻擊，駭客拿到的會是雜湊值，無法反推得到原始值，密碼只有使用者知道。

### 加密（Encryption）

在密碼學中，加密是將明文資訊改變為難以讀取的密文內容，使之不可讀的過程。只有擁有解密方法的物件，經由解密過程，才能將密文還原為正常可讀的內容。

加密演算法可以分為「對稱式加密」與「非對稱式加密」：

#### 對稱式加密（Symmetric Encryption）

* 加密和解密使用的金鑰是相同的
* 金鑰長度太短的話，很容易被破解
* 對稱加密的運算速度比公鑰加密快
* 常見的演算法：AES、DES、3DES、⋯⋯

#### 非對稱式加密（Asymmetric Encryption）

* 需要兩個金鑰：公開金鑰（Public key）、私密金鑰（Private key）
* 公鑰可以自由發布，私鑰則由使用者秘密保存
* 通常使用公鑰加密，使用私鑰解密
* 在數位簽章（Digital Signature）中，使用私鑰加密（相當於生成簽名），公鑰解密（相當於驗證簽名）
* 常見的演算法：RSA、DSA、ECC、⋯⋯

### 雜湊（Hash）

* 不固定長度的內容，經過雜湊演算法，輸出成固定長度的內容
* 輸出的內容無法反推回原本輸入的內容
* 相同輸入經過相同演算法，必定得到相同輸出
* 不同輸入經過相同演算法，也可能得到相同輸出，機率非常低，這種情況稱為碰撞（Collision）
* 常見的演算法：SHA-256、SHA-1、MD5、⋯⋯

## `include`、`require`、`include_once`、`require_once` 的差別

* 使用 `include`、`include_once` 引入檔案發生錯誤時，會回傳 `E_WARNING`，並繼續執行程式
* 使用 `require`、`require_once` 引入檔案發生錯誤時，會回傳 `E_ERROR`，並終止程式
* 使用 `include_once`、`require_once` 時，會檢查檔案是否已經被引入，若有引入過就不會再次引入，以避免函式重新定義、變數重複宣告等問題

## 請說明 SQL Injection 的攻擊原理以及防範方法

SQL Injection 是使用 SQL 語法作為輸入的內容。當程式設計忽略字元檢查，輸入的內容就會被當成 SQL 指令來執行，進而存取、竄改資料庫的數據，或者破壞資料庫。通常出現在要求使用者填入表單時，是一種常見的攻擊手法，被俗稱為駭客的填字遊戲。

### 攻擊原理

假設網站登入驗證的 SQL 查詢語法為

``` sql
SELECT * FROM `users` WHERE `username` = $user_name AND `password` = $pswd
```

使用者惡意填入

``` php
$user_name = '' OR 1 = 1
$pswd = '' OR 1 = 1
```

導致原本的 SQL 查詢語法變成

``` sql
SELECT * FROM `users` WHERE `username` = '' OR 1 = 1 AND `password` = '' OR 1 = 1
```

實際上執行的 SQL 指令會是

``` sql
SELECT * FROM `users`
```

因此就算沒有帳號、密碼，也可以登入網站

### 防範方法

在 PHP 中可以透過 **Prepared Statements** 將原本使用字串拼接的部分，改為使用參數傳入值，資料庫不會將參數的內容視為 SQL 指令的一部份來執行，藉此來避免 SQL Injection。

``` php
$stmt = $mysqli->prepare("SELECT * FROM `users` WHERE `username` = ? AND `password` = ?");
$stmt->bind_param('ss', $username, $password);
$stmt->execute();
```

## 請說明 XSS 的攻擊原理以及防範方法

XSS（Cross-Site Scripting）是一種網站應用程式的安全漏洞攻擊，攻擊者注入 client-side scripts 到網頁上，其他使用者在觀看網頁時就會受到影響，通常是 JavaScript，但實際上也可以包括 Java、VBScript、ActiveX、Flash，甚至是普通的 HTML。這些惡意網頁程式可能改變網站的行為和外觀、竊取其他使用者的敏感資訊、甚至以被攻擊者的身份執行一些操作。

### 攻擊原理

XSS 目前沒有統一的分類標準，不過大多數專家將其區分為至少兩種主要類型：非持久型（non-persistent）、持久型（persistent）。（還有 [DOM-based XSS](https://en.wikipedia.org/wiki/Cross-site_scripting#Server-side_versus_DOM-based_vulnerabilities)）

#### Non-persistent (or reflected)

非持久型（或反射型）XSS 常見於 HTTP query parameters，像是以 GET 方法傳送資料給伺服器時，伺服器未檢查就將內容回應到網頁上所產生的漏洞。

例如，網站是使用網址上的參數來顯示搜尋結果，攻擊者就可以利用參數的值改為 JavaScript 來執行：

``` url
http://example.com/search?q=<script%20type='application/javascript'>alert('xss');</script>
```

#### Persistent (or stored)

持久型（或儲存型）XSS 常見於留言板、論壇等。若沒有做適當地檢查，輸入的內容就會被當作一般的 HTML 執行，由於內容會被保存在伺服器資料庫中，當其他使用者訪問時，網站便會自動執行攻擊者所輸入的指令。

例如，在留言處輸入 `<script>` 來載入其他來源的檔案：

``` html
<script src="http://example.com/evil.js"></script>
```

### 防範方法

防範 XSS 的方法之一，是將使用者輸入的內容進行過濾，許多程式語言都有提供函式，能夠在 HTML 輸出前，針對特殊符號做編碼或者跳脫處理。

以 PHP 為例，可以使用 `htmlentities()` 和 `htmlspecialchars()` 過濾特殊字元。

``` php
$str = "<script>alert('XSS')</script>";
echo htmlspecialchars($str);
```

上面的字串會被編碼成：

``` html
&lt;script&gt;alert(&#039;XSS&#039;)&lt;/script&gt;
```

## 請說明 CSRF 的攻擊原理以及防範方法

CSRF（Cross-Site Request Forgery）是攻擊者利用受害者的身份，在受害者不知情的狀況下，向伺服器發送惡意請求，例如：發送訊息、購買商品、銀行轉帳等。

與 XSS（Cross-Site Scripting）不同的是，XSS 通常是在網站上輸入惡意程式碼來進行攻擊，利用的是使用者對目標網站的信任；而 CSRF 則是基於網站伺服器對使用者瀏覽器的信任。

### 攻擊原理

多數的網站在使用者登入後，都會在瀏覽器產生 Cookie，之後的操作就不需要再次登入，瀏覽器會自動將 Cookie 發送給網站伺服器來識別身份。不過，因為 Cookie 會在瀏覽器中存在一段時間，使得攻擊者有機可趁，在 Cookie 過期前，都有遭受 CSRF 攻擊的可能性。

最簡單的攻擊方法，是在 URL 中加上參數。假設使用者在登入部落格的情況下，點擊了攻擊者提供的連結，伺服器就會接收到 GET 請求，將文章刪除：

``` html
<a href="https://example-blog.com/delete?id=4"></a>
```

攻擊者也能利用圖片的 `src` 屬性發送 request

``` html
<img src="https://example-blog.com/delete?id=4" width="0" height="0">
```

甚至可以用 `<form>` 發送 POST 請求，讓表單提交之後的結果出現在一個看不見的 `<iframe>` 裡面，而且還可以自動提交，完全不需要經過使用者的任何操作。

``` html
<iframe style="display:none" name="csrf-frame"></iframe>

<form method="POST" action="https://example-blog.com/delete" target="csrf-frame" id="csrf-form">
  <input type="hidden" name="id" value="4">
  <input type="submit" value="submit">
</form>

<script>document.getElementById("csrf-form").submit()</script>
```

### 使用者的防範

CSRF 之所以能夠成立，是因為使用者在被攻擊的網站中，處於登入的狀態，攻擊者才能偽造使用者的身份執行一些行為。因此，在含有敏感資訊（如個人資料、銀行帳戶等）的網站進行操作時，必須特別注意：

1. 處於登入狀態時，不要隨意開啟其他來源不明的網站
2. 不要使用瀏覽器記住帳號、密碼的功能
3. 完成操作後，立刻登出

不過使用者能做的防禦有限，伺服器端還是應當做好預防措施。

### 伺服器的防範

#### 檢查 Referer

HTTP Request Headers 有一個 referer 欄位，代表發出請求的來源位址（URL），可以透過 referer 檢查是否為相同 domain 所發出的請求，不是的話就拒絕請求。不過這個做法並不完善，有幾點要注意：

1. 有些瀏覽器可能不會在 Request Headers 中帶上 referer 欄位
2. 有些使用者可能會關閉或停用自動帶 referer 的功能
3. 攻擊者可以透過竄改 referer 來騙過目標網站的伺服器

#### 圖形、簡訊驗證碼

通常在網路銀行轉帳的時候，都會收到一組簡訊驗證碼，為了確保行為是由使用者本人操作。圖形驗證碼也是同樣的道理，如果攻擊者不知道圖形驗證碼的答案，也就不可能攻擊成功了。雖然這是一個相對安全的作法，但是對使用者來說卻十分麻煩。

#### Synchronizer Token Pattern

Synchronizer Token Pattern（STP）指的是每次使用者發出請求時都必須傳回一個伺服器所指定的亂數，而這個亂數可以設計成適用於整個 session 階段，也可以設計成每個請求只能使用一次，後者（per-request token）的作法會比前者來得安全，但是對使用者來說較為不便，所以在大部分的情況下，前者（per-session token）反而是比較常用的作法。

伺服器產生一組隨機且不重複的 token 放在表單中隱藏的欄位：

``` html
<form action="https://example.com" method="POST">
  <input type="hidden" name="CSRFToken" value="KbyUmhTLMpYj7CD2di7JKP1P3qmLlkPt">
  ...
</form>
```

表單提交時，伺服器會比對這組 token 與自己 session 中存放的值是否相同，攻擊者則因為無法得知正確的 token 而請求失敗。

#### Double Submit Cookie

做法和 STP 類似，只不過 Double Submit Cookie 是無狀態的（stateless），意思是伺服器不需要保存 token，而是存放在 client-side 的 cookie 中。表單提交時，伺服器會比對 cookie 中 token 與表單中 token 的值：

``` html
Set-Cookie: CSRFToken=KbyUmhTLMpYj7CD2di7JKP1P3qmLlkPt

<form action="https://example.com" method="POST">
  <input type="hidden" name="CSRFToken" value="KbyUmhTLMpYj7CD2di7JKP1P3qmLlkPt">
  ...
</form>
```

受到同源政策的限制，攻擊者不能從其他 domain 讀取或設置目標網站的 cookie，因此無法得知正確的 token。

不過這個做法依然有些缺點，攻擊者如果掌握了目標網站的 subdomain，就能夠設置 cookie，因此最好確保每個 subdomains 都是安全的，並且只接受 HTTPS connections。

上面的做法，token 是由 server-side 產生，如果網站是 SPA（Single Page Application）的話，則可以由 client-side 產生，把 token 統一放在 Request Headers 裡面，就不用每個表單都放。（[axios](https://github.com/axios/axios) 就有提供這樣的功能）

#### SameSite Cookie

`SameSite` 不允許 cookie 來自跨來源的請求（cross-origin requests）。分別有三種模式：`Strict`、`Lax`、`None`

1. `Strict` 最為嚴格，`<a href="...">`、`<form>`、`new XMLHttpRequest` 等等，只要不是相同來源的請求，就不會帶上這個 cookie。
2. `Lax` 稍微寬鬆，除了 GET 以外的方法都不會帶上這個 cookie。
3. `None` 則不限制跨站請求。

``` java
Set-Cookie: JSESSIONID=xxxxx; SameSite=Strict
Set-Cookie: JSESSIONID=xxxxx; SameSite=Lax
```

目前 Google Chrome 的預設值是 `Lax`。在 `Lax` 模式下，使用者可以從外部的連結進入網站，並且保持登入狀態，有些網站會在敏感操作時，才帶上 `SameSite=Strict` 的 cookie，以防止 CSRF 攻擊。

## 參考資料

### 加密＆雜湊

1. [一次搞懂密碼學中的三兄弟 — Encode、Encrypt 跟 Hash | by Larry Lu | Starbugs Weekly 星巴哥技術專欄 | Medium](https://medium.com/starbugs/what-are-encoding-encrypt-and-hashing-4b03d40e7b0c)
2. [聽說不能用明文存密碼，那到底該怎麼存？ | by Larry Lu | Starbugs Weekly 星巴哥技術專欄 | Medium](https://medium.com/starbugs/how-to-store-password-in-database-sefely-6b20f48def92)
3. [加密和雜湊有什麼不一樣？ | Just for noting](https://blog.m157q.tw/posts/2017/12/25/differences-between-encryption-and-hashing/)
4. [[第十一週] 資訊安全 - 雜湊密碼：hash | Yakim shu](https://yakimhsu.com/project/project_w11_Info_Security-Hash.html)
5. [加密 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E5%8A%A0%E5%AF%86)
6. [公開金鑰加密 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E5%85%AC%E5%BC%80%E5%AF%86%E9%92%A5%E5%8A%A0%E5%AF%86)
7. [數位簽章 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E6%95%B8%E4%BD%8D%E7%B0%BD%E7%AB%A0)

### `include`, `require`, `include_once`, `require_once`

1. [PHP: include - Manual](https://www.php.net/manual/en/function.include.php)
2. [PHP: require - Manual](https://www.php.net/manual/en/function.require.php)
3. [PHP: include_once - Manual](https://www.php.net/manual/en/function.include-once.php)
4. [PHP: require_once - Manual](https://www.php.net/manual/en/function.require-once.php)
5. [簡單談談PHP中的include、include_once、require以及require_once語句 | 程式前沿](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/213553/)

### SQL Injection

1. [SQL注入 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/SQL%E6%B3%A8%E5%85%A5)
2. [參數化查詢 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E5%8F%83%E6%95%B8%E5%8C%96%E6%9F%A5%E8%A9%A2)
3. [SQL Injection - W3Schools](https://www.w3schools.com/sql/sql_injection.asp)
4. [PHP: Prepared Statements - Manual](https://www.php.net/manual/en/mysqli.quickstart.prepared-statements.php)
5. [PHP MySQL Prepared Statements - W3Schools](https://www.w3schools.com/php/php_mysql_prepared_statements.asp)

### XSS

1. [什麼是Cross-Site Scripting（XSS）攻擊 | 程式前沿](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/46727/)
2. [web安全：什麼是XSS和CSRF | 程式前沿](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/706072/)
3. [【網頁安全】給網頁開發新人的 XSS 攻擊 介紹與防範 @程式設計板 哈啦板 - 巴哈姆特](https://forum.gamer.com.tw/Co.php?bsn=60292&sn=11267)
4. [[第十二週] 資訊安全 - 常見攻擊：XSS、SQL Injection | Yakim shu](https://yakimhsu.com/project/project_w12_Info_Security-XSS_SQL.html)
5. [跨網站指令碼 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)
6. [Cross-site scripting - Wikipedia](https://en.wikipedia.org/wiki/Cross-site_scripting)
7. [Cross-Site Scripting – Application Security – Google](https://www.google.com/about/appsecurity/learning/xss/index.html)
8. [XSS Filter Evasion Cheat Sheet | OWASP](https://owasp.org/www-community/xss-filter-evasion-cheatsheet)
9. [Cross-Site Scripting (XSS) Cheat Sheet - 2020 Edition | Web Security Academy](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)
10. [Types of attacks - Web security | MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#Cross-site_scripting_XSS)

### CSRF

1. [讓我們來談談CSRF - TechBridge 技術共筆部落格](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
2. [[第十二週] 資訊安全 - 常見攻擊：CSRF | Yakim shu](https://yakimhsu.com/project/project_w12_Info_Security-CSRF.html)
3. [程式猿必讀-防範CSRF跨站請求偽造 | 程式前沿](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/109775/)
4. [[技術分享] Cross-site Request Forgery (Part 2) @ 就是資安 :: 痞客邦 ::](https://cyrilwang.pixnet.net/blog/post/31813672)
5. [跨站請求偽造 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
6. [Cross-site request forgery - Wikipedia](https://en.wikipedia.org/wiki/Cross-site_request_forgery)
7. [Cross-Site Request Forgery Prevention - OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
8. [Mozilla Web Security Cheat Sheet](https://infosec.mozilla.org/guidelines/web_security#csrf-prevention)
9. [Using HTTP cookies - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies)
