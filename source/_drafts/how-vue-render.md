---
title: how-vue-render
date: 2017-05-03 22:07:30
tags:
---
## vue渲染原理
+ 模板把model和view关联起来   
+ 追踪model的变化，更新view   
追踪变化，通过ES5才支持的Object.defineProperty
+ 异步更新view   
异步更新队列缓冲同一事件循环中的数据的变化，在下一次事件循环中更新view.

详细请看：[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

