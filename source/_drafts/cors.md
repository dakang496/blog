---
title: 跨域资源共享(cors)
date: 2017-05-17 20:25:43
tags:
---

+ 发起跨域请求，浏览器会在请求头部加上origin字段
+ 后台如果允许，响应头会有Access-Control-Allow-Origin字段
响应头的其他字段：
Access-Control-Allow-Credentials 服务器同意请求含有cookie。发请求是同时要加上withCredentials

复杂请求比简单请求都了`预检`的一步，其他一样。预检通过好，有个期限，不用每次都预检。
