## 請以自己的話解釋 API 是什麼

API 是 Application Programming Interface 的縮寫，常見於軟體服務提供使用者（通常為程式開發者）取得特定資料，而使用者不必了解原始程式碼或理解內部機制，就能透過 API 進行開發。

網頁開發者經常會接觸到 Web API，藉由 API 提供者所制定的規則，對某個網站或應用程式的資料進行存取、新增、修改、刪除等動作，而客戶端 (client-side) 和伺服器端 (server-side) 則會透過 HTTP 來進行請求 (request) 與回應 (response)。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

### 304 Not Modified

> Response 的內容沒有被修改，客戶端可以使用快取的內容。

#### 返回 304 狀態碼的原因

如果 Request Header 中包含 `If-Modified-Since`，就說明 client-side 已經有快取，與 Response Header 中的 `Last-Modified` 比對，修改時間沒有更新的話，server-side 就返回 Status code: 304，代表可以沿用快取的內容，不需要重新發送請求。另外，也會比對 `Etag` 和 `If-None-Match` 的 hash，來判斷檔案內容更動與否。

通常來說，使用快取是有好處的，一來可以節省流量，二來可以加速使用者取得網頁內容的時間。

### 403 Forbidden

> 伺服器收到請求，但拒絕對其進行授權。

#### 返回 403 狀態碼的原因

* IP 位址被拒絕
* 用戶數過多，可以稍後再試
* 來自客戶端 IP 的請求過多，已達到動態 IP 限制
* 以 HTTP 的方式訪問需要 SSL 連接的網站
* 需要客戶端憑證、客戶端憑證已過期或無效

### 502 Bad Gateway

> 作為閘道器或者代理工作的伺服器嘗試執行請求時，，從上游伺服器接收到無效的回應。
   
#### 返回 502 狀態碼的原因

通常發生在 server 處理過多的請求服務時。

> 參考資料
> 1. [HTTP response status codes - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
> 2. [HTTP Status Codes — httpstatuses.com](https://httpstatuses.com/)
> 3. [HTTP狀態碼 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81)
> 4. [HTTP 304状态码的详细讲解_胡杰的专栏-CSDN博客_http 304](https://blog.csdn.net/huwei2003/article/details/70139062)
> 5. [循序漸進理解 HTTP Cache 機制](https://blog.techbridge.cc/2017/06/17/cache-introduction/)

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

API URL: https://api.foodie.dev

| 說明     | Method | Path              | 參數                    | 範例                   |
| ------- | ------ | ----------------- | ----------------------- | ---------------------- |
| 所有餐廳 | GET    | /restaurants      | _limit：限制回傳資料數量   | /restaurants_limit?=20 |
| 單一餐廳 | GET    | /restaurants/{id} | 無                       | /restaurants/4         |
| 刪除餐廳 | DELETE | /restaurants/{id} | 無                       | /restaurants/996       |
| 新增餐廳 | POST   | /restaurants      | name：餐廳名稱            | 無                     |
| 更改餐廳 | PATCH  | /restaurants/{id} | name：餐廳名稱            | /restaurants/87        |

### Example Response

``` json
[
  {
    "id": 1,
    "name": "McDonald's"
  },
  {
    "id": 2,
    "name": "KFC"
  },
  {
    "id": 3,
    "name": "Burger King"
  },
  {
    "id": 4,
    "name": "MOS BURGER"
  }
]
```
