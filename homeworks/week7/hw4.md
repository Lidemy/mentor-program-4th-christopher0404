## 什麼是 DOM？

DOM 是 Document Object Model 的縮寫，表示瀏覽器讀取 HTML 和 XML 的程式介面，讓程式語言（例如 JavaScript）能夠操控網頁的元素、修改內容、以及調整樣式。

DOM 將 HTML 以樹狀結構來表示，稱為 DOM Tree，包含許多節點（node），每個節點代表一個 HTML 元素，而其中每個 HTML 標籤（tag）都是一個物件（object），標籤內的文字也是物件。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

事件傳遞的順序為：先捕獲（Capture），再冒泡（Bubble）

事件傳遞分為三個階段：
1. Capturing Phase：事件從 Window 傳遞到目標元素的過程
2. Target Phase：事件傳遞到目標元素
3. Bubbling Phase：事件從目標元素傳遞到 Window 的過程

> 當事件傳遞到 target 時，沒有分捕獲和冒泡

``` js
target.addEventListener(type, listener [, useCapture]);
```

`useCapture` 這個參數的型別為 Boolean，表示事件監聽在冒泡階段或者捕獲階段被觸發：
1. `false`：為預設值，表示在 Bubbling Phase 觸發事件監聽
2. `true`：表示在 Capturing Phase 觸發事件監聽

## 什麼是 event delegation，為什麼我們需要它？

Event Delegation，中文稱為「事件代理」或「事件委託」，是利用事件傳遞機制的特性，指定父元素作為子元素的代理人，透過監聽父元素掌握子元素的事件反應。

當性質相同的元素監聽事件太多時，可以將 `eventListener` 建立在上層，是比較有效率的做法，也能夠使程式碼更為簡潔，將來如果子元素需要動態產生的話，擴充性也較佳。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

1. `event.preventDefault()` 阻止瀏覽器的預設行為，與事件傳遞沒有關係
2. `event.stopPropagation()` 停止捕獲階段或者冒泡階段的事件傳遞

### 範例

``` html
<div>
  <p>
    程式導師實驗計畫第四期
    <a href="https://github.com/Lidemy/mentor-program-4th">課綱</a>
  </p>
</div>
```

``` js
document.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
}
```

`e.preventDefault()` 會阻止 `<a>` 的預設行為，也就是連結到 [課綱](https://github.com/Lidemy/mentor-program-4th) 這個動作，但是事件傳遞機制依然存在，直到程式碼執行到 `e.stopPropagation()` 這行才中斷。

## 綜合練習：簡易密碼產生器

https://codepen.io/christopher404/pen/jOqrraN
