# hw2：Event Loop + Scope

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

## Console Output

``` js
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

## How the program works

1. `main()` is added to the Call Stack.
2. `for (...) {...}` is executed. `i = 0`
3. `console.log('i: ' + 0)` is added to the Call Stack.
4. `console.log('i: ' + 0)` is executed. **Console prints `i: 0`**
5. `console.log('i: ' + 0)` is removed from the Call Stack.
6. `setTimeout(() => { console.log(i) }, 0 * 1000)` is added to the Call Stack.
7. `setTimeout(() => { console.log(i) }, 0 * 1000)` is executed. The browser creates a timer as part of the Web APIs.
8. `setTimeout(() => { console.log(i) }, 0 * 1000)` is removed from the Call Stack.
9. After at least 0 ms, the timer completes and it pushes `() => { console.log(i) }` to the Callback Queue.
10. `i++`, `i = 1`
11. `console.log('i: ' + 1)` is added to the Call Stack.
12. `console.log('i: ' + 1)` is executed. **Console prints `i: 1`**
13. `console.log('i: ' + 1)` is removed from the Call Stack.
14. `setTimeout(() => { console.log(i) }, 1 * 1000)` is added to the Call Stack.
15. `setTimeout(() => { console.log(i) }, 1 * 1000)` is executed. The browser creates a timer as part of the Web APIs.
16. `setTimeout(() => { console.log(i) }, 1 * 1000)` is removed from the Call Stack.
17. After at least 1000 ms, the timer completes and it pushes `() => { console.log(i) }` to the Callback Queue.
18. `i++`, `i = 2`
19. `console.log('i: ' + 2)` is added to the Call Stack.
20. `console.log('i: ' + 2)` is executed. **Console prints `i: 2`**
21. `console.log('i: ' + 2)` is removed from the Call Stack.
22. `setTimeout(() => { console.log(i) }, 2 * 1000)` is added to the Call Stack.
23. `setTimeout(() => { console.log(i) }, 2 * 1000)` is executed. The browser creates a timer as part of the Web APIs.
24. `setTimeout(() => { console.log(i) }, 2 * 1000)` is removed from the Call Stack.
25. After at least 2000 ms, the timer completes and it pushes `() => { console.log(i) }` to the Callback Queue.
26. `i++`, `i = 3`
27. `console.log('i: ' + 3)` is added to the Call Stack.
28. `console.log('i: ' + 3)` is executed. **Console prints `i: 3`**
29. `console.log('i: ' + 3)` is removed from the Call Stack.
30. `setTimeout(() => { console.log(i) }, 3 * 1000)` is added to the Call Stack.
31. `setTimeout(() => { console.log(i) }, 3 * 1000)` is executed. The browser creates a timer as part of the Web APIs.
32. `setTimeout(() => { console.log(i) }, 3 * 1000)` is removed from the Call Stack.
33. After at least 3000 ms, the timer completes and it pushes `() => { console.log(i) }` to the Callback Queue.
34. `i++`, `i = 4`
35. `console.log('i: ' + 4)` is added to the Call Stack.
36. `console.log('i: ' + 4)` is executed. **Console prints `i: 4`**
37. `console.log('i: ' + 4)` is removed from the Call Stack.
38. `setTimeout(() => { console.log(i) }, 4 * 1000)` is added to the Call Stack.
39. `setTimeout(() => { console.log(i) }, 4 * 1000)` is executed. The browser creates a timer as part of the Web APIs.
40. `setTimeout(() => { console.log(i) }, 4 * 1000)` is removed from the Call Stack.
41. After at least 4000 ms, the timer completes and it pushes `() => { console.log(i) }` to the Callback Queue.
42. `i++`, `i = 5`, exit `for (...) {...}` because `i` is not less than 5.
43. `main()` is removed from the Call Stack. (the Call Stack is empty now)
44. The Event Loop takes `() => { console.log(i) }` from the Callback Queue and pushes it to the Call Stack.
45. `() => { console.log(i) }` is executed and adds `console.log(5)` to the Call Stack.
46. `console.log(5)` is executed. **Console prints `5`**
47. `console.log(5)` is removed from the Call Stack.
48. `() => {}` is removed from the Call Stack. (the Call Stack is empty now)
49. Repeat step 44 to step 48 until the Callback Queue and the Call Stack are cleared.
