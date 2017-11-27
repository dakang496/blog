---
title: 水平放置多块有间隙的内容
date: 2017-11-19 20:29:29
tags:  
  - css
  - 布局
---

## 要求

在布局中经常会遇到要在一行内放置多块内容，内容块之间有间隙，内容和行边缘没有间隙；均分且填充满父容器。如下图：

![行内容](/images/css-skill.png)

## 常规实现
每块内容设置固定宽度，给块设置margin作为间隙,第一块或者最后一块的margin为0。  
每块的内容宽度需要计算得出：  
父容器内容的总宽度W,一行放置的块数n,每块之间的间隙距离m，则每块内容宽度w=(W-(n-1)*m)/n

缺点：父容器宽度必须已知且固定不变。还要计算每块内容宽度。

```html
<style>
*{
  box-sizing: border-box;
}
.content-list {
  list-style-type: none;
  background-color: yellow;
  padding:0;
  width: 630px;
}
.content-list:after{
  content: " ";
  display: table;
  clear: both;
}
.content-item{
  float: left;
  width: 200px;
  height: 200px;
  background-color: red;
  margin-left: 15px;
}
.content-item:first-child{
  margin-left:0; 
}
</style>

<ul class="content-list">
  <li class="content-item"></li>
  <li class="content-item"></li>
  <li class="content-item"></li>
</ul>
```
![常规实现](/images/css-skill3.png)

## 百分比的实现
均分往往想到用百分比，但块之间要有间隙，可以在块内部使用padding。则内容之间就能出现间隙了，但可以在设置padding时遇到了阻碍。  
因为行边缘的块只有一侧才挨着另外的块，所以这个padding不能统一设置成一样的。每块的padding都要通过计算得到。看下图:

![padding计算](/images/css-skill2.jpeg)  

优点：父容器宽度可以不固定
缺点：每块的padding大小不同，需要计算

```html
<style>
*{
   box-sizing: border-box;
}
.content-list {
  list-style-type: none;
  background-color: yellow;
  padding:0;
  width: 630px;
}
.content-list:after{
  content: " ";
  display: table;
  clear: both;
}
.content-item{
  float: left;
  width: 33.333%;
  height: 200px;
  background-color: gray;
} 
.content-item-inner{
  background-color: red;
  width: 100%;
  height: 100%;
}
</style>

<ul class="content-list">
  <li class="content-item" style="padding-right:10px">
    <div class="content-item-inner"></div>
  </li>
  <li class="content-item" style="padding-left:5px;padding-right:5px;">
    <div class="content-item-inner"></div>
  </li>
  <li class="content-item" style="padding-left:10px;">
    <div class="content-item-inner"></div>
  </li>
</ul>

```

![百分比实现](/images/css-skill4.png)

## 更好的实现
上面百分比的实现不够好，padding的计算不太方便。如果每块的padding都相同，这样就方便很多了。这是由于两侧的块在行边缘处没有padding导致的，如果有padding，就会让行两侧边缘和块内容有间隙了，但要求填充一行。
但如果父容器增加宽度，这个宽度是两侧间隙之和。这样即使两侧有间隙也没问题了。（bootstrap就是这样做的）

```html
<style>
* {
  box-sizing: border-box;
}

.content-list {
  list-style-type: none;
  background-color: yellow;
  padding: 0;
  width: 630px;
  margin-left: -7.5px;
  margin-right: -7.5px;
}

.content-list:after {
  content: " ";
  display: table;
  clear: both;
}
.content-item{
  float: left;
  width: 33.333%;
  height: 200px;
  padding:0 7.5px;
  background-color: gray;
} 
.content-item-inner{
  background-color: red;
  width: 100%;
  height: 100%;
}
</style>
<ul class="content-list">
  <li class="content-item">
    <div class="content-item-inner"></div>
  </li>
  <li class="content-item">
    <div class="content-item-inner"></div>
  </li>
  <li class="content-item">
    <div class="content-item-inner"></div>
  </li>
</ul>

```

![更好的实现](/images/css-skill5.png)

> 行两侧边缘的空隙事实上是在原容器宽度基础上增加的，所以两侧的块都设置paddng就刚好抵消了。为了让人看不出两侧的空隙，颜色一般设置和背景颜色一样。