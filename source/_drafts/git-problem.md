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
