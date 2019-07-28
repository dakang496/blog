---
title: 初探RxJS
date: 2019-07-28 17:27:35
tags:
---
# RxJS是什么
RxJS是一个库，可以很方便地编写异步和基于事件的程序。  
关注的重点在数据的产生和发送，是基于Push的。


## Pull和Push
在Pull系统，消费者决定什么时候接受来自生成者的数据。  
在Push系统，生产者决定什么时候把数据发送给消费者。  

举个通俗易懂的例子：  
+ 组长8点前让我交了作业。(Pull)
+ 组员8点前把作业交给了组长。(Push)    

两种情况，都得到一样的结果，组长在8点前收到了作业，但过程是不一样的。是组长主动，还是组员主动的区别。

# RxJS的使用
看着例子可能更容易理解，上面是一般写法，下面是RxJS写法。

+ 简单输出


```javascript
// 生产者部分
function foo() {
  return 'Hello';
}
// 消费者部分
const x = foo.call(); // 主动获取数据
console.log(x);

/**
 * output:
 * Hello
 * /
```

```javascript
const { Observable } = require('rxjs');
// 生产者部分
const ob = new Observable((subscriber) => {
  subscriber.next('Hello'); // 主动发送数据
})
// 消费者部分
ob.subscribe((x)=>{
  console.log(x);
})

/**
 * output:
 * Hello
 * /

```
使用rxjs看起来复杂一点，因为功能比较简单   

-----

 + 每隔1秒输出一次

```javascript
// 生产者部分
function foo() {
  return "hello";
}
// 消费者部分
setInterval(() => {
  const x = foo.call();
  console.log(x);
}, 1000);
```

```javascript
const { Observable } = require('rxjs');
// 生产者部分
const ob = new Observable((subscriber) => {
  setInterval(() => {
    subscriber.next("hello");
  }, 1000);
})

// 消费者部分
ob.subscribe((x) => {
  console.log(x);
});
```
消费者其实只要输出内容就可以了，不需要了解内容是如何产生，及何时到达的

-----

+ 同时进行每隔1秒输出一次  

```javascript
// 生产者部分
function foo() {
  return "hello";
}
// 消费者部分
setInterval(() => {
  const x = foo.call();
  console.log(x);
}, 1000);
setInterval(() => {
  const x = foo.call();
  console.log(x);
}, 1000);
```

```javascript
const { Observable } = require('rxjs');
// 生产者部分
const ob = new Observable((subscriber) => {
  setInterval(() => {
    subscriber.next("hello");
  }, 1000);
})

// 消费者部分
ob.subscribe((x) => {
  console.log(x);
});
ob.subscribe((x) => {
  console.log(x);
});

```
使用RxJS看起来更简单一点，职责也清晰很多。

# 总结

刚接触RxJS，给我的印象是，当原始数据的产生和处理比较复杂时，使用RxJS可能更方便。  
感觉它是Promise和事件订阅的结合体。
