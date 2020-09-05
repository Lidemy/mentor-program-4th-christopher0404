## 什麼是 Ajax？

AJAX（Asynchronous JavaScript and XML）是一套綜合性的瀏覽器端網頁開發技術，其重點在於 Asynchronous（非同步）。

在同步的狀態下，因為程式碼是逐行執行，向伺服器發送請求後，必須等待收到回應，程式才能往下執行，等待的期間無法處理其他事情，影響使用者體驗。

透過 AJAX，瀏覽器與伺服器進行非同步的資料交換，這意味著能夠更新網頁中的部分資料，而不需要重新載入整個網頁，因此使用者可以在不刷新頁面的情況下繼續操作。伺服器和瀏覽器之間交換的資料大量減少，進而加快了瀏覽速度。

雖然名稱中是以 XML 作為資料格式，但現今 JSON 比起 XML 被更廣泛地使用，進一步減少資料量，形成所謂的 AJAJ。

## 用 Ajax 與我們用表單送出資料的差別在哪？

用表單送出資料之後，就算只是更動一小部份的內容，瀏覽器還是會回傳一整個新的頁面。用 AJAX 能夠達成不重新整理、不換頁的狀態下，就更新網頁內容。相較於重新取得一整份文件，更新部分資料的效益比較高，也有更好的使用者體驗。

## JSONP 是什麼？

JSONP（JSON with Padding）是 JSON 的一種使用模式，不需要擔心跨來源請求的問題。基於同源政策（same-origin policy），一般來說不同網站之間存取資料必須是相同來源，而 HTML 的 `<script>` 元素是一個例外。

在 JSONP 的使用模式中，server 通常會在 URL 提供一個 callback 的參數給 client 使用，例如：`https://api.twitch.tv/kraken/games/top?client_id=xxx&callback=getTopGames`

Server 會在傳給瀏覽器前，將資料填充到 callback function（回呼函式）中，瀏覽器得到的回應就不是單純的 JSON 資料格式而是一個函式。接著再用 `<script>` 載入 URL，就可以得到從其他來源動態產生的 JSON 資料

``` html
<script src="https://api.twitch.tv/kraken/games/top?client_id=xxx&callback=getTopGames"></script>
<script>
  function getTopGames (response) {
    console.log(response);
  }
</script>
```

總結來說，JSONP 就是用 `<script>` 不受限於同源政策的特性，達成跨來源請求，不過缺點是參數只能用附加在網址上的方式（GET）帶過去，沒辦法用 POST。

## 要如何存取跨網域的 API？

除了 JSONP 之外，還可以透過 CORS（Cross-Origin Resource Sharing 跨來源資源共享）這項規範來存取跨網域的 API。

Server 端會在 Response Headers 加上 `Access-Control-Allow-Origin`，`Access-Control-Allow-Origin: *` 代表允許任何跨來源的請求。此外，還可以透過 `Access-Control-Allow-Methods` 和 `Access-Control-Allow-Headers`，定義要允許哪些 HTTP Request Methods，以及在 Request Headers 要附帶什麼選項或驗證。

因此，如果想要存取跨網域的 API，必須先確認 server 端有加上 `Access-Control-Allow-Origin`，否則 Response 會被瀏覽器給擋下來。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

第四週的執行環境是 Node.js，可以直接向 server 發送請求，不會受到同源政策的限制。

這週的執行環境是瀏覽器，同樣會向 server 發送請求，但是如果不同源，就會根據同源政策把 Response 給擋下來，這是基於網路安全性考量的限制，避免重要資料被修改、刪除。
