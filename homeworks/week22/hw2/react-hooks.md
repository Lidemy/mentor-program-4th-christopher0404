# 請列出 React 內建的所有 hook，並大概講解功能是什麼

- [Basic Hooks](#basic-hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)
  - [useContext](#usecontext)
- [Additional Hooks](#additional-hooks)
  - [useReducer](#usereducer)
  - [useCallback](#usecallback)
  - [useMemo](#usememo)
  - [useRef](#useref)
  - [useImperativeHandle](#useimperativehandle)
  - [useLayoutEffect](#uselayouteffect)
  - [useDebugValue](#usedebugvalue)

## Basic Hooks

### useState

```javascript
const [state, setState] = useState(initialState);
```

- 回傳目前的 state 與一個可以更新 state 的 function。
- 在首次 render 時，回傳的 `state` 的值會和第一個參數（`initialState`）一樣。
- `setState` 是一個非同步的 function ，用來更新 state，它接收一個新的 state 並將 component 的 re-render 排進隊列。
- 在後續的 re-render，`useState` 回傳的第一個值必定會是最後更新的 state。
- 如果即將更新的 state 與前一個 state 的值相同，React 將會跳過 children components 的 render 及 effect 的執行（React 使用 `Object.is` 演算法來比較）。

#### Lazy initial state

`initialState` 參數只會在首次 render 時使用，在後續的 render 會被忽略。如果最初的 state 需要通過複雜的計算來獲得，可以傳入一個 function，該 function 只會在首次 render 時被執行。

```javascript
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

### useEffect

```javascript
useEffect(didUpdate);
```

Effect Hook 讓你可以使用 function component 中的 side effect，React component 有兩種常見的 side effect：一種不需要執行清除，另一種則需要。通常在 component 離開螢幕之前需要清除 effect 所建立的資源，傳遞到 `useEffect` 的 function 可以回傳一個 clean-up function，在 component 從 UI 被移除前執行，來防止 memory leak。

在預設情況下，傳遞給 `useEffect` 的 function 會在 layout 和 render 之後觸發，但你也可以選擇它們在某些值改變的時候才執行，可以向 `useEffect` 傳遞第二個參數，它是該 effect 所依賴的值（dependencies array）。

如果你想要 effect 只執行和清除一次（在 mount 和 unmount），你可以傳遞一個空的 array 作為第二個參數，表示你的 effect 沒有依賴任何在 props 或 state 的值，所以它永遠不需要被再次執行。

```javascript
useEffect(() => {
  // Run the Effect
  };
}, []);
```

### useContext

```javascript
const value = useContext(MyContext);
```

接收一個 context object（`React.createContext` 的回傳值）並回傳該 context 目前的值。context 目前的值是取決於由上層 component 距離最近的 `<MyContext.Provider>` 的 `value` prop。

當 component 上層最近的 `<MyContext.Provider>` 更新時，該 hook 會觸發重新 render，並將最新的 context `value` 傳遞到 `MyContext` provider。

`useContext` 的參數必須為 context object 本身：

- Correct: `useContext(MyContext)`
- Incorrect: `useContext(MyContext.Consumer)`
- Incorrect: `useContext(MyContext.Provider)`

呼叫 `useContext` 的 component 總是會在 context 的值更新時重新 render。如果重新 render component 的操作很複雜，你可以 [透過 memoization 來優化](https://github.com/facebook/react/issues/15156#issuecomment-474590693)。

## Additional Hooks

### useReducer

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

`useState` 的替代方案。接受一個 `(state, action) => newState` 的 reducer，然後回傳現在的 state 與 `dispatch` 方法。

當你需要複雜的 state 邏輯而且包括多個子數值，或下一個 state 依賴上一個 state，`useReducer` 會比 `useState` 更適用。而且 `useReducer` 可以讓你優化觸發深層更新的 component 的效能，因為你 [可以傳遞 dispatch 而不是 callback](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down)。

### useCallback

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

回傳一個 [memoized](https://en.wikipedia.org/wiki/Memoization) callback。

傳遞一個 inline callback 和依賴陣列。`useCallback` 會回傳該 callback 的 memoized 版本，它僅在 dependencies 改變時才會更新。當傳遞 callback 到依賴 reference equality 且已經優化的 child components 時很有用，以防止不必要的 render（例如 `shouldComponentUpdate`）。

`useCallback(fn, deps)` 相當於 `useMemo(() => fn, deps)`。

### useMemo

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

回傳一個 [memoized](https://en.wikipedia.org/wiki/Memoization) value。

傳遞一個 create function 與依賴陣列。`useMemo` 只會在 dependencies 改變時，才重新計算 memoized 的值。這個優化可以避免在每次 render 都進行複雜的計算。

傳到 `useMemo` 的 function 會在 render 期間執行。不要做一些通常不會在 render 期間做的事情，例如：處理 side effect 屬於 `useEffect`，而不是 `useMemo`。

如果沒有提供 array，每次 render 時都會計算新的值。

### useRef

```javascript
const refContainer = useRef(initialValue);
```

`useRef` 回傳一個 mutable ref object，其 `.current` 屬性被初始為傳入的參數（`initialValue`）。回傳的 object 在 component 的生命週期將保持不變。

本質上，`useRef` 就像一個「盒子」，可以在其 `.current` 屬性中保存一個 mutable value。

ref 是一種用來 [訪問 DOM](https://reactjs.org/docs/refs-and-the-dom.html) 的方式，如果你以 `<div ref={myRef} />` 將 ref object 傳遞給 React，無論節點如何改變，React 都會將其 `.current` 屬性設為相對應的 DOM 節點。

然而，`useRef()` 比 `ref` 屬性更有用。它可以 [很方便地持有任何 mutable value](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)，跟 class 中的 instance fields 類似。

這是因為 `useRef()` 會建立一個普通的 JavaScript object。`useRef()` 和自己建立一個 `{current: ...}` object 的唯一不同是，`useRef` 在每次 render 時都會給你同一個的 ref object。

`useRef` 在其內容有變化時並不會通知你，變更 `.current` 屬性不會觸發 re-render。如果你想要在 React 綁定或解除綁定 DOM 節點的 ref 時執行程式碼，你可能需要使用 [callback ref](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node) 來實現。

### useImperativeHandle

```javascript
useImperativeHandle(ref, createHandle, [deps]);
```

`useImperativeHandle` 可以讓使用 `ref` 時向 parent components 暴露自定義的 instance value。在大多數的情況下應避免使用 ref 的 imperative code。`useImperativeHandle` 應與 `forwardRef` 一同使用。

### useLayoutEffect

與宣告 `useEffect` 本身相同，但它會在所有 DOM 改變後同步觸發。使用它來讀取 DOM layout 並同步 re-render。在瀏覽器執行繪製之前，`useLayoutEffect` 內部的更新將被同步刷新。

盡可能使用標準的 `useEffect` 來避免阻礙視覺上的更新。

### useDebugValue

```javascript
useDebugValue(value);
```

`useDebugValue` 可以用來在 React DevTools 中顯示自定義 hook 的標籤。

在某些情況下，要顯示的資訊需要經過比較複雜的運算，這時可以對 `useDebugValue` 傳入第二個參數，為一個函式，該函式只有在 Hook 被檢查時才會被呼叫，它接受 debug value 作為參數，然後回傳一個被格式化的顯示值。

例如，一個回傳 `Date` 值的自定義 Hook，可以透過以下的方法 來避免不必要地呼叫 `toDateString` function：

```javascript
useDebugValue(date, date => date.toDateString());
```

## References

- [Hooks API Reference - React](https://reactjs.org/docs/hooks-reference.html)
- [Using the State Hook - React](https://reactjs.org/docs/hooks-state.html)
- [Using the Effect Hook - React](https://reactjs.org/docs/hooks-effect.html)
