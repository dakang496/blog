---
title: interview
date: 2017-04-11 23:06:55
tags:
---
## 笔试
+ 基本类型
+ 考查作用域
+ 考查this
```
var a=1;
var obj={a:2,t:function(){var a=3;return this.a}};
alert(obj.t());
alert((obj.t)())
var t=obj.t;
alert(t())
```
+ 画出盒模型，标出属性名和可见width
+ 创建对象，继承mobile和apple的属性
```
function mobile(){this.type='手机';}
function apple(){this.model='苹果';}
```
+ 写一正则，要求：由大小字母下划线组成的12~20个字符，且大小字母开头
+ 給一数组unique(Array arr),去重
+ 写一方法convert(Number nb)，12345可以转为一万两千三百四十五。
+ 请求头的内容，具体作用
+ 列出内联标签和块标签
+ 列出前端优化的方式
+ 什么是js跨域，原因，如果解决
+ 赛马
+ a、b、c单独干分别要8、12、15小时，如果每人轮流干一小时。最后b干了多长时间。

