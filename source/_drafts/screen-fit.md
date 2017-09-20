---
title: 屏幕适配（移动设备）
date: 2017-02-04 17:23:54
tags:
---
## 为什么要适配
机型比较多，各种屏幕分辨率不一，导致在某种机型上正常显示的页面，换了机型后就变样了，和之前差异比较大。

## 为什么会出现不适配
我们需要显示一块内容，它占满屏幕宽度。不考虑适配，可能会这样写
在head添加
```
<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
<style>
  *{margin:0;padding:0;}
</style>
```
在body添加
```
<div style="height:60px;width:320px;background-color:red"></div>
```
宽度设置为320，在大部分手机上,是可以占满屏幕的。因为大部分机型的window.screen.width（分辨率的宽度/设备像素比）都为320。
但是部分手机会存在差异，例如iphone6的是375。

## 适配的方式有哪些
当显示的内容，需要考虑到在各种机型上可以适配，可以使用：百分比、em、rem或者媒体查询。
### 百分比
基于父元素的宽高
### em
基于父元素的font-size
### rem
基于html的font-size
### 媒体查询
让特定设备使用特定的样式

## 有哪些方案
> 参考 [这里]( https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651551707&idx=1&sn=5ae9e04e7483a52a86cbf506a1a5e164&chksm=8025a01ab752290c3a97b07eb41d57fac67b7860d498b6e0a25a998ba28e1b3f1a13faa308a5&mpshare=1&scene=1&srcid=0204XgklNuIRUhPGa6sKCztK&key=6be9550aed890fdfb09241a2888f9e903aa1d9b721d6096ae40959c45b40daa6537aaf98caff276ebb33829a080d0ad4d91c6bb0f5cba582bf5cb41b0a818a0f9dac2dbf9882bbe3d1e97e187790cf35&ascene=0&uin=NTA4NzQzOTYw )

### 手机淘宝
获取手机dpr(window.devicePixelRatio)，动态生成viewport。
换取手机宽度，分成10份，每一份的宽度即是rem的尺寸。
根据设计稿尺寸(px)通过计算，转换成rem去布局。
ps:海外淘宝并没有这样做，而是scale1.0并且图片大概都是2倍图。

### 天猫
采用scale=1.0 写死viewport。
flex布局，笃定认为布局尺寸是375 (iPhone6)
rem 确定非flex的元素

### 手机携程
采用scale=1.0 写死viewport
px + 百分比布局