---
title: visualFormattingModel
date: 2017-06-23 00:28:23
tags:
---

## Containing blocks 包含块
多个盒模型的定位和大小的计算是基于一个矩形的盒子的边界。这个矩形盒子就是包含块。

## Block-level elements and block boxes 块级元素和块盒子
### 块级元素
那些被格式化看成一块的，例如一个段落。这些元素会生成块级盒子。   
块级元素包括：display属性值为block、list-item和table的元素。
这些块级盒子可以组成块级上下文。

### 块容器盒子
+ 一类是只包含块级盒子
+ 另一类只包含行内级别盒子
块容器盒子包括：display属性值为block、list-item和inline-block的元素。


## 内联
### 行内级元素
+ 不会给内容生成块
+ 内容分布在行上
+ display值为inline、inline-table和inline-block的

### 行内级别的盒子
行内级元素生成的

### 行内盒子
display值为inline的非替换元素

### 原子行内级别盒子
除了行内盒子之外的行内级别盒子

### 匿名行内盒子
如果文本直接被放在块容器元素中，会被处理成匿名行内元素。则也有行内盒子。

## 匿名块盒子
### 块容器盒子含有块级别盒子，则强制要求块容器盒子中只有块级盒子。
```
<div>
 Some text
 <p>>More text</p>
</div>
```
可认为Some text被一个匿名的块级盒子包含。

## 块格式上下文
同一块格式上下文里，相邻两个块级盒子垂直方向的margin会折叠








