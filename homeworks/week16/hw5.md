# 第十六週心得

這週花了非常多時間想辦法理解課程中提到的概念：Event Loop、Scope、Hoisting、Closure、Prototype、this、⋯⋯。看過 ECMAScript Specification 之後，認為只要能夠搞懂 Execution Context，就能瞭解大部分搞不清楚的地方。只不過對於「物件導向」還不是很熟悉，將來要找時間補足。

在閱讀 [ECMAScript® 2020 Language Specification](https://www.ecma-international.org/ecma-262/11.0/) 時，完全找不到 Variable Object 和 Activation Object，讓我感到相當困惑，後來看到 [Stack Overflow 的討論](https://stackoverflow.com/questions/20139050/what-really-is-a-declarative-environment-record-and-how-does-it-differ-from-an-a)，回答問題的人有提到，VO 和 AO 似乎是以其他形式存在於 Execution Context 中，但是並沒有非常確定。

多虧了 Huli 在 JS201 課程影片中的引導，讓我之後閱讀相關資料時，不至於完全看不懂，由於那些已經建立好的基礎，在往後對於 JavaScript 底層運作機制的理解，才有辦法更加深入。

這週作業以英文來作答的原因，主要是因為懶得翻譯 XD 覺得用英文寫比較方便，其次是為了避免名詞上的解釋和原文有所偏差。作業中的參考資料，都是我認為非常優秀的文章，尤其是 [這個影片](https://www.youtube.com/watch?v=Nt-qa_LlUH0&ab_channel=uidotdev) 讓我眼睛為之一亮，對於理解 Execution Context 十分有幫助。
