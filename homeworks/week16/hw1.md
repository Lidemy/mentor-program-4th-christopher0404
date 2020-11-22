# hw1：Event Loop

在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

## Console Output

``` js
1
3
5
2
4
```

## What is Event Loop

> The Event Loop has one simple job — to monitor the Call Stack and the Callback Queue. If the Call Stack is empty, it will take the first event from the queue and will push it to the Call Stack, which effectively runs it.

## How the program works

1. `main()` is added to the Call Stack.
2. `console.log(1)` is added to the Call Stack.
3. `console.log(1)` is executed. **Console prints `1`**
4. `console.log(1)` is removed from the Call Stack.
5. `setTimeout(() => { console.log(2) }, 0)` is added to the Call Stack.
6. `setTimeout(() => { console.log(2) }, 0)` is executed. The browser creates a timer as part of the Web APIs.
7. `setTimeout(() => { console.log(2) }, 0)` is removed from the Call Stack.
8. After at least 0 ms, the timer completes and it pushes `() => { console.log(2) }` to the Callback Queue.
9. `console.log(3)` is added to the Call Stack.
10. `console.log(3)` is executed. **Console prints `3`**
11. `console.log(3)` is removed from the Call Stack.
12. `setTimeout(() => { console.log(4) }, 0)` is added to the Call Stack.
13. `setTimeout(() => { console.log(4) }, 0)` is executed. The browser creates a timer as part of the Web APIs.
14. `setTimeout(() => { console.log(4) }, 0)` is removed from the Call Stack.
15. After at least 0 ms, the timer completes and it pushes `() => { console.log(4) }` to the Callback Queue.
16. `console.log(5)` is added to the Call Stack.
17. `console.log(5)` is executed. **Console prints `5`**
18. `console.log(5)` is removed from the Call Stack.
19. `main()` is removed from the Call Stack. (the Call Stack is empty now)
20. The Event Loop takes `() => { console.log(2) }` from the Callback Queue and pushes it to the Call Stack.
21. `() => { console.log(2) }` is executed and adds `console.log(2)` to the Call Stack.
22. `console.log(2)` is executed. **Console prints `2`**
23. `console.log(2)` is removed from the Call Stack.
24. `() => {}` is removed from the Call Stack. (the Call Stack is empty now)
25. The Event Loop takes `() => { console.log(4) }` from the Callback Queue and pushes it to the Call Stack.
26. `() => { console.log(4) }` is executed and adds `console.log(4)` to the Call Stack.
27. `console.log(4)` is executed. **Console prints `4`**
28. `console.log(4)` is removed from the Call Stack.
29. `() => {}` is removed from the Call Stack. (the Call Stack is empty now)

## References

1. [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
2. [How JavaScript works: Event loop and the rise of Async programming + 5 ways to better coding with async/await | by Alexander Zlatkov | SessionStack Blog](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5)
