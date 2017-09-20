---
title: webpack学习笔记
date: 2017-01-15 23:37:54
tags: webpack
---


## 打包各种资源的原因
通过webpack加装器，可以把各种资源（图片、css等）转化为JavaScript

## 引入加装器

+ 代码中引入资源时指定
```
require("!style!css!./style.css") //载入style.css
```

+ 打包构建命令中指定
```
webpack entry.js  bundle.js --module-bind 'css=style!css'
```

+ 配置文件中指定

```
module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  } 
}
```

## 打包进度
```
webpack --progress --colors
```

## 自动打包
当文件有变化时，会自动打包
```
webpack --watch
```

## 开发的服务器
+ 安装
```
npm install webpack-dev-server -g
```
+ 使用
```
webpack-dev-server
```