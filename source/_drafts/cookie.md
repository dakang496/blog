---
title: cookie
date: 2016-10-21 23:13:22
tags:
---


## 属性值
+ path 如果没有定义，默认为当前文档位置的路径。
例如，[http://example.com/da/index.html]()中，path的值为*/da*
+ domain 如果没有定义，默认为当前文档位置的路径的域名部分。
例如，[http://example.com/da/index.html]()中，domain的值为*example.com*
+ max-age cookie存活时间（单位是秒）
例如，max-age为3时，则cookie三秒后过期
+ expires 过期的时间，cookie会在这个时间后过期。
UTC时区的字符格式，这种格式可以通过Date.toUTCString()得到。
例如 
``` 
new Date('2016-10-24').toUTCString();//Mon, 24 Oct 2016 00:00:00 GMT

```
+ secure
是否只通过https协议传递。


## 类型
+ 会话cookie
如果没有设置过期时间，就是会话cookie。当用户退出浏览器时，会话cookie就被删除了
+ 持久cookie
用户退出浏览器时，依然存在。到了过期时间，就会被删除。

## 操作
### 后台
当后台对前端发来的请求进行响应时，可以在响应头部设置Set-Cookie字段添加cookie
```
Set-Cookie：key=value;domain=example.com;path=/
```
### 前端
操作document.cookie
```
document.cookie='key=value;domain=example.com;path=/';
```

## 共享

### 端口不同
端口不同，cookie也是共享的。例如：
在http://example.com:3000 上设置的cookie，能被http://example.com:5000 访问到。

### 同域名，但路径不同
同域名下，对cookie的path的字段进行设置，则其他页面在此path路径上的才能被访问到。例如：
在http://example.com:3000/a/b/ 上设置了cookie，该cookie的path为**/a/b**,则http://example.com:3000/a/c/是访问不到的。需要设置cookie时，把path字段改为**/a**或者**/**。

### 父域名和子域名共享
和设置path类似，可以修改cookie的domain字段，同时也要符合path的要求，则可以共享cookie。例如：
在http://www.example.com:3000/上设置cookie的domamin为**example.com**,path一般设为**/**,则http://example.com/可以访问到该cookie.




