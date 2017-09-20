---
title: tcp
date: 2017-05-17 20:53:42
tags:
---
## 三次握手(并不一定准确)
1.客户端发送:
syn=1,seq=client_isn
2.服务器发送:
syn=1、seq=server_isn、ack=client_isn+1
3.客户端发送:
syn=0、seq=client_isn+1、ack=server_isn+1
