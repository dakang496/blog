---
title: react
date: 2017-04-15 15:57:35
tags:
---
## 学习记录

###  webpack2.0 配置加载器的结构改了

+ 多了rules字段
+ 加载器必须加`-loader`，不能省略了

```javascript
 module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    },{
      test: /\.css$/, // Only .css files
      loader: 'style-loader!css-loader' // Run both loaders
    }]
  }
```

## bable加载器配置文件.babelrc
+ 使用env就好，会判断兼容性，选择合适的语法转换
+ react有jsx语法，所以也要加上react
```javascript
{
  "presets": ["env", "react"]
}
```

