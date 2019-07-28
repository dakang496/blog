---
title: Vuex的state是如何具有响应式的
date: 2019-07-21 20:32:48
tags:
---
## 前言
Vuex是Vue的状态管理方案，可以让各组件共享状态数据，降低了相互之间通信的复杂度。  
当更新Vuex的state数据时，发现引用到state数据的组件页面也会同时更新。可见state数据也是响应式的，其作用效果和Vue组件的data数据一致。   
     
究竟是如何实现的呢，直接撸源码看看它的秘密。源码都来源于[3.1.1版本](https://github.com/vuejs/vuex/tree/ffc7d00314a371c09d288bc5123793031d182cd2)。

## 研究
下面是Vuex的一个简单使用例子

```javascript
var store = new Vuex.Store({
  state:{
    count:0
  }
});
var app = new Vue({
  el:'#app',
  store:store,
  template: '<div>{{$store.state.count}}</div>'
});
app.$mount();

```
当发现执行下面的代码，页面内容从0变成了1，从头到尾仅仅只改变了count的值而已，就好像count字段直接定义在组件的data数据里一样，具有响应式。
```javascript
store.state.count = store.state.count +1;
```
-------------   

来看看Store的构造方法，在[/src/store.js](https://github.com/vuejs/vuex/blob/ffc7d00314a371c09d288bc5123793031d182cd2/src/store.js)中，由于比较长，挑了重点来看。经过一系列的处理（不需要深究），把得到的state传入resetStoreVM方法。
```javascript
constructor (options = {}) {
    // 省略一堆
    this._modules = new ModuleCollection(options)
    // 省略一堆
    const state = this._modules.root.state

    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root)

    // initialize the store vm, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    resetStoreVM(this, state)

    // 省略一堆
}

```

来看看resetStoreVM的实现
```javascript
function resetStoreVM (store, state, hot) {
  // 省略一堆
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  // 省略一堆
}

```

原来state的数据其实就是Vue实例的data数据。这个Vue实例并不关注页面渲染，是为了让state的数据都是响应式的。当其他Vue实例的页面模板对state的数据进行直接或者间接引用时，一样参与依赖收集过程。当state的数据变化时，通过Watcher的作用触发该页面更新。（依赖收集或者Watcher等概念内容，这里不做扩展，可以研究下Vue的响应式原理）


## 模拟Vuex
Vuex代码比较复杂，考虑的情况比较多，不能一下子直观简单的理解state数据的响应式。所以这里实现了个简单版的Vuex.
```javascript
function Store(options) {
  var vm = new Vue({
    data: {
      $$state: options.state || {}
    },
  });
  Object.defineProperty(this, 'state', {
    get:function() {
      return vm._data.$$state
    }
  })
}
// 把store转为内部的$store
Vue.mixin({
  beforeCreate: function () {
    this.$store = this.$options.store;
  }
})

```
下面是使用的例子
```javascript
var store = new Store({
  state: {
    count: 0
  },
});
var app = new Vue({
  el: '#app',
  store: store,
  template: '<div>{{$store.state.count}}</div>'
});
app.$mount();

```

当执行 ```store.state.count = store.state.count +1;``` ，页面内容从0变成了1。







