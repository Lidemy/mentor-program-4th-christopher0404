# uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

在 React 中表單元素的處理，主要可以分為 controlled 和 uncontrolled 這兩種，指的是「資料是否受到 React 控制」，也就是「受 React 所控制的資料（controlled）」以及「不受 React 所控制的資料（uncontrolled）」。

之所以在表單元素上會區分「受 React 控制的資料」和「不受 React 控制的資料」，主要是因為在瀏覽器中，像是 `<input />` 這類的表單元素本身就可以保有自己的資料狀態，這也就是爲什麼當我們在 `<input />` 中輸入文字後，可以直接透過 JavaScript 選到該 input 元素後，再取出該元素的值，因為使用者輸入的內容（資料）可以直接保存在 `<input />` 元素內。

針對表單元素， [React 官方文件](https://reactjs.org/docs/uncontrolled-components.html) 建議我們使用 controlled components，基本上使用 controlled components 和 uncontrolled components 都能達到一樣或類似的效果，但是當我們需要對資料有更多的控制，或提示畫面的處理時，使用 controlled components 會來得更容易。

## Controlled Components

在 HTML 中的表單元素，像是 `<input>`、`<textarea>` 和 `<select>` 通常會維持它們自身的 state，並根據使用者的輸入來更新 state。在 React 中，可變的（mutable）state 通常是被維持在 component 中的 state property，並且只能用 `setState()` 來更新。

我們可以透過將 React 的 state 變成「唯一真相來源」（single source of truth）來將這兩者結合。如此，render 表單的 React component 同時也掌握了後續使用者的輸入對表單帶來的改變。像這樣一個輸入表單的 element，被 React 用這樣的方式來控制它的值，就稱為「controlled component」。

## Uncontrolled Components

在大多數的情況下，推薦使用 controlled component 來實作表單。在 controlled component 中，表單的資料是由 React component 來處理。另一個選擇是 uncontrolled component，表單的資料是由 DOM 本身所處理的。

如果要寫一個 uncontrolled component，你可以 [使用 ref](https://reactjs.org/docs/refs-and-the-dom.html) 來從 DOM 取得表單的資料，而不是為每個 state 的更新寫 event handler。

舉例來說，這段程式碼在 uncontrolled component 裡接受一個名字：

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

由於 uncontrolled components 保持了 DOM 裡的唯一的真相來源，有時候使用 uncontrolled components 更容易整合 React 和非 React 的程式碼。它也可以減少一些程式碼，不過，通常應使用 controlled components。

### Default Values

在 React 的 render 生命週期裡，表單上的 `value` attribute 會覆寫掉 DOM 的值。在 uncontrolled component 裡，常常會希望 React 去指定初始值，但讓之後的更新保持 uncontrolled。為了處理這種情況，可以指定 `defaultValue` 而非 `value`，在 component mount 後改變 `defaultValue` 屬性不會造成任何在 DOM 裡面的值更新。

```javascript
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

相同地，`<input type="checkbox">` 和 `<input type="radio">` 支援 `defaultChecked`，而 `<select>` 和 `<textarea>` 支援 `defaultValue`。

### The file input Tag

多數的表單元素都可以交給 React 處理，除了上傳檔案用的 `<input type="file" />` 例外，因為該元素有安全性的疑慮，JavaScript 只能取值而不能改值，也就是透過 JavaScript 可以知道使用者選擇要上傳的檔案為何（取值），但不能去改變使用者要上傳的檔案（改值）。因此對於檔案上傳用的 `<input type="file" />` 只能透過 uncontrolled components 的方式處理。

你應該使用 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 來與檔案之間互動。以下範例顯示如何建立一個 [ref 到 DOM 節點上](https://zh-hant.reactjs.org/docs/refs-and-the-dom.html) 來取得 submit handler 中的檔案：

```javascript
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${this.fileInput.current.files[0].name}`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
);
```

## References

- [Uncontrolled Components - React](https://reactjs.org/docs/uncontrolled-components.html)
- [Forms - React](https://reactjs.org/docs/forms.html#controlled-components)
- [React 中的表單處理（Controlled vs Uncontrolled）以及 useRef 的使用](https://ithelp.ithome.com.tw/articles/10227866)
