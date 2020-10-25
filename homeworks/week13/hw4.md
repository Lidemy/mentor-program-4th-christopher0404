## Webpack 是做什麼用的？可以不用它嗎？

> At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.
>
> [Concepts | webpack](https://webpack.js.org/concepts/)

webpack 將各種前端資源和模組打包成單一檔案，就不需要在 HTML 中引入每個 JavaScript 檔案，並將檔案編譯成瀏覽器看得懂的程式碼，因為部分版本的瀏覽器不支援原生的 ES6 模組，尤其是引入第三方模組，所以才需要透過 webpack 或其他打包工具幫我們處理。

webpack 適合用在中、大型的應用程式，因為需要管理不同類型的檔案；如果專案規模不大，不一定要使用 webpack。

## gulp 跟 webpack 有什麼不一樣？

兩者的定位不同，簡單來說，gulp 是任務管理工具，而 webpack 是模組打包工具。

> A toolkit to automate & enhance your workflow
>
> Leverage gulp and the flexibility of JavaScript to automate slow, repetitive workflows and compose them into efficient build pipelines.
>
> [gulp.js](https://gulpjs.com/)

gulp 將任務集中管理，並將流程自動化。因為都能執行 Babel、CSS 預處理器的編譯、uglify、minify 等等，所以剛接觸的開發者，容易將 gulp 與 webpack 混淆。

## CSS Selector 權重的計算方式為何？

`!important` > Inline style > ID selector > Class selector > Element selector
