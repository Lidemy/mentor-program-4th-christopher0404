# hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}

const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

## Console Output

``` js
2
2
undefined
```

## Explanation

1. When `obj.inner.hello()` is called, the execution context is `obj.inner`, so `this.value` becomes `obj.inner.value` and it prints `2`.
2. Since `obj2 === obj.inner`, the result is same as the first one.
3. When `hello()` is called, the execution context is global, so `this.value` becomes `global.value` and the property can't be found, so it prints `undefined`.

## What is this in JavaScript

> In most cases, the value of `this` is determined by how a function is called (runtime binding). It can't be set by assignment during execution, and it may be different each time the function is called. It also has some differences between strict mode and non-strict mode.

### Global context

In the global execution context (outside of any function), `this` refers to the global object whether in strict mode or not. (In web browsers, the window object is also the global object)

### Function context

Inside a function, the value of `this` depends on how the function is called.

If we use `call()` and `apply()` method with calling function, both of those methods take as their first parameter as execution context.

### As an object method

When a function is called as a method of an object, its `this` is set to the object the method is called on.

### As a constructor

When a function is used as a constructor (with the `new` keyword), its `this` is bound to the new object being constructed.

### As a DOM event handler

When a function is used as an event handler, its `this` is set to the element on which the listener is placed.

## References

1. [this - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
2. [JavaScript — all about “this” keyword | by NC Patro | codeburst](https://codeburst.io/all-about-this-and-new-keywords-in-javascript-38039f71780c)
3. [Understanding the “this” Keyword in JavaScript | by Pavan | Better Programming | Medium](https://medium.com/better-programming/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8)
4. [淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://blog.huli.tw/2019/02/23/javascript-what-is-this/)
