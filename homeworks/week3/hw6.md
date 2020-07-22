## hw1：好多星星

[LIOJ-1021 | Submission Details](https://oj.lidemy.com/status/f3a20de9e9ae23b967f83c147b9ab20b)

因為有寫過九九乘法表的經驗，這題同樣是用雙層迴圈。

另外一個解法是用內建函式 `repeat()`

``` js
function solve(input) {
  for (let i = 1; i <= input[0]; i += 1) {
    console.log('*'.repeat(i));
  }
}
```

## hw2：水仙花數

[LIOJ-1025 | Submission Details](https://oj.lidemy.com/status/f6ae4b3031418141f365e6e83ebc54e1)

第一步判斷有幾位數，首先想到的方法是透過 `String.length` 取得字串長度，接著用迴圈取得每一個數字，再計算每一個數字的次方和。

後來看 [作業檢討：Project4 LIOJ 1025：水仙花數](https://lidemy.com/courses/793973/lectures/14637145)，才知道可以用除以 10 的方式判斷有幾位數，再透過取餘數得到每一個數字，也發現這個寫法在執行上所花費的時間比轉成字串所花費的時間還要少。

## hw3：判斷質數

[LIOJ-1020 | Submission Details](https://oj.lidemy.com/status/dda2fcfe7204c9a5fc1382d4d3712517)

這題唯一的缺失就是不小心將迴圈的終止條件寫成 `for (let i = 1; i < input; i++)`，測試好幾次都拿 WA 之後，才發現沒有取得輸入字串的長度，應該是 `for (let i = 1; i < input.length; i++)` 才對。

## hw4：判斷迴文

[LIOJ-1030 | Submission Details](https://oj.lidemy.com/status/972740d35894df3c668c5509b768e556)

之前在 Codewars 寫過類似的題目，所以我覺得比前兩題簡單許多。

[Kata Stats: Reversed Strings | Codewars](https://www.codewars.com/kata/reversed-strings/javascript)

## hw5：聯誼順序比大小

[LIOJ-1004 | Submission Details](https://oj.lidemy.com/status/ca14889b203cf321efa4267795052338)

測試了幾次都沒通過，才發現題目有提到（到底是誰會選這麼大的數字啦⋯⋯）

> 要特別注意的是 A 與 B 可能是很大的數字，但保證長度為 512 個位數以內

Google 之後得知，在 JavaScript 中有所謂的最大安全整數（maximum safe integer)（2<sup>53</sup> - 1）

``` js
console.log(Number.MAX_SAFE_INTEGER);
// expected output: 9007199254740991
```

大於 2<sup>53</sup> - 1 的數可以用 `BigInt` 表示

``` js
const previousMaxSafe = BigInt(Number.MAX_SAFE_INTEGER) 
// ↪ 9007199254740991n
```

於是將變數加上 `BigInt()` 就拿到 AC 了（灑花～～～）

但是 `git commit` 之後 ESLint 會出現錯誤訊息

``` bash
error  'BigInt' is not defined  no-undef
```

只好加上註解 `/* eslint-disable no-undef */` 強行通過 (?)
