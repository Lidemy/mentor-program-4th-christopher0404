# hw2：部署

網站：[christopher.tw](https://christopher.tw/)

多虧了前期學員的筆記和 Huli 的教學影片，因此，在部署的過程中沒有遇到什麼大問題。部署完成後，也順利地將檔案透過 SFTP 上傳，但是每次當我看到網址列上顯示 `Not Secure`，就覺得非常不舒服，所以又花了不少時間研究如何設定 HTTPS，每次覺得快要成功的時候，馬上就慘遭無情打臉 QQ

最後是使用 Certbot 透過 Let's Encrypt 完成設定，並將過程記錄下來，因為篇幅過多，決定將筆記整理成[部落格文章](https://christopher0404.coderbridge.io/)：

1. [How to Launch an Amazon EC2 Instance](https://christopher0404.coderbridge.io/2020/11/11/How-to-Launch-an-Amazon-EC2-Instance/)
2. [How to Request an AWS SSL/TLS Certificate](https://christopher0404.coderbridge.io/2020/11/11/How-to-Request-AWS-SSL-TLS-Certificate/)
3. [How to Create a Load Balancer with an HTTPS Listener](https://christopher0404.coderbridge.io/2020/11/12/how-to-create-a-load-balancer-with-an-https-listener/)
4. [How to Install LAMP on Ubuntu 20.04](https://christopher0404.coderbridge.io/2020/11/11/How-to-Install-LAMP-on-Ubuntu/)
5. [How to Set Up Firewall with UFW on Ubuntu 20.04](https://christopher0404.coderbridge.io/2020/11/12/How-to-Set-Up-Firewall-with-UFW-on-Ubuntu/)
6. [Secure Apache Using Certbot with Let's Encrypt on Ubuntu 20.04](https://christopher0404.coderbridge.io/2020/11/12/secure-apache-using-certbot-with-lets-encrypt-on-ubuntu/)
