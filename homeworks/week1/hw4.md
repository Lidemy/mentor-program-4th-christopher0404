## 跟你朋友介紹 Git

菜哥每次增加或修改笑話之後，都會拷貝一份檔案，最後變成這樣：

```
菜哥笑話全集 v1
菜哥笑話全集 v2
菜哥笑話全集 v2.5
菜哥笑話全集 v3
菜哥笑話全集 v3.2
菜哥笑話全集 v3.6
菜哥笑話全集 v3.9.4
.
.
.
菜哥笑話全集 v10
```

檔案已經多到菜哥找不到他想要的笑話，他也記不得每一個檔案之間更改了哪些內容

### 什麼是 Git

Git 是一套版本控制的工具，可以比對檔案在不同版本之間修改了哪些地方，每個人都適合使用，更有助於團隊開發，[官網](https://git-scm.com/) 有如何安裝的 [教學](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

安裝完之後，在 Terminal 下指令檢查：

``` bash
git --version
# git version 2.23.0
```

如果有顯示版本號就表示安裝成功了 😄

### 如何使用 Command Line

1. `git init` - 初始化
2. `git status` - 查看版本狀態，檔案修改過後， `git status` 會將檔案分為 **Staged** 和 **Untracked** 兩種
3. `git add <file>` - 將檔案加入版本控制
4. `git add .` - 一次將所有檔案加入版本控制
5. `git rm --cached <file>` - 將檔案移除版本控制
6. `git commit -m "<commit_message>"` - 新建一個版本並說明
7. `git log` - 顯示過去的紀錄：版本號、作者、日期時間、commit messages
8. `git checkout -- <file>` - 將檔案狀態退回上一個 commit 紀錄
9. `git checkout <commit>` - 切換到某一個版本的狀態
10. `git commit -am "<commit_message>"` - 同時將所有修改過的檔案加入 Staged 並完成 commit，但是新增加的檔案還是要用 `git add` 加入版本控制

`.gitignore` - 將不想要加入版本控制的檔案名稱寫在裡面

菜哥，我就先教到這裡，你慢慢練習上面的指令，我晚點還要去找 RJ，不知道為什麼最近大家都有很多問題找我，那就先這樣啦～ㄅㄅ
