---
title: weixin
date: 2017-05-05 00:59:35
tags:
---
微信网页授权步骤
+ 在开发者中心页面配置授权的域名
+ 引导用户打开授权的链接
链接包含：用户授权成功后重定向的网页地址和可以自定义的state值。
可以这样引导：当用户访问任意一页面，如果之前没有授权过的，则重定向到授权链接页面。
+ 用户同意授权后，通过code获取access_token
code是重定向时链接上添加的参数。后台可以拿到code值与公众号的appsecret等信息访问微信后台获取access_token、refresh_token、openid(用户唯一标识)等信息
+ 获取用户信息
后台通过access_token、openid（用户唯一标识）拿到用户信息。

ps:access_token有时间期限，可通过refresh_token和openid重新获取。


jsSDK授权
## 后台的工作
+ grant_type、appid（公众号的）和secret（公众号的）请求接口获取access_token。
access_token一般两小时后失效，需要定时刷新
+ 通过access_token获取jsapi_ticket
+ jsapi_ticket、noncestr（随机字符串）、timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分）生成签名signature

## 前端的工作
```
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
```