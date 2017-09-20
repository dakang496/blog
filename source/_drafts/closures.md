---
title: closures
date: 2017-05-17 23:30:40
tags:
---

闭包就是将函数内部和函数外部连接起来的一座桥梁。
通过闭包能访问(间接)其他函数内部的变量。

下面的f2函数，就是闭包
```
function f1(){
　　var n=999;
　　function f2(){
　　　　alert(n); 
　　}
　　return f2;
}
var result=f1();
result(); // 999
```

[学习Javascript闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

