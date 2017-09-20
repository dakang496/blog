---
title: event
date: 2017-04-12 21:13:58
tags:
---
## 事件代理
element.on(event,selector,callback)

+ 真实target和element之间存在selector才触发代理
+ element.addEventListener(event,proxyFn,captureSetting)
+ proxyFn中创建event对象(newEvent)
preventDefault()、stopImmediatePropagation()、stopPropagation()方法都会间接调用真实event对象的
+ proxyFn中触发callback
callback.apply(element,newEvent)

## event对象
+ currentTarget 当前绑定事件的元素
+ target/srcElement 事件发生的最底层的元素


### 注意
+ // emulate mouseenter, mouseleave


