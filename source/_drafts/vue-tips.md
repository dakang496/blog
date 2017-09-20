---
title: vue-tips
date: 2017-05-04 15:11:49
tags:
---

## 新增自定义事件
父子组件，可以通过事件通信。是vue自身实现的事件机制和原生dom事件不同。[详情](http://v1-cn.vuejs.org/guide/components.html#自定义事件)
+ $on
+ $emit
+ $dispatch()
+ $broadcast()

## 父子组件通信
 props down, events up

## 非父子组件通信
+ 使用一个空的 Vue 实例作为中央事件总线
```
var bus = new Vue();

// 触发组件 A 中的事件
bus.$emit('id-selected', 1);


// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})

```
+ [状态管理模式](https://cn.vuejs.org/v2/guide/state-management.html)


