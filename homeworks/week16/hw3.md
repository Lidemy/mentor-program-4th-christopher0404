# hw3：Hoisting

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

## Console Output

``` js
undefined
5
6
20
1
10
100
```

## What is Hoisting

> Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution.

Functions declarations are also hoisted, but these go to the very top, so will sit above all of the variable declarations.

## Explanation

Let's see how the JavaScript compiler outputs code from the same block of the above code at runtime:

``` js
function fn() {      // `fn` is hoisted to the top above all of the variable declarations
  function fn2(){    // `fn2` is hoisted to the top of `fn`
    console.log(a);  // `a` is not declared in `fn2`, so it reads `a` from `fn` (at the line where `fn2()` is called) and gets the value is `6`
    a = 20;          // Reassign `a` to `20`
    b = 100;         // Initialize `b` and declare it, but no hoisting as there is no `var` in the statement
  }
  var a;             // `var a` is hoisted to the top of `fn`, but below `fn2`
  console.log(a);    // Prints `undefined`
  a = 5;
  console.log(a);    // Prints `5`
  a++;               // `a` is reassigned to `6` (5 + 1 = 6)
  fn2();             // `a` is reassigned to `20` in `fn2`
  console.log(a);    // Prints `20`
}
var a;               // `a` is hoisted to the top, but below all of the function declarations
a = 1;
fn();
console.log(a);      // Prints `1`
a = 10;              // Reassign `a` to `10`
console.log(a);      // Prints `10`
console.log(b);      // Prints `100` since `b` is initialized and declared in `fn2` as a global variable
```

## What is Execution Context

`8.3 Execution Contexts` in ECMAScript® 2020 Language Specification:

> An execution context is a specification device that is used to track the runtime evaluation of code by an ECMAScript implementation.

An execution context is an abstract concept of an environment where the Javascript code is evaluated and executed. Whenever any code is run in JavaScript, it’s run inside an execution context.

> An execution context contains whatever implementation specific state is necessary to track the execution progress of its associated code.

### How is the Execution Context created

Let’s understand how an execution context is created by the JavaScript engine.

The execution context is created in two phases:

1. Creation Phase
2. Execution Phase

#### Creation Phase

The execution context is created during the creation phase.

#### Execution Phase

In this phase assignments to all those variables are done and the code is finally executed.

## How the program works

> The [execution context stack](https://www.ecma-international.org/ecma-262/11.0/#execution-context-stack) is used to track execution contexts. The running execution context is always the top element of this stack. The newly created execution context is pushed onto the stack and becomes the running execution context.

When the above code is executed, the JavaScript engine creates a global execution context to execute the global code, which can be conceptually represented as the following pseudocode during the creation phase:

``` js
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      fn: function
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: undefined
    }
  }
}
```

During the execution phase, the variable assignments are done. So the global execution context looks something like this:

``` js
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      fn: function
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 1
    }
  }
}
```

When a call to function `fn()` is encountered, a new function execution context is created and looks something like this during the creation phase:

``` js
fnExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Arguments: { length: 0 },
      fn2: function
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: undefined
    }
  }
}

GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      fn: function
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 1
    }
  }
}
```

During the execution phase:

``` js
fnExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Arguments: { length: 0 },
      fn2: function
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 6  // 5 → 6
    }
  }
}

GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      fn: function
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 1
    }
  }
}
```

When a call to function `fn2()` is encountered, a new function execution context is created:

``` js
fn2ExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Arguments: { length: 0 }
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 6  // Access `a` from `fn`
    }
  }
}

fnExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Arguments: { length: 0 },
      fn2: function
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 6  // 5 → 6
    }
  }
}

GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      fn: function
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 1
    }
  }
}
```

During the execution phase:

``` js
fn2ExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Arguments: { length: 0 }
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 20  // 6 → 20
    }
  }
}

fnExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Arguments: { length: 0 },
      fn2: function
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 6  // 5 → 6
    }
  }
}

GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      fn: function
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 1
    }
  }
}
```

After `fn2` completes, `a` is reassigned to `20` in `fn` Exection Context:

``` js
fnExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Arguments: { length: 0 },
      fn2: function
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 20  // 5 → 6 → 20
    }
  }
}

GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      fn: function
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 1
    }
  }
}
```

After `fn` completes, `b` is added to Global Lexical Environment:

``` js
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      fn: function,
      b: 100
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 1
    }
  }
}
```

Reassign `a` to `10`:

``` js
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      fn: function,
      b: 100
    }
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      a: 10  // 1 → 10
    }
  }
}
```

After the global code completes and the program finishes.

## References

1. [ECMAScript® 2020 Language Specification](https://www.ecma-international.org/ecma-262/11.0/#sec-executable-code-and-execution-contexts)
2. [Understanding Execution Context and Execution Stack in Javascript | by Sukhjinder Arora | Bits and Pieces](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)
3. [The Ultimate Guide to Hoisting, Scopes, and Closures in JavaScript - ui.dev](https://ui.dev/ultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript/)
4. [The Ultimate Guide to Execution Contexts, Hoisting, Scopes, and Closures in JavaScript](https://www.youtube.com/watch?v=Nt-qa_LlUH0&ab_channel=uidotdev)
5. [javascript - What really is a declarative environment record and how does it differ from an activation object? - Stack Overflow](https://stackoverflow.com/questions/20139050/what-really-is-a-declarative-environment-record-and-how-does-it-differ-from-an-a)
