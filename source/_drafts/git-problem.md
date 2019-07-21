---
title: git-problem
tags:
---

## 查看状态
```
git status
```
## 查看分支
```
git  branch  -a   //展示本地和远程分支
```
## 撤销
```
git reset HEAD <file>    //撤销提交到暂存的
```

| 指令           | 优势        | 缺点                                       | 描述                           | 例子                    |
| ------------ | --------- | ---------------------------------------- | ---------------------------- | --------------------- |
| git reset    | 操作简单方便    | 会重写当前分支的历史                               | 同时移动分支末端和HEAD                | git reset  <commit>   |
| git revert   | 不丢失历史记录   | 容易出现冲突                                   | 创建新commit（把旧内容当成新修改，来达到撤销目的） | git revert <commit>   |
| git checkout | 便于快速查看旧版本 | 出现分离的 HEAD。 移动HEAD后，最好在此创建新分支再提交。以免提交丢失。 | 移动HEAD                       | Git checkout <commit> |



## 提交

```
git commit -m xxx    //xxx要填写的信息
```
## 推送
```
git push --set-upstream origin develop
```

## 新建分支
```bash
git checkout -b <branch> <start position>  //<branch>是你新分支名称；<start position>是原分支提交的hash值
```

## 拉远程分支
```
git checkout -t origin/2.0.0
```

## 删除分支
```
git branch -D xxxx    //删除本地
git push origin :xxx  //推送到远程
```
## git clone 指定哪个ssh key
在config文件配置好了,假设name为test
```
git clone git@test:xxxx.git
```

## 删除在本地有但在远程库中已经不存在的分支

https://blog.csdn.net/sgs595595/article/details/72480346
```
git remote prune origin
```

## 创建SSH key
```
ssh-keygen -t rsa
```
http://blog.zdakang.com/2017/05/10/ssh-authorize/

## 配置指令
```
git config --system --list  // 查看
git config --system --list  // 查看系统的
git config --global  --list  // 查看该用户的
git config --local  --list  // 查看当前仓库的

git config --local xxx.xxx "xxxx" // 修复当前仓库的
```
https://www.cnblogs.com/merray/p/6006411.html