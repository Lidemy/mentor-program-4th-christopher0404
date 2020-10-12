## 請簡單解釋什麼是 Single Page Application

SPA (single-page application) 是單一頁面的網頁應用程式，相較於 MPA (multi-page application)，每次換頁都必須向伺服器發送請求，SPA 則是透過 AJAX 向伺服器存取資料，再由 JavaScript 動態更新網頁的內容，過程不需要換頁、重新載入整個頁面。

生活中常見的 SPA：Gmail、Google Maps、Google Drive、Facebook、Twitter、Spotify、AirBnB 等。

## SPA 的優缺點為何

### 優點

#### 減輕伺服器的負擔

大部分的資源（HTML、CSS、JavaScript）在使用者第一次訪問網站載入，往後只針對頁面所需的部分內容做更新，不必重新載入整個頁面，減少資料交換所耗費的時間和資源。

#### 感受更好的使用者體驗

過程不需要換頁，因此不會有短暫空白的畫面，或者中斷正在進行的服務，使用者操作的過程更為流暢，在使用影音串流服務時，感受更為顯著。

#### 更明確的前後端分工

前端開發者負責將資料呈現在使用者介面上，後端開發者負責資料（API）的提供，兩者可以專注於自己熟悉的開發技術。

### 缺點

#### 可能會有較差的 SEO

雖然 Google Chrome 可以取得 JavaScript 執行完後的結果，但部分瀏覽器的爬蟲技術可能無法準確取得網站內容，影響 SEO。

#### 客戶端的設備負擔較重

使用者第一次訪問網站時，需要下載的資源較多，若是在性能較差的裝置上，會造成載入時間過長，影響使用者體驗。

#### 過於依賴 JavaScript

如果使用者停用瀏覽器執行 JavaScript，則網頁內容無法正確地顯示。

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

### 透過 PHP 直接輸出內容

* 所有內容都在 server-side 處理完再傳回瀏覽器，每次更新資料都必須重新載入整個頁面。
* 資料處理和畫面渲染的程式碼混在一起，前後端分工不明確。

### 前端用 AJAX 串接後端 API

* 透過 AJAX 更新頁面的部分內容，不必重新載入整個頁面。
* 前後端分離，前端專注於資料在介面上的呈現，後端專注於資料的提供，各司其職。

![A Comparison of Single-Page and Multi-Page Applications](https://dzone.com/storage/temp/13596577-traditional-and-spa.jpg)

*[A Comparison of Single-Page and Multi-Page Applications](https://dzone.com/articles/the-comparison-of-single-page-and-multi-page-appli) by [Sergey Valuy](https://dzone.com/users/4277126/sergeyvaluy.html) on [Web Dev Zone](https://dzone.com/)*
