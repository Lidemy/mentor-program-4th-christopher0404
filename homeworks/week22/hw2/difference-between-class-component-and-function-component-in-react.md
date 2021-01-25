# 請問 class component 與 function component 的差別是什麼？

function component 讓開發者更容易將共同邏輯抽取出來共用，而且更容易測試，不過並沒有辦法完全取代 class component，原因在於 class component 可以使用各種 lifecycle methods，來對 component 做更細膩的控制，也給予更多彈性在內部元件的實作上。

## Class Components

- 需繼承 `React.Component`
- 具有 state
- 可以使用 lifecycle methods
- 必須使用 `render()`
- 總是得到最新的 props 和 state，因為 `this` 是可變的（mutable）

## Function Components

- 不需繼承 `React.Component`，可以透過傳入 `props` 作為參數的方式來操作 component
- 沒有 state（在 Hooks 出現以後，可以使用 `useState`）
- 不能使用 lifecycle methods（在 Hooks 出現以後，可以使用 `useEffect` 實現類似的方法）
- 不必使用 `render()`，單純 return JSX
- 沒有 `this`，利用 closure 來管理 props 和 state

function component 沒有 `this`，或者說 `this` 指向的物件並不是 component 本身。這提供了幾個好處，一是語法上的簡潔性，不用再寫像是 `this.state.xxx` 的冗長語法，也不用煩惱在傳入 event handler 時要根據使用場景來 `bind(this)`。

> Function components capture the rendered values.

function component 每一次 render 都會把整個 function 重新執行一遍，也就是說，每一次 render 都是一個新的 function call。

## References

- [How Are Function Components Different from Classes? — Overreacted](https://overreacted.io/how-are-function-components-different-from-classes/)
- [從 class component 到 hooks | 半熟前端](https://blog.kalan.dev/function-component-to-hooks/)
- [從實際案例看 class 與 function component 的差異](https://blog.techbridge.cc/2020/06/13/class-function-component-and-useeffect/)
