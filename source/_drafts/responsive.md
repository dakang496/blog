---
title: 响应式 
date: 2017-06-06 22:35:09
tags:
---
## 处理方式
+ css兼容性(流式布局)
+ 媒体查询
+ js监听窗口大小改变，做调整

## 方案

### 容器设置最小宽度（min-width）
最简单的方式就是限制页面宽度的最小值，这样即使设备屏幕比较宽，页面也能正常显示。  
同时当屏幕过大时，让内容居中（margin-left:auto;margin-right:auto;）  

目前主流屏幕分辨率是1024×768（有可能不是了，参考[这里](http://www.jianshu.com/p/406aac2f2707)）  
所以可以把body元素的min-width的值设置为1024或者更低，具体的值按照实际情况的来。   
如果设置太大，正常的浏览器会出现水平滚动条；设置太小,内容两边留白比较多。

+ 缺点：但显示效果不太好，需要滑动滚动条才能看到内容。
+ 优点：简单，无需太过考虑窄屏。

## 根据不同屏幕宽度设置不同样式
需要确定边界，为了在不同边界范围内使用不同样式。  
三种设备宽度递增：移动手机<Pad<PC

+ PC
Pad以iPad为参考，普遍为768。则大于768认为是PC。[宽度情况](http://www.jianshu.com/p/ab979770b618)
```
// PC的样式
@media screen and (min-width: 768px){
    
}
```
+ Pad
目前iPhone6 plus宽度（414）已经算比较大的了。则大于414,小于等于768认为是Pad。
```
// PC的样式
@media screen and (min-width: 414px) and (max-width:768px){
    
}
```
+ Phone
```
// PC的样式
@media screen and (max-width: 414px){
    
}
```




@media screen and (min-width: 767px) and (max-width:1199px)

@media screen and (max-width: 1199px)


@media screen and (min-width: 769px) and (max-width:1199px)

@media screen and (max-width: 768px)

@media screen and (max-width: 414px)

@media screen and (max-width: 1199px)

@media screen and (max-width: 768px)

@media screen and (max-width: 660px)

@media screen and (max-width: 560px)

@media screen and (max-width: 374px)

@media screen and (min-width: 768px) and (max-width:1040px)





## hexo官网的主题列表
+ width<480px
display:block
+ 480px<=width<769px
显示两列
```
-webkit-box-flex: 1;
box-flex: 1;
-ms-flex: 0 0 50%;
flex: 0 0 50%;
```
+ width>=769px
显示三列
```
-webkit-box-flex: 1;
box-flex: 1;
-ms-flex: 0 0 33.333333333333336%;
flex: 0 0 33.333333333333336%;
```
