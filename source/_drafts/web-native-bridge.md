---
title: web-native-bridge
date: 2017-05-18 00:17:05
tags:
---
[H5与Native交互之JSBridge技术](http://tech.youzan.com/jsbridge/)  
[JS与WebView交互存在的一些问题](http://www.jianshu.com/p/93cea79a2443)


## iOS
### native调js
stringByEvaluatingJavaScriptFromString,该方法返回js脚本的执行结果。
### js调用native
#### 伪协议schema
+ location.href  缺点:连续多次修改，native只接受到最后一次请求。
+ iframe

## android
### native调js
webview的loadUrl

### js调用native
#### 伪协议schema
和ios一样
#### 通过在webview页面里直接注入原生js代码方式，使用addJavascriptInterface方法来实现
向window注入了某个对象，调用对象的方法就会执行native代码
#### 使用prompt,console.log,alert方式





