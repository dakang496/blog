---
title: vue开发环境搭建
date: 2017-05-06 23:17:51
tags:
---

## npm依赖
```json
"devDependencies": {
    "vue-loader": "^12.0.3",
    "vue-template-compiler": "^2.3.2",
    "webpack": "^2.5.0"
},
"dependencies": {
  "vue": "^2.3.2"
}
```
+ webpack2已经可以识别ES6的语法了，可以不使用babel-loader。
+ vue-loader10以后不再内置vue-template-compiler了，要单独安装。

## webpack配置文件(webpack.confg.js)

```
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }]
  }
}

```

## 代码
+ ./src/main.js
```javascript
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: createElement => createElement(App)
});
```
+ ./src/App.vue

```html
<template>
  <h2 id="container">
   {{msg}} 
  </h2>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: 'hello'
    }
  }
}
</script>

<style>
#container {
  background-color: red;
}
</style>

```

+ ./index.html
```html
<!DOCTYPE html>
<html>
<head></head>
<body>
  <div id="app"></div>
  <script src="./dist/build.js"></script>
</body>
</html>
```