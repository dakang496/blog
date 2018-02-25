---
title: 用log4js发送邮件
date: 2018-02-25 23:52:38
tags:
---

log4js-node是node上的日志输出工具，有很多方便好用的功能，发送邮件是其中一项。

## 安装
npm install log4js


## 简单介绍
1.x and 2.x在API上有所区别，这里针对的是2.x

### 配置 - log4js.configure(object || string)
object包含配置信息；string可以是配置文件的路径  
配置中主要有两个比较重要的属性：categories和appenders  

+ appenders  
定义是了日志的输出形式，可以是stdout（标准输出流）、file（文件）、smtp（邮件）等

+ categories  
类别或者说是分组。可以定义类别名称，每个类别下指定有哪些appenders。在进行日志输出时，是可以选择类别的。则日志会以该类别下的各个appenders对应的形式输出。  
categories中还可以指定level，低于该level的日志是不会发送到appenders的

+ 日志级别level  
ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF

### 日志记录器 - log4js.getLogger([category])
指定了类别，获得一个日志记录器。日志记录器的日志会按照该类别的设置进行输出。要输出日志，调用各级别的方法即可。
```
var logger=log4js.getLogger()  //不指定类别，默认是defualt类别
logger.debug('hello')
logger.info('hello')
logger.warn('hello')
logger.error('hello')
```

## 邮件发送
由xxxx@163.com发送一封邮件给xxxx@qq.com，邮件中含有附件。

```
var log4js = require('log4js')
log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'test-log.log'
    },
    email: {
      type: "smtp",
      recipients: "xxxx@qq.com", //可以多个，用,隔开
      subject: "test-log",//邮件标题
      sender: "xxxx@163.com",//发送者
      attachment: { //如果不需要附件删掉这个即可
        enable: true,
        filename: "test-log.log", //附件文件名
        message: "附件" //附件名称
      },
      transport: {
        plugin: "smtp",
        options: {
          host: "smtp.163.com",//不同邮件服务商的主机名是不同的。登录对应邮箱，在POP3/SMTP/IMAP设置中查看。
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "xxxx@163.com",//发送者邮箱
            pass: "xxxx" //邮箱密码或者是授权码
          }
        }
      },
      html: false,//内容是html还是纯文本形式
      sendInterval: 0 //秒。每个多少秒后，把收集到的日志信息发送出去
    }
  },
  categories: {
    default: {
      appenders: ['file', 'email'],
      level: 'debug'
    }
  }
})
var logger = log4js.getLogger()
logger.debug("test email width log4js")

```









