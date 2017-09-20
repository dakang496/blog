---
title: 同源策略
date: 2016-10-09 22:52:02
tags: 同源策略

---
## 对非同源资源的访问进行了限制

### 因素
+ 协议
+ 域名
+ 端口

下面给出了相对于[http://store.company.com/dir/page.html]()同源检测的示例：

| URL        | 结果           | 原因  |
| ------------- |:-------------:| -----:|
| http://store.company.com/dir2/other.html          | 成功 | |
| http://store.company.com/dir/inner/another.html   | 成功 | |
| https://store.company.com/secure.html             | 失败 |协议不同 |
| http://store.company.com:81/dir/etc.html          | 失败 |端口不同 |
| http://news.company.com/dir/other.html            | 失败 |主机名不同 |

### 资源
+ Cookie、LocalStorage和IndexDB无法读取
+ Dom无法获得
+ AJAX请求不能发送

### 规避
#### 更改域
**可以设置document.domain的值为当前域的一个后缀，如果这样做的话，短的域将作为后续同源检测的依据。**
假设在[http://store.company.com/dir/other.html]()中执行了下列脚本，则该页面将被认为和[http://company.com/dir/page.html]()页面同源。
```
document.domain = "company.com";
```
#### 跨域资源共享
**CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。**
CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。
整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。
因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

#### 其他方式
- JSONP发送请求
- iframe直接使用window.name或者window.postMessage
- 等等

### 参考
+ [https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
+ [http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)