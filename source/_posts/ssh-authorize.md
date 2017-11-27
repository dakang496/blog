---
title: ssh授权
date: 2017-05-10 23:57:14
tags:
---


## 说明
经常通过ssh访问远程主机需要输入密码之类的，比较繁琐。其实可以让远程主机授权给你当前电脑，并且授权没有设置密码。下次再连接时，可以直接登录。

## 生成RSA密钥
+ 使用`ssh-keygen`命令
```bash
ssh-keygen -t rsa
```
+ 使用默认的存放目录，所以回车即可。
```
Generating public/private rsa key pair.
Enter file in which to save the key (~/.ssh/id_rsa):
```

+ 不设置密码直接回车。如果设置了密码，每次进行授权时，都要输入。
```
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```
+ 密钥生成
  在~/.ssh/目录中会有id_rsa（私钥）、id_rsa.pub（公钥）

## 在远程主机设置公钥信息 
### 方案一
+ 使用`ssh-copy-id`命令
```
ssh-copy-id -i ~/.ssh/id_rsa.pub username@hostname.com
```
> 还没有使用ssh授权，所以会被要求输入远程主机的密码

### 方案二
+ 把id_rsa.pub上传到远程主机
```
 scp .ssh/id_rsa.pub username@hostname.com:~
```
> scp命令也是基于ssh的。还没有使用ssh授权，所以会被要求输入远程主机的密码
+ 连接远程主机
```
ssh username@hostname.com
```
> 同样被要求输入远程主机的密码
+ 把id_rsa.pub的内容添加到用户根目录的.ssh/authorized_keys文件中
```
cd ~
cat id_rsa.pub >> .ssh/authorized_keys
```

参考来源：  
+ [How to Use RSA Key for SSH Authentication](http://news.softpedia.com/news/How-to-Use-RSA-Key-for-SSH-Authentication-38599.shtml)
+ [远程主机设置公钥信息](https://testerhome.com/topics/8328)

