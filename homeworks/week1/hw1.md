## 交作業流程

### 建立分支

每週開始寫作業之前，先建立一個新的 branch，作業在當週的 branch 上寫，不要在 master 上寫

``` bash
git branch <branch_name>
git checkout <branch_name>
```

也可以合併以上兩個步驟

``` bash
git checkout -b <branch_name>
```

### 寫作業

檔案內容請盡可能遵守 [中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines)
當週每一個作業都完成後，再一起交

1. 寫完作業後將 Untracked 和修改過的檔案加入 Staged

    ``` bash
    git add .
    ```

2. 建立新的版本

    ``` bash
    git commit -am "<commit_message>"
    ```

3. 檢查檔案狀態，確認所有檔案都在最新的版本上

    ``` bash
    git status
    # On branch <branch_name>
    # nothing to commit, working tree clean
    ```

### 交作業

交作業前先檢查，如果品質太差會被退件

1. 將本地端的分支上傳到 GitHub

    ``` bash
    git push origin <branch_name>
    ```

2. 到 GitHub Repository 建立一個 Pull Request，並寫下標題和訊息
3. 進入 [學習系統的作業列表](https://learning.lidemy.com/homeworks) 新增作業，選擇要提交第幾週的作業並附上 PR 連結

### 批改作業

助教批改完成後，會將分支合併到 master

1. 將 local branch 切回 master

    ``` bash
    git checkout master
    ```

2. 與遠端同步

    ``` bash
    git pull origin master
    ```

3. 刪除本地端的分支

    ``` bash
    git branch -d <branch_name>
    ```

每次交作業都重複以上流程
