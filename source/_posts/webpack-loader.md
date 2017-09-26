---
title: webpack-loader
date: 2017-09-15 23:37:54
tags:  
  - webpack
  - loader
---

## 介绍
webpack的loader是用来处理各种资源，并把资源转为javaScript模块。  
这个过程就像流水线，原材料(资源)经过一道道工序(loader),最后得到产品（javaScript模块）。

## loader的处理过程
同一种资源也可能被多个loader处理，它们是串行的，前一个loader处理完就交给下一个loader。   
对于每个loader都会经过两个过程pitch和normal(自己取的名字)，如下：   
![loader处理过程](/images/webpack-loader-order.png)

+ 先经历pitch过程，从上往下（从后置loader到前置loader），调用loader的pitch方法，资源并没有被处理。
+ 如果某个loader的pitch方法，有返回值，则它下面的loader不再被调用。直接从这个loader起进入normal过程，并且把返回值当前新资源（原来的资源丢弃）。
+ normal的过程，从下往上资源被一个个loader处理，最后得到最终的JavaScript模块。

## loader分类
+ 配置中定义的loader一般都是`普遍loader`
+ 配置中enforce字段的值可为post和pre，分别对应`后置loader`和`前置loader`
+ 在代码中指定使用的loader为`行内loader`

> 配置中同类型(普遍、前置或者后置)的loader在normal过程执行顺序，是根据在rules数组中的位置确定的，越靠后越先执行。
行内loader则是从右往左执行。例如require('style-loader!css-loader!global.css')，先执行css-loader，再执行style-loader

还会存在被忽略的情况:  
+ 所有普通loader可以通过在请求中加上 ! 前缀来忽略（覆盖）。
+ 所有普通和前置loader可以通过在请求中加上 -! 前缀来忽略（覆盖）。
+ 所有普通，后置和前置loader可以通过在请求中加上 !! 前缀来忽略（覆盖）。

>官方建议：应该使用行内 loader 和 ! 前缀，因为它们是非标准的。它们可在由 loader 生成的代码中使用。 


## 最后
具体使用和理解可以见后续笔记。