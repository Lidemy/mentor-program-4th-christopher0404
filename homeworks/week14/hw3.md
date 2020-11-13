## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

### DNS

DNS（Domain Name System，網域名稱系統）是將域名和 IP 位址相互對映的一項服務。

DNS 將人們比較容易記住的網域名稱，如 `example.com`，轉換成該網域所指向的 IP 位址，如 `192.168.1.1`（IPv4）或更複雜的 IP 位址 `2400:cb00:2048:1::c629:d7a2`（IPv6），才能讓機器找到 `example.com` 的網頁；就像使用街道地址來尋找特定住所一樣，網際網路上的每個裝置都被分配了一個 IP 位址。

### Google Public DNS

#### 對使用者的好處

（以下為官方說法）

1. 加速網路瀏覽體驗
2. 提升上網的安全性
3. 直接取得查詢結果

#### 對 Google 的好處

（以下為個人臆測，實際狀況只有 Google 內部清楚）

1. 在合法規範內搜集使用者資料
2. 藉此優化搜尋引擎
3. 更精準地投放廣告

## 什麼是資料庫的 lock？為什麼我們需要 lock？

這裡的 **lock** 是指對資料庫進行操作時，將正在處理中的數據或資料鎖住，直到 transaction 結束為止，避免多個 transaction 同時執行，影響同一筆資料而造成衝突。常見的 race condition 發生於購物網站、售票系統的超賣。

鎖定有不同的模式，可定義 transaction 在資料上的依賴程度：

- Shared (S)
- Update (U)
- Exclusive (X)
- Intent
- Schema
- Bulk Update (BU)
- Key-range

## NoSQL 跟 SQL 的差別在哪裡？

| Comparison    | SQL Databases                                    | NoSQL Databases                                                        |
| ------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| Database Type | RDBMS (Relational Database Management System)    | Non-relational or distributed database                                 |
| Structure     | Table based (tables with fixed rows and columns) | Document-based, key-value pairs, graph databases or wide-column stores |
| Schema        | Rigid (predefined schema)                        | Flexible (dynamic schema for unstructured data)                        |
| Scaling       | Vertical (scale-up with a larger server)         | Horizontal (scale-out across commodity servers)                        |
| Examples      | Oracle, MySQL, PostgreSQL, Microsoft SQL Server  | MongoDB, DynamoDB, Redis, CouchDB, Neo4j                               |

## 資料庫的 ACID 是什麼？

ACID 指的是 DBMS（資料庫管理系統）在寫入或更新資料的過程中，為了確保 transaction 是正確可靠的，所必須具備的四個特性：

### Atomicity

原子性（或稱不可分割性），是指一個 transaction 中的所有操作，不是全部完成，就是全部不完成，不會結束在中間某個環節。

### Consistency

一致性，是指在 transaction 開始之前和 transaction 結束以後，資料庫的完整性必須保持一致。

### Isolation

隔離性（又稱獨立性），是指多個 transaction 同時執行時，每一個 transaction 都是獨立的，不會受到其他 transaction 影響，而導致資料的不一致。

### Durability

持久性，是指 transaction 結束以後，對資料的修改就是永久的，即便系統故障也不會改變。

## References

### DNS

1. [Domain Name System - Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System)
2. [What Is DNS? | How DNS Works | Cloudflare](https://www.cloudflare.com/learning/dns/what-is-dns/)
3. [Public DNS | Google Developers](https://developers.google.com/speed/public-dns)
4. [Introduction to Google Public DNS | Google Developers](https://developers.google.com/speed/public-dns/docs/intro)
5. [Frequently Asked Questions | Public DNS | Google Developers](https://developers.google.com/speed/public-dns/faq)

### Lock

1. [Record locking - Wikipedia](https://en.wikipedia.org/wiki/Record_locking)
2. [Transaction Locking and Row Versioning Guide - SQL Server | Microsoft Docs](https://docs.microsoft.com/en-us/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide)
3. [Database Locking - Programmer and Software Interview Questions and Answers](https://www.programmerinterview.com/database-sql/database-locking/)
4. [DB Locks in SQL - TutorialCup](https://www.tutorialcup.com/interview/sql-interview-questions/db-locks.htm)
5. [All about locking in SQL Server - SQLShack](https://www.sqlshack.com/locking-sql-server/)

### SQL vs NoSQL

1. [SQL vs. NoSQL Databases: What's the Difference? | IBM](https://www.ibm.com/cloud/blog/sql-vs-nosql)
2. [NoSQL vs SQL Databases | MongoDB](https://www.mongodb.com/nosql-explained/nosql-vs-sql)
3. [What is NoSQL? | Nonrelational Databases, Flexible Schema Data Models | AWS](https://aws.amazon.com/nosql/)
4. [SQL vs NoSQL: What's the difference?](https://www.guru99.com/sql-vs-nosql.html)
5. [MySQL vs NoSQL | Top Comparison to Learn With Infographics](https://www.educba.com/mysql-vs-nosql/)
6. [SQL vs NoSQL: 5 Critical Differences | Xplenty](https://www.xplenty.com/blog/the-sql-vs-nosql-difference/)

### ACID

1. [ACID - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/ACID)
2. [What does ACID mean in Database Systems? | Database.Guide](https://database.guide/what-is-acid-in-databases/)
3. [ACID Compliance: What It Means and Why You Should Care | MariaDB](https://mariadb.com/resources/blog/acid-compliance-what-it-means-and-why-you-should-care/)
4. [What are ACID properties in a database?](https://www.educative.io/edpresso/what-are-acid-properties-in-a-database)
